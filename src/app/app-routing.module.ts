import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import ('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import ('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import ('./register/register.module').then(m => m.RegisterPageModule)
    },
    { // case-details/:case_id
        path: 'case-detail/:case_id',
        loadChildren: () => import ('./case-detail/case-detail.module').then(m => m.CaseDetailPageModule)
    }, { // case-caht/:case_id
        path: 'case-chat/:case_id',
        loadChildren: () => import ('./case-chat/case-chat.module').then(m => m.CaseChatPageModule)
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
