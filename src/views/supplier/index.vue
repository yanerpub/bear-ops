<template>
  <div>
    <input v-model="query.sid"/>
    <input v-model="query.name"/>
    <button v-on:click="queryData">查询</button>
    <router-link to="/supplier/add">添加</router-link>
    <table>
      <tr v-for="item in list">
        <td><router-link :to="{path: item.sid}">{{item.id}}</router-link></td>
        <td>{{item.sid}}</td>
        <td>{{item.psid}}</td>
        <td>{{item.qualificationId}}</td>
        <td>{{item.name}}</td>
        <td>{{item.local}}</td>
        <td>{{item.userId}}</td>
        <td>{{item.createUid}}</td>
        <td>{{item.createTime | timeAgo}}</td>
        <td>{{item.modifyTime | timeAgo}}</td>
        <td><router-link :to="{path: item.sid + '/edit'}">修改</router-link></td>
      </tr>
    </table>
  </div>
</template>

<script>
import {listSupplier} from './api'

export default {
  name: 'supplier-list-view',
  data() {
    return {
        query: {}
    }
  },
  computed: {
    list: function() {
      return this.$store.state.list
    }
  },
  methods: {
    queryData () {
      listSupplier(this.query, (body) => this.$store.commit("set", body.data.list));
    }
  }
}
</script>
