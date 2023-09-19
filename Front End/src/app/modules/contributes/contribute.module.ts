import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributeDetailsFormComponent } from './contribute-details-form/contribute-details-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ContributeListComponent } from './contribute-list/contribute-list.component';
import { ContributeService } from './contribute.service';
import { DeleteContributeModalComponent } from './delete-contribute-modal/delete-contribute-modal.component';

@NgModule({
  declarations: [
    ContributeDetailsFormComponent,
    ContributeListComponent,
    DeleteContributeModalComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [ContributeService],
  exports: [
    ContributeDetailsFormComponent,
    ContributeListComponent
  ]
})
export class ContributesModule { }
