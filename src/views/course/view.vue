<template>
  <div class="container">
    <h3>课程介绍</h3>
    <form class="form-horizontal">
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">ID</label>
        <div class="col-sm-10">
          <p class="form-control-static">{{course.id}}</p>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">名称</label>
        <div class="col-sm-10">
          <p class="form-control-static">{{course.name}}</p>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">称谓</label>
        <div class="col-sm-10">
          <p class="form-control-static">{{course.description}}</p>
        </div>
      </div>
    </form>
    <hr>
    <h4>作业列表</h4>
    <table class="table">
      <thead>
      <tr>
        <th>序号</th>
        <th>姓名</th>
        <th>学号</th>
        <th>电话号码</th>
        <th>课程数</th>
        <th>平均分</th>
        <th>账号状态</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in course.assignments">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.number}}</td>
        <td>{{item.mobile}}</td>
        <td>{{item.courseCount}}</td>
        <td>{{item.averageScore}}</td>
        <td>{{item.stateName}}</td>
      </tr>
      </tbody>
    </table>
    <hr>
    <h4>学生列表</h4>
    <table class="table">
      <thead>
      <tr>
        <th>序号</th>
        <th>姓名</th>
        <th>学号</th>
        <th>电话号码</th>
        <th>课程数</th>
        <th>平均分</th>
        <th>账号状态</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in course.students">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.number}}</td>
        <td>{{item.mobile}}</td>
        <td>{{item.courseCount}}</td>
        <td>{{item.averageScore}}</td>
        <td>{{item.stateName}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {fetchCourse} from './api'

  export default {
    name: 'course-view',
    data() {
      return {
        course: {}
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
        fetchCourse(this.$route.params.id, (body) => {
          this.course = body._data
        });
      }
    }
  }

</script>
