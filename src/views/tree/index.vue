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
            <a class="nav-link active" data-toggle="tab" href="#produce" role="tab">生产</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#purchase" role="tab">采购</a>
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
          <div class="tab-pane active" id="produce" role="tabpanel">
            <blockquote>
              <p>产品的<mark>生产、包装流程</mark></p>
            </blockquote>
            <table class="table">
              <thead>
              <tr>
                <th>name</th>
                <th>version</th>
                <th>createTime</th>
                <th>操作</th>
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
            <a :href="'/modeler.html?tid=' + selectedNodeId" target="_blank">添加</a>
          </div>
          <div class="tab-pane" id="purchase" role="tabpanel">
            <blockquote>
              <p>产品可选的<mark>采购协议</mark></p>
            </blockquote>
            <table class="table">
              <thead>
              <tr>
                <th>name</th>
                <th>version</th>
                <th>createTime</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in contracts">
                <td><a :href="'/contract.html?tid=' + selectedNodeId + '&id=' + item.id" target="_blank">{{item.name}}</a></td>
                <td>{{item.version}}</td>
                <td>{{item.createTime | timeAgo}}</td>
                <td>
                  <a v-show="selectedNodeId == item.treeId" :href="'/contract.html?tid=' + selectedNodeId + '&id=' + item.id" target="_blank">修改</a>
                  <span v-show="selectedNodeId != item.treeId" class="label label-success">继承</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="delivery" role="tabpanel">
            <blockquote>
              <p>对下游系统输出即<mark>配送</mark></p>
            </blockquote>
            <div class="radio" v-for="item in deliveryTypes">
              <label>
                <input type="radio" name="optionsRadios" id="optionsRadios1" :value="item.code">
                {{item.name}}
              </label>
            </div>
          </div>
          <div class="tab-pane" id="return" role="tabpanel">
            <blockquote>
              <p><mark>退货</mark>的规则、流程</p>
            </blockquote>
            <table class="table">
              <thead>
              <tr>
                <th>name</th>
                <th>version</th>
                <th>createTime</th>
                <th>操作</th>
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
            <a :href="'/modeler.html?tid=' + selectedNodeId" target="_blank">添加</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import node from "../../components/node.vue"
import {fetchEnums, fetchTree, fetchNode} from './api'

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
      workflows:[],
      contracts: [],
      deliveryTypes: []
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    selectedNodeId (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    }
  },
  methods: {
    fetchData () {
      fetchEnums('delivery', (body) => {
        this.deliveryTypes = body.data.deliveryTypes
      });
      fetchTree((body) => {
        this.treeData = body.data
        this.selectedNodeId = this.treeData.id
        this.selectedNodeName = this.treeData.name
      });
    },
    // 子组件事件
    choose(node) {
      if (node.id == this.selectedNodeId) {
        return;
      }
      this.selectedNodeId = node.id
      this.selectedNodeName = node.name
      fetchNode(this.selectedNodeId, (body) => {
        this.workflows = body.data.workflows
        this.contracts = body.data.contracts
      })
    }
  }
}

</script>