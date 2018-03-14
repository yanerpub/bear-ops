<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only">名称</label>
        <input type="text" v-model="query.name" class="form-control" placeholder="Name">
      </div>
      <div class="form-group">
        <label class="sr-only">学号</label>
        <input type="text" v-model="query.number" class="form-control" placeholder="Number">
      </div>
      <div class="form-group">
        <label class="sr-only">手机</label>
        <input type="text" v-model="query.mobile" class="form-control" placeholder="Mobile">
      </div>
      <div class="form-group">
        <label class="sr-only">账号状态</label>
        <select id="source" class="form-control" v-model="query.stateCode">
          <option value="">无</option>
          <option value="0">冻结</option>
          <option value="1">正常</option>
        </select>
      </div>
      <button type="button" class="btn btn-secondary" @click="queryData">查询</button>
    </form>
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
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.number}}</td>
        <td>{{item.mobile}}</td>
        <td>
          <router-link :to="{ name: 'studentCourse', params: { id: item.id }}" v-show="item.courseCount > 0">
            {{item.courseCount}}
          </router-link>
          <span v-show="item.courseCount <= 0">0</span>
        </td>
        <td>{{item.averageScore}}</td>
        <td>{{item.stateName}}</td>
        <td>
          <button type="button" class="btn btn-primary" @click="lockStudent(item)" v-show="item.stateCode == 1">禁用</button>
          <button type="button" class="btn btn-primary" @click="unlockStudent(item)" v-show="item.stateCode == 0">激活</button>
          <button type="button" class="btn btn-secondary" @click="resetPassword(item.id)">重置密码</button>
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
  import {listStudent, updateStudent} from './api'

  export default {
    name: 'student-list-view',
    data() {
      return {
        query: {pageNow: 1, pageSize: 10, stateCode: ''},
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
      queryData () {
        listStudent(this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      },
      lockStudent(student) {
        if (confirm('确定锁定？')) {
          student.stateCode = 0
          updateStudent(student, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('更新失败！');
            }
          })
        }
      },
      unlockStudent(student) {
        if (confirm('确定解锁？')) {
          student.stateCode = 1
          updateStudent(student, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('更新失败！');
            }
          })
        }
      },
      resetPassword(userId) {
        if (confirm('确定重置密码？')) {
          // todo
        }
      }
    }
  }

</script>
