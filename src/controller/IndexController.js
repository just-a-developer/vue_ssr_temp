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

    getList () {
        return new Promise((resolve, reject) => {
            
        })
    }
}

export default IndexController