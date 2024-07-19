import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
//import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  //guard check krta hai user authentic hai yha nhii
const _router=inject(Router);  //syntaxx
 
  let isloggedin=sessionStorage.getItem('isloggin');  //isloggin ek variable hai isme true ya false ki value haii
    
  
  if(isloggedin=='false'){
    alert('please loggin!!');
    _router.navigate(['login']);  //syntaxx  yha agar password glt hai toh mai koi se bhi component mai ja skta hu
    return false;
  }
  return true;
};
