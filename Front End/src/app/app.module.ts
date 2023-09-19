import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { ContributesModule } from './modules/contributes/contribute.module';
import { HttpClientModule } from '@angular/common/http';
import { ContributeService } from './modules/contributes/contribute.service';

@NgModule({
  declarations: [
    AppComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ContributesModule,
    HttpClientModule
  ],
  providers: [ContributeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
