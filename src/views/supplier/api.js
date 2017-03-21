import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    callback(body);
  });
}

export function listBusiness(sid, callback) {
  Vue.http.get('/supplier/' + sid + '/business').then(function ({body}) {
    callback(body);
  });
}

export function updateBusiness(sid, array, callback) {
  Vue.http.put('/supplier/' + sid + '/business', array).then(function ({body}) {
    callback(body);
  });
}

export function listSupplier(queryParams, callback) {
  Vue.http.get('/supplier/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function addSupplier(supplier, callback) {
  Vue.http.post('/supplier/', supplier).then(function ({body}) {
    callback(body);
  });
}

export function fetchSupplier(sid, callback) {
  Vue.http.get('/supplier/' + sid).then(function ({body}) {
    callback(body);
  });
}

export function updateSupplier(supplier, callback) {
  Vue.http.put('/supplier/', supplier).then(function ({body}) {
    callback(body);
  });
}

export function fetchAptitude(sid, id, callback) {
  Vue.http.get('/supplier/' + sid + '/aptitude/' + id).then(function ({body}) {
    callback(body);
  });
}

export function addAptitude(sid, aptitude, callback) {
  Vue.http.post('/supplier/' + sid + '/aptitude', aptitude).then(function ({body}) {
    callback(body);
  });
}

export function updateAptitude(sid, aptitude, callback) {
  Vue.http.put('/supplier/' + sid + '/aptitude', aptitude).then(function ({body}) {
    callback(body);
  });
}

export function listContact(sid, callback) {
  Vue.http.get('/supplier/' + sid + '/contact').then(function ({body}) {
    callback(body);
  });
}

export function fetchContact(sid, id, callback) {
  Vue.http.get('/supplier/' + sid + '/contact/' + id).then(function ({body}) {
    callback(body);
  });
}

export function addContact(sid, contact, callback) {
  Vue.http.post('/supplier/' + sid + '/contact', contact).then(function ({body}) {
    callback(body);
  });
}

export function updateContact(sid, contact, callback) {
  Vue.http.put('/supplier/' + sid + '/contact', contact).then(function ({body}) {
    callback(body);
  });
}

export function listAccount(sid, callback) {
  Vue.http.get('/supplier/' + sid + '/account').then(function ({body}) {
    callback(body);
  });
}

export function fetchAccount(sid, id, callback) {
  Vue.http.get('/supplier/' + sid + '/account/' + id).then(function ({body}) {
    callback(body);
  });
}

export function addAccount(sid, account, callback) {
  Vue.http.post('/supplier/' + sid + '/account', account).then(function ({body}) {
    callback(body);
  });
}

export function updateAccount(sid, account, callback) {
  Vue.http.put('/supplier/' + sid + '/account', account).then(function ({body}) {
    callback(body);
  });
}

export function updateAccountState(sid, id, state, callback) {
  Vue.http.put('/supplier/' + sid + '/account/' + id + '/state', state).then(function ({body}) {
    callback(body);
  });
}

export function listUser(sid, callback) {
  Vue.http.get('/supplier/' + sid + '/user').then(function ({body}) {
    callback(body);
  });
}

export function fetchUser(sid, id, callback) {
  Vue.http.get('/supplier/' + sid + '/user/' + id).then(function ({body}) {
    callback(body);
  });
}

export function addUser(sid, user, callback) {
  Vue.http.post('/supplier/' + sid + '/user', user).then(function ({body}) {
    callback(body);
  });
}

export function updateUser(sid, user, callback) {
  Vue.http.put('/supplier/' + sid + '/user', user).then(function ({body}) {
    callback(body);
  });
}