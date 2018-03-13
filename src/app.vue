<template>
  <div class="container">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">BEAR</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="dropdown" v-for="item in menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{item.name}} <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li v-for="child in item.children"><router-link :to="child.uri">{{child.name}}</router-link></li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">管理员 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><router-link to="/resource/">资源菜单</router-link></li>
                <li role="separator" class="divider"></li>
                <li><a href="#">退出</a></li>
              </ul>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import Vue from 'vue'
// menu
export default {
  name: 'app-view',
  data() {
    return {
      menu: [
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
          "uri": "/user",
          "children": [
            {
              "id": 5,
              "name": "老师入驻",
              "uri": "/teacher"
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
              "uri": "/caseauth"
            },
            {
              "id": 12,
              "name": "案例管理",
              "pid": 10,
              "uri": "/caseops"
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
      ],
      user: {}
    }
  },
  created () {
    this.queryData()
  },
  methods: {
    queryData () {
      Vue.http.get('/ops/menu/').then(function ({body}) {
        console.log(body);
      });
    }
  }
}
</script>