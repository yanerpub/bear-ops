import Vue from 'vue'
import app from './app.vue'
import store from './store'
import router from './router'
import Resource from 'vue-resource'
import * as filters from './filters'

Vue.use(Resource)

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