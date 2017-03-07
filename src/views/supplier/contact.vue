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
        <label for="name" class="col-xs-2 col-form-label">Name</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="name" v-model="contact.name">
        </div>
      </div>
      <div class="form-group row">
        <label for="terms" class="col-xs-2 col-form-label">Terms</label>
        <div class="col-xs-10">
          <select id="terms" class="form-control" v-model="contact.terms">
            <option v-for="op in termsTypes" :value="op">{{op}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="cellphone" class="col-xs-2 col-form-label">Cellphone</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="cellphone" v-model="contact.cellphone">
        </div>
      </div>
      <div class="form-group row">
        <label for="telephone" class="col-xs-2 col-form-label">Telephone</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="telephone" v-model="contact.telephone">
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-xs-2 col-form-label">Email</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="email" v-model="contact.email">
        </div>
      </div>
      <div class="form-group row">
        <label for="position" class="col-xs-2 col-form-label">Position</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="position" v-model="contact.position">
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="updateData" v-show="$route.params.id">更新</button>
      <button type="button" class="btn btn-primary" @click="addData" v-show="!$route.params.id">添加</button>
      <router-link class="btn btn-info" :to="{ name: 'supplierView', params: { sid: $route.params.sid }}">返回</router-link>
    </form>
  </div>
</template>

<script>
import { fetchEnums, fetchContact, addContact, updateContact } from './api'
export default {
  name: 'supplier-contact-view',
  data () {
    return {
      termsTypes: [],
      contact: {}
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
      fetchEnums('contact', (body) => {
        this.termsTypes = body.data.termsTypes
      });
      if (!!this.$route.params.id) {
        fetchContact(this.$route.params.sid, this.$route.params.id, (body) => {
          if (!!body.data) {
            this.contact = body.data
          }
        });
      }
    },
    addData () {
      addContact(this.$route.params.sid, this.contact, (body) => this.$router.push('/supplier/' + this.$route.params.sid))
    },
    updateData () {
      updateContact(this.$route.params.sid, this.contact, (body) => this.$router.push('/supplier/' + this.$route.params.sid))
    }
  }
}
</script>
