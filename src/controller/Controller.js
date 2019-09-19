import axios from "axios"
import md5 from "blueimp-md5"

class Controller {
    constructor() {
        this.axios = axios;
        this.md5 = md5;
    }
}

export default Controller