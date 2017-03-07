<template>
  <div>
    <form>
      <div class="form-group row">
        <label for="name" class="col-xs-2 col-form-label">Name</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="name" v-model="potential.name">
        </div>
      </div>
      <div class="form-group row">
        <label for="terms" class="col-xs-2 col-form-label">Terms</label>
        <div class="col-xs-10">
          <select id="terms" class="form-control" v-model="potential.terms">
            <option v-for="op in termsTypes" :value="op">{{op}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="cellphone" class="col-xs-2 col-form-label">Cellphone</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="cellphone" v-model="potential.cellphone">
        </div>
      </div>
      <div class="form-group row">
        <label for="telephone" class="col-xs-2 col-form-label">Telephone</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="telephone" v-model="potential.telephone">
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-xs-2 col-form-label">Email</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="email" v-model="potential.email">
        </div>
      </div>
      <div class="form-group row">
        <label for="position" class="col-xs-2 col-form-label">Position</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="position" v-model="potential.position">
        </div>
      </div>
      <div class="form-group row">
        <label for="character" class="col-xs-2 col-form-label">Character</label>
        <div class="col-xs-10">
          <select id="character" class="form-control" v-model="potential.character">
            <option v-for="op in characterTypes" :value="op">{{op}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="company" class="col-xs-2 col-form-label">Company</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="company" v-model="potential.company">
        </div>
      </div>
      <div class="form-group row">
        <label for="industry" class="col-xs-2 col-form-label">Industry</label>
        <div class="col-xs-10">
          <select id="industry" class="form-control" v-model="potential.industryCode">
            <option v-for="op in industryTypes" :value="op.code">{{op.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="staffCount" class="col-xs-2 col-form-label">StaffCount</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="staffCount" v-model="potential.staffCount">
        </div>
      </div>
      <div class="form-group row">
        <label for="source" class="col-xs-2 col-form-label">Source</label>
        <div class="col-xs-10">
          <select id="source" class="form-control" v-model="potential.sourceCode">
            <option v-for="op in sourceTypes" :value="op.code">{{op.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="address" class="col-xs-2 col-form-label">Address</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="address" v-model="potential.address">
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="updateData">更新</button>
      <router-link class="btn btn-info" :to="{ name: 'potentialView', params: { id: this.$route.params.id }}">返回</router-link>
    </form>
  </div>
</template>

<script>
import { fetchPotentialEnums, fetchPotential, updatePotential } from './api'
export default {
  name: 'potential-edit-view',
  data () {
    return {
      termsTypes: [],
      characterTypes: [],
      industryTypes: [],
      sourceTypes: [],
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
      fetchPotentialEnums((body) => {
        this.termsTypes = body.data.termsTypes
        this.characterTypes = body.data.characterTypes
        this.industryTypes = body.data.industryTypes
        this.sourceTypes = body.data.sourceTypes
      });
      fetchPotential(this.$route.params.id, (body) => this.potential = body.data);
    },
    updateData () {
      updatePotential(this.potential, (body) => this.$router.push('/potential/' + this.$route.params.id))
    }
  }
}

</script>
