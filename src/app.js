import Vue from 'vue'
import app from './app.vue'
import store from './store'
import router from './router'
//import { sync } from 'vuex-router-sync'
import Resource from 'vue-resource'
import * as filters from './filters'

Vue.use(Resource)

//import 'font-awesome/css/font-awesome.css'
//import 'bootstrap/dist/css/bootstrap.css'

// sync the router with the vuex store.
// this registers `store.state.route`
//sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(app)
})