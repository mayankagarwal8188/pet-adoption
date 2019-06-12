import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HttpClientModule } from '@angular/common/http';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { SnackBarComponent } from './shared/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AnimalDetailsComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  entryComponents: [
    SnackBarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
