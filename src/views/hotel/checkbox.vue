<template>
    <div>
        <label class="form-check-inline" v-for="op in optionalValues">
            <input class="form-check-input" type="checkbox" :value="op.value" v-model="checkedValues"> {{op.name}}
        </label>
    </div>
</template>
<script>
export default {
  name: 'join-checkbox',
  props: {
    fieldKey: {
      type: String,
      required: true
    },
    defaultValue: {
      type: String,
      required: true
    },
    optionalValues: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      checkedValues: []
    }
  },
  created () {
    this.initChecked()
  },
  watch: {
    checkedValues (val, oldVal) {
      //console.log('new: %s, old: %s', val, oldVal)
      this.$emit('joinValue', {key: this.fieldKey, value: this.checkedValues.join('#')})
    }
  },
  methods: {
    initChecked () {
      this.checkedValues = this.defaultValue.split('#')
    }
  }
}
</script>
