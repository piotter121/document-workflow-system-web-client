import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class FileSearchService {

  constructor(private http: HttpClient) {
  }

  searchInProject(projectId: string, searchPhrase: string): Observable<SearchResultEntry[]> {
    return this.http.get<SearchResultEntry[]>(`/api/projects/${projectId}/search`, {
      params: {
        'phrase': searchPhrase
      }
    });
  }

  searchInTask(projectId: string, taskId: string, searchPhrase: string): Observable<SearchResultEntry[]> {
    return this.http.get<SearchResultEntry[]>(`/api/projects/${projectId}/tasks/${taskId}/search`, {
      params: {
        'phrase': searchPhrase
      }
    });
  }

}

export interface SearchResultEntry {
  taskId: string;
  taskName: string;
  fileId: string;
  fileName: string;
  versionString: string;
  highlightContent: string[];
}
