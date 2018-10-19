import {Component, OnInit} from '@angular/core';
import {RouteComponent} from "../../shared/route-component";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {catchError, map, switchMap} from "rxjs/operators";
import {combineLatest, Observable, of} from "rxjs";
import {FileSearchService, SearchResultEntry} from "../file-search.service";
import {ToastNotificationService} from "../../shared/toast-notification.service";
import {easeInEaseOutAnimation} from "../../animations";

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  animations: [easeInEaseOutAnimation]
})
export class SearchResultsComponent implements OnInit, RouteComponent {

  phrase$: Observable<string>;
  private projectId$: Observable<string>;
  private taskId$: Observable<string>;

  searchResults$: Observable<SearchResultEntry[]>;

  constructor(public route: ActivatedRoute,
              private fileSearch: FileSearchService,
              private toastNotification: ToastNotificationService) {
  }

  ngOnInit() {
    this.phrase$ = this.route.queryParamMap.pipe(map((paramMap: ParamMap) => paramMap.get('phrase')));
    this.projectId$ = this.route.paramMap.pipe(map((paramMap: ParamMap) => paramMap.get('projectId')));
    this.taskId$ = this.route.paramMap.pipe(map((paramMap: ParamMap) => paramMap.get('taskId')));
    this.searchResults$ = combineLatest(this.projectId$, this.taskId$, this.phrase$)
      .pipe(
        switchMap((params: string[]) => {
          const projectId = params[0];
          const taskId = params[1];
          const phrase = params[2];
          if (!taskId) {
            return this.fileSearch.searchInProject(projectId, phrase);
          } else {
            return this.fileSearch.searchInTask(projectId, taskId, phrase);
          }
        }),
        catchError(() => {
          this.toastNotification.error('dws.search.searchResults.errorMessage');
          return of([]);
        })
      );
  }

  get projectId(): string {
    return this.route.snapshot.paramMap.get('projectId');
  }

}
