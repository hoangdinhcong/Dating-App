import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { PreventUnSavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { ListResolver } from './resolvers/list.resolver';
import { MessagesResolver } from './resolvers/messages.resolver';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'members', component: MemberListComponent,
                resolve: { users: MemberListResolver }
            },
            {
                path: 'members/:id', component: MemberDetailComponent,
                resolve: { user: MemberDetailResolver }
            },
            {
                path: 'member/edit', component: MemberEditComponent,
                resolve: { user: MemberEditResolver },
                canDeactivate: [PreventUnSavedChangesGuard]
            },
            {
                path: 'messages', component: MessagesComponent,
                resolve: { messages: MessagesResolver }
            },
            {
                path: 'lists', component: ListsComponent,
                resolve: { users: ListResolver }
            },
        ]
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
