import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {NavModule} from "./nav/nav.module";
import {CardModule} from "./card/card.module";
import {SettingsModule} from "../settings/settings.module";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NavModule,
    CardModule,
    SettingsModule
  ]
})
export class MainModule {
}
