import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        public snackBar: MatSnackBar,
        private zone: NgZone
    ) { }

    confirmation(msg: string = ''): boolean {
        return window.confirm(msg);
    }

    deleteConfirmation(item: string = ''): boolean {
        return window.confirm(`Are you sure you want to delete this ${item}?`);
    }

    createNotification(message: string, action: string = '', duration: number = 2400): void {
        this.zone.run(() => {
            this.snackBar.open(message, action, {
                duration: duration
            });
        });
    }
}
