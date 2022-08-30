import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from '../providers/resolver/data-resolver.service';

export const routes: Routes = [
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
    path: 'home/archives',
    redirectTo: 'archives',
    pathMatch: 'full'
  },  {
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
