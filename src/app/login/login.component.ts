import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login(val:any,email:any){
    if(val=='kuldeep' && email=='kuldeepsinghchouhan224@gmail.com'){
      sessionStorage.setItem('isloggin','true'); //isme sessionstorage mai isloggin variable set hogya jiskki value true haii::
    }
    else{
      sessionStorage.setItem('isloggin','false');
    }

  }
}
