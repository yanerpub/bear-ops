<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form class="form-inline">
          <div class="form-group row">
            <label for="queryName">名称</label>
            <input type="text" id="queryName" v-model="query.name" class="form-control mx-sm-4">
          </div>
          <button type="button" class="btn btn-primary mr-2" @click="queryData">查询</button>
          <router-link class="btn btn-primary" role="button" to="/teacher/" aria-pressed="true">返回</router-link>
        </form>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>序号</th>
        <th>课程名称</th>
        <th>开课时间</th>
        <th>作业数量</th>
        <th>学生数量</th>
        <th>课程状态</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.startDate | dateFormat }}</td>
        <td>{{item.assignmentCount}}</td>
        <td>{{item.studentCount}}</td>
        <td>{{item.currentState}}</td>
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
  import {listTeacherCourse} from './api'

  export default {
    name: 'teacher-course-view',
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
        listTeacherCourse(this.$route.params.id, this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      }
    }
  }

</script>
