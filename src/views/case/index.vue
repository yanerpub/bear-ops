<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only">案例名称</label>
        <input type="text" v-model="query.name" class="form-control" placeholder="Name">
      </div>
      <div class="form-group">
        <label class="sr-only">创建时间</label>
        <datepicker language="zh" id="startDate" class="form-control" :format="'yyyy-MM-dd'"></datepicker>
        <datepicker language="zh" id="endDate" class="form-control" :format="'yyyy-MM-dd'"></datepicker>
      </div>
      <div class="form-group">
        <label class="sr-only">创建者</label>
        <input type="text" v-model="query.creatorName" class="form-control" placeholder="CreatorName">
      </div>
      <div class="form-group">
        <label class="sr-only">状态</label>
        <select id="source" class="form-control" v-model="query.stateCode">
          <option value="">无</option>
          <option value="0">禁用</option>
          <option value="1">正常</option>
        </select>
      </div>
      <button type="button" class="btn btn-secondary" @click="queryData">查询</button>
      <router-link class="btn btn-secondary" role="button" to="/case/input" aria-pressed="true">添加</router-link>
    </form>
    <table class="table">
      <thead>
      <tr>
        <th>序号</th>
        <th>案例名称</th>
        <th>创建时间</th>
        <th>创建人</th>
        <th>状态</th>
        <th>使用次数</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.createTime | dateFormat}}</td>
        <td>{{item.authorName}}</td>
        <td>{{item.stateName}}</td>
        <td>{{item.referCount}}</td>
        <td>
          <button type="button" class="btn btn-primary" @click="lockCase(item)" v-show="item.stateCode == 1">禁用</button>
          <button type="button" class="btn btn-primary" @click="unlockCase(item)" v-show="item.stateCode == 0">激活</button>
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
  import {listCase, updateCase} from './api'

  export default {
    name: 'case-list-view',
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
        listCase(this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      },
      lockCase(ce) {
        if (confirm('确定锁定？')) {
          ce.stateCode = 0
          updateCase(ce, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('更新失败！');
            }
          })
        }
      },
      unlockCase(ce) {
        if (confirm('确定解锁？')) {
          ce.stateCode = 1
          updateCase(ce, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('更新失败！');
            }
          })
        }
      }
    }
  }

</script>
