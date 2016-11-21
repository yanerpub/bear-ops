<template>
    <div class="row">
        <div class="col-sm-4">
            <ul>
                <node class="item" v-on:choose="choose" :model.sync="treeData"></node>
            </ul>
        </div>
        <div class="col-sm-8">
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
                <tr v-for="item in list">
                    <td>
                    <td>{{item.id}}</td>
                    <td>{{item.key}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.type}}</td>
                    <td>{{item.required}}</td>
                    <td>{{item.defaultValue}}</td>
                    <td>{{item.createTime | timeAgo}}</td>
                    <td>{{item.modifyTime | timeAgo}}</td>
                    <td>
                        <router-link :to="{path: item.sid + '/edit'}">修改</router-link>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import node from "./node.vue";
import {listField} from './api'

var data = {
  id: 1,
  name: '酒店产品树',
  children: [
    { id: 2, name: '小时房' },
    { id: 3, name: '团购产品' },
    {
      id: 4, name: '直销产品',
      children: [
        { id: 5, name: '预付产品' },
        { id: 6, name: '现付产品' },
        { id: 7, name: '包房产品' }
      ]
    },
    {
      id: 8, name: '会场产品',
      children: [
        { id: 9, name: '会场预付产品' },
        { id: 10, name: '会场现付产品' }
      ]
    },
    {
      id: 11, name: '增值产品',
      children: [
        { id: 12, name: '美食产品' },
        { id: 13, name: '休闲产品' },
        { id: 14, name: '易耗产品' }
      ]
    }
  ]
}

export default {
    name: 'ptree',
    components: {
        'node': node
    },
    data() {
        return {
            treeData: data,
            selected: 0,
            list:[]
        }
    },
    computed: {
        list () {
          return this.$store.state.list
        }
    },
    watch: {
        selected (val, oldVal) {
          console.log('new: %s, old: %s', val, oldVal)
        }
    },
    methods: {
        choose(id) {
          if (id == this.selected) {
            return;
          }
          this.selected = id;
          listField(this.selected, (body) => this.list = body.data)
        }
    }
}

</script>