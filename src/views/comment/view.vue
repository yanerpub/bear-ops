<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form class="form-inline">
          <div class="form-group row mr-2">
            <label for="keyword">关键字</label>
            <input type="text" id="keyword" v-model="query.keyword" class="form-control mx-sm-4">
          </div>
          <button type="button" class="btn btn-primary mr-2" @click="queryData">查询</button>
          <router-link class="btn btn-primary" :to="{ name: 'comment'}">返回</router-link>
        </form>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>序号</th>
        <th>内容</th>
        <th>时间</th>
        <th>发贴人</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{item.id}}</td>
        <td>{{item.content}}</td>
        <td>{{item.createTime | timeAgo }}</td>
        <td>{{item.creatorName }}</td>
        <td>
          <button type="button" class="btn btn-link" @click="viewComment(item)">查看</button>
          <button type="button" class="btn btn-link" @click="deleteComment(item.id)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <nav>
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item active"><a class="page-link" href="#">{{query.pageNow}}</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
        <li class="page-item">
          <span class="page-link">共{{totalPage}}页</span>
        </li>
      </ul>
    </nav>

    <div class="modal fade" id="viewModal" tabindex="-1" role="dialog" aria-labelledby="viewModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewModalLabel">{{comment.content}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <div class="list-group">
              <div class="list-group-item list-group-item-action flex-column align-items-start" v-for="item in answers">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{item.name}}</h5>
                  <small>{{item.createTime | timeAgo}}</small>
                </div>
                <p class="mb-1">
                  {{item.content}}
                  <button type="button" class="close" aria-label="Close" @click="deleteAnswer(item.id)">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </p>
                <small>{{item.typeName}}</small>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {deleteComment, deleteCommentAnswer, listComment, listCommentAnswer} from './api'

  export default {
    name: 'comment-list-view',
    data() {
      return {
        query: {pageNow: 1, pageSize: 10},
        list: [],
        count: 0,
        answers:[],
        comment:{}
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
        listComment(this.$route.params.id, this.query, (body) => {
          this.list = body._data.list
          this.count = body._data.total
        });
      },
      viewComment(item) {
        this.comment = item;
        listCommentAnswer(item.id, (body) => {
          this.answers = body._data
          $('#viewModal').modal('show')
        });
      },
      deleteComment(id) {
        if (confirm('确定删除？')) {
          deleteComment(id, (body) => {
            if (body._data > 0) {
              this.queryData();
            } else {
              alert('删除失败！');
            }
          })
        }
      },
      deleteAnswer(id) {
        if (confirm('确定删除？')) {
          deleteCommentAnswer(id, (body) => {
            if (body._data > 0) {
              viewComment(this.comment);
            } else {
              alert('删除失败！');
            }
          })
        }
      }
    }
  }

</script>
