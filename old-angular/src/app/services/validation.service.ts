import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  validateRegistration(admin) {
    if(admin.username == undefined || admin.password == undefined) {
      return false;
    } else {
      return true;
    }
  }
}
