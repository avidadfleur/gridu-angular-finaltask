import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IsLoading, UserData } from 'src/app/shared/interfaces';
import { AppState, AppStateStore } from '../service/state/state.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  title = "Check out my temperature Converter!"
  Celsius!: number;
  Fahrenheit!: number;
  show: boolean = false;
  userData!: UserData | null;
  isLoading!: IsLoading;

  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private stateStore: AppStateStore) {}
  
  ngOnInit(): void {
    this.isLoading = IsLoading.LOADING;
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.stateStore.appStateStore$
     .pipe(takeUntil(this.componentDestroyed$))
     .subscribe(
      (state: AppState) => {
        this.userData = state.user;
        this.isLoading = IsLoading.SUCCESS;
      }
    );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

}
