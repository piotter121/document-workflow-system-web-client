import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InvalidFeedbackComponent } from './invalid-feedback/invalid-feedback.component';
import { AppValidatorsService } from './app-validators.service';
import { ToastNotificationService } from './toast-notification.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule
  ],
  declarations: [
    InvalidFeedbackComponent,
    LoadingSpinnerComponent,
  ],
  providers: [
    AppValidatorsService,
    ToastNotificationService
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    FlexLayoutModule,
    InvalidFeedbackComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {
}
