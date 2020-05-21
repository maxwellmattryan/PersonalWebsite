import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: String;
  password: String;

  constructor(private validationService: ValidationService, private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit(): void {
    const admin = {
      username: this.username,
      password: this.password
    };

    if(!this.validationService.validateRegistration(admin)) {
      this.flashMessagesService.show('Please provide a username AND password !', { cssClass: 'alert-danger', timeout: 2000 });
    }
  }
}