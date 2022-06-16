import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'screen-bugs',
    loadChildren: () => import('./screen-bugs/screen-bugs.module').then( m => m.ScreenBugsPageModule)
  },
  {
    path: 'add-incident',
    loadChildren: () => import('./add-incident/add-incident.module').then( m => m.AddIncidentPageModule)
  },
  {
    path: 'incident/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./add-incident/add-incident.module').then( m => m.AddIncidentPageModule)
  },
  {
    path: 'archives',
    loadChildren: () => import('./apk-manager/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'home/archives',
    redirectTo: 'archives',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
