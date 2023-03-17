import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { YarnInwardTableMaster } from '../yarn-inward/yarn-inward.component';
import { YarninwardService } from '../yarninward.service';

@Component({
  selector: 'app-edit-yarn-inward',
  templateUrl: './edit-yarn-inward.component.html',
  styleUrls: ['./edit-yarn-inward.component.scss']
})
export class EditYarnInwardComponent implements OnInit {

  submitted = false;
  
  screenFromString = 'admission-form';
  isLoading: string = '';

  Today=[new Date().toISOString()];
  YarnInwardData: YarnInwardTableMaster[] = [];
  EntryDate = new FormControl(new Date());
  ChallanDate = new FormControl(new Date());
  

  ChallanNo:any;
  LotNo:any;
  PartyName:any;
  YarnCount:any;
  MillName:any;
  Shade:any;
  Wtbag:any;
  Conebag:any;
  Totalbags:any;
  Totalgrwt:any;
  Totalntwt:any;
  Category:any;
  Scale:any;
  Rate:any;
  Amount:any;
  TotalBag:any;
  TotalWeight:any;
  TotalAmount:any;
  Authorisedby:any;
  Checkedby:any;
  Tanspoerttype:any;
  Vechicleno:any;
  Remark:any;

  displayColumns1 = [

    'YarnCount',
    'MillName',
    'Shade',
    'Wtbag',
    'Conebag',
    'Totalbags',
    'Totalgrwt',
    'Totalntwt',
    'Category',
    'Scale',
    'Rate',
    'Amount',
    'action'
    
  ];
  dataSource= new MatTableDataSource<YarnInwardTableMaster>();
  isRowAdded: boolean = false;
 
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
 
  private _onDestroy = new Subject<void>();
  constructor(
    public _YarninwardService: YarninwardService,
    public dialogRef: MatDialogRef<EditYarnInwardComponent>,
    private accountService: AuthenticationService,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    public _matDialog: MatDialog,
    public _httpClient:HttpClient,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.addEmptyRow();
   debugger
       
    if (this.data) {
      console.log(this.data);
      this.ChallanNo=this.data.registerObj.ChallanNo;
      this.ChallanDate=this.data.registerObj.ChallanDate;
      this.LotNo=this.data.registerObj.LotNo;
      this.PartyName=this.data.registerObj.PartyName;
      this.YarnCount=this.data.registerObj.YarnCount;
      this.MillName=this.data.registerObj.MillName;
      this.Shade=this.data.registerObj.Shade;
      this.Wtbag=this.data.registerObj.Wtbag;
      this.Conebag=this.data.registerObj.Conebag;
      this.Totalbags=this.data.registerObj.Totalbags;
      this.Totalgrwt=this.data.registerObj.Totalgrwt;
      this.Totalntwt=this.data.registerObj.Totalntwt;
      this.Category=this.data.registerObj.Category;
      this.Scale=this.data.registerObj.Scale;
      this.Rate=this.data.registerObj.Rate;

      this.Amount=this.data.registerObj.Amount;
      this.TotalBag=this.data.registerObj.TotalBag;
      this.TotalWeight=this.data.registerObj.TotalWeight;
      this.TotalAmount=this.data.registerObj.TotalAmount;
      this.Authorisedby=this.data.registerObj.TotalAmount;
      this.Checkedby=this.data.registerObj.CheckedBy;
      this.Tanspoerttype=this.data.registerObj.TransportId;
      this.Vechicleno=this.data.registerObj.VehichleNo;
      this.Remark=this.data.registerObj.Remarks;
     this.Tanspoerttype= this.data.registerObj.Tanspoerttype || '';
    }

 
  }

 
 

  
  addEmptyRow(element?: YarnInwardTableMaster) {
    // debugger;
    if(this._YarninwardService.yarninventoryform.invalid) {
      this._YarninwardService.yarninventoryform.markAllAsTouched();
      this._snackBar.open('Please fill mandetory fields', 'Ok', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 3000
      });
      return;
    }
    if (element) {
      this.isRowAdded = true;
      this.YarnInwardData && this.YarnInwardData.length > 0 ? this.YarnInwardData.splice(this.YarnInwardData.indexOf(element), 1) : '';
      console.log( this.YarnInwardData);
    }
    let addingRow1 = {
      YarnCount: element && element.YarnCount ? element.YarnCount : '',
      MillName: element && element.MillName ? element.MillName : '',
      Shade: element && element.Shade ? element.Shade : '',
      Wtbag: element && element.Wtbag ? element.Wtbag : '',
      Conebag: element && element.Conebag ? element.Conebag : '',
      Totalbags: element && element. Totalbags ? element. Totalbags : '',
      Totalgrwt: element && element.Totalgrwt ? element.Totalgrwt : '',
      Totalntwt: element && element.Totalntwt ? element.Totalntwt : '',
      Category: element && element.Category ? element.Category : '',
      Scale: element && element.Scale ? element.Scale : '',
      Rate: element && element.Rate ? element.Rate : '',
      Amount: element && element.Amount ? element.Amount : '',
      isLocallyAdded: element ? true : false
    }
    this.YarnInwardData.push(addingRow1);
    this.dataSource.data = this.YarnInwardData;
   
