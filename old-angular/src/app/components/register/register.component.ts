import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: String;
  password: String;

  constructor(private validationService: ValidationService) { }

  ngOnInit() {
  }

  onRegisterSubmit(): void {
    const admin = {
      username: this.username,
      password: this.password
    };

    if(!this.validationService.validateRegistration(admin)) {
      console.log("Please provide both username and password!");
    }
  }
}
