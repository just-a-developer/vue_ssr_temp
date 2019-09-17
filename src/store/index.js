import Vue from "vue"
import Vuex from "vuex"

import indexMD from "./modules/home/index"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
        modules: {
            index: indexMD
        },
        state: {
            baseTitle: "中工招商网",
            headTitle: "",
            headContent: "",
            headDescription: ""
        },
        mutations,
        actions
    })
}