<template>
  <div>
    <form v-show="show">
      <h3>{{product.id}}</h3>
      <div class="form-group row">
        <label for="name" class="col-xs-2 col-form-label">Name</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="name" v-model="product.name">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-xs-2 col-form-label">effectDate</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="effectDate" v-model="product.effectDateFmt">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-xs-2 col-form-label">expireDate</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="expireDate" v-model="product.expireDateFmt">
        </div>
      </div>
      <div class="form-group row">
        <label for="remark" class="col-xs-2 col-form-label">remark</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="remark" v-model="product.remark">
        </div>
      </div>
      <hr>
      <div class="form-group row" v-for="field in fields">
        <label class="col-xs-2 col-form-label">{{field.name}}</label>
        <div class="col-xs-10">
          <input v-if="field.type == 'text'" class="form-control" type="text" v-model="product.fieldMap[field.key]"
                 :required="field.required">
          <input v-if="field.type == 'password'" class="form-control" type="password"
                 v-model="product.fieldMap[field.key]" :required="field.required">
          <textarea rows="3" v-if="field.type == 'textarea'" class="form-control" v-model="product.fieldMap[field.key]"
                    :required="field.required"></textarea>
          <checkbox v-if="field.type == 'checkbox'" :field-key="field.key" :default-value="product.fieldMap[field.key]"
                    :optional-values="field.optionalValues" v-on:joinValue="joinValue"></checkbox>
          <div v-if="field.type == 'radio'">
            <label class="form-check-inline" v-for="op in field.optionalValues">
              <input class="form-check-input" type="radio" :name="field.key" :value="op.value"
                     v-model="product.fieldMap[field.key]"> {{op.name}}
            </label>
          </div>
          <div v-if="field.type == 'select'">
            <select class="form-control" v-model="product.fieldMap[field.key]" :required="field.required">
              <option v-for="op in field.optionalValues" :value="op.value">{{op.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <hr>
      <div class="form-group row">
        <label class="col-xs-2 col-form-label">服务合同协议</label>
        <div class="col-xs-10">
          <div class="form-check" v-for="contract in contracts">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox" v-model="product.contractArray" :value="contract.id">
              <a target="new" href="/contract/#">《{{contract.name}}》</a>
              <span v-if="contract.treeId == product.treeId" class="alert alert-warning alert-dismissible fade in"
                    role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <strong>required!</strong> checked.
              </span>
            </label>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="updateData">更新</button>
      <router-link class="btn btn-info" :to="{ name: 'hotelSupplier', params: { sid: $route.params.sid }}">返回
      </router-link>
    </form>
  </div>
</template>

<script>
import checkbox from "./checkbox.vue"
import { fetchTemplate, fetchProduct, updateProduct } from './api'

export default {
  name: 'hotel-product-edit-view',
  data () {
    return {
      product: {},
      fields: [],
      contracts: [],
      show: false
    }
  },
  components: {
    checkbox
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
      // 先取产品数据再
      fetchProduct(this.$route.params.id, (body) => {
        this.product = body.data
        // 取得域模板
        fetchTemplate(this.product.treeId, (body) => {
          this.fields = body.data.fieldList
          this.contracts = body.data.contractList
          this.show = true
        })
      })
    },
    joinValue (data) {
      this.product.fieldMap[data.key] = data.value
    },
    updateData () {
      updateProduct(this.product, (body) => this.$router.push({ name: 'hotelSupplier', params: { sid: this.$route.params.sid }}))
    }
  }
}

</script>
