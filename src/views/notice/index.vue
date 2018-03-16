<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form class="form-inline">
          <div class="form-group row mr-2">
            <label for="queryName">关键字</label>
            <input type="text" id="queryName" v-model="query.keyword" class="form-control mx-sm-4">
          </div>
          <button type="button" class="btn btn-primary mr-2" @click="queryData">查询</button>
          <router-link class="btn btn-primary" role="button" to="/notice/input" aria-pressed="true">添加</router-link>
        </form>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>序号</th>
        <th>标题</th>
        <th>通知时间</th>
        <th>过期时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.title}}</td>
        <td>{{item.publishTime | dateFormat }}</td>
        <td>{{item.expireTime | dateFormat }}</td>
        <td>
          <router-link :to="{ name: 'noticeView', params: { id: item.id }}">查看</router-link>
          <button type="button" class="btn btn-link" @click="deleteNotice(item.id)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <nav>
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item active"><a class="page-link" href="#">{{query.pageNow}}</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
        <li class="page-item">
          <span class="page-link">共{{totalPage}}页</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import {listNotice, deleteNotice} from './api'

  export default {
    name: 'notice-list-view',
    data() {
      return {
        query: {pageNow: 1, pageSize: 10, stateCode: ''},
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
        listNotice(this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      },
      deleteNotice(id) {
        if (confirm('确定删除？')) {
          deleteNotice(id, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('删除失败！');
            }
          })
        }
      }
    }
  }

</script>
