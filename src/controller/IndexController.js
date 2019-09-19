import Controller from "./Controller.js"

class IndexController extends Controller {
    constructor() {
        super();
    }

    getTitle () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("中工首页");
            }, 1000)
        })
    }

    getList (params) {
        return new Promise((resolve, reject) => {
            this.axios({

            }).then(({ data: result }) => {

            })
        })
    }
}

export default IndexController