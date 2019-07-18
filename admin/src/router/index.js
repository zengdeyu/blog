import Vue from 'vue'
import Router from 'vue-router'


const Admin = (resolve) => {import('../components/Admin').then((module) => {resolve(module)})};
const ArticleList = (resolve) => {import('../components/ArticleList').then((module) => {resolve(module)})};
const Tag = (resolve) => {import('../components/Tag').then((module) => {resolve(module)})};
const Tool = (resolve) => {import('../components/Tool').then((module) => {resolve(module)})};
const Draft = (resolve) => {import('../components/Draft').then((module) => {resolve(module)})};
const Comment = (resolve) => {import('../components/Comment').then((module) => {resolve(module)})};
const User = (resolve) => {import('../components/User').then((module) => {resolve(module)})};
const Edit = (resolve) => {import('../components/Edit').then((module) => {resolve(module)})};
const editTag = (resolve) => {import('../components/editTag').then((module) => {resolve(module)})};
const editTool = (resolve) => {import('../components/editTool').then((module) => {resolve(module)})};
const editDraft = (resolve) => {import('../components/editDraft').then((module) => {resolve(module)})};
const editUser = (resolve) => {import('../components/editUser').then((module) => {resolve(module)})};

Vue.use(Router)

export default new Router({
    mode:'history',
  routes: [{
      path:'/',
      redirect:'/admin'
  },
    {
      path: '/',
      name: 'admin',
      component: Admin
    },
      {
          path: '/articlelist',
          name: 'ArticleList',
          component: ArticleList
      },
      {
          path: '/tag',
          name: 'Tag',
          component: Tag
      }
      ,
      {
          path: '/tool',
          name: 'Tool',
          component: Tool
      }
      ,
      {
          path: '/draft',
          name: 'Draft',
          component: Draft
      },
      {
          path: '/comment',
          name: 'Comment',
          component: Comment
      }
      ,
      {
          path: '/user',
          name: 'User',
          component: User
      }
      ,
      {
          path: '/edit/:id',
          name: 'Edit',
          component: Edit
      },
      {
          path: '/edittag/:id',
          name: 'editTag',
          component: editTag
      },
      {
          path: '/edittool/:id',
          name: 'editTool',
          component: editTool
      },
    {
      path: '/editdraft/:id',
      name: 'editDraft',
      component: editDraft
    },
      {
          path: '/edituser/:id',
          name: 'editUser',
          component: editUser
      }
  ]
})
