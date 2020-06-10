import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule,
        MatToolbarModule
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule,
        MatToolbarModule
    ]
})
export class MaterialModule { }
