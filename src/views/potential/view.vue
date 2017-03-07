<template>
  <div>
    <div class="row">
      <div class="col-sm-12" id="console">
      </div>
      <div class="col-sm-2">
        <label class="form-control">
          <input type="radio" name="optionsRadios" value="1" v-model="potential.stateCode" :disabled="state == 4">
          New<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        </label>
      </div>
      <div class="col-sm-2">
        <label class="form-control">
          <input type="radio" name="optionsRadios" value="2" v-model="potential.stateCode" :disabled="state == 4">
          Working<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        </label>
      </div>
      <div class="col-sm-2">
        <label class="form-control">
          <input type="radio" name="optionsRadios" value="3" v-model="potential.stateCode" :disabled="state == 4">
          Nurturing<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        </label>
      </div>
      <div class="col-sm-2">
        <label class="form-control">
          <input type="radio" name="optionsRadios" value="4" v-model="potential.stateCode" :disabled="state == 4">
          Transferred<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        </label>
      </div>
      <div class="col-sm-2">
        <button type="button" class="btn btn-primary form-control" @click="updateState" :disabled="state == 4">
          标记为已完成<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
        </button>
      </div>
      <div class="col-lg-2">
        <router-link :to="{ name: 'potentialEdit', params: { id: $route.params.id }}">修改</router-link>
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
        联系日志、新建任务、电子邮件
      </div>
      <div class="tab-pane" id="detail" role="tabpanel">
        <form class="col-sm-offset-1">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">id</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.id}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.name}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Terms</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.terms}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Cellphone</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.cellphone}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">telephone</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.telephone}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">email</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.email}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Position</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.position}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Character</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.character}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Company</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.company}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Industry</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.industryText}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">StaffCount</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.staffCount}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Source</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.sourceText}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">address</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.address}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Sid</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.sid}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">owner</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.owner}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">CreateTime</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.createTime | timeAgo}}</p>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">ModifyTime</label>
            <div class="col-sm-10">
              <p class="form-control-static">{{potential.modifyTime | timeAgo}}</p>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="potentialModal" tabindex="-1" role="dialog" aria-labelledby="potentialModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="potentialModalLabel">潜在客户转化</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label for="owner" class="col-xs-2 col-form-label">Owner</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="owner" v-model="potential.owner">
                </div>
              </div>
              <div class="form-group row">
                <label for="qid" class="col-xs-2 col-form-label">客户QID</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" id="qid" v-model="potential.qid">
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="transfer">转化</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {fetchPotential, updatePotentialState, transfer} from './api'

  export default {
    name: 'potential-view',
    data () {
      return {
        state: 0,
        potential: {}
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
        fetchPotential(this.$route.params.id, (body) => {
          this.potential = body.data
          this.state = this.potential.stateCode
        });
      },
      updateState () {
        if (this.potential.stateCode == '4') {
          $('#potentialModal').modal('show');
        } else {
          updatePotentialState(this.$route.params.id, this.potential.stateCode, (body) => {
            if (body.status == 0) {
              $('#console').html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>提示!</strong> 修改成功</div>');
            } else {
              $('#console').html('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>提示!</strong> 修改失败</div>');
            }
          });
        }
      },
      transfer () {
        var obj = {owner: this.potential.owner, sid: this.potential.sid};
        transfer(this.$route.params.id, obj, (body) => {
          $('#potentialModal').modal('hide')
          if (body.status == 0) {
            this.state = 4;
            $('#console').html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>提示!</strong> 修改成功</div>');
          } else {
            $('#console').html('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>提示!</strong> 修改失败</div>');
          }
        })
      }
    }
  }

</script>
