<template>
    <div>
        <form>
            <div class="form-group row">
                <label for="name" class="col-xs-2 col-form-label">Name</label>
                <div class="col-xs-10">
                    <input class="form-control" type="text" id="name" v-model="supplier.name">
                </div>
            </div>
            <div class="form-group row">
                <label for="local" class="col-xs-2 col-form-label">Local</label>
                <div class="col-xs-10">
                    <input class="form-control" type="text" id="local" v-model="supplier.local">
                </div>
            </div>
            <div class="form-group row">
                <label for="city" class="col-xs-2 col-form-label">City</label>
                <div class="col-xs-10">
                    <input class="form-control" type="text" id="city" v-model="supplier.city">
                </div>
            </div>
            <!--<div class="form-group row">
                <label for="telephone" class="col-xs-2 col-form-label">Telephone</label>
                <div class="col-xs-10">
                    <input class="form-control" type="tel" id="telephone" v-model="supplier.telephone">
                </div>
            </div>-->
            <button type="button" class="btn btn-primary" @click="addData">添加</button>
        </form>
    </div>
</template>

<script>
import { addSupplier } from './api'

export default {
  name: 'supplier-add-view',
  data () {
    return {
      supplier: {}
    }
  },
  methods: {
    addData () {
      addSupplier(this.supplier, (body) => {
          console.log(body);
          this.$router.push('/supplier/');
      })
    }
  }
}

</script>
