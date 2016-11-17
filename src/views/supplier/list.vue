<template>
  <div>
    <input v-model="query.sid"/>
    <input v-model="query.name"/>
    <button @click="queryData">query</button>
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
    queryData: function () {
      var params = this.query;
      this.$http.get('/supplier/', {params: params}).then(function ({body}) {
        this.$store.commit("set", body.data.list);
      });
    }
  }
}
</script>
