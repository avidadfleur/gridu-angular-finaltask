import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { UserData, SeveralUserData, IsLoading } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss']
})
export class UsersInfoComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'avatar', 'rating', 'check'];
  isLoading: IsLoading = IsLoading.LOADING;
  componentDestroyed$: Subject<boolean> = new Subject();

  data: UserData[] = [];
  resultsLength: number = 0;
  pageSize: number = 6;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private http: UserService) { }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith({}),
        tap(() => {
          this.isLoading = IsLoading.LOADING;
        }),
        switchMap((_: any) => {
          return this.http.getAllUsers(
            this.paginator.pageIndex + 1, this.paginator.pageSize
          )
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((result: SeveralUserData) => {
        this.data = result.data;
        this.resultsLength = result.total;
        this.pageSize = result.per_page;
        this.isLoading = IsLoading.SUCCESS;
      })
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

}
