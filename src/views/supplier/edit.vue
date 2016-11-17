<template>
  <div>
    <label>sid</label><input v-model="supplier.sid"/><br>
    <label>psid</label><input v-model="supplier.psid"/><br>
    <label>qualificationId</label><input v-model="supplier.qualificationId"/><br>
    <label>name</label><input v-model="supplier.name"/><br>
    <label>local</label><input v-model="supplier.local"/><br>
    <label>userId</label><input v-model="supplier.userId"/><br>
    <button @click="updateData">update</button>
  </div>
</template>

<script>

export default {
  name: 'supplier-edit-view',
  data: function () {
    return {
      supplier: {}
    }
  },
  created: function () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function () {
      this.$http.get('/supplier/' + this.$route.params.id).then(function ({body}) {
        this.supplier = body.data;
      });
    },
    updateData: function () {
      this.$http.put('/supplier/', this.supplier).then(function ({body}) {
        router.push('/');
      });
    }
  }
}
</script>
