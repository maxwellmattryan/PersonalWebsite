import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/modules';
import { SharedModule } from '@app/shared/shared.module';

import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';

import {
    BlogPostEditorComponent,
    BlogTopicEditorComponent,
    PortfolioProfileEditorComponent,
} from './components';

@NgModule({
    declarations: [
        EditorComponent, 
        BlogPostEditorComponent,
        BlogTopicEditorComponent,
        PortfolioProfileEditorComponent
    ],
    imports: [
        CommonModule,
        EditorRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class EditorModule { }
