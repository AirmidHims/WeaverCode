import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';


const appRoutes: Routes = [
    {
        path: "invoicelist",
        loadChildren: () => import("./invoice-list/invoice-list.module").then((m) => m.InvoiceListModule),
    },
   
    {
       // Invoice/userlist
        path: "userlist",
        // loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListModule)
    },
    // {
    //     path: "customerpayment",
    //     loadChildren: () => import('./customerpayment/customerpayment.module').then(m => m.CustomerPaymentModule)
    // },
];

@NgModule({
    declarations: [
//     YarninwardComponent,
//     InvDesignComponent,
//    InvLocationComponent
// InvoiceListComponent

],
    imports: [
        RouterModule.forChild(appRoutes),
    ]
})
export class InvoiceModule {
}
