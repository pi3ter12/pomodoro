import {NgModule} from '@angular/core';
import {ButtonComponent} from "./button.component";
import {SharedModule} from "../../shared.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ButtonComponent
  ]
})
export class ButtonModule {
}
