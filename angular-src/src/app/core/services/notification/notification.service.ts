import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        private snackBar: MatSnackBar
    ) { }

    createNotification(message: string, action: string = '', duration: number = 1250): void {
        this.snackBar.open(message, action, {
            duration: duration
        });
    }
}
