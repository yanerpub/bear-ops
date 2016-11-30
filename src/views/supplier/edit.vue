<template>
  <div>
    <form>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">SID</label>
        <div class="col-sm-10">
          <p class="form-control-static">{{supplier.sid}}</p>
        </div>
      </div>
      <div class="form-group row">
        <label for="name" class="col-xs-2 col-form-label">Name</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="name" v-model="supplier.name">
        </div>
      </div>
      <div class="form-group row">
        <label for="local" class="col-xs-2 col-form-label">Local</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="local" v-model="supplier.local">
        </div>
      </div>
      <div class="form-group row">
        <label for="city" class="col-xs-2 col-form-label">City</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="city" v-model="supplier.city">
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="updateData">更新</button>
    </form>
  </div>
</template>

<script>
import { fetchSupplier, updateSupplier } from './api'
export default {
  name: 'supplier-edit-view',
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
      fetchSupplier(this.$route.params.id, (body) => this.supplier = body.data);
    },
    updateData () {
      updateSupplier(this.supplier, (body) => this.$router.push('/supplier/'))
    }
  }
}

</script>
