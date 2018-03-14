<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only">名称</label>
        <input type="text" v-model="query.name" class="form-control" placeholder="Name">
      </div>
      <div class="form-group">
        <label class="sr-only">角色</label>
        <select id="source" class="form-control" v-model="query.groupId">
          <option value="">无</option>
          <option v-for="op in groups" :value="op.id">{{op.name}}</option>
        </select>
      </div>
      <button type="button" class="btn btn-secondary" @click="queryData">查询</button>
      <button type="button" class="btn btn-secondary" @click="toAddOperator">添加</button>
    </form>

    <div class="modal fade" id="operatorModal" tabindex="-1" role="dialog" aria-labelledby="operatorModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="operatorModalLabel"><span v-show="create">创建</span><span
              v-show="!create">更新</span>
            </h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="name" class="col-xs-2 col-form-label">名称</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="name" v-model="inputOperator.name" required>
                </div>
              </div>
              <div class="form-group">
                <label for="mobile" class="col-xs-2 col-form-label">手机</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="mobile" v-model="inputOperator.mobile" required>
                </div>
              </div>
              <div class="form-group">
                <label for="state" class="col-xs-2 col-form-label">状态</label>
                <div class="col-xs-10">
                  <select id="state" class="form-control" v-model="inputOperator.stateCode">
                    <option value="0">冻结</option>
                    <option value="1">正常</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-xs-2 col-form-label">角色</label>
                <div class="col-xs-10">
                  <ul>
                    <li v-for="group in groups">
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

    <table class="table">
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
          <button type="button" class="btn btn-secondary" @click="toUpdateOperator(item)">查看</button>
          <button type="button" class="btn btn-secondary" @click="resetPassword(item.id)">重置密码</button>
          <button type="button" class="btn btn-primary" @click="lockOperator(item)" v-show="item.stateCode == 1">禁用</button>
          <button type="button" class="btn btn-primary" @click="unlockOperator(item)" v-show="item.stateCode == 0">启用</button>
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
  import {listOperator, addOperator, updateOperator, fetchGroup} from './api'

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
          // todo
        }
      }
    }
  }

</script>
