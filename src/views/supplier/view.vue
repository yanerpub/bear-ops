<template>
    <div class="row">
        <div class="col-sm-3">
            <div class="list-group">
                <a href="#" class="list-group-item active">基本信息</a>
                <a href="#" class="list-group-item list-group-item-action">联系人</a>
                <a href="#" class="list-group-item list-group-item-action">资质</a>
                <a href="#" class="list-group-item list-group-item-action">结算</a>
                <a href="#" class="list-group-item list-group-item-action">账号</a>
                <a href="#" class="list-group-item list-group-item-action disabled">业务</a>
            </div>
        </div>
        <div class="col-sm-9">
            <h3 class="text-center">{{supplier.name}}</h3>
            <div class="row">
                <div class="col-sm-6">
                    <div class="card card-block">
                        <h4 class="card-title">酒店业务</h4>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <router-link class="btn btn-secondary" :to="{ name: 'hotelProductAdd', params: { sid: $route.params.id }}">添加产品</router-link>
                        <router-link class="btn btn-secondary" :to="{ name: 'hotelSupplier', params: { sid: $route.params.id }}">查看产品</router-link>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card card-block">
                        <h3 class="card-title">Special title treatment</h3>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
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
            <hr>
            <div>
                {{supplier}}
            </div>
        </div>
    </div>
</template>

<script>

import { fetchSupplier } from './api'

export default {
  name: 'supplier-view',
  data () {
    return {
      supplier: {}
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
      fetchSupplier(this.$route.params.id, (body) => this.supplier = body.data);
    }
  }
}

</script>
