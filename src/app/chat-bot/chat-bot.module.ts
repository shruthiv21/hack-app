import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatBotPageRoutingModule } from './chat-bot-routing.module';

import { ChatBotPage } from './chat-bot.page';

import { ChatBotService } from './chat-bot.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatBotPageRoutingModule
  ],
  declarations: [ChatBotPage],
  providers: [ChatBotService]
})
export class ChatBotPageModule {}
