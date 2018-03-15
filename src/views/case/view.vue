<template>
  <div class="container">
    <h3>课程介绍</h3>
    <form class="form-horizontal">
      <div class="form-group row">
        <label for="id" class="col-xs-2 col-form-label">案例编号</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="id" v-model="ce.id" disabled>
        </div>
      </div>
      <div class="form-group row">
        <label for="name" class="col-xs-2 col-form-label">案例名称</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="name" v-model="ce.name" disabled>
        </div>
      </div>
      <div class="form-group row">
        <label for="introduction" class="col-xs-2 col-form-label">数据介绍</label>
        <div class="col-xs-10">
          <textarea rows="3" class="form-control" id="introduction" v-model="ce.description" disabled></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label for="authorName" class="col-xs-2 col-form-label">案例作者</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="authorName" v-model="ce.authorName" disabled>
        </div>
      </div>
      <div class="form-group row">
        <label for="attachment" class="col-xs-2 col-form-label">上传数据</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="attachment" v-model="ce.attachment" disabled>
        </div>
      </div>
      <div class="form-group row">
        <label for="cover" class="col-xs-2 col-form-label">案例封面</label>
        <div class="col-xs-10">
          <input class="form-control" type="text" id="cover" v-model="ce.cover" disabled>
        </div>
      </div>
      <div class="form-group row" v-show="ce.applyStateCode != 1">
        <label class="col-xs-2 col-form-label">案例状态</label>
        <div class="col-xs-10">
          <p class="form-control-static">{{ce.applyStateName}}<span v-show="ce.applyStateCode == 2">-驳回原因:{{ce.rejectReason}}</span></p>
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="passData" v-show="ce.applyStateCode == 1">通过</button>
      <button type="button" class="btn btn-primary" @click="toRejectData" v-show="ce.applyStateCode == 1">驳回</button>
      <router-link class="btn btn-info" :to="{ name: 'caseAudit'}">返回</router-link>
    </form>
    <div class="pull-right">
      <div>
        <h4>个人信息</h4>
        <p>{{ce.creatorName}}</p>
        <p>{{stat.schoolName}}</p>
        <p>{{stat.introduction}}</p>
        <p>狗熊案例库：已申请加入{{stat.applyPassCount}}个，驳回{{stat.applyRejectCount}}个</p>
      </div>
    </div>
    <div class="modal fade" id="rejectModal" tabindex="-1" role="dialog" aria-labelledby="rejectModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="rejectModalLabel">驳回原因</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="rejectReason" class="col-xs-2 col-form-label">驳回原因</label>
                <div class="col-xs-10">
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
            } else {
              alert('更新失败！');
            }
          })
          $('#rejectModal').modal('hide')
        }
      }
    }
  }

</script>
