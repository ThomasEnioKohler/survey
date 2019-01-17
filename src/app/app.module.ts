import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {SurveyComponent} from './survey/survey.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatRadioModule,
  MatToolbarModule,
  MatCardModule,
  MatStepperModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatSliderModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SurveyComponent],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRadioModule,
    MatToolbarModule,
    MatCardModule,
    MatStepperModule,
    MatDividerModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSliderModule
  ],
  providers: [],
  entryComponents: [SurveyComponent]
})

export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(SurveyComponent, {injector: this.injector});
    customElements.define('apfprofisurvey-custom-element', el);
  }

  ngDoBootstrap() {
  }
}
