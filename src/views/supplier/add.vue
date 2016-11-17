<template>
  <div>
    <label>sid</label><input v-model="supplier.sid"/><br>
    <label>psid</label><input v-model="supplier.psid"/><br>
    <label>qualificationId</label><input v-model="supplier.qualificationId"/><br>
    <label>name</label><input v-model="supplier.name"/><br>
    <label>local</label><input v-model="supplier.local"/><br>
    <label>userId</label><input v-model="supplier.userId"/><br>
    <button @click="addData">add</button>
  </div>
</template>

<script>
import { addSupplier } from './api'

export default {
  name: 'supplier-add-view',
  data: function () {
    return {
      supplier: {}
    }
  },
  methods: {
    addData: addSupplier
  }
}
</script>
