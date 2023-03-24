import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { IndividualUserData } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  userId!: number;
  userName!: string;
  date: Date = new Date();
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private http: UserService) {}

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem('userId')!);
    if (this.userId) {
      this.loadUser(this.userId);
    }
  }

  private loadUser(id: number) {
    this.http.selectUser(id).pipe(takeUntil(this.componentDestroyed$))
    .subscribe((item: IndividualUserData) => {
      this.userName = item.data.first_name;
    });
  }

  logout() {
    sessionStorage.clear();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }
  
}
