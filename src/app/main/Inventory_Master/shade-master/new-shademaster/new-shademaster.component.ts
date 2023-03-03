import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { InventoryMasterService } from '../../inventory-master.service';

@Component({
  selector: 'app-new-shademaster',
  templateUrl: './new-shademaster.component.html',
  styleUrls: ['./new-shademaster.component.scss']
})
export class NewShademasterComponent implements OnInit {

  title = 'colorPicker';
  color: string = '#2889e9'
  arrayColors: any = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };
 
  selectedColor: string = 'color1';



  date1 = new FormControl(new Date())
  submitted = false;
  Invdate: any;

  invoicedate: Date;
  screenFromString = 'admission-form';
  isLoading: string = '';
  
  shadeID:any;
  shadeCode:any;
  shadeNumber:any;
  shadeColour:any;
  
  Today=[new Date().toISOString()];
 
  // @Output() parentFunction: EventEmitter<any> = new EventEmitter();
 
  private _onDestroy = new Subject<void>();
  constructor(
    public _InvoiceListService: InventoryMasterService,
    public dialogRef: MatDialogRef<NewShademasterComponent>,
    private accountService: AuthenticationService,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe,
    public _matDialog: MatDialog,
    public _httpClient:HttpClient,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    //debugger
       
      if (this.data) {
        // this.invoiceObj = this.data.invoiceObj;
        // console.log("EditInvoice");
        // console.log(this.invoiceObj);
        // this.setDropdownObjs1();
      }
      else{
        
      }

    

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
    let millID = 0//this.registerObj1.OTCathLabBokingID;
    this.isLoading = 'submit';

    console.log()
  
    
        var m_data = {
         "shadeInsert": {
            "shadeID": 0,
            "shadeNumber": this._InvoiceListService.InvallFormGroup.get('shadeNumber').value || '',
            "shadeColour": this._InvoiceListService.InvallFormGroup.get('shadeColour').value || '',
            "createdBy": this.accountService.currentUserValue.user.id,
            "updatedBy":this.accountService.currentUserValue.user.id,
         
          }
        }
        console.log(m_data);
        this._InvoiceListService.ShadeInsert(m_data).subscribe(response => {
          if (response) {
            Swal.fire('Congratulations !', 'Shade Master  Data  save Successfully !', 'success').then((result) => {
              if (result.isConfirmed) {
                this._matDialog.closeAll();

              }
            });
          } else {
            Swal.fire('Error !', 'ShadeMaster Data  not saved', 'error');
          }

        });
      
    
    
  }





}