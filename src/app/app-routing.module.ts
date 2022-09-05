import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from '../providers/resolver/data-resolver.service';

export const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'navigation',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'navigation',
    pathMatch: 'full'
  },
  {
    path: 'incidents',
    loadChildren: () => import('./incidents/incidents-listing/incidents-listing.module').then( m => m.ScreenBugsPageModule)
  },
  {
    path: 'incident',
    loadChildren: () => import('./incidents/add-incident/add-incident.module').then( m => m.AddIncidentPageModule)
  },
  {
    path: 'incident/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./incidents/add-incident/add-incident.module').then( m => m.AddIncidentPageModule)
  },
  {
    path: 'archives',
    loadChildren: () => import('./apk-manager/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'apk',
    loadChildren: () => import('./apk-manager/latest/latest-apk.module').then( m => m.LatestAPKPageModule)
  },
  {
    path: 'apk/archives',
    redirectTo: 'archives',
    pathMatch: 'full'
  },
  {
    path: 'navigation',
    loadChildren: () => import('./navigation/navigation/navigation.module').then( m => m.NavigationPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
