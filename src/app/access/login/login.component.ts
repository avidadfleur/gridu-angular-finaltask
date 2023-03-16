import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { IndividualUserData, SeveralUserData, UserData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  respdata!: any;
  selectedUser!: number;
  users$!: Observable<UserData[]>;
  userRegistered: boolean = false;

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private http: UserService, private router: Router) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('userId')) {
      this.userRegistered = true;
      this.selectedUser = parseInt(sessionStorage.getItem('userId')!);
    }
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.users$ = this.http.getAllUsers().pipe(
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

  loginProceed(logindata: NgForm) {
    if (logindata.valid) {
      this.http.loginProceed(logindata.value).subscribe(item => {
        this.respdata = item;
        sessionStorage.setItem('userId', (this.selectedUser).toString());
        sessionStorage.setItem('token', this.respdata.token);
        if (this.respdata !== null) {
          this.router.navigate(['']);
        } else {
          alert('Login failed!')
        }
      })
    }
  }

  redirectRegister() {
    this.router.navigate(['access/register']);
  }
}
