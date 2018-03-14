<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only">名称</label>
        <input type="text" v-model="query.name" class="form-control" placeholder="Name">
      </div>
      <button type="button" class="btn btn-secondary" @click="queryData">查询</button>
      <button type="button" class="btn btn-secondary" @click="toAddGroup">添加</button>
    </form>

    <div class="modal fade" id="groupModal" tabindex="-1" role="dialog" aria-labelledby="groupModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="groupModalLabel"><span v-show="create">创建</span><span
              v-show="!create">更新</span>
            </h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="name" class="col-xs-2 col-form-label">名称</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="name" v-model="inputGroup.name" required>
                </div>
              </div>
              <div class="form-group">
                <label for="state" class="col-xs-2 col-form-label">状态</label>
                <div class="col-xs-10">
                  <select id="state" class="form-control" v-model="inputGroup.stateCode">
                    <option value="0">冻结</option>
                    <option value="1">正常</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-xs-2 col-form-label">资源</label>
                <div class="col-xs-10">
                  <ul>
                    <li v-for="item in resources">
                      {{item.name}}-{{item.typeName}}
                      <ul>
                        <li v-for="child in item.children">
                          <div class="checkbox">
                            <label>
                              <input type="checkbox" :value="child.id" v-model="inputGroup.resources">
                              {{child.name}}-{{child.typeName}}
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
            <button type="button" class="btn btn-primary" v-show="!create" @click="updateGroup">更新</button>
          </div>
        </div>
      </div>
    </div>

    <table class="table">
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
          <button type="button" class="btn btn-secondary" @click="toUpdateGroup(item)">查看</button>
          <button type="button" class="btn btn-primary" @click="lockGroup(item)" v-show="item.stateCode == 1">禁用</button>
          <button type="button" class="btn btn-primary" @click="unlockGroup(item)" v-show="item.stateCode == 0">启用</button>
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
      toAddGroup () {
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
      toUpdateGroup (item) {
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
