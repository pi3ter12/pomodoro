import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import {SharedModule} from "../shared/shared.module";
import {CardModule} from "../shared/components/card/card.module";



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
