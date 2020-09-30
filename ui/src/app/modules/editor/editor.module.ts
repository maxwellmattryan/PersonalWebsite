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
    PortfolioProjectEditorComponent
} from './components';

@NgModule({
    declarations: [
        EditorComponent, 
        BlogPostEditorComponent,
        PortfolioProjectEditorComponent,
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
