<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form class="form-inline">
          <div class="form-group row mr-2">
            <label for="queryName">名称</label>
            <input type="text" id="queryName" v-model="query.name" class="form-control mx-sm-4">
          </div>
          <div class="form-group row mr-2">
            <label for="queryMobile">手机</label>
            <input type="text" id="queryMobile" v-model="query.mobile" class="form-control mx-sm-4">
          </div>
          <div class="form-group row">
            <label for="queryRole">账号状态</label>
            <select id="queryRole" v-model="query.stateCode" class="form-control mx-sm-4">
              <option value="">无</option>
              <option value="0">冻结</option>
              <option value="1">正常</option>
            </select>
          </div>
          <button type="button" class="btn btn-primary mr-2" @click="queryData">查询</button>
          <router-link class="btn btn-primary" role="button" to="/teacher/input" aria-pressed="true">添加</router-link>
        </form>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>序号</th>
        <th>名称</th>
        <th>手机</th>
        <th>开课数</th>
        <th>学生数</th>
        <th>账号状态</th>
        <th>个人信息</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.mobile}}</td>
        <td>
          <router-link :to="{ name: 'teacherCourse', params: { id: item.id }}" v-show="item.courseCount > 0">
            {{item.courseCount}}
          </router-link>
          <span v-show="item.courseCount <= 0">0</span>
        </td>
        <td>
          <router-link :to="{ name: 'teacherStudent', params: { id: item.id }}" v-show="item.studentCount > 0">
            {{item.studentCount}}
          </router-link>
          <span v-show="item.studentCount <= 0">0</span>
        </td>
        <td>{{item.stateName}}</td>
        <td>查看个人简历todo</td>
        <td>
          <button type="button" class="btn btn-link" @click="lockTeacher(item)" v-show="item.stateCode == 1">禁用</button>
          <button type="button" class="btn btn-link" @click="unlockTeacher(item)" v-show="item.stateCode == 0">激活</button>
          <button type="button" class="btn btn-link" @click="resetPassword(item.id)">重置密码</button>
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
  import {listTeacher, updateTeacher, resetPassword} from './api'

  export default {
    name: 'teacher-list-view',
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
        listTeacher(this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      },
      lockTeacher(teacher) {
        if (confirm('确定锁定？')) {
          teacher.stateCode = 0
          updateTeacher(teacher, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('更新失败！');
            }
          })
        }
      },
      unlockTeacher(teacher) {
        if (confirm('确定解锁？')) {
          teacher.stateCode = 1
          updateTeacher(teacher, (body) => {
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
          resetPassword({id: userId, password: '123456'}, (body) => {
            if (body._data > 0) {
              alert('更新成功！');
            } else {
              alert('更新失败！');
            }
          })
        }
      }
    }
  }

</script>
