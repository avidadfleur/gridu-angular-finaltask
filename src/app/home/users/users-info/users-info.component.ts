import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { UserData, SeveralUserData, IsLoading } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss']
})
export class UsersInfoComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'avatar', 'rating', 'check'];
  isLoading!: IsLoading;
  componentDestroyed$: Subject<boolean> = new Subject();
  
  constructor(private http: UserService) { }

  ngOnInit(): void {
    this.isLoading = IsLoading.LOADING;
    this.getAllUsers();
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  UserDetail!: UserData[];
  data!: MatTableDataSource<UserData>;

  getAllUsers(): void {
    this.http.getAllUsers().pipe(
      map((data: SeveralUserData) => {
        return data.data;
      }),
      takeUntil(this.componentDestroyed$)
    ).subscribe((item: UserData[]) => {
      this.isLoading = IsLoading.SUCCESS;
      this.UserDetail = item;
      this.data = new MatTableDataSource<UserData>(this.UserDetail);
      this.data.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

}
