import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { AdvanceDataStored } from 'app/main/Invoice/advance';
import { MasterService } from '../master.service';
import { NewPartyAccountComponent } from './new-party-account/new-party-account.component';

@Component({
  selector: 'app-party-account',
  templateUrl: './party-account.component.html',
  styleUrls: ['./party-account.component.scss']
})
export class PartyAccountComponent implements OnInit {

  constructor(   public _MasterService: MasterService,
    private accountService: AuthenticationService,
    private formBuilder: FormBuilder,
    private advanceDataStored: AdvanceDataStored,
    private router: Router,
   // private _fuseSidebarService: FuseSidebarService,
    // public _invoiceService: InvoiceListService,
    private _ActRoute: Router,
    public _matDialog: MatDialog,
    public datePipe: DatePipe,) { }

  ngOnInit(): void {
  }


  
  newPartyaccount() {
    const dialogRef = this._matDialog.open(NewPartyAccountComponent,
      {
        maxWidth: "85vw",
          height: '530px',
          width: '100%',
      });
    dialogRef.afterClosed().subscribe(result => {
        // this.getInvoicesList();
    });
  }

}
