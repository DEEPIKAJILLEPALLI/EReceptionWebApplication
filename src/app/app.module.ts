import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ReceptionFormComponent } from './reception-form/reception-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpModule } from '@angular/Http';
import { HttpClientModule } from '@angular/common/http';
import { ReceptionViewComponent } from './reception-view/reception-view.component';
import { ReceptionFormEditComponent } from './reception-form-edit/reception-form-edit.component';
import { ReceptionListComponent } from './reception-list/reception-list.component';
import { VisitorInfoComponent } from './visitor-info/visitor-info.component';
// import { VisitorViewComponent } from './visitor-view/visitor-view.component';
// import { ReceptionInfoComponent } from './reception-info/reception-info.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { ReceptionPageComponent } from './reception-page/reception-page.component';
import { ReceptionService } from './services/reception.service';
import { CustomerValidator, DateValidator } from './services/validator.service';
// import { MasonryDemoComponent } from './masonry-demo/masonry-demo.component';
// import {MasonryModule} from 'angular2-masonry';
@NgModule({
  declarations: [
    AppComponent,
    ReceptionFormComponent,
    ReceptionViewComponent,
    ReceptionFormEditComponent,
    ReceptionListComponent,
    VisitorInfoComponent,
    ConfirmDeleteComponent,
    ReceptionPageComponent
   // MasonryDemoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CdkTableModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
    //MasonryModule,

  ],
  providers: [CustomerValidator, DateValidator, ReceptionService],
  entryComponents: [ReceptionFormComponent, ReceptionFormEditComponent, ConfirmDeleteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
