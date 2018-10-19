import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {FileSummaryComponent} from './file-summary/file-summary.component';
import {FilesRoutingModule} from './files-routing.module';
import {AddFileComponent} from './add-file/add-file.component';
import {FilesService} from './files.service';
import {FileDetailsComponent} from './file-details/file-details.component';
import {NumberOfModifiedLinesPipe} from './number-of-modified-lines.pipe';
import {NumberOfInsertedLinesPipe} from './number-of-inserted-lines.pipe';
import {NumberOfDeletedLinesPipe} from './number-of-deleted-lines.pipe';

@NgModule({
  imports: [
    SharedModule,
    FilesRoutingModule
  ],
  declarations: [
    FileSummaryComponent,
    AddFileComponent,
    FileDetailsComponent,
    NumberOfModifiedLinesPipe,
    NumberOfInsertedLinesPipe,
    NumberOfDeletedLinesPipe
  ],
  providers: [
    FilesService
  ],
  exports: [
    FileSummaryComponent
  ]
})
export class FilesModule {
}
