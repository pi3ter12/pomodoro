import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import {SharedModule} from "../shared/shared.module";
import {CardModule} from "../shared/components/card/card.module";
import {InputModule} from "../shared/components/input/input.module";
import {ButtonModule} from "../shared/components/button/button.module";



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardModule,
    InputModule,
    ButtonModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
