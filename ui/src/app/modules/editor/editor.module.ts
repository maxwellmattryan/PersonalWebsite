import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/modules';
import { PrimeNgModule } from '@app/modules';
import { SharedModule } from '@app/shared/shared.module';

import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';

import {
    PostEditorComponent,
    ProfileEditorComponent,
    ProjectEditorComponent,
    TopicEditorComponent
} from './components';

@NgModule({
    declarations: [
        EditorComponent, 
        PostEditorComponent,
        ProjectEditorComponent,
        TopicEditorComponent,
        ProfileEditorComponent
    ],
    imports: [
        CommonModule,
        EditorRoutingModule,
        MaterialModule,
        PrimeNgModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class EditorModule { }
