<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only">Seq</label>
        <input type="text" v-model="query.seq" class="form-control" placeholder="Seq">
      </div>
      <div class="form-group">
        <label class="sr-only">Name</label>
        <input type="text" v-model="query.name" class="form-control" placeholder="Name">
      </div>
      <button type="button" class="btn btn-primary" @click="queryData">查询</button>
      <button type="button" class="btn btn-primary" @click="toAddStore">添加</button>
    </form>
    <table class="table">
      <thead>
      <tr>
        <th>id</th>
        <th>seq</th>
        <th>name</th>
        <th>telephone</th>
        <th>source</th>
        <th>state</th>
        <th>createTime</th>
        <th>modifyTime</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.seq}}</td>
        <td>{{item.name}}</td>
        <td>{{item.telephone}}</td>
        <td>{{item.sourceText}}</td>
        <td>{{item.stateText}}</td>
        <td>{{item.createTime | timeAgo}}</td>
        <td>{{item.modifyTime | timeAgo}}</td>
        <td>
          <router-link :to="{ name: 'hotelStoreRoom', params: { seq: item.seq }}">房型</router-link>
          <button class="btn btn-default" @click="toEditStore(item)">修改</button>
        </td>
      </tr>
      </tbody>
    </table>
    {{totalPage}}
    <div class="modal fade" id="storeModal" tabindex="-1" role="dialog" aria-labelledby="storeModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="storeModalLabel"><span v-show="create">创建</span><span v-show="!create">更新</span></h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label for="name" class="col-xs-2 col-form-label">Name</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="name" v-model="store.name" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="telephone" class="col-xs-2 col-form-label">Telephone</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="telephone" v-model="store.telephone" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="address" class="col-xs-2 col-form-label">Address</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="address" v-model="store.address" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="coordinate" class="col-xs-2 col-form-label">Coordinate</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="coordinate" v-model="store.coordinate" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="source" class="col-xs-2 col-form-label">Source</label>
                <div class="col-xs-10">
                  <select id="source" class="form-control" v-model="store.sourceCode">
                    <option v-for="op in storeSources" :value="op.code">{{op.name}}</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" v-show="create" @click="addStore">创建</button>
            <button type="button" class="btn btn-primary" v-show="!create" @click="updateStore">更新</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {fetchEnums, listStore, addStore, updateStore} from './api'

  export default {
    name: 'hotel-store-view',
    data() {
      return {
        query: {pageNow: 1, pageSize: 10, sortKey: ''},
        list: [],
        count: 0,
        storeSources: [],
        store: {},
        create: false
      }
    },
    computed: {
      totalPage () {
        return parseInt(this.count / this.query.pageSize) + 1
      }
    },
    created () {
      this.queryData()
    },
    methods: {
      queryData () {
        listStore(this.query, (body) => {
          this.list = body.data.list
          this.count = body.data.total
        });
      },
      toAddStore () {
        fetchEnums('store', (body) => {
          this.storeSources = body.data.storeSources
          this.create = true
          $('#storeModal').modal('show');
          this.store = {sourceCode: 1}
        });
      },
      toEditStore (item) {
        fetchEnums('store', (body) => {
          this.storeSources = body.data.storeSources
          this.create = false
          $('#storeModal').modal('show');
          this.store = item
        });
      },
      addStore () {
        addStore(this.store, (body) => {
          $('#storeModal').modal('hide')
          this.queryData()
        })
      },
      updateStore () {
        updateStore(this.store, (body) => {
          $('#storeModal').modal('hide')
          this.queryData()
        })
      }
    }
  }

</script>
