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
            <label for="queryRole">状态</label>
            <select id="queryRole" v-model="query.stateCode" class="form-control mx-sm-4">
              <option value="">无</option>
              <option value="0">已拒绝</option>
              <option value="1">申请中</option>
              <option value="2">已通过</option>
            </select>
          </div>
          <button type="button" class="btn btn-primary" @click="queryData">查询</button>
        </form>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>ID</th>
        <th>名称</th>
        <th>手机</th>
        <th>学校</th>
        <th>申请时间</th>
        <th>个人简历</th>
        <th>状态</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.mobile}}</td>
        <td>{{item.schoolName}}</td>
        <td>{{item.createTime | timeAgo}}</td>
        <td>个人简历todo</td>
        <td>
          <span v-show="item.stateCode != 1">{{item.stateName}}</span>
          <button type="button" class="btn btn-link" @click="toApproveApply(item)" v-show="item.stateCode == 1">同意</button>
          <button type="button" class="btn btn-link" @click="rejectApply(item)" v-show="item.stateCode == 1">拒绝</button>
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

    <div class="modal fade" id="applyModal" tabindex="-1" role="dialog" aria-labelledby="applyModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="applyModalLabel">添加账户</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label">手机</label>
                <div class="col-sm-10">
                  <input class="form-control" type="text" id="name" v-model="apply.mobile" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="mobile" class="col-sm-2 col-form-label">密码</label>
                <div class="col-sm-10">
                  <input class="form-control" type="text" id="mobile" v-model="apply.password" required>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="approveApply(apply)">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {handleApply, listApply} from './api'

  export default {
    name: 'teacher-apply',
    data() {
      return {
        query: {stateCode: '', pageNow: 1, pageSize: 10},
        list: [],
        count: 0,
        apply: {}
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
        listApply(this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      },
      toApproveApply(item) {
        this.create = false
        this.apply = item
        $('#applyModal').modal('show')
      },
      approveApply(apply) {
        if (confirm('确定同意？')) {
          apply.op = 1
          handleApply(apply, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('更新失败！');
            }
            $('#applyModal').modal('hide')
          })
        }
      },
      rejectApply(apply) {
        if (confirm('确定拒绝？')) {
          apply.op = 0
          handleApply(apply, (body) => {
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
