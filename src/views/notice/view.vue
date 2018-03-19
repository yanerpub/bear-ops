<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3>通知详情</h3>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">标题</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" :value="notice.title">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">内容</label>
            <div class="col-sm-10">
              <textarea rows="3" readonly class="form-control" v-model="notice.content"></textarea>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">发布时间</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" :value="notice.publishTime | dateFormat">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">过期时间</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" :value="notice.expireTime | dateFormat">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">通知类型</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" :value="notice.typeName">
            </div>
          </div>
          <router-link class="btn btn-primary" :to="{ name: 'notice'}">返回</router-link>
        </form>
      </div>
    </div>
    <div class="card" v-show="notice.typeCode == 4">
      <div class="card-header">
        <h4>通知列表</h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>手机</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in list">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.stateName}}</td>
            <td>todo</td>
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
    </div>
  </div>
</template>

<script>
  import {fetchNotice, fetchNoticeUser} from './api'

  export default {
    name: 'course-view',
    data() {
      return {
        notice: {},
        query: {pageNow: 1, pageSize: 10},
        list: [],
        count: 0
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
        fetchNotice(this.$route.params.id, (body) => {
          this.notice = body._data
        });
        fetchNoticeUser(this.$route.params.id, this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      },
      queryUser() {
        fetchNoticeUser(this.$route.params.id, this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      }
    }
  }

</script>
