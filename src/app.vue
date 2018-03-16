<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light rounded" v-if="user">
      <div class="container">
        <a class="navbar-brand" href="#">BEAR SCHOOL</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsCol"
                aria-controls="navbarsCol" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsCol">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown active" v-for="item in menu">
              <a class="nav-link dropdown-toggle" href="#" :id="item.id" data-toggle="dropdown" aria-haspopup="true"
                 aria-expanded="false">{{item.name}}</a>
              <div class="dropdown-menu" :aria-labelledby="item.id">
                <router-link v-for="child in item.children" class="dropdown-item" :to="child.uri">{{child.name}}
                </router-link>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav navbar-right">
            <li class="nav-item dropdown active">
              <a class="nav-link dropdown-toggle" href="#" id="sysnemu" data-toggle="dropdown" aria-haspopup="true"
                 aria-expanded="false">{{user.name}}</a>
              <div class="dropdown-menu" aria-labelledby="sysnemu">
                <router-link class="dropdown-item" to="/resource/">资源菜单</router-link>
                <a class="dropdown-item" href="#">退出</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'app-view',
    data() {
      return {
        menu: [],
        user: {}
      }
    },
    created() {
      this.queryData()
    },
    methods: {
      queryData() {
        Vue.http.get('/ops/user/').then(function ({body}) {
          //console.log(body);
        });
        this.menu = [
          {
            "id": 1,
            "name": "角色管理",
            "uri": "/group",
            "children": [
              {
                "id": 2,
                "name": "角色管理",
                "uri": "/group"
              },
              {
                "id": 3,
                "name": "用户管理",
                "uri": "/operator"
              }
            ]
          },
          {
            "id": 4,
            "name": "用户管理",
            "uri": "/teacherApply",
            "children": [
              {
                "id": 5,
                "name": "老师入驻",
                "uri": "/teacherApply"
              },
              {
                "id": 6,
                "name": "老师管理",
                "pid": 4,
                "uri": "/teacher"
              },
              {
                "id": 7,
                "name": "学生管理",
                "pid": 4,
                "uri": "/student"
              }
            ]
          },
          {
            "id": 8,
            "name": "课程管理",
            "pid": 0,
            "uri": "/course",
            "children": [
              {
                "id": 9,
                "name": "课程管理",
                "pid": 8,
                "uri": "/course"
              }
            ]
          },
          {
            "id": 10,
            "name": "狗熊案例库",
            "pid": 0,
            "uri": "/case",
            "children": [
              {
                "id": 11,
                "name": "案例审核",
                "pid": 10,
                "uri": "/case/audit"
              },
              {
                "id": 12,
                "name": "案例管理",
                "pid": 10,
                "uri": "/case"
              }
            ]
          },
          {
            "id": 13,
            "name": "通知管理",
            "pid": 0,
            "uri": "/notice",
            "children": [
              {
                "id": 14,
                "name": "通知管理",
                "pid": 13,
                "uri": "/notice"
              }
            ]
          },
          {
            "id": 15,
            "name": "讨论管理",
            "pid": 0,
            "uri": "/comment",
            "children": [
              {
                "id": 16,
                "name": "讨论管理",
                "pid": 15,
                "uri": "/comment"
              }
            ]
          }
        ];
        this.user = {id: 1, name: "test"}
        if (!this.user) {
          this.$router.push('/signIn')
        }
      }
    }
  }
</script>