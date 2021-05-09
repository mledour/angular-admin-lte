(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{HlH6:function(e,t,n){"use strict";n.r(t),n.d(t,"ContentModule",function(){return d});var o=n("ofXK"),r=n("tyNb"),s=n("wZee"),a=n("fXoL"),i=n("R/To");const p=[{path:"",component:(()=>{class e{ngAfterViewInit(){s.highlightAll()}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Cb({type:e,selectors:[["app-content"]],decls:11,vars:4,consts:[["header","About content component",3,"isCollapsable","isRemovable"],["header","Routing module example",3,"isCollapsable","isRemovable"],[1,"language-typescript"]],template:function(e,t){1&e&&(a.Pb(0,"mk-box",0),a.Pb(1,"p"),a.rc(2,"The content component is used for displaying router outlet, page title, page description and breadcrumbs."),a.Kb(3,"br"),a.rc(4," Page title, page description and breadcrumbs can be configured in app routing module via the data property of routes."),a.Kb(5,"br"),a.rc(6," Page title use title property, page description use description property and breadcrumbs use breadcrumbs property or title property if breadcrumbs is not defined."),a.Ob(),a.Ob(),a.Pb(7,"mk-box",1),a.Pb(8,"pre"),a.Pb(9,"code",2),a.rc(10,"const routes: Routes = [{\n  path: '',\n  data: {\n    title: 'Home'\n  }, children: [{\n    path: '',\n    component: HomeComponent\n  }, {\n    path: 'page',\n    loadChildren: 'app/+page/page.module#PageModule',\n    data: {\n      title: 'Accordion',\n    }\n  }, {\n    path: 'posts',\n    data: {\n      title: 'Posts',\n      description: 'All the posts',\n      breadcrumbs: 'Posts'\n    },\n    children: [{\n      path: '',\n      loadChildren: 'app/posts/posts.module#PostsModule',\n    }, {\n      path: ':id',\n      loadChildren: 'app/post/post.module#PostModule',\n      data: {\n        title: 'Post :id',\n        description: 'Post N\xb0:id description',\n        breadcrumbs: 'Post :id'\n      }\n    }]\n  }\n}]\n"),a.Ob(),a.Ob(),a.Ob()),2&e&&(a.cc("isCollapsable",!1)("isRemovable",!1),a.wb(7),a.cc("isCollapsable",!1)("isRemovable",!1))},directives:[i.h],styles:[""]}),e})()}];let l=(()=>{class e{}return e.\u0275mod=a.Gb({type:e}),e.\u0275inj=a.Fb({factory:function(t){return new(t||e)},imports:[[r.i.forChild(p)],r.i]}),e})(),d=(()=>{class e{}return e.\u0275mod=a.Gb({type:e}),e.\u0275inj=a.Fb({factory:function(t){return new(t||e)},imports:[[o.b,l,i.m]]}),e})()}}]);