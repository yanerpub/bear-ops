<template>
    <div>
        <form class="form-inline">
            <div class="form-group">
                <label class="sr-only" for="name">Name</label>
                <input type="text" v-model="query.name" class="form-control" id="name" placeholder="Name">
            </div>
            <button type="button" class="btn btn-secondary" @click="queryData">查询</button>
            <router-link class="btn btn-secondary" role="button" :to="{ name: 'hotelProductAdd', params: { sid: sid }}" aria-pressed="true">添加</router-link>
        </form>
        <table class="table">
            <thead>
            <tr>
                <th>id</th>
                <th>sid</th>
                <th>treeId</th>
                <th>name</th>
                <th>state</th>
                <th>userId</th>
                <th>effectDate</th>
                <th>expireDate</th>
                <th>createTime</th>
                <th>modifyTime</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
                <td>
                    <router-link :to="{ name: 'hotelProduct', params: { sid: sid, id: item.id }}">{{item.id}}</router-link>
                </td>
                <td>{{item.sid}}</td>
                <td>{{item.treeId}}</td>
                <td>{{item.name}}</td>
                <td>{{item.stateText}}</td>
                <td>{{item.userId}}</td>
                <td>{{item.effectDate}}</td>
                <td>{{item.expireDate}}</td>
                <td>{{item.createTime | timeAgo}}</td>
                <td>{{item.modifyTime | timeAgo}}</td>
                <td>
                    <router-link :to="{ name: 'hotelProductEdit', params: { sid: sid, id: item.id }}">修改</router-link>
                </td>
            </tr>
            </tbody>
        </table>
        {{totalPage}}
    </div>
</template>

<script>
import {listProduct} from './api'

export default {
  name: 'hotel-product-supplier-view',
  data() {
    return {
        query: {pageNow: 1, pageSize: 10, sortKey: ''},
        sid: this.$route.params.sid
    }
  },
  computed: {
    list () {
      return this.$store.state.list
    },
    totalPage () {
        return parseInt(this.$store.state.count / this.query.pageSize) + 1
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.query.sid = this.$route.params.sid
      listProduct(this.query, (body) => {
        this.$store.commit("setList", body.data.list);
        this.$store.commit("setCount", body.data.total);
      })
    },
    queryData () {
      listProduct(this.query, (body) => {
        this.$store.commit("setList", body.data.list);
        this.$store.commit("setCount", body.data.total);
      })
    }
  }
}
</script>
