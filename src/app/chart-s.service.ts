import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartSService {

  constructor(private http:HttpClient) {
    this.getdata();
   }

   getdata(){
    return this.http.get('http://localhost:3000/chartdata');
   }
}
