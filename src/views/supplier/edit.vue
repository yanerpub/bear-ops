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
        <label for="website" class="col-xs-2 col-form-label">Website</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="website" v-model="supplier.website">
        </div>
      </div>
      <div class="form-group row">
        <label for="cellphone" class="col-xs-2 col-form-label">Cellphone</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="cellphone" v-model="supplier.cellphone">
        </div>
      </div>
      <div class="form-group row">
        <label for="telephone" class="col-xs-2 col-form-label">Telephone</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="telephone" v-model="supplier.telephone">
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-xs-2 col-form-label">Email</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="email" v-model="supplier.email">
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-xs-2 col-form-label">Description</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="description" v-model="supplier.description">
        </div>
      </div>
      <div class="form-group row">
        <label for="address" class="col-xs-2 col-form-label">Address</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="address" v-model="supplier.address">
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="updateData">更新</button>
      <router-link class="btn btn-info" :to="{ name: 'supplierIndex'}">返回</router-link>
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
      fetchSupplier(this.$route.params.sid, (body) => this.supplier = body.data);
    },
    updateData () {
      updateSupplier(this.supplier, (body) => this.$router.push('/supplier/'))
    }
  }
}

</script>
