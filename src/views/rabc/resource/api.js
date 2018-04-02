import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function fetchTree(callback) {
  Vue.http.get('/ops/resource/').then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function addNode(node, callback) {
  Vue.http.post('/ops/resource/', node).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function updateNode(node, callback) {
  Vue.http.put('/ops/resource/', node).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function removeNode(treeId, callback) {
  Vue.http.delete('/ops/resource/' + treeId).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}
