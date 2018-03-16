<template>
  <div>
    <form>
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">案例名称</label>
        <div class="col-sm-10">
          <input class="form-control" type="text" id="name" v-model="ce.name">
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
          <input class="form-control" type="text" id="attachment" v-model="ce.attachment">
        </div>
      </div>
      <div class="form-group row">
        <label for="cover" class="col-sm-2 col-form-label">案例封面</label>
        <div class="col-sm-10">
          <input class="form-control" type="text" id="cover" v-model="ce.cover">
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="addData">确定</button>
      <router-link class="btn btn-primary" :to="{ name: 'case'}">返回</router-link>
    </form>
  </div>
</template>

<script>
  import {addCase} from './api'

  export default {
    name: 'case-input-view',
    data() {
      return {
        ce: {}
      }
    },
    methods: {
      addData() {
        addCase(this.ce, (body) => {
          this.$router.push('/case/')
        })
      }
    }
  }

</script>
