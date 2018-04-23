<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form>
          <div class="form-row align-items-center">
            <div class="col-auto">
              <label class="sr-only">课程名称</label>
              <input type="text" class="form-control mb-2" v-model="query.name" placeholder="课程名称">
            </div>
            <div class="col-auto">
              <label class="sr-only">授课老师</label>
              <input type="text" class="form-control mb-2" v-model="query.teacherName" placeholder="授课老师">
            </div>
            <div class="col-auto">
              <label class="sr-only">开始</label>
              <div class="input-group">
                <datepicker language="zh" id="startDate" class="form-control mb-2" :format="'yyyy-MM-dd'"></datepicker>
                <datepicker language="zh" id="endDate" class="form-control mb-2" :format="'yyyy-MM-dd'"></datepicker>
              </div>
            </div>
            <div class="col-auto">
              <label class="sr-only">授课老师</label>
              <select class="form-control mb-2" v-model="query.stateCode">
                <option value="">无</option>
                <option value="0">未上课</option>
                <option value="1">上课中</option>
                <option value="2">已结课</option>
              </select>
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-primary" @click="queryData">查询</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <table class="table table-bordered">
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
