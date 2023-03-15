import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributeDetailsFormComponent } from './contribute-details-form/contribute-details-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ContributeListComponent } from './contribute-list/contribute-list.component';

@NgModule({
  declarations: [
    ContributeDetailsFormComponent,
    ContributeListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    ContributeDetailsFormComponent,
    ContributeListComponent
  ]
})
export class ContributesModule { }
