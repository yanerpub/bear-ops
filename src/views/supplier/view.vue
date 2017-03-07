<template>
  <div class="row">
    <div class="col-sm-9">
      <div class="panel panel-primary">
        <!-- Default panel contents -->
        <div class="panel-heading">
          <h4><span class="glyphicon glyphicon-apple" aria-hidden="true"></span>{{supplier.name}}</h4>
        </div>
        <table class="table">
          <thead>
          <tr>
            <th>电话/邮箱</th>
            <th>资质</th>
            <th>网址</th>
            <th>Owner</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              {{supplier.cellphone}}<br>{{supplier.email}}
            </td>
            <td>
              <router-link :to="{ name: 'supplierAptitudeEdit', params: { sid: $route.params.sid, id: supplier.aid }}" v-if="supplier.aid > 0">
                {{supplier.aptitudeVo.number}}
              </router-link>
              <router-link :to="{ name: 'supplierAptitudeAdd', params: { sid: $route.params.sid }}" v-else>
                补充资质
              </router-link>
            </td>
            <td>{{supplier.website}}</td>
            <td>{{supplier.owner}}</td>
            <td><router-link :to="{ name: 'supplierEdit', params: { sid: $route.params.sid }}">修改</router-link></td>
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
          <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel panel-default">
              <div class="panel-heading" role="tab" id="headingContact">
                <h4 class="panel-title">
                  <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseContact" aria-expanded="true" aria-controls="collapseContact">
                    联系人{{stat.contact}}
                  </a>
                </h4>
              </div>
              <div id="collapseContact" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingContact">
                <div class="panel-body">
                  <button type="button" class="btn btn-secondary" @click="fetchContact">查询</button>
                  <router-link :to="{ name: 'supplierContactAdd', params: { sid: $route.params.sid }}">添加</router-link>
                  <table class="table">
                    <thead>
                    <tr>
                      <th>id</th>
                      <th>name</th>
                      <th>cellphone</th>
                      <th>telephone</th>
                      <th>email</th>
                      <th>position</th>
                      <th>createTime</th>
                      <th>modifyTime</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in contacts">
                      <td><router-link :to="{ name: 'supplierContactEdit', params: { sid: $route.params.sid, id: item.id }}">{{item.id}}</router-link></td>
                      <td>{{item.name}}</td>
                      <td>{{item.cellphone}}</td>
                      <td>{{item.telephone}}</td>
                      <td>{{item.email}}</td>
                      <td>{{item.position}}</td>
                      <td>{{item.createTime | timeAgo}}</td>
                      <td>{{item.modifyTime | timeAgo}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading" role="tab" id="headingAccount">
                <h4 class="panel-title">
                  <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseAccount" aria-expanded="false" aria-controls="collapseAccount">
                    结算{{stat.account}}
                  </a>
                </h4>
              </div>
              <div id="collapseAccount" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingAccount">
                <div class="panel-body">
                  <button type="button" class="btn btn-secondary" @click="fetchAccount">查询</button>
                  <router-link :to="{ name: 'supplierAccountAdd', params: { sid: $route.params.sid }}">添加</router-link>
                  <table class="table">
                    <thead>
                    <tr>
                      <th>id</th>
                      <th>bank</th>
                      <th>name</th>
                      <th>number</th>
                      <th>currency</th>
                      <th>state</th>
                      <th>createTime</th>
                      <th>modifyTime</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in accounts">
                      <td><router-link :to="{ name: 'supplierAccountEdit', params: { sid: $route.params.sid, id: item.id }}">{{item.id}}</router-link></td>
                      <td>{{item.bank}}</td>
                      <td>{{item.name}}</td>
                      <td>{{item.number}}</td>
                      <td>{{item.currencyText}}</td>
                      <td>{{item.stateText}}</td>
                      <td>{{item.createTime | timeAgo}}</td>
                      <td>{{item.modifyTime | timeAgo}}</td>
                      <td>
                        <button type="button" class="btn btn-default" @click="freezeAccount(item)" v-show="item.state == 'UNFREEZE'">冻结</button>
                        <button type="button" class="btn btn-default" @click="unfreezeAccount(item)" v-show="item.state == 'FREEZE'">解冻</button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading" role="tab" id="headingUser">
                <h4 class="panel-title">
                  <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseUser" aria-expanded="false" aria-controls="collapseUser">
                    用户{{stat.user}}
                  </a>
                </h4>
              </div>
              <div id="collapseUser" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingUser">
                <div class="panel-body">
                  <button type="button" class="btn btn-secondary" @click="fetchUser">查询</button>
                  <router-link :to="{ name: 'supplierUserAdd', params: { sid: $route.params.sid }}">添加</router-link>
                  <table class="table">
                    <thead>
                    <tr>
                      <th>id</th>
                      <th>type</th>
                      <th>value</th>
                      <th>createTime</th>
                      <th>modifyTime</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in users">
                      <td><router-link :to="{ name: 'supplierUserEdit', params: { sid: $route.params.sid, id: item.id }}">{{item.id}}</router-link></td>
                      <td>{{item.typeText}}</td>
                      <td>{{item.value}}</td>
                      <td>{{item.createTime | timeAgo}}</td>
                      <td>{{item.modifyTime | timeAgo}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading" role="tab" id="headingProduct">
                <h4 class="panel-title">
                  <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">
                    产品
                  </a>
                </h4>
              </div>
              <div id="collapseProduct" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingProduct">
                <div class="panel-body">
                  功能待加
                </div>
              </div>
            </div>
          </div>
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
              <label class="col-sm-2 col-form-label">email</label>
              <div class="col-sm-10">
                <p class="form-control-static">{{supplier.email}}</p>
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

  import {fetchSupplier, fetchStat, listContact, listAccount, updateAccountState, listUser} from './api'

  export default {
    name: 'supplier-view',
    data () {
      return {
        supplier: {},
        stat: {},
        contacts: [],
        accounts: [],
        users: []
      }
    },
    created () {
      this.fetchData()
    },
    computed: {
      userList () {
        return this.users
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        fetchSupplier(this.$route.params.sid, (body) => this.supplier = body.data);
        fetchStat(this.$route.params.sid, (body) => this.stat = body.data);
      },
      fetchContact () {
        listContact(this.$route.params.sid, (body) => this.contacts = body.data);
      },
      fetchAccount () {
        listAccount(this.$route.params.sid, (body) => this.accounts = body.data);
      },
      freezeAccount (item) {
        updateAccountState(item.sid, item.id, 1, (body) => {
          this.fetchAccount();
        });
      },
      unfreezeAccount (item) {
        updateAccountState(item.sid, item.id, 2, (body) => {
          this.fetchAccount();
        });
      },
      fetchUser () {
        listUser(this.$route.params.sid, (body) => this.users = body.data);
      }
    }
  }

</script>
