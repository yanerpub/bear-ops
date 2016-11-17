<template>
    <div>
        {{data}}
        <hr>
        <router-link to="/supplier/list">list</router-link>
        <router-link to="/supplier/add">add</router-link>
    </div>
</template>
<script>
export default {
  name: 'supplier-index-view',
  data () {
    return {
      data: 'supplier index'
    }
  }
}
</script>