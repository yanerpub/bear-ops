<template>
  <div>
    <form>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">SID</label>
        <div class="col-sm-10">
          <p class="form-control-static">{{$route.params.sid}}</p>
        </div>
      </div>
      <div class="form-group row">
        <label for="bank" class="col-xs-2 col-form-label">银行</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="bank" v-model="account.bank">
        </div>
      </div>
      <div class="form-group row">
        <label for="name" class="col-xs-2 col-form-label">户主名</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="name" v-model="account.name">
        </div>
      </div>
      <div class="form-group row">
        <label for="number" class="col-xs-2 col-form-label">账号</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="number" v-model="account.number">
        </div>
      </div>
      <div class="form-group row">
        <label for="currency" class="col-xs-2 col-form-label">币种</label>
        <div class="col-xs-10">
          <select id="currency" class="form-control" v-model="account.currencyCode">
            <option v-for="op in currencyTypes" :value="op.code">{{op.name}}</option>
          </select>
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="updateData" v-show="$route.params.id">更新</button>
      <button type="button" class="btn btn-primary" @click="addData" v-show="!$route.params.id">添加</button>
      <router-link class="btn btn-info" :to="{ name: 'supplierView', params: { sid: $route.params.sid }}">返回</router-link>
    </form>
  </div>
</template>

<script>
import { fetchEnums, fetchAccount, addAccount, updateAccount } from './api'
export default {
  name: 'supplier-account-view',
  data () {
    return {
      currencyTypes: [],
      account: {}
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
      fetchEnums('account', (body) => {
        this.currencyTypes = body.data.currencyTypes
      });
      if (!!this.$route.params.id) {
        fetchAccount(this.$route.params.sid, this.$route.params.id, (body) => {
          if (!!body.data) {
            this.account = body.data
          }
        });
      }
    },
    addData () {
      addAccount(this.$route.params.sid, this.account, (body) => this.$router.push('/supplier/' + this.$route.params.sid))
    },
    updateData () {
      updateAccount(this.$route.params.sid, this.account, (body) => this.$router.push('/supplier/' + this.$route.params.sid))
    }
  }
}
</script>
