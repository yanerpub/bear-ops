<template>
  <div>
    <div class="form-group">
      <div class="checkbox" v-for="item in businesses">
        <label>
          <input type="checkbox" :value="item.id" v-model="array">{{item.name}}
        </label>
      </div>
    </div>
    <button type="button" class="btn btn-primary" @click="updateData">变更</button>
    <router-link class="btn btn-info" :to="{ name: 'supplierView', params: { sid: $route.params.sid }}">返回
    </router-link>
  </div>
</template>

<script>
  import {listBusiness, updateBusiness} from './api'
  export default {
    name: 'supplier-business-view',
    data () {
      return {
        array: [],
        businesses: [{id: 2, name: '酒店产品'},{id: 3, name: '会场产品'}]
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        listBusiness(this.$route.params.sid, (body) => {
          var bu = body.data
          for (var obj of bu) {
            this.array.push(obj.treeId)
          }
        })
      },
      updateData () {
        updateBusiness(this.$route.params.sid, this.array, (body) => this.$router.push('/supplier/' + this.$route.params.sid))
      }
    }
  }

</script>
