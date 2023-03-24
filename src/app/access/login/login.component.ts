import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { EmailService } from 'src/app/service/email.service';
import { EmailValidator } from 'src/app/service/email.validator';
import { UserService } from 'src/app/service/user.service';
import { IndividualUserData, SeveralUserData, UserData } from 'src/app/shared/interfaces';

interface FormInterface {
  userId: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  respdata!: any;
  selectedUser!: number;
  users$!: Observable<UserData[]>;
  loginForm!: FormGroup;

  constructor(private http: UserService,
    private router: Router,
    private emailService: EmailService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('userId')) {
      this.selectedUser = parseInt(sessionStorage.getItem('userId')!);
    }

    this.loginForm = new FormGroup<FormInterface>({
      userId: new FormControl('', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email], [EmailValidator.createValidator(this.emailService)]),
      password: new FormControl('', Validators.required)
    });

    this.loadAllUsers();
  }

  private loadAllUsers(): void {
    this.users$ = this.http.getAllUsers(1, 12).pipe(
      map((data: SeveralUserData) => {
          return data.data;
      })
    );
  }

  onSelected(value: string): void {
		this.selectedUser = parseInt(value);
    this.http.selectUser(this.selectedUser).subscribe((data: IndividualUserData) => {
      
      let user = data.data;
      this.loginForm.controls["email"].setValue(user.email);
    });
	}

  loginProceed() {
    if (this.loginForm.valid) {
      this.http.loginProceed(this.loginForm.value).subscribe(item => {
        this.respdata = item;
        sessionStorage.setItem('userId', (this.selectedUser).toString());
        sessionStorage.setItem('token', this.respdata.token);
        if (this.respdata !== null) {
          this.router.navigate(['']);
        } else {
          alert('Login failed!');
        }
      })
    }
  }

  redirectRegister() {
    this.router.navigate(['access/register']);
  }
}
