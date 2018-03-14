<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only">名称</label>
        <input type="text" v-model="query.name" class="form-control" placeholder="Name">
      </div>
      <button type="button" class="btn btn-secondary" @click="queryData">查询</button>
      <router-link class="btn btn-secondary" role="button" to="/teacher/" aria-pressed="true">返回</router-link>
    </form>
    <table class="table">
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
      queryData() {
        listTeacherStudent(this.$route.params.id, this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      }
    }
  }

</script>
