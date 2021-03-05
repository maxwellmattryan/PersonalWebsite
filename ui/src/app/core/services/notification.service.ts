import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ObfuscationService } from '@ui/core/services/obfuscation.service';

export type SnackBarAction = 'Email' | '';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(
        private obfuscationService: ObfuscationService,
        public snackBar: MatSnackBar,
        private zone: NgZone
    ) { }

    confirmation(msg: string = ''): boolean {
        return window.confirm(msg);
    }

    deleteConfirmation(item: string = ''): boolean {
        return window.confirm(`Are you sure you want to delete this ${item}?`);
    }

    createNotification(message: string, action: SnackBarAction = '', duration: number = 2400): void {
        this.zone.run(() => {
            const ref = this.snackBar.open(message, action, {
                duration: duration
            });
            switch(action) {
                default:
                case '':
                    break;

                case 'Email':
                    ref.onAction().subscribe(() => {
                        this.obfuscationService.handleEmailClick();
                    });
                    break;
            }
        });
    }
}
