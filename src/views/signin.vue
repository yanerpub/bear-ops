<template>
  <div class="text-center">
    <form class="form-signin">
      <img class="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">登录</h1>
      <label for="mobile" class="sr-only">手机号</label>
      <input type="text" id="mobile" class="form-control" placeholder="手机号" v-model="sign.mobile" required autofocus>
      <label for="inputPassword" class="sr-only">密码</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="密码" v-model="sign.password" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> 记住
        </label>
      </div>
      <div class="alert alert-danger" role="alert" v-show="!success">
        {{error}}
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="button" @click="login">登录</button>
    </form>
  </div>
</template>
<script>
  import Vue from 'vue'

  export default {
    name: 'sign-in-view',
    data() {
      return {
        sign: {},
        success: true,
        error: ''
      }
    },
    methods: {
      doPost(data, callback) {
        Vue.http.post('/ops/sign/in/', data).then(function ({body}) {
          callback(body);
        });
      },
      login() {
        this.doPost(this.sign, (body) => {
          if (body._code != '000000') {
            this.success = false;
            this.error = body._msg;
          } else {
            this.$router.push('/')
          }
        });
      }
    }
  }
</script>

<style>
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin .checkbox {
    font-weight: 400;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>