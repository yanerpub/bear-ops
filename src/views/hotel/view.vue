<template>
    <div>
        <h3 class="text-center">{{product.name}}</h3>
        <form>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">SID</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{{supplier.sid}}</p>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{{supplier.name}}</p>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Local</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{{supplier.local}}</p>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">City</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{{supplier.city}}</p>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Source</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{{supplier.sourceText}}</p>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">CreateTime</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{{supplier.createTime | timeAgo}}</p>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">ModifyTime</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{{supplier.modifyTime | timeAgo}}</p>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">BD</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{{supplier.userId}}</p>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

import { fetchSupplier } from './api'

export default {
  name: 'hotel-product-view',
  data () {
    return {
      product: {}
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      fetchSupplier(this.$route.params.id, (body) => this.product = body.data);
    }
  }
}

</script>
