<template>
  <div class="container">
    <nav class="navbar navbar-light bg-faded">
      <a class="navbar-brand" href="/">Brand</a>
      <ul class="nav navbar-nav">
        <li class="nav-item active">
          <router-link to="/" exact class="nav-link">工作流<span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link to="/supplier/" class="nav-link">供应商</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/tree/" class="nav-link">产品树</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/hotel/" class="nav-link">酒店产品</router-link>
        </li>
      </ul>
    </nav>
    <hr>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app-view'
}
</script>