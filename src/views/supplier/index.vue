<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only" for="sid">SID</label>
        <input type="text" v-model="query.sid" class="form-control" id="sid" placeholder="SID">
      </div>
      <div class="form-group">
        <label class="sr-only" for="name">名称</label>
        <input type="text" v-model="query.name" class="form-control" id="name" placeholder="Name">
      </div>
      <button type="button" class="btn btn-secondary" @click="queryData">查询</button>
      <router-link class="btn btn-secondary" role="button" to="/supplier/add" aria-pressed="true">添加</router-link>
    </form>
    <table class="table">
      <thead>
      <tr>
        <th>SID</th>
        <th>名称</th>
        <th>手机</th>
        <th>座机</th>
        <th>邮箱</th>
        <th>负责人</th>
        <th>创建时间</th>
        <th>修改时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>
          <router-link :to="{ name: 'supplierView', params: { sid: item.sid }}">{{item.sid}}</router-link>
        </td>
        <td>{{item.name}}</td>
        <td>{{item.cellphone}}</td>
        <td>{{item.telephone}}</td>
        <td>{{item.email}}</td>
        <td>{{item.owner}}</td>
        <td>{{item.createTime | timeAgo}}</td>
        <td>{{item.modifyTime | timeAgo}}</td>
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
