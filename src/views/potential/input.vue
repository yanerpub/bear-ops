<template>
  <div>
    <form>
      <div class="form-group row">
        <label for="name" class="col-xs-2 col-form-label">名称</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="name" v-model="potential.name">
        </div>
      </div>
      <div class="form-group row">
        <label for="terms" class="col-xs-2 col-form-label">称谓</label>
        <div class="col-xs-10">
          <select id="terms" class="form-control" v-model="potential.terms">
            <option v-for="op in termsTypes" :value="op">{{op}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="cellphone" class="col-xs-2 col-form-label">手机</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="cellphone" v-model="potential.cellphone">
        </div>
      </div>
      <div class="form-group row">
        <label for="telephone" class="col-xs-2 col-form-label">座机</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="telephone" v-model="potential.telephone">
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-xs-2 col-form-label">邮箱</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="email" v-model="potential.email">
        </div>
      </div>
      <div class="form-group row">
        <label for="position" class="col-xs-2 col-form-label">职位</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="position" v-model="potential.position">
        </div>
      </div>
      <div class="form-group row">
        <label for="character" class="col-xs-2 col-form-label">品性</label>
        <div class="col-xs-10">
          <select id="character" class="form-control" v-model="potential.character">
            <option v-for="op in characterTypes" :value="op">{{op}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="company" class="col-xs-2 col-form-label">公司</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="company" v-model="potential.company">
        </div>
      </div>
      <div class="form-group row">
        <label for="industry" class="col-xs-2 col-form-label">行业</label>
        <div class="col-xs-10">
          <select id="industry" class="form-control" v-model="potential.industryCode">
            <option v-for="op in industryTypes" :value="op.code">{{op.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="staffCount" class="col-xs-2 col-form-label">员工数</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="staffCount" v-model="potential.staffCount">
        </div>
      </div>
      <div class="form-group row">
        <label for="source" class="col-xs-2 col-form-label">来源</label>
        <div class="col-xs-10">
          <select id="source" class="form-control" v-model="potential.sourceCode">
            <option v-for="op in potentialSources" :value="op.code">{{op.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="address" class="col-xs-2 col-form-label">地址</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="address" v-model="potential.address">
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="updateData" v-if="!!$route.params.id">更新</button>
      <router-link class="btn btn-info" :to="{ name: 'potentialView', params: { id: this.$route.params.id }}" v-if="!!$route.params.id">返回</router-link>
      <button type="button" class="btn btn-primary" @click="addData" v-if="!$route.params.id">添加</button>
      <router-link class="btn btn-info" :to="{ name: 'potentialIndex'}" v-if="!$route.params.id">返回</router-link>
    </form>
  </div>
</template>

<script>
import { fetchEnums, addPotential, fetchPotential, updatePotential } from './api'
export default {
  name: 'potential-input-view',
  data () {
    return {
      termsTypes: [],
      characterTypes: [],
      industryTypes: [],
      potentialSources: [],
      potential: {}
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
      fetchEnums('potential', (body) => {
        this.termsTypes = body.data.termsTypes
        this.characterTypes = body.data.characterTypes
        this.industryTypes = body.data.industryTypes
        this.potentialSources = body.data.potentialSources
      });
      if (!!this.$route.params.id) {
        fetchPotential(this.$route.params.id, (body) => this.potential = body.data)
      } else {
        this.potential = {}
      }
    },
    addData () {
      addPotential(this.potential, (body) => this.$router.push('/potential/' + body.data))
    },
    updateData () {
      updatePotential(this.potential, (body) => this.$router.push('/potential/' + this.$route.params.id))
    }
  }
}

</script>
