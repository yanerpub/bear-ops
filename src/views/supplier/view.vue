<template>
  <div class="row">
    <div class="col-sm-9">
      <div class="panel panel-primary">
        <!-- Default panel contents -->
        <div class="panel-heading"><h4><span class="glyphicon glyphicon-apple" aria-hidden="true"></span>{{supplier.name}}</h4></div>
        <table class="table">
          <thead>
          <tr>
            <th>电话</th>
            <th>资质</th>
            <th>网址</th>
            <th>Owner</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{supplier.cellphone}}</td>
            <td>
              <span v-if="supplier.aid > 0">{{supplier.aptitude.number}}</span>
              <span v-else><router-link class="btn btn-secondary" :to="{ name: 'supplierAptitudeView', params: { sid: $route.params.sid }}">补充资质</router-link></span>
            </td>
            <td>{{supplier.website}}</td>
            <td>{{supplier.owner}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="panel panel-primary">
            <div class="panel-heading">酒店业务</div>
            <div class="panel-body">
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <router-link class="btn btn-secondary" :to="{ name: 'hotelProductAdd', params: { sid: $route.params.sid }}">
                添加产品
              </router-link>
              <router-link class="btn btn-secondary" :to="{ name: 'hotelSupplier', params: { sid: $route.params.sid }}">
                查看产品
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="panel panel-primary">
            <div class="panel-heading">Special title treatment</div>
            <div class="panel-body">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item active">
          <a class="nav-link active" data-toggle="tab" href="#refer" role="tab">相关</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#detail" role="tab">详细</a>
        </li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <div class="tab-pane active" id="refer" role="tabpanel">
          联系人、业务机会、产品、文件
        </div>
        <div class="tab-pane" id="detail" role="tabpanel">
          <form class="col-sm-offset-1">
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
              <label class="col-sm-2 col-form-label">Website</label>
              <div class="col-sm-10">
                <p class="form-control-static">{{supplier.website}}</p>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Cellphone</label>
              <div class="col-sm-10">
                <p class="form-control-static">{{supplier.cellphone}}</p>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">telephone</label>
              <div class="col-sm-10">
                <p class="form-control-static">{{supplier.telephone}}</p>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">description</label>
              <div class="col-sm-10">
                <p class="form-control-static">{{supplier.description}}</p>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">address</label>
              <div class="col-sm-10">
                <p class="form-control-static">{{supplier.address}}</p>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">owner</label>
              <div class="col-sm-10">
                <p class="form-control-static">{{supplier.owner}}</p>
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
          </form>
        </div>
      </div>
    </div>
    <div class="col-sm-3">
      活动、日志
    </div>
  </div>
</template>

<script>

  import {fetchSupplier} from './api'

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
        fetchSupplier(this.$route.params.sid, (body) => this.supplier = body.data);
      }
    }
  }

</script>
