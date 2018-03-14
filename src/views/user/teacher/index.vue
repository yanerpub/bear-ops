<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only">名称</label>
        <input type="text" v-model="query.name" class="form-control" placeholder="Name">
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
      <router-link class="btn btn-secondary" role="button" to="/teacher/input" aria-pressed="true">添加</router-link>
    </form>
    <table class="table">
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
          <button type="button" class="btn btn-primary" @click="lockTeacher(item)" v-show="item.stateCode == 1">禁用</button>
          <button type="button" class="btn btn-primary" @click="unlockTeacher(item)" v-show="item.stateCode == 0">激活</button>
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
  import {listTeacher, updateTeacher} from './api'

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
          // todo
        }
      }
    }
  }

</script>
