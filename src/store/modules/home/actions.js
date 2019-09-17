import actions from "../../action_const"
import mutations from "../../muts_const"
import IndexController from "@cont/IndexController"

let indexController = new IndexController();

export default {
    [actions.GET_HOME_TITLE_ACTION] ({ commit }, payload) {
        return indexController.getTitle().then( title => {
            commit(mutations.SET_INDEX_TITLE, title);
        } );
    }
}