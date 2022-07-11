// root mutations

export default {
    // set user
    SET_USER(state, data){
        state.user = data;
    },

    UNSET_USER(state){
        state.user = null;
    }
}