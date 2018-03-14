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
        <label class="sr-only">开课时间</label>
        <datepicker language="zh" id="startDate" class="form-control" :format="'yyyy-MM-dd'"></datepicker>
        <datepicker language="zh" id="endDate" class="form-control" :format="'yyyy-MM-dd'"></datepicker>
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
    </form>
    <table class="table">
      <thead>
      <tr>
        <th>序号</th>
        <th>课程名称</th>
        <th>授课老师</th>
        <th>开课时间</th>
        <th>课程状态</th>
        <th>作业数</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.teacherName}}</td>
        <td>{{item.startDate | dateFormat}}</td>
        <td>{{item.currentState}}</td>
        <td>{{item.assignmentCount}}</td>
        <td>
          <router-link :to="{ name: 'courseView', params: { id: item.id }}">查看</router-link>
        </td>
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
  import Datepicker from 'vuejs-datepicker'
  import {listCourse} from './api'

  export default {
    name: 'course-list-view',
    data() {
      return {
        query: {pageNow: 1, pageSize: 10, stateCode: ''},
        list: [],
        count: 0
      }
    },
    components: {
      Datepicker
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
        this.query.startDate = $('#startDate').val()
        this.query.endDate = $('#endDate').val()
        listCourse(this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      }
    }
  }

</script>
