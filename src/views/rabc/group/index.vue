<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form class="form-inline">
          <div class="form-group row">
            <label for="queryName">名称</label>
            <input type="text" id="queryName" v-model="query.name" class="form-control mx-sm-3">
          </div>
          <button type="button" class="btn btn-primary mr-2" @click="queryData">查询</button>
          <button type="button" class="btn btn-primary" @click="toAddGroup">添加</button>
        </form>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>ID</th>
        <th>名称</th>
        <th>状态</th>
        <th>创建时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.stateName}}</td>
        <td>{{item.createTime | timeAgo}}</td>
        <td>
          <button type="button" class="btn btn-link" @click="toUpdateGroup(item)">查看</button>
          <button type="button" class="btn btn-link" @click="lockGroup(item)" v-show="item.stateCode == 1 && item.id != 1">禁用</button>
          <button type="button" class="btn btn-link" @click="unlockGroup(item)" v-show="item.stateCode == 0 && item.id != 1">启用</button>
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
    <div class="modal fade" id="groupModal" tabindex="-1" role="dialog" aria-labelledby="groupModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="groupModalLabel"><span v-show="create">创建</span><span
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
                  <input class="form-control" type="text" id="name" v-model="inputGroup.name" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="state" class="col-sm-2 col-form-label">状态</label>
                <div class="col-sm-10">
                  <select id="state" class="form-control" v-model="inputGroup.stateCode">
                    <option value="0">冻结</option>
                    <option value="1">正常</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">资源</label>
                <div class="col-sm-10">
                  <ul>
                    <li v-for="item in resources">
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" :value="item.id" v-model="inputGroup.resources">
                          <span class="badge" :class="{'badge-primary': item.stateCode == 1, 'badge-secondary': item.stateCode == 2}">{{item.name}}</span>
                          <span class="badge badge-dark">{{item.uri}}</span>
                        </label>
                      </div>
                      <ul v-if="item.children && item.children.length">
                        <li v-for="child in item.children">
                          <div class="checkbox">
                            <label>
                              <input type="checkbox" :value="child.id" v-model="inputGroup.resources">
                              <span class="badge" :class="{'badge-primary': child.stateCode == 1, 'badge-secondary': child.stateCode == 2}">{{child.name}}</span>
                              <span class="badge badge-dark">{{child.uri}}</span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" v-show="create" @click="addGroup">创建</button>
            <button type="button" class="btn btn-primary" v-show="!create && inputGroup.id != 1" @click="updateGroup">更新</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {listGroup, addGroup, updateGroup, fetchResource} from './api'

  export default {
    name: 'group',
    data() {
      return {
        query: {pageNow: 1, pageSize: 10},
        list: [],
        resources: [],
        count: 0,
        inputGroup: {},
        create: false
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
        listGroup(this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      },
      toAddGroup() {
        fetchResource((body) => {
          this.resources = body._data.children;
        });
        this.create = true
        this.inputGroup = {stateCode: 1, resources: []}
        $('#groupModal').modal('show')
      },
      addGroup() {
        if (!this.inputGroup) {
          alert('请输入结点信息');
          return;
        }
        addGroup(this.inputGroup, (body) => {
          this.queryData();
          $('#groupModal').modal('hide')
        })
      },
      toUpdateGroup(item) {
        this.create = false
        this.inputGroup = item
        fetchResource((body) => {
          this.resources = body._data.children;
          $('#groupModal').modal('show')
        });
      },
      updateGroup() {
        if (confirm('确定更新？')) {
          updateGroup(this.inputGroup, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('更新失败！');
            }
            $('#groupModal').modal('hide')
          })
        }
      },
      lockGroup(group) {
        if (confirm('确定锁定？')) {
          group.stateCode = 0
          updateGroup(group, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('更新失败！');
            }
          })
        }
      },
      unlockGroup(group) {
        if (confirm('确定解锁？')) {
          group.stateCode = 1
          updateGroup(group, (body) => {
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
