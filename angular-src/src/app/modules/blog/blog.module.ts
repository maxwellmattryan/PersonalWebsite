import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlogRoutingModule } from './blog-routing.module';

import {
    BlogComponent,
    BlogContainerComponent
} from './components';

import { MaterialModule } from 'modules/material/material.module';

@NgModule({
    declarations: [
        BlogComponent,
        BlogContainerComponent
    ],
    imports: [
        BlogRoutingModule,
        CommonModule,
        MaterialModule
    ],
    exports: [
        BlogComponent,
        BlogContainerComponent
    ]
})
export class BlogModule { }