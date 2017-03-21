<template>
  <div class="row">
    <div class="col-sm-9">
      <div class="panel panel-primary">
        <!-- Default panel contents -->
        <div class="panel-heading">
          <h4><span class="glyphicon glyphicon-apple" aria-hidden="true"></span>{{supplier.name}}/{{supplier.sid}}</h4>
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
              <div v-if="supplier.aid > 0">
                <span>{{supplier.aptitudeVo.typeText}}-{{supplier.aptitudeVo.number}}</span><br>{{supplier.aptitudeVo.stateText}}状态
                <router-link :to="{ name: 'supplierAptitudeEdit', params: { sid: $route.params.sid, id: supplier.aid }}">编辑</router-link>
              </div>
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
                    联系人{{supplier.contactCount}}
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
                      <th>名称</th>
                      <th>手机</th>
                      <th>座机</th>
                      <th>邮箱</th>
                      <th>职位</th>
                      <th>创建时间</th>
                      <th>修改时间</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in contacts">
                      <td>{{item.name}}</td>
                      <td>{{item.cellphone}}</td>
                      <td>{{item.telephone}}</td>
                      <td>{{item.email}}</td>
                      <td>{{item.position}}</td>
                      <td>{{item.createTime | timeAgo}}</td>
                      <td>{{item.modifyTime | timeAgo}}</td>
                      <td><router-link :to="{ name: 'supplierContactEdit', params: { sid: $route.params.sid, id: item.id }}">编辑</router-link></td>
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
                    结算{{supplier.accountCount}}
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
                      <th>银行</th>
                      <th>户主名</th>
                      <th>账号</th>
                      <th>币种</th>
                      <th>状态</th>
                      <th>创建时间</th>
                      <th>修改时间</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in accounts">
                      <td>{{item.bank}}</td>
                      <td>{{item.name}}</td>
                      <td>{{item.number}}</td>
                      <td>{{item.currencyText}}</td>
                      <td>{{item.stateText}}</td>
                      <td>{{item.createTime | timeAgo}}</td>
                      <td>{{item.modifyTime | timeAgo}}</td>
                      <td>
                        <router-link :to="{ name: 'supplierAccountEdit', params: { sid: $route.params.sid, id: item.id }}">编辑</router-link>
                        <button type="button" class="btn btn-default btn-xs" @click="freezeAccount(item)" v-show="item.state == 'UNFREEZE'">冻结</button>
                        <button type="button" class="btn btn-default btn-xs" @click="unfreezeAccount(item)" v-show="item.state == 'FREEZE'">解冻</button>
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
                    用户{{supplier.userCount}}
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
                      <th>类型</th>
                      <th>用户</th>
                      <th>创建时间</th>
                      <th>修改时间</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in users">
                      <td>{{item.typeText}}</td>
                      <td>{{item.value}}</td>
                      <td>{{item.createTime | timeAgo}}</td>
                      <td>{{item.modifyTime | timeAgo}}</td>
                      <td><router-link :to="{ name: 'supplierUserEdit', params: { sid: $route.params.sid, id: item.id }}">编辑</router-link></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading" role="tab" id="headingBusiness">
                <h4 class="panel-title">
                  <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseBusiness" aria-expanded="false" aria-controls="collapseBusiness">
                    产品线{{supplier.businessCount}}
                  </a>
                </h4>
              </div>
              <div id="collapseBusiness" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingBusiness">
                <div class="panel-body">
                  <button type="button" class="btn btn-secondary" @click="fetchBusiness">查询</button>
                  <router-link :to="{ name: 'supplierBusiness', params: { sid: $route.params.sid }}">变更</router-link>
                  <table class="table">
                    <thead>
                    <tr>
                      <th>产品线</th>
                      <th>创建时间</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in businesses">
                      <td>{{item.name}}</td>
                      <td>{{item.createTime | timeAgo}}</td>
                      <td>
                        <router-link :to="{ name: 'hotelSupplier', params: { sid: $route.params.sid }}">
                          查看产品
                        </router-link>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="detail" role="tabpanel">
          <br><br>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">SID</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{supplier.sid}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">名称</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{supplier.name}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">网站</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{supplier.website}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">手机</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{supplier.cellphone}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">座机</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{supplier.telephone}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">邮箱</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{supplier.email}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">描述</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{supplier.description}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">地址</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{supplier.address}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">负责人</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{supplier.owner}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">创建时间</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{supplier.createTime | timeAgo}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">更新时间</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{supplier.modifyTime | timeAgo}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-3">
      活动、日志
    </div>
  </div>
</template>

<script>

  import {fetchSupplier, listBusiness, listContact, listAccount, updateAccountState, listUser} from './api'

  export default {
    name: 'supplier-view',
    data () {
      return {
        supplier: {},
        stat: {},
        contacts: [],
        accounts: [],
        users: [],
        businesses: []
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
      },
      fetchBusiness () {
        listBusiness(this.$route.params.sid, (body) => this.businesses = body.data);
      }
    }
  }

</script>
