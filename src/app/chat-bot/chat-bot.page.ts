import { Component, OnInit, NgZone } from '@angular/core';

import { Platform } from '@ionic/angular';

declare var ApiAIPromises: any;

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.page.html',
  styleUrls: ['./chat-bot.page.scss'],
})
export class ChatBotPage implements OnInit {

  answer;

  constructor(public platform: Platform, public ngZone: NgZone) {
    platform.ready().then(() => {
      ApiAIPromises.init({
        clientAccessToken: 'c6c5ad1084d64699a8b202f8eb355b51'
      }).then(result => console.log(result));
    });
  }

  ngOnInit() {
  }

  public ask(question) {
    ApiAIPromises.requestText({
      query: question
    })
    .then(({result: {fulfillment: {speech}}}) => {
       this.ngZone.run(() => {
         this.answer = speech;
       });
    });
  }
}
