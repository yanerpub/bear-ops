<template>
  <div class="row">
    <div class="col-sm-3">
      <ul>
        <node class="item" v-on:choose="choose" :model.sync="treeData"></node>
      </ul>
    </div>
    <div class="col-sm-9">
      <h2 class="text-center">{{selectedNodeName}}</h2>
      <div>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item active">
            <a class="nav-link active" data-toggle="tab" href="#purchase" role="tab">采购合同</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#field" role="tab">产品定义</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#log" role="tab">日志</a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane active" id="purchase" role="tabpanel">
            <blockquote>
              <p>{{selectedNodeName}}可选的<mark>采购合同</mark></p>
            </blockquote>
            <div class="pull-right">
              <button type="button" class="btn btn-default">添加合同</button>
            </div>
            <table class="table">
              <thead>
              <tr>
                <th>名称</th>
                <th>状态</th>
                <th>版本</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in contracts">
                <td><a :href="'/contract.html?tid=' + selectedNodeId + '&id=' + item.id" target="_blank">{{item.name}}</a></td>
                <td>{{item.stateText}}</td>
                <td>{{item.version}}</td>
                <td>{{item.createTime | timeAgo}}</td>
                <td>
                  <a v-show="selectedNodeId == item.treeId" :href="'/contract.html?tid=' + selectedNodeId + '&id=' + item.id" target="_blank">修改</a>
                  <button type="button" class="btn btn-primary btn-xs" v-show="selectedNodeId == item.treeId && item.state != 'OPEN'">开放</button>
                  <button type="button" class="btn btn-primary btn-xs" v-show="selectedNodeId == item.treeId && item.state == 'OPEN'">封闭</button>
                  <button type="button" class="btn btn-primary btn-xs" v-show="selectedNodeId == item.treeId" @click="toEditContract(item)">生产工作流与交付</button>
                  <span v-show="selectedNodeId != item.treeId" class="label label-success">继承</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="field" role="tabpanel">
            <blockquote>
              <p>{{selectedNodeName}}的属性<mark>定义</mark></p>
            </blockquote>
            <div class="pull-right">
              <button type="button" class="btn btn-default" @click="toAddField">添加属性</button>
            </div>
            <table class="table">
              <thead>
              <tr>
                <th>域键</th>
                <th>域名称</th>
                <th>控件类型</th>
                <th>必须</th>
                <th>默认值</th>
                <th>创建时间</th>
                <th>修改时间</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in fields">
                <td>{{item.key}}</td>
                <td>{{item.name}}</td>
                <td>{{item.type}}</td>
                <td>{{item.required}}</td>
                <td>{{item.defaultValue}}</td>
                <td>{{item.createTime | timeAgo}}</td>
                <td>{{item.modifyTime | timeAgo}}</td>
                <td>
                  <button type="button" class="btn btn-primary btn-xs" v-show="selectedNodeId == item.treeId" @click="toEditField(item)">修改属性</button>
                  <span v-show="selectedNodeId != item.treeId" class="label label-success">继承属性</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="log" role="tabpanel">
            <blockquote>
              <p><mark>日志</mark>对品类树节点操作的日志</p>
            </blockquote>
            <table class="table">
              <thead>
              <tr>
                <th>修改时间</th>
                <th>修改人/角色</th>
                <th>变更动作</th>
                <th>变更内容</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in workflows">
                <td><a :href="'/viewer.html?tid=' + selectedNodeId + '&id=' + item.id" target="_blank">{{item.name}}</a></td>
                <td>{{item.version}}</td>
                <td>{{item.createTime | timeAgo}}</td>
                <td>
                  <a v-show="selectedNodeId == item.treeId" :href="'/modeler.html?tid=' + selectedNodeId + '&id=' + item.id" target="_blank">修改</a>
                  <span v-show="selectedNodeId != item.treeId" class="label label-success">继承</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
                <label for="name" class="col-xs-2 col-form-label">域名</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="name" v-model="field.name" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="key" class="col-xs-2 col-form-label">域Key</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="key" v-model="field.key" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="type" class="col-xs-2 col-form-label">类型</label>
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
                <label class="col-xs-2 col-form-label">是否必须</label>
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
                <label for="default" class="col-xs-2 col-form-label">默认值</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="default" v-model="field.defaultValue" placeholder="使用#设置默认多值">
                </div>
              </div>
              <div class="form-group row" v-show="hasOptions">
                <hr>
                <label class="col-xs-2 col-form-label">可选值</label>
                <div class="col-xs-10">
                  <form class="form-inline">
                    <div v-for="(item, index) in field.optionalValues">
                      <div class="form-group">
                        <label>value</label>
                        <input type="text" v-model="item.value">
                        <label>name</label>
                        <input type="text" v-model="item.name">
                      </div>
                      <button type="button" class="btn btn-primary btn-xs" @click="field.optionalValues.splice(index, 1)">-
                      </button>
                    </div>
                    <button type="button" class="btn btn-primary btn-xs" @click="addValue">+</button>
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
    <div class="modal fade" id="makeDeliverModal" tabindex="-1" role="dialog" aria-labelledby="makeDeliverModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="makeDeliverModalLabel">生产流程与交付</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="makeWorkflowId" class="col-xs-2 col-form-label text-right">生产流程</label>
                <div class="col-xs-10">
                  <select class="form-control" id="makeWorkflowId" v-model="contract.makeWorkflowId">
                    <option v-for="op in workflows" :value="op.id">{{op.name}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="returnWorkflowId" class="col-xs-2 col-form-label text-right">退货流程</label>
                <div class="col-xs-10">
                  <select class="form-control" id="returnWorkflowId" v-model="contract.returnWorkflowId">
                    <option v-for="op in workflows" :value="op.id">{{op.name}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-xs-2 col-form-label text-right">交付方式</label>
                <div class="col-xs-10">
                  <div class="input-group">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{currentDeliveryType}} <span class="caret"></span></button>
                      <ul class="dropdown-menu">
                        <li v-for="op in deliveryTypes"><a @click="currentDeliveryType = op">{{op}}</a></li>
                      </ul>
                    </div>
                    <input type="text" class="form-control" v-model="location">
                    <div class="input-group-btn">
                      <input type="button" class="btn btn-default" value="添加" @click="addDelivery">
                    </div>
                  </div>
                  <br>
                  <p v-for="(op, index) in contract.deliveries"><span class="glyphicon glyphicon-remove" aria-hidden="true" @click="contract.deliveries.splice(index, 1)"></span>{{op.protocol}}-{{op.location}}</p>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateContract">更新</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import node from "../../components/node.vue"
import {fetchEnums, fetchTree, listContract, updateContract, listField, addField, updateField, listWorkflow} from './api'

export default {
  name: 'tree',
  components: {
    'node': node
  },
  data() {
    return {
      treeData: {},
      selectedNodeId: 0,
      selectedNodeName: '',
      contracts: [],
      fields: [],
      logs: [],
      field: {},
      contract: {},
      workflows:[],
      deliveryTypes: [],
      currentDeliveryType: '',
      location: '',
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
        this.choose(this.treeData)
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
      addField(this.selectedNodeId, this.field, (body) => {
        listField(this.selectedNodeId, (body) => {
          this.fields = body.data
          $('#fieldModal').modal('hide')
        })
      })
    },
    updateField () {
      updateField(this.selectedNodeId, this.field, (body) => {
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
    // 子组件事件
    choose(node) {
      if (node.id == this.selectedNodeId) {
        return;
      }
      this.selectedNodeId = node.id
      this.selectedNodeName = node.name
      listContract(this.selectedNodeId, (body) => this.contracts = body.data)
      listField(this.selectedNodeId, (body) => this.fields = body.data)
    },
    toEditContract (item) {
      this.contract = item
      fetchEnums('tree', (body) => {
        this.deliveryTypes = body.data.deliveryTypes
        this.currentDeliveryType = this.deliveryTypes[0]
      });
      listWorkflow({}, (body) => {
        this.workflows = body.data.list
        $('#makeDeliverModal').modal('show')
      })
    },
    addDelivery () {
      if (!this.contract.deliveries) {
        this.contract.deliveries = []
      }
      this.contract.deliveries.push({'protocol': this.currentDeliveryType, 'location': this.location})
      this.location = ''
    },
    updateContract () {
      updateContract(this.selectedNodeId, this.contract, (body) => {
        listContract(this.selectedNodeId, (body) => {
          this.contracts = body.data
          $('#makeDeliverModal').modal('hide')
        })
      })
    }
  }
}

</script>