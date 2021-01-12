import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store= new Vuex.Store({
    state:{
        currentUserEmail:'',
        noticias:[]
    },
    mutations:{
        setcurrentUserEmail(state,payload)
        {
            state.currentUserEmail=payload;
        },
        setNoticias(state,payload)
        {
            state.noticias=payload;
        }
    },
    actions:{},
    modules:{},
    getters:{
        getcurrentUserEmail(state)
        {
            return state.currentUserEmail
        },
        getNoticias(state)
        {
            return state.currentUserEmail
        }
    }
})
export default store

