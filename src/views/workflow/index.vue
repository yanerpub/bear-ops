<template>
  <div class="row">
    <div class="col-sm-3">
      <div class="list-group">
        <a href="#" class="list-group-item active">
          我的流程
        </a>
        <a href="#" class="list-group-item">变更通知</a>
      </div>
    </div>
    <div class="col-sm-9">
      <iframe width="100%" height="500px" src="http://demo.bpmn.io/new"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'workflow-view'
}
</script>