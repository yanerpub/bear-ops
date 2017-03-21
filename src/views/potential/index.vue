<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only" for="owner">负责人</label>
        <input type="text" v-model="query.owner" class="form-control" id="owner" placeholder="owner">
      </div>
      <div class="form-group">
        <label class="sr-only" for="name">名称</label>
        <input type="text" v-model="query.name" class="form-control" id="name" placeholder="Name">
      </div>
      <button type="button" class="btn btn-secondary" @click="queryData">查询</button>
      <router-link class="btn btn-secondary" role="button" to="/potential/add" aria-pressed="true">添加</router-link>
    </form>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
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
      <tr v-for="item in potentialList">
        <td>
          <router-link :to="{ name: 'potentialView', params: { id: item.id }}">{{item.id}}</router-link>
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
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li>
          <a href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="active"><a href="#">{{query.pageNow}}<span class="sr-only">(current)</span></a></li>
        <li>
          <a href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
        <li>
          <span>共{{totalPage}}页</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {listPotential} from './api'

export default {
  name: 'potential-list-view',
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
    potentialList () {
      return this.list
    },
    totalPage () {
        return parseInt(this.count / this.query.pageSize) + 1
    }
  },
  methods: {
    queryData () {
      listPotential(this.query, (body) => {
        this.list = body.data.list
        this.count = body.data.total
      });
    }
  }
}

</script>
