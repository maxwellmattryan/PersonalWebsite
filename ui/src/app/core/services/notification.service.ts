import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ObfuscationService } from '@ui/core/services/obfuscation.service';

export type SnackBarAction = 'email' | 'file' | '';

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

    createNotification(message: string, action: SnackBarAction = '', duration: number = 2400, extra: string = ''): void {
        this.zone.run(() => {
            const ref = this.snackBar.open(message, action.toUpperCase(), {
                duration: duration
            });
            switch(action) {
                default:
                case '':
                    break;

                case 'email':
                    ref.onAction().subscribe(() => {
                        this.obfuscationService.handleEmailClick();
                    });
                    break;

                case 'file':
                    ref.onAction().subscribe(() => {
                        window.open(extra, '_blank');
                    });
                    break;
            }
        });
    }
}
