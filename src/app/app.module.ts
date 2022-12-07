import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { ToastrModule } from 'ngx-toastr';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxLoadingModule } from 'ngx-loading';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './loader.interceptor';

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //ComponentsModule,
    ToastrModule.forRoot(), // ToastrModule added
    // Vex
    VexModule,
    CustomLayoutModule,
    PdfViewerModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' }, {
    provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
