<template>
  <div>
    <div class="form-group row">
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
  import {listAllBusiness, listBusiness, updateBusiness} from './api'
  export default {
    name: 'supplier-business-view',
    data () {
      return {
        array: [],
        businesses: []
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
            console.log(obj)
            this.array.push(obj.treeId)
          }
        });
        listAllBusiness((body) => this.businesses = body.data);
      },
      updateData () {
        updateBusiness(this.$route.params.sid, this.array, (body) => this.$router.push('/supplier/' + this.$route.params.sid))
      }
    }
  }

</script>
