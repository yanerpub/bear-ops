<template>
  <div class="container">
    <nav class="navbar navbar-light bg-faded">
      <a class="navbar-brand" href="/">Brand</a>
      <ul class="nav navbar-nav">
        <li class="nav-item active">
          <router-link to="/" exact class="nav-link">工作台<span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link to="/supplier/" class="nav-link">供应商</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">产品树</a>
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