import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { EmailService } from 'src/app/service/email.service';
import { EmailValidator } from 'src/app/service/email.validator';
import { UserService } from 'src/app/service/user.service';
import { ValidationService } from 'src/app/service/validate.service';
import { IndividualUserData, SeveralUserData, UserData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();
  users$!: Observable<UserData[]>;
  selectedUser!: number;
  respData: any;
  reactiveForm!: FormGroup;

  constructor(
    private http: UserService, 
    private router: Router,
    private validate: ValidationService,
    private emailService: EmailService) 
  { }

  ngOnInit(): void {
    sessionStorage.clear();

    this.reactiveForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email], [EmailValidator.createValidator(this.emailService)]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, this.validate.passwordMatch('password', 'confirmPassword')
    );
    
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.users$ = this.http.getAllUsers().pipe(
      map((data: SeveralUserData) => {
          return data.data;
      }), takeUntil(this.componentDestroyed$)
    );
  }

  onSelected(value: string): void {
		this.selectedUser = parseInt(value);
    this.http.selectUser(this.selectedUser).subscribe((data: IndividualUserData) => {
      
      let user = data.data;

      this.reactiveForm.get("firstName")?.setValue(user.first_name);
      this.reactiveForm.get("lastName")?.setValue(user.last_name);
      this.reactiveForm.get("email")?.setValue(user.email);
    });
	}

  registerUser(): void {
    if (this.reactiveForm.valid) {
      let userEmail: string = this.reactiveForm.get("email")?.value;
      let userPassword: string = this.reactiveForm.get("password")?.value;
      this.http.registerProceed({email: userEmail, password: userPassword}).subscribe(item => {
        this.respData = item;
        sessionStorage.setItem('userId', this.respData.id);
        sessionStorage.setItem('email', userEmail);
        if (this.respData.token !== '') {
          alert('User registration successful. Redirecting to login page now.');
          this.redirectLogin();
        } else {
          alert('User registration failed! Try again');
        }
      });
    }
  }

  redirectLogin(): void {
    this.router.navigate(['access/login']);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
