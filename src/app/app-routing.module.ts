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
      loadChildren: () => import('./+accordion/accordion.module').then(m => m.AccordionModule),
      data: {
        title: 'Accordion'
      }
    }, {
      path: 'alert',
      loadChildren: () => import('./+alert/alert.module').then(m => m.AlertModule),
      data: {
        title: 'Alert',
      }
    }, {
      path: 'layout',
      data: {
        title: 'Layout',
      },
      children: [
        {
          path: 'configuration',
          loadChildren: () => import('./+layout/configuration/configuration.module').then(m => m.ConfigurationModule),
          data: {
            title: 'Configuration'
          }
        }, {
          path: 'custom',
          loadChildren: () => import('./+layout/custom/custom.module').then(m => m.CustomModule),
          data: {
            title: 'Disable Layout'
            // disableLayout: true
          }
        }, {
          path: 'content',
          loadChildren: () => import('./+layout/content/content.module').then(m => m.ContentModule),
          data: {
            title: 'Content'
          }
        }, {
          path: 'header',
          loadChildren: () => import('./+layout/header/header.module').then(m => m.HeaderModule),
          data: {
            title: 'Header'
          }
        }, {
          path: 'sidebar-left',
          loadChildren: () => import('./+layout/sidebar-left/sidebar-left.module').then(m => m.SidebarLeftModule),
          data: {
            title: 'Sidebar Left'
          }
        }, {
          path: 'sidebar-right',
          loadChildren: () => import('./+layout/sidebar-right/sidebar-right.module').then(m => m.SidebarRightModule),
          data: {
            title: 'Sidebar Right'
          }
        },
      ]
    }, {
      path: 'boxs',
      data: {
        title: 'Boxs',
      },
      children: [
        {
          path: 'box',
          loadChildren: () => import('./+boxs/box-default/box-default.module').then(m => m.BoxDefaultModule),
          data: {
            title: 'Box'
          }
        }, {
          path: 'info-box',
          loadChildren: () => import('./+boxs/box-info/box-info.module').then(m => m.BoxInfoModule),
          data: {
            title: 'Info Box'
          }
        }, {
          path: 'small-box',
          loadChildren: () => import('./+boxs/box-small/box-small.module').then(m => m.BoxSmallModule),
          data: {
            title: 'Small Box'
          }
        }
      ]}, {
        path: 'dropdown',
        loadChildren: () => import('./+dropdown/dropdown.module').then(m => m.DropdownModule),
        data: {
          title: 'Dropdown',
        }
      }, {
        path: 'tabs',
        loadChildren: () => import('./+tabs/tabs.module').then(m => m.TabsModule),
        data: {
          title: 'Tabs',
        }
      }
    ]
  }, {
    path: 'form',
    data: {
      title: 'Form',
    },
    children: [
      {
        path: 'input-text',
        loadChildren: () => import('./+form/input-text/input-text.module').then(m => m.InputTextModule),
        data: {
          title: 'Input Text',
        }
      }
    ]
  }, {
    path: 'login',
    loadChildren: () => import('./+login/login.module').then(m => m.LoginModule),
    data: {
      customLayout: true
    }
  }, {
    path: 'register',
    loadChildren: () => import('./+register/register.module').then(m => m.RegisterModule),
    data: {
      customLayout: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
