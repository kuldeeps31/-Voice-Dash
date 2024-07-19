import { Injectable,NgZone } from '@angular/core';
//declare var webkitSpeechRecognition: any;


// Extend the Window interface to include webkitSpeechRecognition
interface IWindow extends Window {
  webkitSpeechRecognition: any;
}


@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  isrecoginition:any; //object
  islistining:boolean=false;
   
  storetxt:string='';


  constructor(private ngzone:NgZone) {
    //here we use ng zone because it helps us to function outside the angular zone ny third par
  this.initialspeech(); 
  }

  initialspeech():void{

    if (typeof window !== 'undefined') {  //it is used to wheather it support to our browser or not
      const win = window as unknown as IWindow;

      if (win.webkitSpeechRecognition) {
        this.isrecoginition = new win.webkitSpeechRecognition();
        this.isrecoginition.continuous = true;  //enable contineous listining //agar isko false krdiya then means ye hume contieous sunega jab tak hum explictily is stop na kre
        this.isrecoginition.interimResults = true;  //to get partial means it will help us to give the partial reesult which help user to get instant feedback..
        this.isrecoginition.lang = 'en-US';

        this.isrecoginition.onstart = () => {
          this.ngzone.run(() => {
            this.islistining = true;
            console.log('speech recognition started');
          });
        };

       
        this.isrecoginition.onend = () => {
          this.ngzone.run(() => {
            this.islistining = false;
            console.log('speech recognition stop')
          });
        };
        


        this.isrecoginition.onresult = (event: any) => {
        
          let interimTranscript="";


              for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.storetxt  = event.results[i][0].transcript.trim() + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
       
     

        this.ngzone.run(() => {
          // Assuming event is structured as per webkitSpeechRecognition result
          this.storetxt = this.storetxt.trim() + ' ' ;
        });

       
     
        
       
        };

      } else {
        console.error('Speech recognition not available in this browser.');
      }
    } else {
      console.error('Window is not defined.');
    }
  }

  startlistining():void{
    this.isrecoginition.start();
    this.islistining=true;
  }
  stoplisting():void{
    this.isrecoginition.stop();
    this.islistining=false;
  }
  getstoredtext():string {
return this.storetxt;

  }
  isrecognizing():boolean{
   return this.islistining;
  }

 

  
}

interface IWindow extends Window {
  webkitSpeechRecognition: any; // Extend the Window interface to include webkitSpeechRecognition
}





