import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import path from 'path';
import { ContactComponent } from './contact/contact.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';
//import { VoicetotextComponent } from './voicetotext/voicetotext.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartComponent } from './chart/chart.component';



export const routes: Routes = [


    {path:"Home",component:DashboardComponent},
    {path:"about",component:AboutComponent},
    {path:"contact",component:ContactComponent},
    {path:"login",component:LoginComponent},
    //{path:"**",component:DashboardComponent}  //wildcard route  
    //wild card route is used to cheeck that the url is correct or not if not correct then it will show page not found
     {path:"dashboard",component:ChartComponent},
  
];

