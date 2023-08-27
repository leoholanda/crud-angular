import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    MatDialogModule
  ],
  exports: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
