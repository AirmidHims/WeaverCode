import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from 'app/core/services/authentication.service';
import Swal from 'sweetalert2';
import { InventoryMasterService } from '../../inventory-master.service';
import { Designendtable, DesignPick } from '../design-master.component';


@Component({
  selector: 'app-new-designmaster',
  templateUrl: './new-designmaster.component.html',
  styleUrls: ['./new-designmaster.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewDesignmasterComponent implements OnInit {

 
  Account:any;
   
  // submit(){
  //   this.Account=this._InventoryMasterService.designForm.get("AccountType").value;
  //    }
  isLoading:any;
  now = Date.now();
  searchFormGroup: FormGroup;
  DesignName:any;
  ChallanNo:any
  Rspace:any
  Reed:any
  Quality:any
  Pick:any
  Waste:any
  HSNNo:any
  Width:any
  Stdgmmt:any
  
  WarapCount:any
  WarapShade:any
  Count:any;
  WarapDnrCount:any
  WarapEnds:any
  WarapEndsPer:any
  WarapRepeat:any
  WarapWastage:any
  WarapExpWt:any
  TotalEnds:any
  TotalExpWt:any
  
  WeftCount:any
  WeftShade:any
  ActCount:any
  WeftDnrCount:any
  Percentage:any
  RepeatPic:any
  DesignPic:any
  DesignPer:any
  WeftWastagePer:any
  ExpWt:any
  Rate:any
  Costing:any
  TotalRepeatPick:any
  TotalDEsignPic:any
  ExpGms:''

  date1 = new FormControl(new Date())
  Today=[new Date().toISOString()];
  DesignendData: Designendtable[] = [];
  DesignPicData: DesignPick[] = [];
  // lookupsObj: ILookup = new ILookup();

  displayColumns1 = [

    'WarapCount',
    'WarapShade',
    'Count',
    'WarapDnrCount',
    'WarapEnds',
    'WarapEndsPer',
    'WarapRepeat',
    'WarapWastage',
    'WarapExpWt',
    'action'
    
  ];
  dataSource= new MatTableDataSource<Designendtable>();

  displayColumns2 = [


    'WeftCount',
    'WeftShade',
    'ActCount',
    'WeftDnrCount',
    'Percentage',
    'RepeatPic',
    'DesignPic',
    'DesignPer',
    'WeftWastagePer',
    'ExpWt',
    'Rate',
    'Costing',
    'action'
    
    
  ];
  dataSource1= new MatTableDataSource<DesignPick>();

patientInfo: any;
isRowAdded: boolean = false;
isRowAdded1: boolean = false;
  options = [];

  constructor(public _InventoryMasterService: InventoryMasterService,
    
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    // public notification: NotificationServiceService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewDesignmasterComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router)  
    {}


  ngOnInit(): void {

    this.addEmptyRow();
    this.addEmptyRow2();
  console.log(this.data)
//  this.GetCreditList();
//     this.getPartyList();
  
  
    // this.PartyFilterCtrl.valueChanges
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     this.filterParty();
    //   });

   
    
      
  }

  closeDialog() {
    console.log("closed")
     this.dialogRef.close();
   // this._InventoryMasterService.designForm.reset();
  }
 


  
  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

 
  addEmptyRow(element?: Designendtable) {
    // debugger;
    if(this._InventoryMasterService.designForm.invalid) {
      this._InventoryMasterService.designForm.markAllAsTouched();
      this._snackBar.open('Please fill mandetory fields', 'Ok', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 3000
      });
      return;
    }
    if (element) {
      this.isRowAdded = true;
      this.DesignendData && this.DesignendData.length > 0 ? this.DesignendData.splice(this.DesignendData.indexOf(element), 1) : '';
      console.log( this.DesignendData);
    }
    let addingRow1 = {
      WarapCount: element && element.WarapCount ? element.WarapCount : '',
      WarapShade: element && element.WarapShade ? element.WarapShade : '',
      Count: element && element.Count ? element.Count : '',
      WarapDnrCount: element && element.WarapDnrCount ? element.WarapDnrCount : '',
      WarapEnds: element && element.WarapEnds ? element.WarapEnds : '',
      WarapEndsPer: element && element. WarapEndsPer ? element. WarapEndsPer : '',
      WarapRepeat: element && element.WarapRepeat ? element.WarapRepeat : '',
      WarapWastage: element && element.WarapWastage ? element.WarapWastage : '',
      WarapExpWt: element && element.WarapExpWt ? element.WarapExpWt : '',
      // days3: element && element.days3 ? element.days3 : '',
      isLocallyAdded: element ? true : false
    }
    this.DesignendData.push(addingRow1);
    this.dataSource.data = this.DesignendData;
    // console.log(this.dataSource.data );
    // console.log(this.DesignendData);
    element ? this.addRow() : '';
    // this._InventoryMasterService.designForm.addControl(`drugController${this.DesignendData.length - 1}`, new FormControl());
    // this._InventoryMasterService.designForm.get(`drugController${this.DesignendData.length - 1}`).setValidators(Validators.required);
  }

  addRow() {
    // debugger;
    let addingRow1 = {
      WarapCount:'',
      WarapShade: '',
      Count:'',
      WarapDnrCount: '',
      WarapEnds: '',
      WarapEndsPer:'',
      WarapRepeat: '',
      WarapWastage: '',
      WarapExpWt: '',
      // days3: '',
      isLocallyAdded: false
    }
  
    this.DesignendData.push(addingRow1);
    this.dataSource.data = this.DesignendData;

    // this.addEmptyRow();
  }


   
  addEmptyRow2(element?: DesignPick) {
    // debugger;
    if(this._InventoryMasterService.designForm.invalid) {
      this._InventoryMasterService.designForm.markAllAsTouched();
      this._snackBar.open('Please fill mandetory fields', 'Ok', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 3000
      });
      return;
    }
    if (element) {
      this.isRowAdded1 = true;
      this.DesignPicData && this.DesignPicData.length > 0 ? this.DesignPicData.splice(this.DesignPicData.indexOf(element), 1) : '';
      console.log( this.DesignPicData);
    }
    let addingRow1 = {
      WeftCount: element && element.WeftCount ? element.WeftCount : '',
      WeftShade: element && element.WeftShade ? element.WeftShade : '',
      ActCount: element && element.ActCount ? element.ActCount : '',
      WeftDnrCount: element && element.WeftDnrCount ? element.WeftDnrCount : '',
      Percentage: element && element.Percentage ? element.Percentage : '',
      DesignPer: element && element.DesignPer ? element.DesignPer : '',
      RepeatPic: element && element. RepeatPic ? element. RepeatPic : '',
      DesignPic: element && element.DesignPic ? element.DesignPic : '',
      WeftWastagePer: element && element.WeftWastagePer ? element.WeftWastagePer : '',
      ExpWt: element && element.ExpWt ? element.ExpWt : '',
      Rate: element && element.Rate ? element.Rate : '',
      Costing: element && element.Costing ? element.Costing : '',
      isLocallyAdded1: element ? true : false
    }
    this.DesignPicData.push(addingRow1);
    this.dataSource1.data = this.DesignPicData;
  
    element ? this.addRow1() : '';
    // this._InventoryMasterService.designForm.addControl(`drugController${this.DesignendData.length - 1}`, new FormControl());
    // this._InventoryMasterService.designForm.get(`drugController${this.DesignendData.length - 1}`).setValidators(Validators.required);
  }

  addRow1() {
    // debugger;
    let addingRow1 = {
      WeftCount:'',
      WeftShade:'',
      ActCount:'',
      WeftDnrCount:'',
      Percentage:'',
      DesignPer:'',
      RepeatPic:'',
      DesignPic:'',
      WeftWastagePer:'',
      ExpWt:'',
      Rate:'',
      Costing:'',
      isLocallyAdded1: false
    }
    // this.caseFormGroup.get('doseContoller1').setValue(this.caseFormGroup.get('doseContoller').value.DoseName);
    // this.caseFormGroup.get('daysController1').setValue(this.caseFormGroup.get('daysController').value);
    this.DesignPicData.push(addingRow1);
    this.dataSource1.data = this.DesignPicData;

    // this.addEmptyRow();
  }
  onClose() {
    this.dialogRef.close();
  }


  onSave() {
    // debugger;
   
    
    let Designendftabletemp = [];
    let Designpicftabletemp = [];
 
     
  
    debugger;
    this.DesignendData.splice(this.DesignendData.length - 1, 0);

    this.DesignendData.forEach((element: any, index) => {
      let obj = {};
      obj['WarapCount'] = element.WarapCount;
      obj['WarapShade'] = element.WarapShade;
      obj['Count'] = element.Count;
      obj['WarapDnrCount'] = element.WarapDnrCount;
      obj['WarapEnds'] = element.WarapEnds;
      obj['WarapEndsPer'] = element.WarapEndsPer;
      obj['WarapRepeat'] = element.WarapRepeat;
      obj['WarapWastage'] = element.WarapWastage;
      obj['WarapExpWt'] = element.WarapExpWt;
  
      Designendftabletemp.push(obj);

      console.log(Designendftabletemp);
    });

    this.DesignPicData.splice(this.DesignPicData.length - 1, 0);

  
    this.DesignPicData.forEach((element: any, index) => {
      let obj = {};
      obj['WeftCount'] = element.WeftCount;
      obj['WeftShade'] = element.WeftShade;
      obj['ActCount'] = element.ActCount;
      obj['WeftDnrCount'] = element.WeftDnrCount;
      obj['Percentage'] = element.Percentage;
      obj['RepeatPic'] = element.RepeatPic;
      obj['DesignPic'] = element.DesignPic;
      obj['DesignPer'] = element.DesignPer;
      obj['DesignPer'] = element.DesignPer;
      obj['WeftWastagePer'] = element.WeftWastagePer;
      obj['ExpWt'] = element.ExpWt;
      obj['Rate'] = element.Rate;
      obj['Costing'] = element.Costing;
      Designpicftabletemp.push(obj);

      console.log(Designpicftabletemp);
    });

    var m_data = {
      "insertContractBooking": {
         "Id": 0,
         "DesignName": this._InventoryMasterService.designForm.get('DesignName').value || 0,
         "ChallanNo": this._InventoryMasterService.designForm.get('ChallanNo').value || 0,
         "Rspace": this._InventoryMasterService.designForm.get('Rspace').value || 0,
         "Reed": this._InventoryMasterService.designForm.get('Reed').value || 0,
         "Quality": this._InventoryMasterService.designForm.get('Quality').value || 0,
       
         "Pick": this._InventoryMasterService.designForm.get('Pick').value || 0,
         "Waste": this._InventoryMasterService.designForm.get('Waste').value || 0,
         
         "HSNNo": this._InventoryMasterService.designForm.get('HSNNo').value || 0,
         "Width": this._InventoryMasterService.designForm.get('Width').value || 0,
         "Stdgmmt": this._InventoryMasterService.designForm.get('Stdgmmt').value || 0,
          "TotalEnds":this._InventoryMasterService.designForm.get('TotalEnds').value || 0,
          "TotalExpWt":this._InventoryMasterService.designForm.get('TotalExpWt').value || 0,
          "TotalRepeatPick":this._InventoryMasterService.designForm.get('TotalRepeatPick').value || 0,
          "TotalDEsignPic":this._InventoryMasterService.designForm.get('TotalDEsignPic').value || 0,
          "ExpGms":this._InventoryMasterService.designForm.get('ExpGms').value || 0,
    
       }
     }

    //  let insertDesignPaper = {};
    // insertDesignPaper['DesignName'] = this._InventoryMasterService.designForm.get('DesignName').value || '',
    // insertDesignPaper['Rspace'] = this._InventoryMasterService.designForm.get('Rspace').value || 0,
    // insertDesignPaper['Reed'] =this._InventoryMasterService.designForm.get('Reed').value || 0,
    // insertDesignPaper['Quality'] = this._InventoryMasterService.designForm.get('Quality').value || 0,
    // insertDesignPaper['Pick'] = this._InventoryMasterService.designForm.get('Pick').value || 0,
    
    // insertDesignPaper['Waste'] = this._InventoryMasterService.designForm.get('Waste').value || 0,
    // insertDesignPaper['HSNNo'] =  this._InventoryMasterService.designForm.get('HSNNo').value || 0,
    // insertDesignPaper['Width'] = this._InventoryMasterService.designForm.get('Width').value || 0,
    // insertDesignPaper['Stdgmmt'] = this._InventoryMasterService.designForm.get('Stdgmmt').value || 0,
    
    let DesignSaveObj = {};

    DesignSaveObj['insertDesignPaper'] = Designendftabletemp;
    DesignSaveObj['iDesignenftabletemp'] = Designpicftabletemp;

    console.log(DesignSaveObj);

    this._InventoryMasterService.DesignInsert(DesignSaveObj).subscribe(response => {
   
    if (response) {
      Swal.fire('Congratulations !', 'Design Master save Successfully !', 'success').then((result) => {
        if (result.isConfirmed) {
       
            this._matDialog.closeAll();
        }
      });
    } else {
      Swal.fire('Error !', 'Design Master not saved', 'error');
    }
   
    //this.isLoading = '';
  });



  }

  // onSubmit(){

  //   this.isLoading = 'submit';

  //   console.log()
  
      
  //       var m_data = {

  //        "insertPartyAccount":{
  //           "AccountId": 0,
  //           "AccountType": this._InventoryMasterService.designForm.get('AccountType').value || '',
  //           "Name": this._InventoryMasterService.designForm.get('PartyName').value || '',
  //           "ContactPerson": this._InventoryMasterService.designForm.get('ContactPerson').value || '',
  //           "ContactNo": this._InventoryMasterService.designForm.get('Mobile').value || 0,
  //           "EmailAddress": this._InventoryMasterService.designForm.get('EMail').value || '',
  //           "Website": this._InventoryMasterService.designForm.get('Website').value || 0,
  //           "BussAddress": this._InventoryMasterService.designForm.get('BAddress').value || 0,
  //           "City":  this._InventoryMasterService.designForm.get('City').value || '',
  //           "District": this._InventoryMasterService.designForm.get('District').value || '',
  //           "State": this._InventoryMasterService.designForm.get('State').value || '',
  //           "Country": this._InventoryMasterService.designForm.get('Country').value || '',
  //           "PinCode": this._InventoryMasterService.designForm.get('pin').value || 0,
  //           "gstn": this._InventoryMasterService.designForm.get('GSTno').value || '',
  //           "pan": this._InventoryMasterService.designForm.get('PanNo').value || '',
  //           "cin": this._InventoryMasterService.designForm.get('CINNo').value || '',
  //           "CreditDebit": this._InventoryMasterService.designForm.get('CreditDebit').value || '',
  //           "OpeningBalance": parseInt(this._InventoryMasterService.designForm.get('OpeningBalance').value) || 0,
  //           "CreatedBy": this.accountService.currentUserValue.user.id,
  //           "UpdatedBy":this.accountService.currentUserValue.user.id,
  //                 }
  //       }
  //       console.log(m_data);
  //       this._InventoryMasterService.DesignInsert(m_data).subscribe(response => {
  //         if (response) {
  //           Swal.fire('Congratulations !', 'Design Master  Data  save Successfully !', 'success').then((result) => {
  //             if (result.isConfirmed) {
  //               this._matDialog.closeAll();

  //             }
  //           });
  //         } else {
  //           Swal.fire('Error !', 'Design Master Data  not saved', 'error');
  //         }

  //       });
            
  // }


}

