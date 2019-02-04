import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProjectsService} from '../projects.service';
import {catchError, switchMap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ProjectInfo} from '../project-info';
import {UserService} from '../../auth/user.service';
import {UserInfo} from '../../auth/user-info';
import {ToastNotificationService} from '../../shared/toast-notification.service';
import {RouteComponent} from '../../shared/route-component';
import {easeInEaseOutAnimation} from '../../animations';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  animations: [
    easeInEaseOutAnimation
  ]
})
export class ProjectDetailsComponent implements OnInit, RouteComponent {

  project$: Observable<ProjectInfo>;
  currentUser: UserInfo;

  constructor(public route: ActivatedRoute,
              private router: Router,
              private projectsService: ProjectsService,
              private userService: UserService,
              private toastNotification: ToastNotificationService) {
  }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    this.project$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.projectsService.getProjectInfo(params.get('projectId'))),
      catchError(err => {
        this.toastNotification.error('dws.project.details.getFailure');
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/projects']);
        return throwError(err);
      })
    );
  }

  isCurrentUserProjectAdmin(projectAdmin: UserInfo): boolean {
    return this.currentUser.equals(projectAdmin);
  }

  deleteProject(project: ProjectInfo) {
    this.projectsService.deleteProject(project.id)
      .subscribe(
        () => this.router.navigate(['/projects']),
        () => this.toastNotification.error('dws.project.details.toolbar.actions.delete.failure')
      );
  }

}
