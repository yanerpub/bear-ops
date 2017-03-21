<template>
  <div>
    <form>
      <div class="form-group row" v-if="!!$route.params.sid">
        <label class="col-sm-2 col-form-label">SID</label>
        <div class="col-sm-10">
          <p class="form-control-static">{{supplier.sid}}</p>
        </div>
      </div>
      <div class="form-group row">
        <label for="name" class="col-xs-2 col-form-label">名称</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="name" v-model="supplier.name">
        </div>
      </div>
      <div class="form-group row">
        <label for="website" class="col-xs-2 col-form-label">网站</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="website" v-model="supplier.website">
        </div>
      </div>
      <div class="form-group row">
        <label for="cellphone" class="col-xs-2 col-form-label">手机</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="cellphone" v-model="supplier.cellphone">
        </div>
      </div>
      <div class="form-group row">
        <label for="telephone" class="col-xs-2 col-form-label">座机</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="telephone" v-model="supplier.telephone">
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-xs-2 col-form-label">邮箱</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="email" v-model="supplier.email">
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-xs-2 col-form-label">描述</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="description" v-model="supplier.description">
        </div>
      </div>
      <div class="form-group row">
        <label for="address" class="col-xs-2 col-form-label">地址信息</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="address" v-model="supplier.address">
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="updateData" v-if="!!$route.params.sid">更新</button>
      <router-link class="btn btn-info" :to="{ name: 'supplierView', params: { sid: $route.params.sid }}" v-if="!!$route.params.sid">返回</router-link>
      <button type="button" class="btn btn-primary" @click="addData" v-if="!$route.params.sid">添加</button>
      <router-link class="btn btn-info" :to="{ name: 'supplierIndex'}" v-if="!$route.params.sid">返回</router-link>
    </form>
  </div>
</template>

<script>
import { addSupplier, fetchSupplier, updateSupplier } from './api'
export default {
  name: 'supplier-input-view',
  data () {
    return {
      supplier: {}
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      if (!!this.$route.params.sid) {
        fetchSupplier(this.$route.params.sid, (body) => this.supplier = body.data);
      } else {
        this.supplier = {}
      }
    },
    addData () {
      addSupplier(this.supplier, (body) => this.$router.push('/supplier/' + body.data))
    },
    updateData () {
      updateSupplier(this.supplier, (body) => this.$router.push('/supplier/' + this.$route.params.sid))
    }
  }
}
</script>
