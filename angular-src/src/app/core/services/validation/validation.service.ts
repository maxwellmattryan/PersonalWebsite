import { FormArray, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    constructor() { }

    hasValidAdminCredentials(username: string, password: string): boolean {
        return username !== '' && password !== '';
    }

    hasMinProfiles(min: number = 1): ValidatorFn {
        const validator: ValidatorFn = (formArray: FormArray) => {
            const amountSelected = formArray.controls
                .map(control => control.value)
                .reduce((prev, next) => next ? prev + next : prev, 0);

            return amountSelected >= min ? null : { required: true };
        };

        return validator;
    }

    hasMinTopics(min: number = 1): ValidatorFn {
        const validator: ValidatorFn = (formArray: FormArray) => {
            const amountSelected = formArray.controls
                .map(control => control.value)
                .reduce((prev, next) => next ? prev + next : prev, 0);
            
            return amountSelected >= min ? null : { required: true };
        };

        return validator;
    }
}
