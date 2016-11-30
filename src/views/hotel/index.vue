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
    </form>
    <table class="table">
      <thead>
      <tr>
        <th>id</th>
        <th>sid</th>
        <th>treeId</th>
        <th>name</th>
        <th>state</th>
        <th>userId</th>
        <th>effectDate</th>
        <th>expireDate</th>
        <th>createTime</th>
        <th>modifyTime</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in productList">
        <td>
          <router-link :to="{ name: 'hotelProduct', params: { sid: item.sid, id: item.id }}">{{item.id}}</router-link>
        </td>
        <td>{{item.sid}}</td>
        <td>{{item.treeId}}</td>
        <td>{{item.name}}</td>
        <td>{{item.stateText}}</td>
        <td>{{item.userId}}</td>
        <td>{{item.effectDateFmt}}</td>
        <td>{{item.expireDateFmt}}</td>
        <td>{{item.createTime | timeAgo}}</td>
        <td>{{item.modifyTime | timeAgo}}</td>
        <td>
          <router-link :to="{ name: 'hotelProductEdit', params: { sid: item.sid, id: item.id }}">修改</router-link>
        </td>
      </tr>
      </tbody>
    </table>
    {{totalPage}}
  </div>
</template>

<script>
import {listProduct} from './api'

export default {
  name: 'hotel-product-list-view',
  data() {
    return {
        query: {pageNow: 1, pageSize: 10, sortKey: ''},
        list: [],
        count: 0
    }
  },
  computed: {
    productList () {
      return this.list
    },
    totalPage () {
        return parseInt(this.count / this.query.pageSize) + 1
    }
  },
  methods: {
    queryData () {
      listProduct(this.query, (body) => {
        this.list = body.data.list
        this.count = body.data.total
      })
    }
  }
}

</script>
