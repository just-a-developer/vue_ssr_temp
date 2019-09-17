const fs = require('fs')
const path = require('path')
const koa = require("koa")
const koaRouter = require("koa-router")
const LRU = require('lru-cache')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'
// const useMicroCache = process.env.MICRO_CACHE !== 'false'

const templatePath = resolve('./src/index.template.html')
let app = new koa();
let renderer
let readyPromise

function createRenderer(bundle, options) {
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return createBundleRenderer(bundle, Object.assign(options, {
        // for component caching
        cache: new LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
        // this is only needed when vue-server-renderer is npm-linked
        basedir: resolve('./dist'),
        // recommended for performance
        runInNewContext: false
    }))
}

if (isProd) {
    // 在生产中:使用模板和构建的服务器包创建服务器渲染器。
    // 服务器包由vue-ssr-webpack-plugin生成。
    const template = fs.readFileSync(templatePath, 'utf-8')
    const bundle = require('./dist/vue-ssr-server-bundle.json')
    // 客户端清单是可选的，但是它允许呈现程序
    // 自动推断预加载/预取链接，并直接添加<script>
    // 标记用于呈现期间使用的任何异步块，避免了瀑布式请求。
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')

    renderer = createRenderer(bundle, {
        template,
        clientManifest
    })
} else {
    // 在开发中:使用watch和hot-reload设置开发服务器，
    // 在bundle / index模板更新上创建一个新的渲染器。
    readyPromise = require('./build/setup-dev-server')(
        app,
        templatePath,
        (bundle, options) => {
            renderer = createRenderer(bundle, options)
        }
    )
}

async function render(ctx, next) {
    const s = Date.now()

    res.setHeader("Content-Type", "text/html")
    res.setHeader("Server", serverInfo)

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if (err.code === 404) {
            ctx.body = "'404 | Page Not Found'";
        } else {
            ctx.body = "500 | Internal Server Error";
            console.error(`error during render : ${ctx.url}`)
            console.error(err.stack)
        }
    }

    const context = {
        title: 'Vue HN 2.0', // default title
        url: ctx.url
    }

    renderer.renderToString(context, (err, html) => {
        console.log("渲染完毕");
        console.log(err, html);
        if (err) {
            return handleError(err)
        }

        ctx.body = html;

        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })
}

let router = new koaRouter();
const port = process.env.PORT || 8080

router.get("/index", async (ctx, next) => {
    ctx.body = "进入 index";
})

router.get('*', isProd ? render : async (ctx, next) => {
    readyPromise.then(() => render(ctx, next))
})

app.use(router.routes());

app.on("error", err => {
    console.log(err);
})

app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})