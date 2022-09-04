import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {StoreModule} from '@ngrx/store';
import {timerReducer} from "./store/timer/timer.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TimerEffects} from "./store/timer/timer.effects";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,
    './assets/i18n/',
    '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    EffectsModule.forRoot([TimerEffects]),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot({timer: timerReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
