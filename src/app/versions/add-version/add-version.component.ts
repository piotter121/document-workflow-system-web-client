import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppValidatorsService} from '../../shared/app-validators.service';
import {VersionsService} from '../versions.service';
import {ToastNotificationService} from '../../shared/toast-notification.service';
import {RouteComponent} from '../../shared/route-component';
import {map, switchMap} from 'rxjs/operators';
import {ContentType, FilesService} from '../../files/files.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-version',
  templateUrl: './add-version.component.html',
  styleUrls: ['./add-version.component.css']
})
export class AddVersionComponent implements OnInit, RouteComponent {
  newVersionOfFile: FormGroup;
  fileToUpload: File;

  acceptedFileTypes: Observable<string[]>;

  constructor(public route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private appValidators: AppValidatorsService,
              private versionsService: VersionsService,
              private toastNotification: ToastNotificationService,
              private filesService: FilesService) {
  }

  ngOnInit() {
    this.newVersionOfFile = this.formBuilder.group({
      versionString: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const projectId = paramMap.get('projectId');
      const taskId = paramMap.get('taskId');
      const fileId = paramMap.get('fileId');
      const nonExistingVersionString = this.appValidators.nonExistingVersionString(projectId, taskId, fileId);
      this.versionString.setAsyncValidators(nonExistingVersionString);
    });

    this.acceptedFileTypes = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        const projectId = paramMap.get('projectId');
        const taskId = paramMap.get('taskId');
        const fileId = paramMap.get('fileId');
        return this.filesService.getFileExtension(projectId, taskId, fileId);
      }),
      map((contentType: ContentType) => [contentType.extension, contentType.mimeType])
    );
  }

  get versionString(): AbstractControl {
    return this.newVersionOfFile.get('versionString');
  }

  get message(): AbstractControl {
    return this.newVersionOfFile.get('message');
  }

  addNewVersion() {
    const paramMap = this.route.snapshot.paramMap;
    this.versionsService.addNewVersion({
      projectId: paramMap.get('projectId'),
      taskId: paramMap.get('taskId'),
      fileId: paramMap.get('fileId'),
      file: this.fileToUpload,
      versionString: this.versionString.value,
      message: this.message.value
    }).subscribe((versionId: number) => {
      this.toastNotification.success('dws.versions.add.success');
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['../', versionId], {
        relativeTo: this.route
      });
    }, () => this.toastNotification.error('dws.versions.add.failure'));
  }
}
