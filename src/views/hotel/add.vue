<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content" :model="treeData">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">{{treeData.name}}</h4>
          </div>
          <div class="modal-body">
            <ul>
              <li v-for="model in treeData.children">
                <div>
                  {{model.name}}
                  <span v-if="isFolder(model)"></span>
                  <span v-else><button type="button" class="btn btn-primary btn-sm"
                                       @click="choose(model)">确认</button></span>
                </div>
                <ul v-if="isFolder">
                  <li v-for="model in model.children">
                    <div>
                      {{model.name}}
                      <span v-if="isFolder(model)"></span>
                      <span v-else><button type="button" class="btn btn-primary btn-sm"
                                           @click="choose(model)">确认</button></span>
                    </div>
                    <ul v-if="isFolder">
                      <li v-for="model in model.children" :model="treeData">
                        <div>
                          {{model.name}}
                          <span v-if="isFolder(model)"></span>
                          <span v-else><button type="button" class="btn btn-primary btn-sm"
                                               @click="choose(model)">确认</button></span>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <form v-show="show">
      <h3>{{template.name}}</h3>
      <div class="form-group row">
        <label for="name" class="col-xs-2 col-form-label">Name</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="name" v-model="product.name">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-xs-2 col-form-label">effectDate</label>
        <div class="col-xs-10">
          <!--<datepicker v-model="product.effectDateFmt"></datepicker>-->
          <input class="form-control" type="text" id="effectDate" v-model="product.effectDateFmt">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-xs-2 col-form-label">expireDate</label>
        <div class="col-xs-10">
          <!--<datepicker v-model="product.expireDateFmt"></datepicker>-->
          <input class="form-control" type="text" id="expireDate" v-model="product.expireDateFmt">
        </div>
      </div>
      <div class="form-group row">
        <label for="remark" class="col-xs-2 col-form-label">remark</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="remark" v-model="product.remark">
        </div>
      </div>
      <hr>
      <div class="form-group row" v-for="field in fields">
        <label class="col-xs-2 col-form-label">{{field.name}}</label>
        <div class="col-xs-10">
          <input v-if="field.type == 'text'" class="form-control" type="text" v-model="product.fieldMap[field.key]"
                 :required="field.required">
          <input v-if="field.type == 'password'" class="form-control" type="password"
                 v-model="product.fieldMap[field.key]" :required="field.required">
          <textarea rows="3" v-if="field.type == 'textarea'" class="form-control" v-model="product.fieldMap[field.key]"
                    :required="field.required"></textarea>
          <checkbox v-if="field.type == 'checkbox'" :field-key="field.key" :default-value="product.fieldMap[field.key]"
                    :optional-values="field.optionalValues" v-on:joinValue="joinValue"></checkbox>
          <div v-if="field.type == 'radio'">
            <label class="form-check-inline" v-for="op in field.optionalValues">
              <input class="form-check-input" type="radio" :name="field.key" :value="op.value"
                     v-model="product.fieldMap[field.key]"> {{op.name}}
            </label>
          </div>
          <div v-if="field.type == 'select'">
            <select class="form-control" v-model="product.fieldMap[field.key]" :required="field.required">
              <option v-for="op in field.optionalValues" :value="op.value">{{op.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <hr>
      <div class="form-group row">
        <label class="col-xs-2 col-form-label">服务合同协议</label>
        <div class="col-xs-10">
          <div class="form-check" v-for="contract in contracts">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox" v-model="product.contractArray" :value="contract.id">
              <a target="new" href="/contract/#">《{{contract.name}}》</a>
              <span v-if="contract.treeId == template.id" class="alert alert-warning alert-dismissible fade in" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <strong>required!</strong> checked.
              </span>
            </label>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="addData">添加</button>
      <router-link class="btn btn-secondary" :to="{ name: 'hotelSupplier', params: { sid: $route.params.sid }}">返回
      </router-link>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import checkbox from "./checkbox.vue"
import { queryTree, fetchTemplate, addProduct } from './api'

export default {
  name: 'hotel-product-add-view',
  data () {
    return {
      format: 'yyyy-MM-dd',
      product: {fieldMap: {}, contractArray: []},
      treeData: {},
      template: {},
      fields: [],
      contracts: [],
      disabled: {},
      show: false
    }
  },
  components: {
    checkbox
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
  computed: {
  },
  methods: {
    fetchData () {
      queryTree((body) => {
        this.treeData = body.data
        $('#myModal').modal('show')
      });
    },
    isFolder (model) {
      return model.children &&
        model.children.length
    },
    choose (model) {
      this.template = {'id': model.id, 'name': model.name}
      $('#myModal').modal('hide')
      // 异步取数据然后show
      fetchTemplate(this.template.id, (body) => {
        this.fields = body.data.fieldList
        this.contracts = body.data.contractList
        // 域初始值
        for (let item of this.fields) {
          this.product.fieldMap[item.key] = item.defaultValue
        }

        // 合同初始值
        for (let item of this.contracts) {
          if (item.treeId == this.template.id) {
            this.product.contractArray.push(item.id)
            break
          }
        }
        this.show = true
      })
    },
    joinValue (data) {
      this.product.fieldMap[data.key] = data.value
    },
    addData () {
      this.product.sid = this.$route.params.sid;
      this.product.treeId = this.template.id;
      addProduct(this.product, (body) => {
        this.$router.push({ name: 'hotelSupplier', params: { sid: this.$route.params.sid }})
      })
    }
  }
}

</script>
