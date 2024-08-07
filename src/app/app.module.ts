import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserReducer } from './shared/ngrx/reducers/user.reducers';
import { UserEffects } from './shared/ngrx/effects/user.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,

    // Ngrx
    StoreModule.forRoot(),
    EffectsModule.forRoot(),

    StoreModule.forFeature('users', UserReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
