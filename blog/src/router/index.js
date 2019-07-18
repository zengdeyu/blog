import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

const Index = (resolve) => {
  import('../components/index').then((module) => {
    resolve(module)
  })
};

const Article = (resolve) => {
  import('../components/Article').then((module) => {
    resolve(module)
  })
};
const Tag = (resolve) => {
  import('../components/Tag').then((module) => {
    resolve(module)
  })
};
const Tool = (resolve) => {
  import('../components/Tool').then((module) => {
    resolve(module)
  })
};
const Music = (resolve) => {
  import('../components/Music').then((module) => {
    resolve(module)
  })
};
const Search = (resolve) => {
  import('../components/Search').then((module) => {
    resolve(module)
  })
};
const About = (resolve) => {
  import('../components/About').then((module) => {
    resolve(module)
  })
};
const SongMenu = (resolve) => {
  import('../components/SongMenu').then((module) => {
    resolve(module)
  })
};
const ArticleDetail = (resolve) => {
  import('../components/ArticleDetail').then((module) => {
    resolve(module)
  })
};const ToolDetail = (resolve) => {
  import('../components/ToolDetail').then((module) => {
    resolve(module)
  })
};
const TagDetail = (resolve) => {
  import('../base/TagDetail').then((module) => {
    resolve(module)
  })
};
const TagList = (resolve) => {
  import('../base/TagList').then((module) => {
    resolve(module)
  })
};
const notfound = (resolve) => {
  import('../components/notFound').then((module) => {
    resolve(module)
  })
};

export default new Router({
  mode: 'history',
  routes: [
    {
      //文章首页页面
      path: '/',
      component: Index,
      redirect: '/article',
      children: [
        {
          path: '/article',
          component: Article,
        },
        {
          path: '/tag',
          component: Tag,
          children: [
            {
              path: '',
              component: TagList
            },
            {
              path: ':tags',
              component: TagDetail
            }]
        },
        {
          path: '/tool',
          component: Tool
        }
        ,
        {
          path: '/music',
          component: Music,
          children: [{
            path: ':id',
            component: SongMenu
          }]
        },
        {
          path: '/about',
          component: About
        },
        {
          //搜索页面
          path: '/search',
          component: Search,
        },
      ]
    },
    {
      //文章详情页面
      name: 'read',
      path: '/read/:id',
      component: ArticleDetail,
    },
    {
      //杂项详情页面
      name: 'readtool',
      path: '/readtool/:id',
      component: ToolDetail,
    },
    {
      //歌单详情页面
      name: 'musicmenu',
      path: '/disc',
      component: SongMenu,
    },
    {
      path:'*',
      component:notfound,
      meta:{title:'页面走丢了'}
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