    element ? this.addRow() : '';
   
  }

  addRow() {
    // debugger;
    let addingRow1 = {
      YarnCount:'',
      MillName:'',
      Shade:'',
      Wtbag:'',
      Conebag:'',
      Totalbags:'',
      Totalgrwt:'',
      Totalntwt:'',
      Category:'',
      Scale:'',
      Rate:'',
      Amount:'',
      isLocallyAdded: false
    }
  
    this.YarnInwardData.push(addingRow1);
    this.dataSource.data = this.YarnInwardData;

    // this.addEmptyRow();
  }



  onClose() {

    this.dialogRef.close();
  }



  dateTimeObj: any;s
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

  onSubmit() {
    debugger;
  
    this.isLoading = 'submit';


      
        var m_data = {
         "updateYarnInward": {
          "operation": "UPDATE",
            "YarnInwardID ": this.data.registerObj.YarnInwardID,
      //      "YarnInwardCode":'YIN106',// this._YarninwardService.yarninventoryform.get('YarnName').value || '',
            "EntryDate": this._YarninwardService.yarninventoryform.get('EntryDate').value || '',
            "ChallanNo": this._YarninwardService.yarninventoryform.get('ChallanNo').value || '',
            "ChallanDate": this._YarninwardService.yarninventoryform.get('ChallanDate').value || '',
            "LotNo": this._YarninwardService.yarninventoryform.get('LotNo').value || '',
            "AccountId": 1,//this._YarninwardService.yarninventoryform.get('blend').value || '',
            "TotalBags": parseInt(this._YarninwardService.yarninventoryform.get('TotalBag').value) || 0,
            "TotalWeight": parseInt(this._YarninwardService.yarninventoryform.get('Totalweight').value) || 0,
            "TotalAmount": parseInt(this._YarninwardService.yarninventoryform.get('Totalamount').value) || '',
            "AuthorisedBy": this._YarninwardService.yarninventoryform.get('Authorisedby').value || 0,
            "CheckedBy": this._YarninwardService.yarninventoryform.get('Checkedby').value || 0,
            "TransportId": parseInt(this._YarninwardService.yarninventoryform.get('Tanspoerttype').value) || '',
            "VehichleNo": this._YarninwardService.yarninventoryform.get('Vechicleno').value || 0,
            "Remarks": this._YarninwardService.yarninventoryform.get('Remark').value || 0,
                     
            "CreatedBy":this.accountService.currentUserValue.user.id,
            "UpdatedBy":this.accountService.currentUserValue.user.id,
         
          }
        }
        console.log(m_data);
        this._YarninwardService.YarnInwardInsert(m_data).subscribe(response => {
          if (response) {
            Swal.fire('Congratulations !', 'YarnInward Master  Data  Updated Successfully !', 'success').then((result) => {
              if (result.isConfirmed) {
                this._matDialog.closeAll();

              }
            });
          } else {
            Swal.fire('Error !', 'YarnInward Master Data  not Updated', 'error');
          }

        });
       
    
  }




}


