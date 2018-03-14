<template>
  <div>
    <form>
      <div class="form-group row">
        <label for="name" class="col-xs-2 col-form-label">名称</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="name" v-model="teacher.name">
        </div>
      </div>
      <div class="form-group row">
        <label for="mobile" class="col-xs-2 col-form-label">手机</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="mobile" v-model="teacher.mobile">
        </div>
      </div>
      <div class="form-group row">
        <label for="schoolName" class="col-xs-2 col-form-label">学校</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="schoolName" v-model="teacher.schoolName">
        </div>
      </div>
      <div class="form-group row">
        <label for="introduction" class="col-xs-2 col-form-label">个人简介</label>
        <div class="col-xs-10">
          <textarea rows="3" class="form-control" id="introduction" v-model="teacher.introduction"></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label for="password" class="col-xs-2 col-form-label">创建密码</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="password" v-model="teacher.password">
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="addData">确定</button>
      <router-link class="btn btn-info" :to="{ name: 'teacher'}">返回</router-link>
    </form>
  </div>
</template>

<script>
  import {addTeacher} from './api'

  export default {
    name: 'teacher-input-view',
    data() {
      return {
        teacher: {}
      }
    },
    methods: {
      addData() {
        addTeacher(this.teacher, (body) => {
          this.$router.push('/teacher/')
        })
      }
    }
  }

</script>
