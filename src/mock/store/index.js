import Vuex from 'vuex'
import user from './user'
import logicOrg from './logicOrg'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: user,
        logicOrg: logicOrg
    }
})