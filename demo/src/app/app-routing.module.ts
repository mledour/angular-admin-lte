import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
  path: '',
  data: {
      title: 'Get Started'
  },
  children: [
    {
      path: '',
      component: HomeComponent
    }, {
      path: 'accordion',
      loadChildren: 'app/+accordion/accordion.module#AccordionModule',
      data: {
        title: 'Accordion',
      }
    }, {
      path: 'alert',
      loadChildren: 'app/+alert/alert.module#AlertModule',
      data: {
        title: 'Alert',
      }
    }, {
      path: 'boxs',
      data: {
        title: 'Boxs',
      },
      children: [
        {
          path: 'box',
          loadChildren: 'app/+box-default/box-default.module#BoxDefaultModule',
          data: {
            title: 'Box'
          }
        }, {
          path: 'info-box',
          loadChildren: 'app/+box-info/box-info.module#BoxInfoModule',
          data: {
            title: 'Info Box'
          }
        }, {
          path: 'small-box',
          loadChildren: 'app/+box-small/box-small.module#BoxSmallModule',
          data: {
            title: 'Small Box'
          }
        }
      ]}, {
        path: 'dropdown',
        loadChildren: 'app/+dropdown/dropdown.module#DropdownModule',
        data: {
          title: 'Dropdown',
        }
      }, {
        path: 'tabs',
        loadChildren: 'app/+tabs/tabs.module#TabsModule',
        data: {
          title: 'Tabs',
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*{
    path: '',
    redirectTo: '/dashboards/v1',
    pathMatch: 'full',
    data: {
      title: 'Dashboard',
      description: 'Control panel',
      breadcrumb: 'v1',
      icon: '' // Needed if parent doesn't have a component
    }
  }, {
    path: 'dashboards/v1',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
      description: 'Control panel',
      breadcrumb: 'v1',
      icon: '' // Needed if parent doesn't have a component
    }
  }, {
    path: 'dashboards/v1/v2',
    loadChildren: 'app/+dashboard2/dashboard2.module#Dashboard2Module',
    data: {
      title: 'Dashboard',
      description: 'Version 2.0',
      breadcrumb: 'v2',
      icon: '' // Needed if parent doesn't have a component
    }
  }, {
    path: 'widgets/:id',
    loadChildren: 'app/+dashboard2/dashboard2.module#Dashboard2Module',
    data: {
      title: 'Dashboards',
      icon: 'fa fa-home',
    }
  }



  /*, {
    path: 'number',
    component: NumberComponent,
    data: {
      title: 'Number',
      description: 'The number :toto component',
      icon: 'fa fa-home'
    },
    children: [{
      path: ':toto',
      component: NumberComponent,
      data: {
        title: 'Number :toto',
        breadcrumb: ':toto',
        description: 'The number :toto component'
      }
    }]
  }*/
