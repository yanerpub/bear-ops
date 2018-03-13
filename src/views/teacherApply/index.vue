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
        <label class="sr-only">角色</label>
        <select id="source" class="form-control" v-model="query.stateCode">
          <option value="">无</option>
          <option value="0">已拒绝</option>
          <option value="1">申请中</option>
          <option value="2">已通过</option>
        </select>
      </div>
      <button type="button" class="btn btn-secondary" @click="queryData">查询</button>
    </form>
    <table class="table">
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
        <td>todo</td>
        <td>
          <span v-show="item.stateCode == 2">{{item.stateName}}</span>
          <button type="button" class="btn btn-primary" @click="toApproveApply(item)" v-show="item.stateCode == 1">同意</button>
          <button type="button" class="btn btn-primary" @click="rejectApply(item)" v-show="item.stateCode == 1">拒绝</button>
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

    <div class="modal fade" id="applyModal" tabindex="-1" role="dialog" aria-labelledby="applyModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="applyModalLabel">添加账户</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="name" class="col-xs-2 col-form-label">手机</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="name" v-model="apply.mobile" required>
                </div>
              </div>
              <div class="form-group">
                <label for="mobile" class="col-xs-2 col-form-label">密码</label>
                <div class="col-xs-10">
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
    name: 'operator',
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
