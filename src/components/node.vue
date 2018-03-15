<template>
  <li class="list-group-item">
    <div :class="{bold: isFolder, node: true}" @click="click" @dblclick="toggle">
      <span class="label label-primary">{{model.name}}</span>
      <span class="label label-warning">{{model.typeName}}</span>
      <span class="label label-info">{{model.stateName}}</span>
      <span class="label label-success">{{model.uri}}</span>
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <node class="node" v-for="model in model.children" :key="model.name" v-on:choose="choose" :model="model"></node>
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

  .bold {
    font-weight: bold;
  }

  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }

</style>