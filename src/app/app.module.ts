import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule , HttpClientJsonpModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainformComponent } from './components/mainform/mainform.component';

@NgModule({
  declarations: [
    AppComponent,
    MainformComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
