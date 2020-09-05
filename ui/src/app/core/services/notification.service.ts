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

    createNotification(message: string, action: string = '', duration: number = 2000): void {
        this.zone.run(() => {
            this.snackBar.open(message, action, {
                duration: duration
            });
        });
    }
}
