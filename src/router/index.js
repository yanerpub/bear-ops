import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../views/index.vue';
import signInIndex from '../views/signin.vue';

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
import caseIndex from '../views/case/index.vue';
import caseInputIndex from '../views/case/input.vue';
import caseAuditIndex from '../views/case/audit.vue';
import caseViewIndex from '../views/case/view.vue';
import noticeIndex from '../views/notice/index.vue';
import noticeInputIndex from '../views/notice/input.vue';
import noticeViewIndex from '../views/notice/view.vue';

export default new Router({
  mode: 'hash',
  saveScrollPosition: true,
  routes: [
    {path: '/', name: 'home', component: index},
    {path: '/signIn', name: 'signIn', component: signInIndex},
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
    {path: '/case', name: 'case', component: caseIndex},
    {path: '/case/input', name: 'caseInput', component: caseInputIndex},
    {path: '/case/audit', name: 'caseAudit', component: caseAuditIndex},
    {path: '/case/:id', name: 'caseView', component: caseViewIndex},
    {path: '/notice', name: 'notice', component: noticeIndex},
    {path: '/notice/input', name: 'noticeInput', component: noticeInputIndex},
    {path: '/notice/:id', name: 'noticeView', component: noticeViewIndex},
    {path: '*', redirect: '/'}
  ]
})
