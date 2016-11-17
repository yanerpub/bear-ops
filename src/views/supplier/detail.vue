<template>
  <div>{{supplier | json}}</div>
</template>

<script>

export default {
  name: 'supplier-detail-view',
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
    }
  }
}
</script>
