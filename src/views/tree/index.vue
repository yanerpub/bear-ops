<template>
  <div class="row">
    <div class="col-sm-3">
      <ul>
        <node class="item" v-on:choose="choose" :model.sync="treeData"></node>
      </ul>
    </div>
    <div class="col-sm-9">
      <h2 class="text-center">{{selectedTreeName}}</h2>
      <div v-show="action == 'list'">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item active">
            <a class="nav-link active" data-toggle="tab" href="#field" role="tab">生产</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#contract" role="tab">采购</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#delivery" role="tab">配送</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#return" role="tab">退货</a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane active" id="field" role="tabpanel">
            <blockquote>
              <p>产品的<mark>属性、报价、库存、包装、流程</mark></p>
            </blockquote>
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
              <tr v-for="item in fieldList">
                <td>{{item.id}}</td>
                <td>{{item.key}}</td>
                <td>{{item.name}}</td>
                <td>{{item.type}}</td>
                <td>{{item.required}}</td>
                <td>{{item.defaultValue}}</td>
                <td>{{item.createTime | timeAgo}}</td>
                <td>{{item.modifyTime | timeAgo}}</td>
                <td>
                  <button v-show="selectedTreeId == item.treeId" type="button" class="btn btn-primary" @click="toEdit(item)">修改属性
                  </button>
                  <span v-show="selectedTreeId != item.treeId" class="label label-success">继承属性</span>
                </td>
              </tr>
              </tbody>
            </table>
            <form class="form-inline">
              <button type="button" class="btn btn-primary" @click="toAdd">添加属性</button>
            </form>
          </div>
          <div class="tab-pane" id="contract" role="tabpanel">
            <blockquote>
              <p>产品可选的<mark>采购协议</mark></p>
            </blockquote>
            <table class="table">
              <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>version</th>
                <th>createTime</th>
                <th>modifyTime</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in contractList">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.version}}</td>
                <td>{{item.createTime | timeAgo}}</td>
                <td>{{item.modifyTime | timeAgo}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="delivery" role="tabpanel">
            <blockquote>
              <p>对下游系统输出即<mark>配送</mark></p>
            </blockquote>
            <table class="table">
              <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>version</th>
                <th>createTime</th>
                <th>modifyTime</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in contractList">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.version}}</td>
                <td>{{item.createTime | timeAgo}}</td>
                <td>{{item.modifyTime | timeAgo}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="return" role="tabpanel">
            <blockquote>
              <p><mark>退货</mark>的规则、流程</p>
            </blockquote>
            <table class="table">
              <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>version</th>
                <th>createTime</th>
                <th>modifyTime</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in contractList">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.version}}</td>
                <td>{{item.createTime | timeAgo}}</td>
                <td>{{item.modifyTime | timeAgo}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-show="action != 'list'">
        <form>
          <h4 v-show="action == 'add'">添加属性</h4>
          <h4 v-show="action == 'edit'">修改属性</h4>
          <div class="form-group row">
            <label for="key" class="col-xs-3 col-form-label">Key</label>
            <div class="col-xs-9">
              <input class="form-control" type="text" id="key" v-model="field.key" required>
            </div>
          </div>
          <div class="form-group row">
            <label for="name" class="col-xs-3 col-form-label">Name</label>
            <div class="col-xs-9">
              <input class="form-control" type="text" id="name" v-model="field.name" required>
            </div>
          </div>
          <div class="form-group row">
            <label for="type" class="col-xs-3 col-form-label">Type</label>
            <div class="col-xs-9">
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
            <label class="col-xs-3 col-form-label">Required</label>
            <div class="col-xs-9">
              <label class="form-check-inline">
                <input type="radio" name="required" value="true" v-model="field.required">是
              </label>
              <label class="form-check-inline">
                <input type="radio" name="required" value="false" v-model="field.required"/>否
              </label>
            </div>
          </div>
          <div class="form-group row">
            <label for="default" class="col-xs-3 col-form-label">Default</label>
            <div class="col-xs-9">
              <input class="form-control" type="text" id="default" v-model="field.defaultValue">
            </div>
          </div>
          <div class="form-group row" v-show="hasOptions">
            <hr>
            <label class="col-xs-3 col-form-label">OptionValue</label>
            <div class="col-xs-9">
              <form class="form-inline">
                <div v-for="(item, index) in field.optionalValues">
                  <div class="form-group">
                    <label>value</label>
                    <input type="text" class="form-control" v-model="item.value">
                  </div>
                  <div class="form-group">
                    <label>name</label>
                    <input type="text" class="form-control" v-model="item.name">
                  </div>
                  <button type="button" class="btn btn-primary" @click="field.optionalValues.splice(index, 1)">-
                  </button>
                </div>
                <button type="button" class="btn btn-primary" @click="addValue">+</button>
              </form>
            </div>
          </div>
          <button type="button" class="btn btn-primary" @click="addData" v-show="action == 'add'">添加</button>
          <button type="button" class="btn btn-primary" @click="updateData" v-show="action == 'edit'">修改</button>
          <button type="button" class="btn btn-primary" @click="toList">返回</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import node from "./node.vue"
import {queryTree, getTemplate, addField, updateField} from './api'

export default {
  name: 'tree',
  components: {
    'node': node
  },
  data() {
    return {
      treeData: {},
      field: {type: 'text', required: 'true', optionalValues: [{value: '', name: ''}]},
      selectedTreeId: 0,
      selectedTreeName: '',
      selectedFieldId: 0,
      state: 'list',
      fields:[],
      contracts: []
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    fieldList () {
      return this.fields
    },
    contractList () {
      return this.contracts
    },
    action () {
      return this.state
    },
    hasOptions () {
      return this.field.type == 'checkbox' || this.field.type == 'radio' || this.field.type == 'select'
    }
  },
  watch: {
    selectedTreeId (val, oldVal) {
      //console.log('new: %s, old: %s', val, oldVal)
    }
  },
  methods: {
    fetchData () {
      queryTree((body) => {
        this.treeData = body.data
        this.selectedTreeId = this.treeData.id
        this.selectedTreeName = this.treeData.name
      });
    },
    toList () {
      this.state = 'list'
    },
    toAdd () {
      this.state = 'add'
      this.field = {type: 'text', required: 'true', optionalValues: [{value: '', name: ''}]}
    },
    toEdit (item) {
      this.state = 'edit'
      this.selectedFieldId = item.id
      this.field = item
      if (item.required) {
        this.field.required = 'true'
      } else {
        this.field.required = 'false'
      }
    },
    addData () {
      this.field.treeId = this.selectedTreeId
      addField(this.field, (body) => {
        getTemplate(this.selectedTreeId, (body) => {
          this.fields = body.data.fieldList
          this.contracts = body.data.contractList
        })
        this.state = 'list'
      })
    },
    updateData () {
      updateField(this.field, (body) => {
        getTemplate(this.selectedTreeId, (body) => {
          this.fields = body.data.fieldList
          this.contracts = body.data.contractList
        })
        this.state = 'list'
      })
    },
    addValue () {
      this.field.optionalValues.push({value: '', name: ''});
    },
    // 子组件事件
    choose(node) {
      if (node.id == this.selectedTreeId) {
        return;
      }
      this.selectedTreeId = node.id
      this.selectedTreeName = node.name
      getTemplate(this.selectedTreeId, (body) => {
        this.fields = body.data.fieldList
        this.contracts = body.data.contractList
      })
      this.state = 'list'
    }
  }
}

</script>