<template>
  <div class="row">
    <div class="col-sm-7">
      <h3>课程介绍</h3>
      <form>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">案例编号</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" :value="ce.id">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">案例名称</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" :value="ce.name">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">数据介绍</label>
          <div class="col-sm-10">
            <textarea rows="3" readonly class="form-control-plaintext" v-model="ce.description"></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">案例作者</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" :value="ce.authorName">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">上传数据</label>
          <div class="col-sm-10">
            <a :href="ce.attachmentUrl" class="form-control-plaintext" target="_blank">{{ce.attachmentName}}</a>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">案例封面</label>
          <div class="col-sm-10">
            <a :href="ce.coverUrl" class="form-control-plaintext" target="_blank">{{ce.coverName}}</a>
          </div>
        </div>
        <div class="form-group row" v-show="ce.applyStateCode != 1">
          <label class="col-sm-2 col-form-label">案例状态</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" :value="ce.applyStateName">
            <span class="badge badge-secondary" v-show="ce.applyStateCode == 2">驳回原因:{{ce.rejectReason}}</span>
          </div>
        </div>
        <button type="button" class="btn btn-primary" @click="passData" v-show="ce.applyStateCode == 1">通过</button>
        <button type="button" class="btn btn-primary" @click="toRejectData" v-show="ce.applyStateCode == 1">驳回</button>
        <router-link class="btn btn-primary" :to="{ name: 'caseAudit'}">返回</router-link>
      </form>
    </div>
    <div class="col-sm-5">
      <div class="card">
        <div class="card-header">
          <h3>个人信息</h3>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">申请人</label>
              <div class="col-sm-6">
                <input type="text" readonly class="form-control-plaintext" :value="ce.creatorName">
                <span class="badge badge-primary" v-show="stat.type == 3">运营</span>
              </div>
            </div>
            <div class="form-group row" v-show="stat.type != 3">
              <label class="col-sm-4 col-form-label">学校</label>
              <div class="col-sm-6">
                <input type="text" readonly class="form-control-plaintext" :value="stat.schoolName">
              </div>
            </div>
            <div class="form-group row" v-show="stat.type != 3">
              <label class="col-sm-4 col-form-label">个人简介</label>
              <div class="col-sm-6">
                <input type="text" readonly class="form-control-plaintext" :value="stat.introduction">
              </div>
            </div>
            <div class="form-group row" v-show="stat.type != 3">
              <label class="col-sm-4 col-form-label">狗熊案例库</label>
              <div class="col-sm-6">
                <span class="form-control-plaintext">已申请加入{{stat.applyPassCount}}个，驳回{{stat.applyRejectCount}}个</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal fade" id="rejectModal" tabindex="-1" role="dialog" aria-labelledby="rejectModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="rejectModalLabel">驳回原因</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label for="rejectReason" class="col-sm-2 col-form-label">驳回原因</label>
                <div class="col-sm-10">
                  <textarea rows="3" class="form-control" id="rejectReason" v-model="ce.rejectReason" required></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="rejectData()">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {fetchCase, updateCase} from './api'

  export default {
    name: 'case-view',
    data() {
      return {
        ce: {},
        stat: {}
      }
    },
    created() {
      this.queryData()
    },
    computed: {
      totalPage() {
        return parseInt(this.count / this.query.pageSize) + 1
      }
    },
    methods: {
      queryData() {
        fetchCase(this.$route.params.id, (body) => {
          this.ce = body._data.case
          var attachment = JSON.parse(this.ce.attachment)
          this.ce.attachmentName = attachment[0].originalName
          this.ce.attachmentUrl = attachment[0].url
          var cover = JSON.parse(this.ce.cover)
          this.ce.coverName = cover[0].originalName
          this.ce.coverUrl = cover[0].url
          this.stat = body._data.stat
        });
      },
      passData() {
        if (confirm('确定通过？')) {
          this.ce.applyStateCode = 3
          updateCase(this.ce, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('更新失败！');
            }
          })
        }
      },
      toRejectData() {
        $('#rejectModal').modal('show')
      },
      rejectData() {
        if (confirm('确定驳回？')) {
          this.ce.applyStateCode = 2
          updateCase(this.ce, (body) => {
            if (body._data > 0) {
              this.queryData();
              $('#rejectModal').modal('hide')
            } else {
              alert('更新失败！');
            }
          })
        }
      }
    }
  }

</script>
