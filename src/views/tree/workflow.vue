<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only" for="name">Name</label>
        <input type="text" v-model="query.name" class="form-control" id="name" placeholder="Name">
      </div>
      <button type="button" class="btn btn-secondary" @click="queryData">查询</button>
      <a href="/modeler.html"  class="btn btn-default" target="_blank">添加流程</a>
    </form>
    <table class="table">
      <thead>
      <tr>
        <th>名称</th>
        <th>版本</th>
        <th>创建时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td><a :href="'/viewer.html?id=' + item.id" target="_blank">{{item.name}}</a></td>
        <td>{{item.version}}</td>
        <td>{{item.createTime | timeAgo}}</td>
        <td>
          <a :href="'/modeler.html?id=' + item.id" target="_blank">修改</a>
        </td>
      </tr>
      </tbody>
    </table>
    {{totalPage}}
  </div>
</template>

<script>
  import {listWorkflow} from './api'

  export default {
    name: 'workflow-view',
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
        listWorkflow(this.query, (body) => {
          this.list = body.data.list
          this.count = body.data.total
        });
      }
    }
  }

</script>
