<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only" for="sid">SID</label>
        <input type="text" v-model="query.sid" class="form-control" id="sid" placeholder="SID">
      </div>
      <div class="form-group">
        <label class="sr-only" for="name">Name</label>
        <input type="text" v-model="query.name" class="form-control" id="name" placeholder="Name">
      </div>
      <button type="button" class="btn btn-secondary" @click="queryData">查询</button>
      <router-link class="btn btn-secondary" role="button" to="/supplier/add" aria-pressed="true">添加</router-link>
    </form>
    <table class="table">
      <thead>
      <tr>
        <th>SID</th>
        <th>name</th>
        <th>local</th>
        <th>userId</th>
        <th>city</th>
        <th>source</th>
        <th>createTime</th>
        <th>modifyTime</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in supplierList">
        <td>
          <router-link :to="{path: item.sid}">{{item.sid}}</router-link>
        </td>
        <td>{{item.name}}</td>
        <td>{{item.local}}</td>
        <td>{{item.userId}}</td>
        <td>{{item.city}}</td>
        <td>{{item.sourceText}}</td>
        <td>{{item.createTime | timeAgo}}</td>
        <td>{{item.modifyTime | timeAgo}}</td>
        <td>
          <router-link :to="{path: item.sid + '/edit'}">修改</router-link>
        </td>
      </tr>
      </tbody>
    </table>
    {{totalPage}}
  </div>
</template>

<script>
import {listSupplier} from './api'

export default {
  name: 'supplier-list-view',
  data() {
    return {
        query: {pageNow: 1, pageSize: 10, sortKey: ''},
        list: [],
        count: 0
    }
  },
  created () {
    this.queryData()
  },
  computed: {
    supplierList () {
      return this.list
    },
    totalPage () {
        return parseInt(this.count / this.query.pageSize) + 1
    }
  },
  methods: {
    queryData () {
      listSupplier(this.query, (body) => {
        this.list = body.data.list
        this.count = body.data.total
      });
    }
  }
}

</script>
