import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchInputComponent} from './search-input/search-input.component';
import {SharedModule} from "../shared/shared.module";
import {FileSearchService} from "./file-search.service";
import {SearchResultsComponent} from './search-results/search-results.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    SearchInputComponent,
    SearchResultsComponent
  ],
  providers: [
    FileSearchService
  ],
  exports: [
    SearchInputComponent,
    SearchResultsComponent
  ]
})
export class SearchModule {
}
