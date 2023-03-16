import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { map, Observable, Subject, takeUntil} from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { IndividualUserData, IsLoading, UserData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit, OnDestroy {
  
  userData$!: Observable<UserData>;
  isLoading!: IsLoading;
  show: boolean = false;

  componentDestroyed$: Subject<boolean> = new Subject()

  constructor(private http: UserService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.isLoading = IsLoading.LOADING;
    let id = this.route.snapshot.params['id'];
    this.loadUserInfo(id);
  }

  loadUserInfo(id: number) {
    this.userData$ = this.http.selectUser(id).pipe(
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