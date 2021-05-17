import { createStore } from 'vuex'
import application from './module/application'

export default createStore({
    modules: {
        application
    }
})