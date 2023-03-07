import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ContractbookingService } from '../../contractbooking.service';

@Component({
  selector: 'app-new-contract-booking',
  templateUrl: './new-contract-booking.component.html',
  styleUrls: ['./new-contract-booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewContractBookingComponent implements OnInit {

  submitted = false;
  
  screenFromString = 'admission-form';
  isLoading: string = '';

  Today=[new Date().toISOString()];

  date1 = new FormControl(new Date())

  Bookingno:any;
  Bookdate:any;
  Partyname:any;
  Brokername:any;
  Sizingname:any;
  Brokerage:any;
  Quality:any;
  QualityId:any;
  QualityCode:any;
  QualityName:any;
  Design:any;
  Noofbeam:any;
  Pick:any;
  Jobrate:any;
  Totalmeter:any;
  Completedate:any;
 PaymentTerm:any;
 Remark:any;

 filteredOptions: any;
 noOptionFound: boolean = false;

  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
 
  private _onDestroy = new Subject<void>();
  constructor(
    public _ContractbookingService: ContractbookingService,
    public dialogRef: MatDialogRef<NewContractBookingComponent>,
    private accountService: AuthenticationService,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe,
    public _matDialog: MatDialog,
    public _httpClient:HttpClient,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
   debugger
     
  }

 

  getQualityListCombobox() {
    let tempObj;
   
    if (this._ContractbookingService.contractbookingform.get('Quality').value.length >= 1) {
      this._ContractbookingService.getQualitywiseList().subscribe(data => {
        
        this.filteredOptions = data;
        console.log(this.filteredOptions);
        if (this.filteredOptions.length == 0) {
          this.noOptionFound = true;
        } else {
          this.noOptionFound = false;
        }
      });
      // });
    }
  }

  getSelectedObj(obj) {
    // debugger;
    console.log(obj);
    // console.log('obj==', obj);
    this.QualityName = obj.QualityCode;
    this.QualityId = obj.QualityId;
    this.QualityName = obj.QualityName;

  }
  onScroll(){}
  
  getOptionText(option) {
    // debugger;
    if (!option)
      return '';
    return option.QualityName;  // + ' ' + option.Price ; //+ ' (' + option.TariffId + ')';

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
            "yName": this._ContractbookingService.contractbookingform.get('YarnName').value || '',
            "yCount": this._ContractbookingService.contractbookingform.get('count').value || 0,
            "yPly": this._ContractbookingService.contractbookingform.get('ply').value || '',
            "yType": this._ContractbookingService.contractbookingform.get('type').value || '',
            "yBlend": this._ContractbookingService.contractbookingform.get('blend').value || '',
            "createdBy": this.accountService.currentUserValue.user.id,
            "yActualCount": this._ContractbookingService.contractbookingform.get('Actualcnt').value || 0,
            "yDenierCount": this._ContractbookingService.contractbookingform.get('deniercnt').value || 0,
            "updatedBy":this.accountService.currentUserValue.user.id,
         
          }
        }
        console.log(m_data);
        this._ContractbookingService.ContractBookingInsert(m_data).subscribe(response => {
          if (response) {
            Swal.fire('Congratulations !', 'Contract Booking Master  Data  save Successfully !', 'success').then((result) => {
              if (result.isConfirmed) {
                this._matDialog.closeAll();

              }
            });
          } else {
            Swal.fire('Error !', 'Contract Booking Data  not saved', 'error');
          }

        });
      }
      
    
  }





}


