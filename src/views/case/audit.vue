<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form>
          <div class="form-row align-items-center">
            <div class="col-auto">
              <label class="sr-only">案例名称</label>
              <input type="text" class="form-control mb-2" v-model="query.name" placeholder="课程名称">
            </div>
            <div class="col-auto">
              <label class="sr-only">时间</label>
              <div class="input-group">
                <datepicker language="zh" id="startDate" class="form-control mb-2" :format="'yyyy-MM-dd'"></datepicker>
                <datepicker language="zh" id="endDate" class="form-control mb-2" :format="'yyyy-MM-dd'"></datepicker>
              </div>
            </div>
            <div class="col-auto">
              <label class="sr-only">创建者</label>
              <input type="text" class="form-control mb-2" v-model="query.creatorName" placeholder="创建者">
            </div>
            <div class="col-auto">
              <label class="sr-only">状态</label>
              <select class="form-control mb-2" v-model="query.stateCode">
                <option value="">无</option>
                <option value="0">禁用</option>
                <option value="1">正常</option>
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
        <th>案例名称</th>
        <th>申请老师</th>
        <th>是否为新案例</th>
        <th>案例状态</th>
        <th>案列详情</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.creatorName}}</td>
        <td>是todo</td>
        <td>{{item.applyStateName}}</td>
        <td>
          <router-link :to="{ name: 'caseView', params: { id: item.id }}">查看</router-link>
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
  import Datepicker from 'vuejs-datepicker'
  import {listCase, updateCase} from './api'

  export default {
    name: 'case-list-view',
    data() {
      return {
        query: {pageNow: 1, pageSize: 10, stateCode: '', audit: 1},
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
        listCase(this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      }
    }
  }

</script>
