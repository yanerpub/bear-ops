<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3>课程介绍</h3>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">课程名称</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" :value="course.name">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">课程介绍</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" :value="course.description">
            </div>
          </div>
          <router-link class="btn btn-primary" :to="{ name: 'course'}">返回</router-link>
        </form>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h4>作业列表</h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>序号</th>
            <th>作业名</th>
            <th>有效期始</th>
            <th>有效期止</th>
            <th>作业状态</th>
            <th>案例名称</th>
            <th>数据介绍</th>
            <th>数据下载</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in course.assignments">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.startDate | dateFormat }}</td>
            <td>{{item.endDate | dateFormat }}</td>
            <td>{{item.currentState}}</td>
            <td>{{item.caseName}}</td>
            <td>{{item.caseDescription}}</td>
            <td>{{item.attachment}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h4>学生列表</h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>学号</th>
            <th>学校</th>
            <th>状态</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in course.students">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.number}}</td>
            <td>{{item.lastSchoolName}}</td>
            <td>{{item.stateName}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
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
