<template>
  <li class="list-group-item">
    <h5>
      <span class="badge node" :class="{'badge-primary': isMenu, 'badge-secondary': !isMenu}" @click="click">{{model.name}}</span>
      <span class="badge badge-dark">{{model.uri}}</span>
      <span class="node" v-if="isFolder" @click="toggle">[{{open ? '-' : '+'}}]</span>
    </h5>
    <ul v-show="open" v-if="isFolder">
      <node v-for="model in model.children" :key="model.name" v-on:choose="choose" :model="model"></node>
      <!--<li class="add" @click="addChild">+</li>-->
    </ul>
  </li>
</template>
<script>

  export default {
    name: 'node',
    props: {
      model: Object
    },
    data() {
      return {
        open: false
      }
    },
    computed: {
      isFolder() {
        return this.model.children && this.model.children.length
      },
      isMenu() {
        return this.model.typeCode == 1
      }
    },
    methods: {
      click() {
        this.$emit('choose', this.model)
      },
      toggle() {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      choose(node) {
        this.$emit('choose', node)
      }
    }
  }


</script>

<style scoped>
  .node {
    cursor: pointer;
  }
</style>