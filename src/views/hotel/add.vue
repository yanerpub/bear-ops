<template>
    <div>
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
            Launch demo modal
        </button>
        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
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
            <button type="button" class="btn btn-primary" @click="addData">添加</button>
        </form>
    </div>
</template>

<script>
import { addProduct } from './api'

export default {
  name: 'hotel-product-add-view',
  data () {
    return {
      supplier: {}
    }
  },
  methods: {
    addData () {
      addProduct(this.supplier, (body) => {
          console.log(body);
          this.$router.push('/supplier/');
      })
    }
  }
}

</script>
