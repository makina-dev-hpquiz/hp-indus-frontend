import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApkTemplateComponent } from './apk-template/apk-template.component';

@NgModule({
    declarations: [ApkTemplateComponent],
    imports:[
        CommonModule
    ],
    exports: [ApkTemplateComponent]
})
export class APKComponentsModule{}
