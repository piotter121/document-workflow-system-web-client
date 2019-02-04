import { NgModule } from '@angular/core';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectSummaryComponent } from './project-summary/project-summary.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsService } from './projects.service';
import { TasksModule } from '../tasks/tasks.module';
import { SharedModule } from '../shared/shared.module';
import { SearchModule } from '../search/search.module';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    ProjectsRoutingModule,
    TasksModule,
    SearchModule
  ],
  declarations: [
    AllProjectsComponent,
    ProjectDetailsComponent,
    AddProjectComponent,
    ProjectSummaryComponent
  ],
  providers: [
    ProjectsService,
    DatePipe
  ]
})
export class ProjectsModule {
}
