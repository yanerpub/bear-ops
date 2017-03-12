<template>
  <div>
    <form class="form-inline">
      <h3>{{$route.params.seq}}-房型</h3>
      <button type="button" class="btn btn-primary" @click="toAddRoom">添加</button>
      <router-link :to="{ name: 'hotelStore', params: { seq: $route.params.seq }}" aria-pressed="true">返回</router-link>
    </form>
    <table class="table">
      <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>bedCount</th>
        <th>hasWindow</th>
        <th>createTime</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.bedCount}}</td>
        <td>{{item.hasWindow}}</td>
        <td>{{item.createTime | timeAgo}}</td>
        <td>
          <button class="btn btn-default" @click="toEditRoom(item)">修改</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="modal fade" id="roomModal" tabindex="-1" role="dialog" aria-labelledby="roomModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="roomModalLabel"><span v-show="create">创建</span><span v-show="!create">更新</span></h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label for="name" class="col-xs-2 col-form-label">Name</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="name" v-model="room.name" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="bedCount" class="col-xs-2 col-form-label">BedCount</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="bedCount" v-model="room.bedCount" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="hasWindow" class="col-xs-2 col-form-label">HasWindow</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="hasWindow" v-model="room.hasWindow" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="picture" class="col-xs-2 col-form-label">picture</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="picture" v-model="room.picture" required>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" v-show="create" @click="addRoom">创建</button>
            <button type="button" class="btn btn-primary" v-show="!create" @click="updateRoom">更新</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {listRoom, addRoom, updateRoom} from './api'

  export default {
    name: 'hotel-store-room-view',
    data() {
      return {
        list: [],
        room: {},
        create: false
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        listRoom(this.$route.params.seq, (body) => {
          this.list = body.data
        });
      },
      toAddRoom () {
        this.create = true
        $('#roomModal').modal('show');
        this.room = {}
      },
      toEditRoom (item) {
        this.create = false
        $('#roomModal').modal('show');
        this.room = item
      },
      addRoom () {
        addRoom(this.$route.params.seq, this.room, (body) => {
          $('#roomModal').modal('hide')
          this.fetchData()
        })
      },
      updateRoom () {
        updateRoom(this.$route.params.seq, this.room, (body) => {
          $('#roomModal').modal('hide')
          this.fetchData()
        })
      }
    }
  }

</script>
