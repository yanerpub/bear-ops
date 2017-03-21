<template>
  <div>
    <form>
      <h3>{{product.id}}</h3>
      <div class="form-group row">
        <label class="col-xs-2 col-form-label">产品名</label>
        <div class="col-xs-10">
          <p class="form-control-static">{{product.name}}</p>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-xs-2 col-form-label">生效日期</label>
        <div class="col-xs-10">
          <p class="form-control-static">{{product.effectDateText}}</p>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-xs-2 col-form-label">过期日期</label>
        <div class="col-xs-10">
          <p class="form-control-static">{{product.expireDateText}}</p>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-xs-2 col-form-label">备注</label>
        <div class="col-xs-10">
          <p class="form-control-static">{{product.remark}}</p>
        </div>
      </div>
      <hr>
      <div class="form-group row" v-for="field in fields">
        <label class="col-xs-2 col-form-label">{{field.name}}</label>
        <div class="col-xs-10">
          <input v-if="field.type == 'text'" class="form-control" type="text" v-model="product.fields[field.key]"
                 :required="field.required" disabled>
          <input v-if="field.type == 'password'" class="form-control" type="password"
                 v-model="product.fields[field.key]" :required="field.required" disabled>
          <textarea rows="3" v-if="field.type == 'textarea'" class="form-control" v-model="product.fields[field.key]"
                    :required="field.required" disabled></textarea>
          <checkbox v-if="field.type == 'checkbox'" :field-key="field.key" :default-value="product.fields[field.key]"
                    :optional-values="field.optionalValues" :disabled="disabled"></checkbox>
          <div v-if="field.type == 'radio'">
            <label class="form-check-inline" v-for="op in field.optionalValues">
              <input class="form-check-input" type="radio" :name="field.key" :value="op.value"
                     v-model="product.fields[field.key]" disabled> {{op.name}}
            </label>
          </div>
          <div v-if="field.type == 'select'">
            <select class="form-control" v-model="product.fields[field.key]" :required="field.required" disabled>
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
              <input class="form-check-input" type="checkbox" v-model="product.contracts" :value="{id: contract.id, version: contract.version}" disabled>
              <a target="new" href="/contract/#">《{{contract.name}}》</a>
            </label>
          </div>
        </div>
      </div>
      <router-link class="btn btn-info" :to="{ name: 'hotelSupplier', params: { sid: $route.params.sid }}">返回</router-link>
    </form>
  </div>
</template>

<script>
import checkbox from "../../components/checkbox.vue"
import { fetchProduct, listField, listContract } from './api'

export default {
  name: 'hotel-product-view',
  data () {
    return {
      product: {},
      fields: [],
      contracts: [],
      disabled: true
    }
  },
  components: {
    checkbox
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      fetchProduct(this.$route.params.id, (body) => {
        this.product = body.data
        listField(this.product.treeId, (body) => this.fields = body.data)
        listContract(this.product.treeId, (body) => this.contracts = body.data)
      })
    }
  }
}

</script>
