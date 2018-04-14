<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form class="form-inline">
          <router-link class="btn btn-primary" :to="{ name: 'case'}">返回</router-link>
          <button type="button" class="btn btn-primary" @click="toAddIndustry">添加</button>
        </form>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>ID</th>
        <th>名称</th>
        <th>创建时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.createTime | timeAgo}}</td>
        <td>
          <button type="button" class="btn btn-link" @click="toUpdateIndustry(item)">更新</button>
          <button type="button" class="btn btn-link" @click="deleteIndustry(item.id)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="modal fade" id="industryModal" tabindex="-1" role="dialog" aria-labelledby="industryModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="industryModalLabel"><span v-show="create">创建</span><span
              v-show="!create">更新</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label">名称</label>
                <div class="col-sm-10">
                  <input class="form-control" type="text" id="name" v-model="inputIndustry.name" required>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" v-show="create" @click="addIndustry">创建</button>
            <button type="button" class="btn btn-primary" v-show="!create" @click="updateIndustry">
              更新
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {listIndustry, addIndustry, updateIndustry, deleteIndustry} from './api'
  
  export default {
    name: 'group',
    data() {
      return {
        list: [],
        inputIndustry: {},
        create: false
      }
    },
    created() {
      this.queryData()
    },
    methods: {
      queryData() {
        listIndustry((body) => {
          this.list = body._data
        });
      },
      toAddIndustry() {
        this.create = true
        $('#industryModal').modal('show')
      },
      addIndustry() {
        if (!this.inputIndustry) {
          alert('请输入结点信息');
          return;
        }
        addIndustry(this.inputIndustry, (body) => {
          this.queryData();
          $('#industryModal').modal('hide')
        })
      },
      toUpdateIndustry(item) {
        this.create = false
        this.inputIndustry = item
        $('#industryModal').modal('show')
      },
      updateIndustry() {
        if (confirm('确定更新？')) {
          updateIndustry(this.inputIndustry, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('更新失败！');
            }
            $('#industryModal').modal('hide')
          })
        }
      },
      deleteIndustry(id) {
        if (confirm('确定删除？')) {
          deleteIndustry(id, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('删除失败！');
            }
          })
        }
      }
    }
  }

</script>
