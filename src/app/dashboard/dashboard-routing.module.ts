import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import { AdminComponent } from './components/admin/admin.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            { path: '', redirectTo: 'transactions', pathMatch: 'full' },
            { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
            { path: 'transactions', component: TransactionComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
