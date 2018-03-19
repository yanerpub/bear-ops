import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    callback(body);
  });
}

export function listCommentStat(queryParams, callback) {
  Vue.http.get('/ops/comment/stat', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function listComment(courseId, queryParams, callback) {
  Vue.http.get('/ops/course/' + courseId + '/comment/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function deleteComment(id, callback) {
  Vue.http.delete('/ops/comment/' + id).then(function ({body}) {
    callback(body);
  });
}

export function deleteCommentAnswer(id, callback) {
  Vue.http.delete('/ops/commentAnswer/' + id).then(function ({body}) {
    callback(body);
  });
}

export function listCommentAnswer(id, callback) {
  Vue.http.get('/ops/comment/' + id + '/answer').then(function ({body}) {
    callback(body);
  });
}