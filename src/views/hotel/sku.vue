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
          <td>
            <router-link :to="{ name: 'hotelProduct', params: { sid: $route.params.sid, id: $route.params.id }}">
              {{product.id}}
            </router-link>
          </td>
          <td>{{product.owner}}</td>
          <td>{{product.effectDateText}}</td>
          <td>{{product.expireDateText}}</td>
          <td>
            <button class="btn btn-primary" @click="toAddData">添加报价</button>
          </td>
        </tr>
        <tr class="info" v-for="item in accounts">
          <td>{{item.bank}}</td>
          <td>{{item.name}}</td>
          <td>{{item.number}}</td>
          <td>{{item.currencyText}}</td>
          <td>{{item.stateText}}</td>
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
          <td>可选服务</td>
          <td>报价</td>
          <td>操作</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in skus">
          <td>{{item.storeSeq}}/{{item.storeName}}</td>
          <td>{{item.roomName}}</td>
          <td class="text-left">
            <ul>
              <li v-for="op in item.services">{{op.serviceName}}-{{op.description}}</li>
            </ul>
          </td>
          <td>{{item.originalPrice}}/{{item.sellingPrice}}/{{item.settlementPrice}}/不加价</td>
          <td>
            <button class="btn btn-primary" @click="toEditData(item)">修改报价</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col-sm-12" v-show="input">
      <br>
      <br>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-xs-2 col-form-label text-right">门店搜索</label>
          <div class="col-xs-6">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for..." v-model="store.seq">
              <span class="input-group-btn">
                  <button class="btn btn-default" type="button" @click="searchStore(store)">Go!</button>
                </span>
            </div>
          </div>
        </div>
        <div class="form-group" v-show="stores.length > 0">
          <label for="store" class="col-xs-2 col-form-label text-right">门店</label>
          <div class="col-xs-6">
            <select class="form-control" id="store" v-model="store.item" @change="searchRoom(store.item.seq)">
              <option v-for="op in stores" :value="op">{{op.seq}}-{{op.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group" v-show="rooms.length > 0">
          <label for="roomId" class="col-xs-2 col-form-label text-right">房型</label>
          <div class="col-xs-6">
            <div class="input-group">
              <select class="form-control" id="roomId" v-model="sku.roomId" required>
                <option v-for="op in rooms" :value="op.id">{{op.name}}</option>
              </select>
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">添加新房型</button>
              </span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-2 col-form-label text-right">可选服务</label>
          <div class="col-xs-6">
            <div class="input-group">
              <div class="input-group-btn">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{currentServiceName}} <span class="caret"></span></button>
                <ul class="dropdown-menu">
                  <li v-for="op in services"><a @click="currentServiceId = op.id; currentServiceName = op.name;">{{op.name}}</a></li>
                </ul>
              </div>
              <input type="text" class="form-control" v-model="description">
              <div class="input-group-btn">
                <input type="button" class="btn btn-default" value="添加" @click="addService">
              </div>
            </div>
            <br>
            <p v-for="(op, index) in sku.services"><span class="glyphicon glyphicon-remove" aria-hidden="true" @click="sku.services.splice(index, 1)"></span>{{op.serviceName}}-{{op.description}}</p>
          </div>
        </div>
        <div class="form-group">
          <label for="originalPrice" class="col-xs-2 col-form-label text-right">原价</label>
          <div class="col-xs-6">
            <input class="form-control" type="text" id="originalPrice" v-model="sku.originalPrice" required>
          </div>
        </div>
        <div class="form-group">
          <label for="sellingPrice" class="col-xs-2 col-form-label text-right">售价</label>
          <div class="col-xs-6">
            <input class="form-control" type="text" id="sellingPrice" v-model="sku.sellingPrice" required>
          </div>
        </div>
        <div class="form-group">
          <label for="settlementPrice" class="col-xs-2 col-form-label text-right">结算价</label>
          <div class="col-xs-6">
            <input class="form-control" type="text" id="settlementPrice" v-model="sku.settlementPrice" required>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-2 col-form-label text-right">加价规则</label>
          <div class="col-xs-6">
            <select class="form-control">
              <option value="1" selected="true">不加价</option>
            </select>
          </div>
        </div>
        <button type="button" class="btn btn-primary col-xs-offset-2" @click="updateData" v-if="!!sku.id">更新</button>
        <button type="button" class="btn btn-primary col-xs-offset-2" @click="addData" v-if="!sku.id">添加</button>
        <button type="button" class="btn btn-primary" @click="closeInput">关闭</button>
      </form>
    </div>
  </div>
</template>

<script>
  import {fetchProduct, listAccount, listSku, listStore, listRoom, listService, addSku, updateSku} from './api'

  export default {
    name: 'product-sku-view',
    data () {
      return {
        product: {},
        accounts: [],
        skus: [],
        store: {},
        stores: [],
        rooms: [],
        services: [],
        currentServiceId: 0,
        currentServiceName: '',
        description: '',
        sku: {},
        create: false,
        input: false
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
        listAccount(this.$route.params.sid, (body) => this.accounts = body.data)
        fetchProduct(this.$route.params.id, (body) => this.product = body.data)
        listSku(this.$route.params.id, (body) => this.skus = body.data)
        listService((body) => {
          this.services = body.data
          this.currentServiceId = this.services[0].id
          this.currentServiceName = this.services[0].name
        })
      },
      toAddData () {
        this.input = true
        this.sku = {services:[]}
      },
      toEditData (item) {
        listRoom(item.storeSeq, (body) => {
          this.rooms = body.data
          this.input = true
          this.sku = item
          this.stores = [{seq: item.storeSeq, name: item.storeName}]
          this.store.item = this.stores[0]
        })
      },
      searchStore (query) {
        listStore(query, (body) => {
          this.stores = body.data.list
          if (this.stores.length > 0) {
            this.store.item = this.stores[0]
            this.searchRoom(this.store.item.seq)
          } else {
            alert('没有搜到门店')
          }
        })
      },
      searchRoom (seq) {
        listRoom(seq, (body) => {
          this.rooms = body.data
          if (this.rooms.length > 0) {
            this.sku.roomId = this.rooms[0].id
          }
        })
      },
      addService() {
        this.sku.services.push({'serviceId': this.currentServiceId, 'serviceName': this.currentServiceName, 'description': this.description})
        this.description = ''
      },
      closeInput () {
        this.input = false
      },
      addData () {
        addSku(this.$route.params.id, this.sku, (body) => {
          this.fetchData()
          this.input = false
        })
      },
      updateData () {
        updateSku(this.$route.params.id, this.sku, (body) => {
          this.fetchData()
          this.input = false
        })
      }
    }
  }

</script>
