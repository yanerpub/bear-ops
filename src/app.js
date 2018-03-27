import Vue from 'vue'
import app from './app.vue'
import router from './router'
import resource from 'vue-resource'
import * as filters from './filters'

Vue.use(resource)
Vue.config.devtools = false
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
  render: h => h(app)
})