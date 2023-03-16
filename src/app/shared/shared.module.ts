import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material-module';
import { RatingInputComponent } from './rating-input.component';
import { TempConverterPipe } from './pipe/temp-convertor.pipe'
import { TtToggleDirective } from './directive/tt-toggle.directive';

@NgModule({
  declarations: [HeaderComponent, RatingInputComponent, TempConverterPipe, TtToggleDirective],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent, RatingInputComponent, TempConverterPipe, TtToggleDirective
  ]
})
export class SharedModule { }
