import { Component, inject ,EventEmitter} from '@angular/core';
import { SpeechService } from '../speech.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { style } from '@angular/animations';
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-voicetotext',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './voicetotext.component.html',
  styleUrl: './voicetotext.component.css',
  providers:[SpeechService],
  
})
export class VoicetotextComponent {
// we need to import router router is presend in core library
  _router=inject(Router);

// for hover
  ishovered:boolean=false;
  ishovered1:boolean=false;
  ishovered2:boolean=false;
  ishovered3:boolean=false;
  ishovered4:boolean=false;
  storetext:string='';

  constructor(public voiceserviceobject:SpeechService){}
  
 isListening:boolean=false;
   
  toggleListening() {
   this.isListening=!this.isListening
    if (this.isListening) {
      this.startListing();
      alert('speak text to search');
    } else {
      this.stopListing();
    }
  }
    
  startListing():void{
    
  this.storetext='';
   
  this.voiceserviceobject.startlistining();
  this.updateTextContinuously();

 
  }

  

  stopListing():void{

  this.voiceserviceobject.stoplisting();
  
}


   updateTextContinuously(): void {

  //here setinterval will help to perform repeatdly after some 
  //and settime out is used to diplay our text after some time
  const interval = setInterval(() => {
      
      
      this.storetext = this.voiceserviceobject.getstoredtext();
    console.log('update text' ,this.storetext);
    

    this.actasperword(this.storetext);

    if (!this.voiceserviceobject.isrecognizing()) {
      clearInterval(interval);
      this.storetext='';

    }
    
   
 
  }, 400); 
}


//getclear(){
//  this.voiceserviceobject.stoplisting();
// this.storetext="";
   
//}

 



  actasperword(word:string):void{
    const act=word.toLowerCase();  //remember

    if(act.includes('login')){
      this.ishovered=true;
      this.ishovered1=false;
      this.ishovered2=false;
      this.ishovered3=false;
      this.ishovered4=false;
      
      console.log('navigate to login');
       this._router.navigate(['login']);
       
     }
    else if(act.includes('Home ')){
      this.ishovered1=true;
      this.ishovered=false;
      this.ishovered2=false;
      this.ishovered3=false;
      this.ishovered4=false;
      console.log("navigate to home ");
    this._router.navigate(['Home']);

   }
  
   else if(act.includes('contact')){
    
    this.ishovered2=true;
    this.ishovered1=false;
    this.ishovered=false;
    this.ishovered3=false;
    this.ishovered4=false;
    console.log('navigate to contact');
     this._router.navigate(['contact'])
    
   }
   else if(act.includes('about')){
    this.ishovered3=true;
    this.ishovered=false;
    this.ishovered1=false;
    this.ishovered2=false;
    this.ishovered4=false;
    console.log('navigate to about');
    this._router.navigate(['about']);
    
   }
   else if(act.includes('dashboard')){
    this.ishovered4=true;
    this.ishovered=false;
    this.ishovered1=false;
    this.ishovered2=false;
    this.ishovered3=false;
    
    console.log('navugate to dashboard');
    this._router.navigate(['dashboard'])
   }
   else{
    this.ishovered=false;
    this.ishovered1=false;
    this.ishovered2=false;
    this.ishovered3=false;
    this.ishovered4=false;

   }

  
   
  
}

}
     
    
    

   
  



