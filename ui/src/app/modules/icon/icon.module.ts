import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './icon.component';

import {
    DriveIconComponent,
    FootIconComponent,
    GithubIconComponent,
    ItchIconComponent
} from './components';

@NgModule({
    declarations: [
        DriveIconComponent,
        FootIconComponent,
        GithubIconComponent,
        IconComponent,
        ItchIconComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        IconComponent
    ]
})
export class IconModule { }
