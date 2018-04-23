<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3>添加通知</h3>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">标题</label>
            <div class="col-sm-10">
              <input class="form-control" type="text" id="name" v-model="notice.title">
            </div>
          </div>
          <div class="form-group row">
            <label for="introduction" class="col-sm-2 col-form-label">通知内容</label>
            <div class="col-sm-10">
              <textarea rows="3" class="form-control" id="introduction" v-model="notice.content"></textarea>
            </div>
          </div>
          <div class="form-group row">
            <label for="state" class="col-sm-2 col-form-label">消息类型</label>
            <div class="col-sm-10">
              <select id="state" class="form-control" v-model="notice.typeCode">
                <option value="0">全部</option>
                <option value="1">老师</option>
                <option value="2">学生</option>
                <option value="3">运营</option>
                <option value="4">指定</option>
                <option value="5">课程</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label for="publishTime" class="col-sm-2 col-form-label">发布时间</label>
            <div class="col-sm-10">
              <datepicker language="zh" id="publishTime" class="form-control" :format="'yyyy-MM-dd'"></datepicker>
            </div>
          </div>
          <div class="form-group row">
            <label for="expireTime" class="col-sm-2 col-form-label">过期时间</label>
            <div class="col-sm-10">
              <datepicker language="zh" id="expireTime" class="form-control" :format="'yyyy-MM-dd'"></datepicker>
            </div>
          </div>
          <div class="form-group row" v-show="notice.typeCode == 4">
            <label class="col-sm-2 col-form-label">通知人</label>
            <div class="col-sm-10">
              <div class="card">
                <div class="card-body">
                  <form class="form-inline">
                    <div class="form-group row mr-2">
                      <label for="queryName">名称</label>
                      <input type="text" id="queryName" v-model="query.name" class="form-control mx-sm-4">
                    </div>
                    <div class="form-group row">
                      <label for="queryRole">角色</label>
                      <select id="queryRole" v-model="query.typeCode" class="form-control mx-sm-4">
                        <option value="0">全部</option>
                        <option value="1">老师</option>
                        <option value="2">学生</option>
                        <option value="3">运营</option>
                      </select>
                    </div>
                    <button type="button" class="btn btn-primary mr-2" @click="queryUser">查询</button>
                  </form>
                </div>
                <table class="table">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>姓名</th>
                    <th>手机</th>
                    <th>类型</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in list">
                    <td>{{item.id}}</td>
                    <td>
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" :value="item.id" v-model="notice.noticeUsers">{{item.name}}
                        </label>
                      </div>
                    </td>
                    <td>{{item.mobile}}</td>
                    <td>{{item.typeName}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="form-group row" v-show="notice.typeCode == 5">
            <label class="col-sm-2 col-form-label">通知课程</label>
            <div class="col-sm-10">
              <div class="card">
                <div class="card-body">
                  <form class="form-inline">
                    <div class="form-group row mr-2">
                      <label for="queryName">名称</label>
                      <input type="text"　v-model="query.name" class="form-control mx-sm-4">
                    </div>
                    <button type="button" class="btn btn-primary mr-2" @click="queryCourse">查询</button>
                  </form>
                </div>
                <table class="table">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>名称</th>
                    <th>开课时间</th>
                    <th>结束时间</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in list">
                    <td>{{item.id}}</td>
                    <td>
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" :value="item.id" v-model="notice.noticeCourses">{{item.name}}
                        </label>
                      </div>
                    </td>
                    <td>{{item.startDate | dateFormat }}</td>
                    <td>{{item.endDate | dateFormat }}</td>
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
            </div>
          </div>
          <button type="button" class="btn btn-primary" @click="addData">确定</button>
          <router-link class="btn btn-primary" :to="{ name: 'notice'}">返回</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import {addNotice, listUser, listCourse} from './api'

  export default {
    name: 'notice-input-view',
    data() {
      return {
        notice: {typeCode: 0, noticeUsers: [], noticeCourses: []},
        list: [],
        count: 0,
        query: {pageNow: 1, pageSize: 10}
      }
    },
    components: {
      Datepicker
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
      addData() {
        this.notice.publishTime = $('#publishTime').val()
        this.notice.expireTime = $('#expireTime').val()
        addNotice(this.notice, (body) => {
          if (body._data > 0) {
            this.$router.push('/notice/');
          } else {
            alert('添加失败！');
          }
        })
      },
      queryUser() {
        listUser(this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      },
      queryCourse() {
        this.query.stateCode = '';
        listCourse(this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      }
    }
  }

</script>
