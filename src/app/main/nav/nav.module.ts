import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NavComponent} from './nav.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NavComponent
  ]
})
export class NavModule {
}
