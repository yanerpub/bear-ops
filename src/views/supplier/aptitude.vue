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
        <label for="type" class="col-xs-2 col-form-label">type</label>
        <div class="col-xs-10">
          <select id="type" class="form-control" v-model="aptitude.typeCode">
            <option v-for="op in aptitudeTypes" :value="op.code">{{op.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="number" class="col-xs-2 col-form-label">number</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="number" v-model="aptitude.number">
        </div>
      </div>
      <div class="form-group row">
        <label for="expireType" class="col-xs-2 col-form-label">expireType</label>
        <div class="col-xs-10">
          <select id="expireType" class="form-control" v-model="aptitude.expireTypeCode">
            <option v-for="op in expireTypes" :value="op.code">{{op.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row" v-show="hasExpireDate">
        <label for="expireDate" class="col-xs-2 col-form-label">expireDate</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="expireDate" v-model="aptitude.expireDateText">
        </div>
      </div>
      <div class="form-group row">
        <label for="attachment" class="col-xs-2 col-form-label">attachment</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="attachment" v-model="aptitude.attachment">
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="updateData" v-show="$route.params.id">更新</button>
      <button type="button" class="btn btn-primary" @click="addData" v-show="!$route.params.id">添加</button>
      <router-link class="btn btn-info" :to="{ name: 'supplierView', params: { sid: $route.params.sid }}">返回</router-link>
    </form>
  </div>
</template>

<script>

import { fetchEnums, fetchAptitude, addAptitude, updateAptitude } from './api'

export default {
  name: 'supplier-aptitude-view',
  data () {
    return {
      aptitudeTypes:[],
      expireTypes: [],
      aptitude: {}
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    hasExpireDate () {
      return this.aptitude.expireTypeCode == '2'
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      fetchEnums('aptitude', (body) => {
        this.aptitudeTypes = body.data.aptitudeTypes
        this.expireTypes = body.data.expireTypes
      });
      if (!!this.$route.params.id) {
        fetchAptitude(this.$route.params.sid, this.$route.params.id, (body) => {
          if (!!body.data) {
            this.aptitude = body.data
          }
        });
      } else {
        this.aptitude = {typeCode: 1, expireTypeCode: 1}
      }
    },
    addData () {
      addAptitude(this.$route.params.sid, this.aptitude, (body) => this.$router.push('/supplier/' + this.$route.params.sid))
    },
    updateData () {
      updateAptitude(this.$route.params.sid, this.aptitude, (body) => this.$router.push('/supplier/' + this.$route.params.sid))
    }
  }
}

</script>
