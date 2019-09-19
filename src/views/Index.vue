<template>
    <div class="index">
        这是首页
        <h1>{{ title }}</h1>
        <h2>{{ name }}</h2>
        <Footer/>
    </div>
</template>

<script>
import "@css/pages/index.scss"
import titleMixix from "@/mixin/title.mixin.js"
import Footer from "./common/Footer.vue"
import actions from "@store/action_const.js"
import mutations from "@store/muts_const.js"
import { mapState } from "vuex"

export default {
    name: "Index",
    mixins: [titleMixix],
    asyncData ({ store, route }) {
        store.commit(mutations.SET_PAGE_HEAD, {
            title: "深圳写字楼出租|出售-深圳办公室出租-中工招商网",
            content: "中工招商网专业深圳写字楼出租网站，为您提供真实有效的深圳办公室出租、办公楼租赁、写字楼出售信息，盘源多，成交快，免佣服务，助您快速找到合适的办公场所，企业办公选址，就上中工深圳写字楼网！",
            // description: ""
        })

        return store.dispatch(actions.GET_HOME_TITLE_ACTION);
    },
    data () {
        return {}
    },
    computed: {
        ...mapState({
            title: state => state.headTitle
        }),
        name() {
            return "首页名字";
        }
    },
    components: {
        Footer
    },
    created() {
        console.log(this.title);
        // this.$ssrContext.title = this.title;
        // this.$ssrContext.title = "首页";
    }
}
</script>