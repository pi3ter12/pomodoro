import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import {SharedModule} from "../../shared/shared.module";
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
