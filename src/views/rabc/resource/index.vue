<template>
  <div class="row">
    <div class="col-sm-6">
      <ul>
        <node class="item" v-on:choose="choose" :model.sync="treeData"></node>
      </ul>
    </div>
    <div class="col-sm-6">
      <form>
        <h1>{{selectedNode.name}}</h1>
        <label>请选择相应的操作</label>
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-btn">
              <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  当前目录 <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li><a href="#" @click="toAddNode">添加子目录</a></li>
                  <li><a href="#" @click="toUpdateNode">修改</a></li>
                  <li role="separator" class="divider"></li>
                  <li><a href="#" @click="removeNode">删除</a></li>
                </ul>
              </div>
            </span>
          </div>
        </div>
      </form>
    </div>
    <div class="modal fade" id="nodeModal" tabindex="-1" role="dialog" aria-labelledby="nodeModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="nodeModalLabel"><span v-show="create">创建</span><span
              v-show="!create">更新</span>
            </h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group" v-show="create">
                <label for="name" class="col-xs-2 col-form-label">父结点</label>
                <div class="col-xs-10">
                  <span class="label label-info">{{inputNode.parentName}}</span>
                </div>
              </div>
              <div class="form-group">
                <label for="name" class="col-xs-2 col-form-label">名称</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="name" v-model="inputNode.name" required>
                </div>
              </div>
              <div class="form-group">
                <label for="uri" class="col-xs-2 col-form-label">URI</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="uri" v-model="inputNode.uri" required>
                </div>
              </div>
              <div class="form-group">
                <label for="type" class="col-xs-2 col-form-label">类型</label>
                <div class="col-xs-10">
                  <select id="type" class="form-control" v-model="inputNode.typeCode">
                    <option value="1">菜单</option>
                    <option value="2">数据</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="state" class="col-xs-2 col-form-label">状态</label>
                <div class="col-xs-10">
                  <select id="state" class="form-control" v-model="inputNode.stateCode">
                    <option value="0">冻结</option>
                    <option value="1">正常</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="sort" class="col-xs-2 col-form-label">排序</label>
                <div class="col-xs-10">
                  <input class="form-control" type="number" id="sort" v-model="inputNode.sort" required>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" v-show="create" @click="addNode">创建</button>
            <button type="button" class="btn btn-primary" v-show="!create" @click="updateNode">更新</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import node from "../../../components/node.vue"
  import {
    fetchTree,
    addNode,
    updateNode,
    removeNode,
  } from './api'

  export default {
    name: 'resource',
    components: {
      'node': node
    },
    data() {
      return {
        treeData: {},
        selectedNode: {},
        inputNode: {},
        create: false
      }
    },
    created () {
      this.fetchData();
    },
    watch: {
      selectedNode (val, oldVal) {
        console.log('new: %s, old: %s', val.id, oldVal.id)
      }
    },
    methods: {
      fetchData () {
        fetchTree((body) => {
          this.treeData = body._data;
          this.choose(this.treeData);
        });
      },
      toAddNode () {
        this.create = true
        this.inputNode = {pid: this.selectedNode.id, parentName: this.selectedNode.name, typeCode: 1, stateCode: 1, sort: 1}
        $('#nodeModal').modal('show')
      },
      addNode() {
        if (!this.inputNode) {
          alert('请输入结点信息');
          return;
        }
        addNode(this.inputNode, (body) => {
          this.fetchData();
          $('#nodeModal').modal('hide')
        })
      },
      toUpdateNode () {
        this.create = false
        this.inputNode = this.selectedNode
        $('#nodeModal').modal('show')
      },
      updateNode() {
        if (confirm('确定更新？')) {
          updateNode(this.inputNode, (body) => {
            if (body._data > 0) {
              this.fetchData();
            } else {
              alert('更新失败！');
            }
            $('#nodeModal').modal('hide')
          })
        }
      },
      removeNode() {
        if (confirm('确定删除？')) {
          removeNode(this.selectedNode.id, (body) => {
            if (body._data > 0) {
              this.fetchData();
            } else {
              alert('当前目录下有数据或子目录不能删除！');
            }
          })
        }
      },
      // 子组件事件
      choose(node) {
        this.selectedNode = node
      }
    }
  }

</script>