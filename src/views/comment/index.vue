<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form class="form-inline">
          <div class="form-group row mr-2">
            <label for="queryName">课程名</label>
            <input type="text" id="queryName" v-model="query.courseName" class="form-control mx-sm-4">
          </div>
          <button type="button" class="btn btn-primary mr-2" @click="queryData">查询</button>
        </form>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>序号</th>
        <th>课程名称</th>
        <th>授课老师</th>
        <th>讨论条数</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.courseId}}</td>
        <td>{{item.courseName}}</td>
        <td>{{item.teacherName }}</td>
        <td>{{item.commentCount }}</td>
        <td>
          <router-link :to="{ name: 'commentView', params: { id: item.courseId }}">查看</router-link>
        </td>
      </tr>
      </tbody>
    </table>
    <nav>
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" @click="prevPage()" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item active"><a class="page-link" href="#">{{query.pageNow}}</a></li>
        <li class="page-item">
          <a class="page-link" @click="nextPage()" aria-label="Next">
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
  import {listCommentStat} from './api'

  export default {
    name: 'comment-stat-view',
    data() {
      return {
        query: {pageNow: 1, pageSize: 10},
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
      prevPage () {
        if (this.query.pageNow > 1) {
          this.query.pageNow = this.query.pageNow - 1;
          this.queryData();
        }
      },
      nextPage () {
        if (this.query.pageNow < this.totalPage) {
          this.query.pageNow = this.query.pageNow + 1;
          this.queryData();
        }
      },
      queryData () {
        listCommentStat(this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      }
    }
  }

</script>
