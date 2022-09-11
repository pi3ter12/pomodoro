import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {NavModule} from "./nav/nav.module";
import {TimerCardContentModule} from "./timer-card-content/timer-card-content.module";
import {SettingsModule} from "../settings/settings.module";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NavModule,
    TimerCardContentModule,
    SettingsModule
  ]
})
export class MainModule {
}
