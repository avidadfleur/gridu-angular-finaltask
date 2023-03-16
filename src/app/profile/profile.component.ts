import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { IndividualUserData, IsLoading, UserData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  title = "Check out my temperature Converter!"
  Celsius!: number;
  Fahrenheit!: number;
  show: boolean = false;

  componentDestroyed$: Subject<boolean> = new Subject()

  readonly userId = parseInt(sessionStorage.getItem('userId')!);
  userData$!: Observable<UserData>;
  isLoading!: IsLoading;
  constructor(private http: UserService) {}
  
  ngOnInit(): void {
    this.isLoading = IsLoading.LOADING;
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.userData$ = this.http.selectUser(this.userId).pipe(
      map((data: IndividualUserData) => {
          this.isLoading = IsLoading.SUCCESS;
          return data.data;
      }), takeUntil(this.componentDestroyed$)
    );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

}
