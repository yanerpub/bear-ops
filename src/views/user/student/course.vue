<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only">课程名称</label>
        <input type="text" v-model="query.name" class="form-control" placeholder="Name">
      </div>
      <div class="form-group">
        <label class="sr-only">授课老师</label>
        <input type="text" v-model="query.teacherName" class="form-control" placeholder="TeacherName">
      </div>
      <div class="form-group">
        <label class="sr-only">课程状态</label>
        <select id="source" class="form-control" v-model="query.stateCode">
          <option value="">无</option>
          <option value="0">未上课</option>
          <option value="1">上课中</option>
          <option value="2">已结课</option>
        </select>
      </div>
      <button type="button" class="btn btn-secondary" @click="queryData">查询</button>
      <router-link class="btn btn-secondary" role="button" to="/teacher/" aria-pressed="true">返回</router-link>
    </form>
    <table class="table">
      <thead>
      <tr>
        <th>序号</th>
        <th>课程名称</th>
        <th>授课老师</th>
        <th>开课时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.teacherName}}</td>
        <td>{{item.startDate | dateFormat }}</td>
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
  import {listStudentCourse} from './api'

  export default {
    name: 'student-course-view',
    data() {
      return {
        query: {pageNow: 1, pageSize: 10, stateCode: ''},
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
        listStudentCourse(this.$route.params.id, this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      }
    }
  }

</script>
