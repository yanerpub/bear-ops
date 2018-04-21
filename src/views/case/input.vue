<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3>添加案例</h3>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">案例名称</label>
            <div class="col-sm-10">
              <input class="form-control" type="text" id="name" v-model="ce.name">
            </div>
          </div>
          <div class="form-group row">
            <label for="industry" class="col-sm-2 col-form-label">行业</label>
            <div class="col-sm-10">
              <select id="industry" class="form-control" v-model="ce.industryId">
                <option v-for="op in industries" :value="op.id">{{op.name}}</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label for="introduction" class="col-sm-2 col-form-label">数据介绍</label>
            <div class="col-sm-10">
              <textarea rows="3" class="form-control" id="introduction" v-model="ce.description"></textarea>
            </div>
          </div>
          <div class="form-group row">
            <label for="authorName" class="col-sm-2 col-form-label">案例作者</label>
            <div class="col-sm-10">
              <input class="form-control" type="text" id="authorName" v-model="ce.authorName">
            </div>
          </div>
          <div class="form-group row">
            <label for="attachment" class="col-sm-2 col-form-label">上传数据</label>
            <div class="col-sm-10">
              <iframe id="attachment" name="attachment" src="basic.html" width="100%" height="100px" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
            </div>
          </div>
          <div class="form-group row">
            <label for="cover" class="col-sm-2 col-form-label">案例封面</label>
            <div class="col-sm-10">
              <iframe id="cover" name="cover" src="basic.html" width="100%" height="100px" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
            </div>
          </div>
          <button type="button" class="btn btn-primary" @click="addData">确定</button>
          <router-link class="btn btn-primary" :to="{ name: 'case'}">返回</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {addCase, listIndustry} from './api'

  export default {
    name: 'case-input-view',
    data() {
      return {
        industries: [],
        ce: {}
      }
    },
    created() {
      this.queryData()
    },
    methods: {
      queryData() {
        listIndustry((body) => {
          this.industries = body._data
        });
      },
      addData() {
        this.ce.attachment = window.frames["attachment"].document.getElementById("files").value;
        this.ce.cover = window.frames["cover"].document.getElementById("files").value;
        addCase(this.ce, (body) => {
          if (body._data > 0) {
            this.$router.push('/case/');
          } else {
            alert('添加失败！');
          }
        })
      }
    }
  }

</script>
