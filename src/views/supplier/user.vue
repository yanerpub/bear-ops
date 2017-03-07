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
          <select id="type" class="form-control" v-model="user.typeCode">
            <option v-for="op in userTypes" :value="op.code">{{op.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="value" class="col-xs-2 col-form-label">value</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="value" v-model="user.value">
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="updateData" v-show="$route.params.id">更新</button>
      <button type="button" class="btn btn-primary" @click="addData" v-show="!$route.params.id">添加</button>
      <router-link class="btn btn-info" :to="{ name: 'supplierView', params: { sid: $route.params.sid }}">返回</router-link>
    </form>
  </div>
</template>

<script>
import { fetchEnums, fetchUser, addUser, updateUser } from './api'
export default {
  name: 'supplier-user-view',
  data () {
    return {
      userTypes:[],
      user: {}
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
      fetchEnums('user', (body) => {
        this.userTypes = body.data.userTypes
      });
      if (!!this.$route.params.id) {
        fetchUser(this.$route.params.sid, this.$route.params.id, (body) => {
          if (!!body.data) {
            this.user = body.data
          }
        });
      } else {
        this.user = {typeCode: 1}
      }
    },
    addData () {
      addUser(this.$route.params.sid, this.user, (body) => this.$router.push('/supplier/' + this.$route.params.sid))
    },
    updateData () {
      updateUser(this.$route.params.sid, this.user, (body) => this.$router.push('/supplier/' + this.$route.params.sid))
    }
  }
}

</script>
