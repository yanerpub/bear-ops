<template>
    <div>
        {{data}}
        <p>
            问题0：局部注册是这么写吗？难道真的是要把子组件的tag写到父组件的template里？
            问题1：使用Vue.js最开始的目的就是为了减少用字符串拼接HTML，提高代码的可维护程度，虽然现在已经减少了很多字符串拼接的情况，但是在组件这里又不可避免的使用到拼接，有没有更合理的组件使用方式以减少这种拼接情况带来得不便。
        </p>
    </div>
</template>
<script>
export default {
  name: 'index-view',
  data () {
    return {
      data: 'index'
    }
  }
}
</script>