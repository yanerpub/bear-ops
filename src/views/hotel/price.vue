<template>
  <div class="row">
    <div class="col-sm-12">
      <h3 class="text-center">{{product.name}}-报价结算</h3>
      <table class="table text-center">
        <thead>
        <tr>
          <td><b>产品ID</b></td>
          <td><b>负责人</b></td>
          <td><b>产品生效时间</b></td>
          <td><b>产品过期时间</b></td>
          <td><b>操作</b></td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><router-link :to="{ name: 'hotelProduct', params: { sid: product.sid, id: product.id }}">{{product.id}}</router-link></td>
          <td>{{product.owner}}</td>
          <td>{{product.effectDateText}}</td>
          <td>{{product.expireDateText}}</td>
          <td>
            <router-link :to="{ name: 'hotelProductEdit', params: { sid: product.sid, id: product.id }}">修改</router-link>
            <router-link :to="{ name: 'hotelProductPrice', params: { sid: product.sid, id: product.id }}">添加报价</router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col-sm-12">
      <table class="table table-bordered text-center">
        <thead>
        <tr class="active">
          <td>门店</td>
          <td>房型</td>
          <td>服务单元</td>
          <td>报价</td>
          <td>操作</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in skus">
          <td>{{item.dian}}</td>
          <td>{{item.room}}</td>
          <td>{{item.service}}</td>
          <td>{{item.price}}</td>
          <td>
            <router-link :to="{ name: 'hotelProductEdit', params: { sid: item.sid, id: item.id }}">修改</router-link>
            <router-link :to="{ name: 'hotelProductPrice', params: { sid: item.sid, id: item.id }}">报价结算</router-link>
          </td>
        </tr>
        </tbody>
      </table>
      <router-link class="btn btn-info" :to="{ name: 'hotelSupplier', params: { sid: $route.params.sid }}">返回</router-link>
    </div>
    <div class="col-sm-12">

    </div>
  </div>
</template>

<script>
import checkbox from "../../components/checkbox.vue"
import { fetchProduct, listAccount} from './api'

export default {
  name: 'hotel-product-view',
  data () {
    return {
      product: {},
      accounts: [],
      skus: []
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
      fetchProduct(this.$route.params.id, (body) => this.product = body.data)
      listAccount(this.$route.params.sid, (body) => this.accounts = body.data)
    }
  }
}

</script>
