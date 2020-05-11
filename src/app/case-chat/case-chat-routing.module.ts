import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaseChatPage } from './case-chat.page';

const routes: Routes = [
  {
    path: '',
    component: CaseChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseChatPageRoutingModule {}
