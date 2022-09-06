import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderMenuComponent } from './header-menu/header-menu.component';

@NgModule({
    declarations: [HeaderMenuComponent],
    exports: [HeaderMenuComponent],
    imports: [CommonModule, IonicModule]
})
export class ComponentsModule{}
