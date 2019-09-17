import mutations from "./muts_const"

export default {
    [mutations.SET_PAGE_HEAD](state, payload) {
        console.log("设置页面头部" + payload);
        if(payload.title && typeof payload.title === "string") {
            state.headTitle = payload.title;
        }

        if(payload.content && typeof payload.content === "string") {
            state.headContent = payload.content;
        }

        if(payload.description && typeof payload.description === "string") {
            state.headDescription = payload.description;
        }
    }
}