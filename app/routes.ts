import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

// роутинг
export const appRoutes: Routes = [
  // домашняя
  { path: '', component: HomeComponent },
  // общий гвард для всех
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      // список пользователей
      {
        path: 'members',
        component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      // конкретный пользователь
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      //  редактирвоание пользователя
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      //  список сообщений
      {
        path: 'messages',
        component: MessagesComponent,
        resolve: {messages: MessagesResolver} },
      // лист
      {
        path: 'lists',
        component: ListsComponent,
        resolve: {users: ListsResolver}
      },
      // admin
      {
        path: 'admin',
        component: AdminPanelComponent,
        data: {roles: ['Admin', 'Moderator']},
      },
    ]
  },
  // путь по умолчанию
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
