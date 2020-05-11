import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaseChatPageRoutingModule } from './case-chat-routing.module';

import { CaseChatPage } from './case-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaseChatPageRoutingModule
  ],
  declarations: [CaseChatPage]
})
export class CaseChatPageModule {}
