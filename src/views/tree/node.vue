<template>
    <li>
        <div :class="{bold: isFolder, node: true}" @click="toggle"><!-- @dblclick="changeType">-->
            {{model.name}}
            <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
        </div>
        <ul v-show="open" v-if="isFolder">
            <node class="node" v-for="model in model.children" v-on:choose="choose" :model="model"></node>
            <!--<li class="add" @click="addChild">+</li>-->
        </ul>
    </li>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'node',
  props: {
    model: Object
  },
  data () {
    return {
      open: false
    }
  },
  computed: {
    isFolder () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle () {
      if (this.isFolder) {
        this.open = !this.open
      }
      this.$emit('choose', {id: this.model.id, name: this.model.name})
    },
    changeType () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild () {
      this.model.children.push({
        name: 'new stuff'
      })
    },
    choose (node) {
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