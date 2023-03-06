import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { OtherinfoMasterService } from '../../otherinfo-master.service';

@Component({
  selector: 'app-edit-rolltype',
  templateUrl: './edit-rolltype.component.html',
  styleUrls: ['./edit-rolltype.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditRolltypeComponent implements OnInit {

 
  submitted = false;
  date1 = new FormControl(new Date())
  screenFromString = 'admission-form';
  isLoading: string = '';
  
  now = Date.now();
 
  RollTypeId:any;
  RollType:any;
 
  Today=[new Date().toISOString()];
 
  // @Output() parentFunction: EventEmitter<any> = new EventEmitter();
 
  private _onDestroy = new Subject<void>();
  constructor(
     public _OtherinfoMasterService: OtherinfoMasterService,
    public dialogRef: MatDialogRef<EditRolltypeComponent>,
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
        this.RollType=this.data.registerObj.RollType;
        this.RollTypeId=this.data.registerObj.RollTypeId;
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
         "updateRollTypemaster": {
          "operation": "UPDATE",
            "RollTypeID": this.data.registerObj.RollTypeId,
            "RollType": this._OtherinfoMasterService.otherallform.get('RollType').value ||  0,
            "updatedBy":this.accountService.currentUserValue.user.id,
         
          }
        }
        console.log(m_data);
        this._OtherinfoMasterService.RolltypeUpdate(m_data).subscribe(response => {
          if (response) {
            Swal.fire('Congratulations !', 'RollType Master  Data  Updated Successfully !', 'success').then((result) => {
              if (result.isConfirmed) {
                this._matDialog.closeAll();

              }
            });
          } else {
            Swal.fire('Error !', 'RollType Data  not saved', 'error');
          }

        });
      
    
    
  }





}

