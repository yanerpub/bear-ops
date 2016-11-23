<template>
    <div class="row">
        <div class="col-sm-4">
            <ul>
                <node class="item" v-on:choose="choose" :model.sync="treeData"></node>
            </ul>
        </div>
        <div class="col-sm-8">
            <h2>{{selectedNodeName}}</h2>
            <div v-show="action == 'list'">
                <form class="form-inline">
                    <button type="button" class="btn btn-secondary" @click="toAdd">添加</button>
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
                    <tr v-for="item in copyList">
                        <td>{{item.id}}</td>
                        <td>{{item.key}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.required}}</td>
                        <td>{{item.defaultValue}}</td>
                        <td>{{item.createTime | timeAgo}}</td>
                        <td>{{item.modifyTime | timeAgo}}</td>
                        <td>
                            <button type="button" class="btn btn-secondary" @click="toEdit(item)">修改</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div v-show="action != 'list'">
                <form>
                    <h3 v-show="action == 'add'">添加</h3>
                    <h3 v-show="action == 'edit'">修改</h3>
                    <div class="form-group row">
                        <label for="key" class="col-xs-2 col-form-label">Key</label>
                        <div class="col-xs-6">
                            <input class="form-control" type="text" id="key" v-model="field.key" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="name" class="col-xs-2 col-form-label">Name</label>
                        <div class="col-xs-6">
                            <input class="form-control" type="text" id="name" v-model="field.name" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="type" class="col-xs-2 col-form-label">Type</label>
                        <div class="col-xs-6">
                            <select id="type" class="form-control" v-model="field.type">
                                <option value="text">text</option>
                                <option value="password">password</option>
                                <option value="checkbox">checkbox</option>
                                <option value="radio">radio</option>
                                <option value="select">select</option>
                                <option value="textarea">textarea</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-xs-2 col-form-label">Required</label>
                        <div class="col-xs-6">
                            <label class="form-check-inline">
                                <input type="radio" name="required" value="true" v-model="field.required">是
                            </label>
                            <label class="form-check-inline">
                                <input type="radio" name="required" value="false" v-model="field.required" />否
                            </label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="default" class="col-xs-2 col-form-label">Default</label>
                        <div class="col-xs-6">
                            <input class="form-control" type="text" id="default" v-model="field.defaultValue">
                        </div>
                    </div>
                    <div class="form-group row" v-show="hasOptions">
                        <hr>
                        <label class="col-xs-2 col-form-label">OptionValue</label>
                        <div class="col-xs-10">
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
                                    <button type="button" class="btn btn-primary" @click="field.optionalValues.splice(index, 1)">-</button>
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
import Vue from 'vue'
import node from "./node.vue"
import {queryTree} from '../api'
import {listField, addField, updateField} from './api'

export default {
    name: 'tree',
    components: {
        'node': node
    },
    data() {
        return {
            treeData: {},
            field: {type: 'text', required: 'true', optionalValues: [{value: '', name: ''}]},
            selectedNodeId: 0,
            selectedNodeName: '',
            selectedFieldId: 0,
            state: 'list',
            list:[]
        }
    },
    created () {
      this.fetchData()
    },
    computed: {
        copyList () {
          return this.list
        },
        action () {
          return this.state
        },
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
          queryTree((body) => {
            this.treeData = body.data
            this.selectedNodeId = this.treeData.id
            this.selectedNodeName = this.treeData.name
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
          this.field.treeId = this.selectedNodeId
          addField(this.field, (body) => {
            listField(this.selectedNodeId, (body) => this.list = body.data)
            this.state = 'list'
          })
        },
        updateData () {
          updateField(this.field, (body) => {
            listField(this.selectedNodeId, (body) => this.list = body.data)
            this.state = 'list'
          })
        },
        addValue () {
          this.field.optionalValues.push({value: '', name: ''});
        },
        // 子组件事件
        choose(node) {
          if (node.id == this.selectedNodeId) {
            return;
          }
          this.selectedNodeId = node.id
          this.selectedNodeName = node.name
          listField(this.selectedNodeId, (body) => this.list = body.data)
          this.state = 'list'
        }
    }
}
</script>