import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import {SharedModule} from "../shared/shared.module";
import {CardModule} from "../shared/components/card/card.module";
import {InputModule} from "../shared/components/input/input.module";
import {ButtonModule} from "../shared/components/button/button.module";
import {ObjectKeysPipe} from "./pipe/object-keys.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {ToFormControlPipe} from "./pipe/to-form-control.pipe";



@NgModule({
  declarations: [
    SettingsComponent,
    ObjectKeysPipe,
    ToFormControlPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardModule,
    InputModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
