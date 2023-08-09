import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ErrorDialogComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    MatDialogModule
  ],
  exports: [ErrorDialogComponent]
})
export class SharedModule { }
