(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{uMO5:function(n,e,o){"use strict";o.r(e),o.d(e,"CustomModule",function(){return c});var t=o("ofXK"),r=o("tyNb"),a=o("wZee"),i=o("fXoL"),l=o("R/To");const s=[{path:"",component:(()=>{class n{ngAfterViewInit(){a.highlightAll()}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=i.Cb({type:n,selectors:[["ng-component"]],decls:27,vars:4,consts:[["header","About custom layout",3,"isCollapsable","isRemovable"],["routerLink","/login"],["routerLink","/register"],["header","Configuration",3,"isCollapsable","isRemovable"],[1,"language-typescript"],[1,"language-html"]],template:function(n,e){1&n&&(i.Pb(0,"mk-box",0),i.Pb(1,"p"),i.rc(2,"You can completely disable layout components to create custom page layout like "),i.Pb(3,"a",1),i.rc(4,"Login"),i.Ob(),i.rc(5," and "),i.Pb(6,"a",2),i.rc(7,"Register"),i.Ob(),i.rc(8," pages."),i.Ob(),i.Ob(),i.Pb(9,"mk-box",3),i.Pb(10,"p"),i.rc(11,"First you will need to import LayoutService and subscribe to isCustomLayout in the main app component:"),i.Ob(),i.Pb(12,"pre"),i.Pb(13,"code",4),i.rc(14,"import { Component, OnInit } from '@angular/core';\nimport { LayoutService } from '../../../src';\n\n@Component({\n  selector: 'app-root',\n  templateUrl: './app.component.html'\n})\nexport class AppComponent implements OnInit {\n  public isCustomLayout: boolean;\n\n  constructor(\n    private layoutService: LayoutService\n  ) {}\n\n  ngOnInit() {\n    this.layoutService.isCustomLayout.subscribe((value: boolean) => {\n      this.isCustomLayout = value;\n    });\n  }\n}"),i.Ob(),i.Ob(),i.Kb(15,"br"),i.Pb(16,"p"),i.rc(17,"Wrap the main component html like so:"),i.Ob(),i.Pb(18,"pre"),i.Pb(19,"code",5),i.rc(20,'<ng-container *ngIf="isCustomLayout else noCustomLayout">\n  <router-outlet></router-outlet>\n</ng-container>\n<ng-template #layoutEnabled>\n  <mk-layout-wrapper>\n    ...\n  </mk-layout-wrapper>\n<ng-template>'),i.Ob(),i.Ob(),i.Kb(21,"br"),i.Pb(22,"p"),i.rc(23,"Configure the router:"),i.Ob(),i.Pb(24,"pre"),i.Pb(25,"code",4),i.rc(26,"\n  ...\n  , {\n    path: 'login',\n    loadChildren: 'app/login/login.module#LoginModule',\n    data: {\n      customLayout: true\n    }\n  },\n  ...\n"),i.Ob(),i.Ob(),i.Ob()),2&n&&(i.cc("isCollapsable",!1)("isRemovable",!1),i.wb(9),i.cc("isCollapsable",!1)("isRemovable",!1))},directives:[l.h,r.h],styles:[""]}),n})()}];let u=(()=>{class n{}return n.\u0275mod=i.Gb({type:n}),n.\u0275inj=i.Fb({factory:function(e){return new(e||n)},imports:[[r.i.forChild(s)],r.i]}),n})(),c=(()=>{class n{}return n.\u0275mod=i.Gb({type:n}),n.\u0275inj=i.Fb({factory:function(e){return new(e||n)},imports:[[t.b,r.i,u,l.m]]}),n})()}}]);