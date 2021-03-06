import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppValidatorsService {
  constructor(private http: HttpClient) {
  }

  nonExistingVersionString(projectId: string, taskId: string, fileId: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http.get<boolean>(`/api/projects/${projectId}/tasks/${taskId}/files/${fileId}/versions/exists`, {
        params: {
          versionString: control.value
        }
      }).pipe(
        catchError(() => of(false)),
        map(exists => exists ? {'versionStringExists': true} : null)
      );
    };
  }

  nonExistingTaskNameInProject(projectId: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const taskName: string = control.value;
      return this.checkIfTaskExists(projectId, taskName).pipe(
        catchError(() => of(false)),
        map((exists: boolean) => exists ? {'taskExists': true} : null)
      );
    };
  }

  private checkIfTaskExists(projectId: string, taskName: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/projects/${projectId}/tasks/exists`, {
      params: {
        'taskName': taskName
      }
    });
  }

  private checkIfUserExists(email: string): Observable<boolean> {
    return this.http.get<boolean>('/auth/exists', {
      params: {
        'email': email
      }
    });
  }

  existingUserEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value: string = control.value;
      return this.checkIfUserExists(value)
        .pipe(
          catchError(() => of(true)),
          map((exists: boolean) => exists ? null : {'userNotExists': true})
        );
    };
  }

  nonExistingUserEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value: string = control.value;
      return this.checkIfUserExists(value)
        .pipe(
          catchError(() => of(false)),
          map((exists: boolean) => exists ? {'userExists': true} : null)
        );
    };
  }
}
