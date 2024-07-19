import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { VoicetotextComponent } from './voicetotext/voicetotext.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
//import { VoiceChatComponent } from './voice-chat/voice-chat.component';
//import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,VoicetotextComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  outputs:['childevent'],
})
export class AppComponent  {
  title = '....';
  
  constructor(){}




}
