import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

import { ChatBotService, Message } from './chat-bot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.page.html',
  styleUrls: ['./chat-bot.page.scss'],
})
export class ChatBotPage implements OnInit {

  messages: Observable<Message[]>;

  formValue: string;

  constructor(public chatBotService: ChatBotService) { }

  ngOnInit() {
    this.messages = this.chatBotService.conversation.asObservable().pipe(
      scan((acc, val) => acc.concat(val))
    );
  }

  public sendMessages() {
    this.chatBotService.converse(this.formValue);
    this.formValue = '';
  }
}
