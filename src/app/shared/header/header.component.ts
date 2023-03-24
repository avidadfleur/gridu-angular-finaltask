import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AppState, AppStateStore } from 'src/app/service/state/state.service';
import { UserService } from 'src/app/service/user.service';
import { IndividualUserData, UserData } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  userId!: number;
  userName!: string;
  user!: UserData | null;
  date: Date = new Date();
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private http: UserService, private stateStore: AppStateStore, private router: Router) {}

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem('userId')!);
    if (this.userId) {
      this.loadUser(this.userId);
    }
  }

  private loadUser(id: number) {
    this.http.selectUser(id).pipe(takeUntil(this.componentDestroyed$))
    .subscribe((item: IndividualUserData) => {
      this.stateStore.appStateReducer({
        type: "SET_USER",
        payload: item.data
      })
      this.userName = item.data.first_name;
    });
  }

  logout() {
    sessionStorage.clear();
    this.stateStore.clearAppState();
    this.router.navigate(["access/login"]);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }
  
}
