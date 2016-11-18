<template>
    <div>{{supplier}}</div>
</template>

<script>

import { detail } from './api'

export default {
  name: 'supplier-detail-view',
  data () {
    return {
      supplier: {}
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      detail(this.$route.params.id, (body) => this.supplier = body.data);
    }
  }
}

</script>
