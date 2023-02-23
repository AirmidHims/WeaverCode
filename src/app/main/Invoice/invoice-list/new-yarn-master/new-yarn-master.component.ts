import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { InvoiceListService } from '../../invoice-list.service';

@Component({
  selector: 'app-new-yarn-master',
  templateUrl: './new-yarn-master.component.html',
  styleUrls: ['./new-yarn-master.component.scss']
})
export class NewYarnMasterComponent implements OnInit {

  submitted = false;
  Invdate: any;

  invoicedate: Date;
  screenFromString = 'admission-form';
  isLoading: string = '';

  Today=[new Date().toISOString()];

  now = Date.now();
  yID:any;
  YarnName:any;
  count:any;
  ply:any;
  type:any;
  blend:any;
  Actualcnt:any;
  deniercnt:any;
 
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
 
  private _onDestroy = new Subject<void>();
  constructor(
    public _InvoiceListService: InvoiceListService,
    public dialogRef: MatDialogRef<NewYarnMasterComponent>,
    private accountService: AuthenticationService,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe,
    public _matDialog: MatDialog,
    public _httpClient:HttpClient,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
   debugger
       
    if (this.data) {
      console.log(this.data);
      this.yID=this.data.registerObj.yID;
      this.YarnName=this.data.registerObj.yName;
      this.count=this.data.registerObj.yCount;
      this.ply=this.data.registerObj.yPly;
      this.type=this.data.registerObj.yType;
      this.blend=this.data.registerObj.yBlend;
      this.Actualcnt=this.data.registerObj.yActualCount;
      this.deniercnt=this.data.registerObj.yDenierCount;
     
    }

    // setTimeout(function () {

    //   let element: HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
    //   element.click();

    // }, 1000);

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
    let YarnId=0;
    if(this.data){
    YarnId = this.data.registerObj.yID;
    }
    this.isLoading = 'submit';

    console.log()
  
      if (!YarnId) {
        var m_data = {
         "yarmInsert": {
            "yID": 0,
            "yName": this._InvoiceListService.invyarnform.get('YarnName').value || '',
            "yCount": this._InvoiceListService.invyarnform.get('count').value || 0,
            "yPly": this._InvoiceListService.invyarnform.get('ply').value || '',
            "yType": this._InvoiceListService.invyarnform.get('type').value || '',
            "yBlend": this._InvoiceListService.invyarnform.get('blend').value || '',
            "createdBy": this.accountService.currentUserValue.user.id,
            "yActualCount": this._InvoiceListService.invyarnform.get('Actualcnt').value || 0,
            "yDenierCount": this._InvoiceListService.invyarnform.get('deniercnt').value || 0,
            "updatedBy":this.accountService.currentUserValue.user.id,
         
          }
        }
        console.log(m_data);
        this._InvoiceListService.YarnInsert(m_data).subscribe(response => {
          if (response) {
            Swal.fire('Congratulations !', 'Yarn Master  Data  save Successfully !', 'success').then((result) => {
              if (result.isConfirmed) {
                this._matDialog.closeAll();

              }
            });
          } else {
            Swal.fire('Error !', 'YarnMaster Data  not saved', 'error');
          }

        });
      }
      
    
  }





}
