import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { IndividualUserData, IsLoading, UserData } from 'src/app/shared/interfaces';
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
  constructor(private stateStore: AppStateStore) {}
  
  ngOnInit(): void {
    this.isLoading = IsLoading.LOADING;
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.stateStore.appStateStore$.subscribe(
      (state: AppState) => {
        this.userData = state.user;
        this.isLoading = IsLoading.SUCCESS;
      }
    );
  }

}
