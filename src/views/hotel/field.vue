<template>
  <div class="row">
    <div class="col-sm-3">
      <ul>
        <node class="item" v-on:choose="choose" :model.sync="treeData"></node>
      </ul>
    </div>
    <div class="col-sm-9">
      <h2 class="text-center">{{selectedNodeName}}</h2>
      <form class="form-inline">
        <button type="button" class="btn btn-primary" @click="toAddField">添加属性</button>
      </form>
      <table class="table">
        <thead>
        <tr>
          <th>#</th>
          <th>key</th>
          <th>name</th>
          <th>type</th>
          <th>required</th>
          <th>default</th>
          <th>createTime</th>
          <th>modifyTime</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in fields">
          <td>{{item.id}}</td>
          <td>{{item.key}}</td>
          <td>{{item.name}}</td>
          <td>{{item.type}}</td>
          <td>{{item.required}}</td>
          <td>{{item.defaultValue}}</td>
          <td>{{item.createTime | timeAgo}}</td>
          <td>{{item.modifyTime | timeAgo}}</td>
          <td>
            <button v-show="selectedNodeId == item.treeId" class="btn btn-primary" @click="toEditField(item)">
              修改属性
            </button>
            <span v-show="selectedNodeId != item.treeId" class="label label-success">继承属性</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" id="fieldModal" tabindex="-1" role="dialog" aria-labelledby="fieldModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="fieldModalLabel"><span v-show="create">创建</span><span v-show="!create">更新</span></h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label for="key" class="col-xs-2 col-form-label">Key</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="key" v-model="field.key" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="name" class="col-xs-2 col-form-label">Name</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="name" v-model="field.name" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="type" class="col-xs-2 col-form-label">Type</label>
                <div class="col-xs-10">
                  <select id="type" class="form-control" v-model="field.type">
                    <option value="text">text</option>
                    <option value="date">date</option>
                    <option value="datetime">datetime</option>
                    <option value="checkbox">checkbox</option>
                    <option value="radio">radio</option>
                    <option value="select">select</option>
                    <option value="textarea">textarea</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-xs-2 col-form-label">Required</label>
                <div class="col-xs-10">
                  <label class="form-check-inline">
                    <input type="radio" name="required" value="true" v-model="field.required">是
                  </label>
                  <label class="form-check-inline">
                    <input type="radio" name="required" value="false" v-model="field.required"/>否
                  </label>
                </div>
              </div>
              <div class="form-group row">
                <label for="default" class="col-xs-2 col-form-label">Default</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="default" v-model="field.defaultValue" placeholder="使用#设置默认多值">
                </div>
              </div>
              <div class="form-group row" v-show="hasOptions">
                <hr>
                <label class="col-xs-2 col-form-label">Option</label>
                <div class="col-xs-10">
                  <form class="form-inline">
                    <div v-for="(item, index) in field.optionalValues">
                      <div class="form-group">
                        <label>value</label>
                        <input type="text" v-model="item.value">
                        <label>name</label>
                        <input type="text" v-model="item.name">
                      </div>
                      <button type="button" class="btn btn-primary" @click="field.optionalValues.splice(index, 1)">-
                      </button>
                    </div>
                    <button type="button" class="btn btn-primary" @click="addValue">+</button>
                  </form>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" v-show="create" @click="addField">创建</button>
            <button type="button" class="btn btn-primary" v-show="!create" @click="updateField">更新</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import node from "../../components/node.vue"
  import {fetchTree, listField, addField, updateField} from './api'

  export default {
    name: 'hotel-field-view',
    components: {
      'node': node
    },
    data() {
      return {
        treeData: {},
        selectedNodeId: 0,
        selectedNodeName: '',
        fields: [],
        field: {},
        create: false
      }
    },
    created () {
      this.fetchData()
    },
    computed: {
      hasOptions () {
        return this.field.type == 'checkbox' || this.field.type == 'radio' || this.field.type == 'select'
      }
    },
    watch: {
      selectedNodeId (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
      }
    },
    methods: {
      fetchData () {
        fetchTree((body) => {
          this.treeData = body.data
          this.selectedNodeId = this.treeData.id
          this.selectedNodeName = this.treeData.name
          listField(this.selectedNodeId, (body) => {
            this.fields = body.data
          })
        });
      },
      toAddField () {
        this.create = true
        $('#fieldModal').modal('show');
        this.field = {type: 'text', required: 'true', optionalValues: [{value: '', name: ''}]}
      },
      toEditField (item) {
        this.create = false
        $('#fieldModal').modal('show');
        this.field = item
        if (item.required) {
          this.field.required = 'true'
        } else {
          this.field.required = 'false'
        }
      },
      addField () {
        this.field.treeId = this.selectedNodeId
        addField(this.field, (body) => {
          listField(this.selectedNodeId, (body) => {
            this.fields = body.data
            $('#fieldModal').modal('hide')
          })
        })
      },
      updateField () {
        updateField(this.field, (body) => {
          listField(this.selectedNodeId, (body) => {
            this.fields = body.data
            $('#fieldModal').modal('hide')
          })
        })
      },
      addValue () {
        if (!this.field.optionalValues) {
          this.field.optionalValues = []
        }
        this.field.optionalValues.push({value: '', name: ''});
      },
      choose(node) {// 子组件事件
        if (node.id == this.selectedNodeId) {
          return;
        }
        this.selectedNodeId = node.id
        this.selectedNodeName = node.name
        listField(this.selectedNodeId, (body) => {
          this.fields = body.data
        })
      }
    }
  }
</script>