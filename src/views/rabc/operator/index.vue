<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form class="form-inline">
          <div class="form-group row mr-2">
            <label for="queryName">名称</label>
            <input type="text" id="queryName" v-model="query.name" class="form-control mx-sm-4">
          </div>
          <div class="form-group row">
            <label for="queryRole">角色</label>
            <select id="queryRole" v-model="query.groupId" class="form-control mx-sm-4">
              <option value="">无</option>
              <option v-for="op in groups" :value="op.id">{{op.name}}</option>
            </select>
          </div>
          <button type="button" class="btn btn-primary mr-2" @click="queryData">查询</button>
          <button type="button" class="btn btn-primary" @click="toAddOperator">添加</button>
        </form>
      </div>
    </div>
    <div class="modal fade" id="operatorModal" tabindex="-1" role="dialog" aria-labelledby="operatorModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="operatorModalLabel"><span v-show="create">创建</span><span
              v-show="!create">更新</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label">名称</label>
                <div class="col-sm-10">
                  <input class="form-control" type="text" id="name" v-model="inputOperator.name" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="mobile" class="col-sm-2 col-form-label">手机</label>
                <div class="col-sm-10">
                  <input class="form-control" type="text" id="mobile" v-model="inputOperator.mobile" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="state" class="col-sm-2 col-form-label">状态</label>
                <div class="col-sm-10">
                  <select id="state" class="form-control" v-model="inputOperator.stateCode">
                    <option value="0">冻结</option>
                    <option value="1">正常</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">角色</label>
                <div class="col-sm-10">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="group in groups">
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" :value="group.id" v-model="inputOperator.groups">{{group.name}}
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" v-show="create" @click="addOperator">创建</button>
            <button type="button" class="btn btn-primary" v-show="!create" @click="updateOperator">更新</button>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-bordered">
      <thead>
      <tr>
        <th>ID</th>
        <th>名称</th>
        <th>手机</th>
        <th>状态</th>
        <th>用户角色</th>
        <th>创建时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.mobile}}</td>
        <td>{{item.stateName}}</td>
        <td>{{item.groupsName}}</td>
        <td>{{item.createTime | timeAgo}}</td>
        <td>
          <button type="button" class="btn btn-link" @click="toUpdateOperator(item)">查看</button>
          <button type="button" class="btn btn-link" @click="resetPassword(item.id)">重置密码</button>
          <button type="button" class="btn btn-link" @click="lockOperator(item)" v-show="item.stateCode == 1">禁用</button>
          <button type="button" class="btn btn-link" @click="unlockOperator(item)" v-show="item.stateCode == 0">启用</button>
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
  import {listOperator, addOperator, updateOperator, fetchGroup, resetPassword} from './api'

  export default {
    name: 'operator',
    data() {
      return {
        query: {groupId: '', pageNow: 1, pageSize: 10},
        list: [],
        groups: [],
        count: 0,
        inputOperator: {},
        create: false
      }
    },
    created() {
      fetchGroup((body) => {
        this.groups = body._data.list;
      });
      this.queryData()
    },
    computed: {
      totalPage() {
        return parseInt(this.count / this.query.pageSize) + 1
      }
    },
    methods: {
      queryData() {
        listOperator(this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      },
      toAddOperator () {
        this.create = true
        this.inputOperator = {stateCode: 1, groups: []}
        $('#operatorModal').modal('show')
      },
      addOperator() {
        if (!this.inputOperator) {
          alert('请输入结点信息');
          return;
        }
        addOperator(this.inputOperator, (body) => {
          this.queryData();
          $('#operatorModal').modal('hide')
        })
      },
      toUpdateOperator (item) {
        this.create = false
        this.inputOperator = item
        $('#operatorModal').modal('show')
      },
      updateOperator() {
        if (confirm('确定更新？')) {
          updateOperator(this.inputOperator, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('更新失败！');
            }
            $('#operatorModal').modal('hide')
          })
        }
      },
      lockOperator(operator) {
        if (confirm('确定锁定？')) {
          operator.stateCode = 0
          updateOperator(operator, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('更新失败！');
            }
          })
        }
      },
      unlockOperator(operator) {
        if (confirm('确定解锁？')) {
          operator.stateCode = 1
          updateOperator(operator, (body) => {
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
