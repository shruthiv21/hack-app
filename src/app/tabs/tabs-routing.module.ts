import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
          }
        ]
      },
      {
        path: 'schedule',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../schedule/schedule.module').then(m => m.SchedulePageModule)
          }
        ]
      },
      {
        path: 'self-health-check',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../self-health-check/self-health-check.module').then(m => m.SelfHealthCheckPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
