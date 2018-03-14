import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../views/index.vue';

import resourceIndex from '../views/rabc/resource/index.vue';
import groupIndex from '../views/rabc/group/index.vue';
import operatorIndex from '../views/rabc/operator/index.vue';
import teacherApplyIndex from '../views/user/teacherApply/index.vue';
import teacherIndex from '../views/user/teacher/index.vue';
import teacherInputIndex from '../views/user/teacher/input.vue';
import teacherCourseIndex from '../views/user/teacher/course.vue';
import teacherStudentIndex from '../views/user/teacher/student.vue';
import studentIndex from '../views/user/student/index.vue';
import studentCourseIndex from '../views/user/student/course.vue';
import courseIndex from '../views/course/index.vue';
import courseViewIndex from '../views/course/view.vue';

export default new Router({
  mode: 'hash',
  saveScrollPosition: true,
  routes: [
    {path: '/', name: 'home', component: index},
    {path: '/resource', name: 'resource', component: resourceIndex},
    {path: '/group', name: 'group', component: groupIndex},
    {path: '/operator', name: 'operator', component: operatorIndex},
    {path: '/teacherApply', name: 'teacherApply', component: teacherApplyIndex},
    {path: '/teacher', name: 'teacher', component: teacherIndex},
    {path: '/teacher/input', name: 'teacherInput', component: teacherInputIndex},
    {path: '/teacher/:id/course', name: 'teacherCourse', component: teacherCourseIndex},
    {path: '/teacher/:id/student', name: 'teacherStudent', component: teacherStudentIndex},
    {path: '/student', name: 'student', component: studentIndex},
    {path: '/student/:id/course', name: 'studentCourse', component: studentCourseIndex},
    {path: '/course', name: 'course', component: courseIndex},
    {path: '/course/:id', name: 'courseView', component: courseViewIndex},
    /*{
      path: '/', component: index,
      children: [
        {
          path: 'supplier', component: supplierIndex,
          children: [
            {
              path: 'list', component: supplierList
            },
            {
              path: 'add', component: supplierAdd
            },
            {
              path: ':id', component: supplierDetail
            },
            {
              path: ':id/edit', component: supplierEdit
            }
          ]
        },
        {
          path: 'teacher', component: supplierIndex,
          children: [
            {
              path: 'list', component: supplierList
            },
            {
              path: 'add', component: supplierAdd
            },
            {
              path: ':id', component: supplierDetail
            },
            {
              path: ':id/edit', component: supplierEdit
            }
          ]
        }
      ]
    },*/
    {path: '*', redirect: '/'}
  ]
})
