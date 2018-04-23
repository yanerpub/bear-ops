<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form class="form-inline">
          <router-link class="btn btn-primary" role="button" to="/teacher/" aria-pressed="true">返回</router-link>
        </form>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>序号</th>
        <th>课程名称</th>
        <th>姓名</th>
        <th>学号</th>
        <th>学校</th>
        <th>专业</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.courseName}}</td>
        <td>{{item.name}}</td>
        <td>{{item.number}}</td>
        <td>{{item.lastSchoolName}}</td>
        <td>{{item.lastMajorName}}</td>
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
  import {listTeacherStudent} from './api'

  export default {
    name: 'teacher-student-view',
    data() {
      return {
        query: {pageNow: 1, pageSize: 10},
        list: [],
        count: 0
      }
    },
    created() {
      this.queryData()
    },
    computed: {
      totalPage() {
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
      queryData() {
        listTeacherStudent(this.$route.params.id, this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      }
    }
  }

</script>
