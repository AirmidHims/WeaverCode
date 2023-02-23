import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { DatePipe } from "@angular/common";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatBadgeModule } from "@angular/material/badge";
import { MatFormFieldModule } from "@angular/material/form-field";
import { OtherinfoMasterService } from "./otherinfo-master.service";
import { OtherAddlessComponent } from './other-addless/other-addless.component';
import { LoomComponent } from './loom/loom.component';
import { LoomtypeComponent } from './loomtype/loomtype.component';
import { DefectComponent } from './defect/defect.component';
import { RollTypeComponent } from './roll-type/roll-type.component';
import { TransportComponent } from './transport/transport.component';
import { BeamComponent } from './beam/beam.component';




const appRoutes: Routes = [

    {
      path: "**",
      component: TransportComponent
  },
    {
        path: "Other Info Master/Loom",
        loadChildren: () =>
            // import("./yarninward").then((m) => m.AuthModule),
        LoomComponent
    },
   
    {
        path: 'Other Info Master/Transport',
        loadChildren: () => 
        // import('./main/dashboards/analytics/analytics.module').then(m => m.AnalyticsDashboardModule)
        TransportComponent
    },
    {
        path: 'Other Info Master/Addless',
        loadChildren: () =>
        //  import('./main/dashboards/project/project.module').then(m => m.ProjectDashboardModule)
        OtherAddlessComponent
    },
  
    {
        path: "Other Info Master/Defect",
        loadChildren: () =>
            // import("./yarninward").then((m) => m.AuthModule),
        DefectComponent
    },
   
    {
        path: 'Other Info Master/Beam',
        loadChildren: () => 
        // import('./main/dashboards/analytics/analytics.module').then(m => m.AnalyticsDashboardModule)
        BeamComponent
    },
    {
        path: 'Other Info Master/RollType',
        loadChildren: () =>
        //  import('./main/dashboards/project/project.module').then(m => m.ProjectDashboardModule)
        RollTypeComponent
    },

    {
        path: 'Other Info Master/LoomType',
        loadChildren: () => 
        // import('./main/dashboards/analytics/analytics.module').then(m => m.AnalyticsDashboardModule)
        LoomtypeComponent
    },
     
  
  ];
@NgModule({
    declarations: [
       
        OtherAddlessComponent,
        LoomComponent,
        LoomtypeComponent,
        DefectComponent,
        RollTypeComponent,
        TransportComponent,
        BeamComponent,
      
    ],
    imports: [
        RouterModule.forChild(appRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatRadioModule,
        MatTabsModule,
        MatCardModule,
        MatDividerModule,  
        MatProgressSpinnerModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        MatDialogModule,
        MatGridListModule,
        MatSnackBarModule,
        MatSlideToggleModule ,
        MatDividerModule,
        MatDialogModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatStepperModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        FuseSharedModule,
        NgxMatSelectSearchModule,
        MatBadgeModule,
        MatTooltipModule,
        MatExpansionModule
      
    ],
    providers: [
      OtherinfoMasterService,
        // NotificationServiceService ,
        DatePipe
    ],
    entryComponents: [
        LoomComponent
    ]
})
export class OtherinfoMasterModule { }