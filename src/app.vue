<template>
  <div>
    <div class="header">
      <div class="inner">
        <router-link to="/" exact>index</router-link>
        <router-link to="/supplier/">supplier</router-link>
      </div>
    </div>
    <hr>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    {{loading}}
  </div>
</template>
<script>
export default {
  name: 'app-view',
  data () {
    return {
      loading: true
    }
  }
}
</script>