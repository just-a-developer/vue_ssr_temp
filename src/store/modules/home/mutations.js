import mutations from "../../muts_const"

export default {
    [mutations.SET_INDEX_TITLE] (state, payload) {
        state.title = payload;
    }
}