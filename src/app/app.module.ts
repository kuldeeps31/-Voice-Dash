//standalone Component ko declear nhi krwta hai

import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SpeechService } from './speech.service';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {  HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartSService } from './chart-s.service';

@NgModule({

    declarations:[
        
       
    ],
    imports:[
        
        BrowserModule,
      HttpClientModule,
 
        
        
    ],
    providers:[
        SpeechService,
        provideCharts(withDefaultRegisterables()),
        ChartSService,
    ],
    


})
export class AppModule{ }