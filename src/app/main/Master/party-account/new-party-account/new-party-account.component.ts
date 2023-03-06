import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { InvoiceListService } from 'app/main/Invoice/invoice-list.service';
// import { NotificationServiceService } from 'app/main/opd/notification-service.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-new-party-account',
  templateUrl: './new-party-account.component.html',
  styleUrls: ['./new-party-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class NewPartyAccountComponent implements OnInit {

  Account:any;
   
  submit(){
    this.Account=this._MasterService.accountmaster.get("AccountType").value;
     }

  now = Date.now();
  searchFormGroup: FormGroup;
  cityList: any = [];
  stateList: any = [];
  countryList: any = [];
  selectedState = "";
  VisitTime: String;
  selectedStateID: any;
  selectedCountry: any;
  selectedCountryID: any;
  isLoading: any;
  
  registerObj:any;
  screenFromString = 'registration';
  submitted = false;
  Name:any;  
  PartyName:any;
  Paystatus:any;
  OPeningbal:any;
  BrokerName:any;
  ContactPerson:any;
  Mobile:any;
  EMail:any;
  Website:any;
  BAddress:any;
  City:any;
  pin:any;
  District:any;
  State:any;
  Country:any;
  GSTno:any;
  PanNo:any;
  CINNo:any;
  StateId:any;
  CountryId:any;
  CityId:any;
  OpeningBalance:any;
  //registerObj = new RegInsert({});
  // prefix filter
  date1 = new FormControl(new Date())
  Today=[new Date().toISOString()];




  // city filter
  public cityFilterCtrl: FormControl = new FormControl();
  public filteredCity: ReplaySubject<any> = new ReplaySubject<any>(1);

  
  private _onDestroy = new Subject<void>();


  options = [];

  // @Input() childName: string[];
  // @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  matDialogRef: any;

  constructor(public _MasterService: MasterService,
    
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    // public notification: NotificationServiceService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewPartyAccountComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router)  
    {}


  ngOnInit(): void {

    
  console.log(this.data)
    this.getcityList();
  
  
    this.cityFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCity();
      });

   
    
      
  }

  closeDialog() {
    console.log("closed")
     this.dialogRef.close();
   // this._MasterService.accountmaster.reset();
  }
 


  get f() { return this._MasterService.accountmaster.controls }

 
  // City filter code
  private filterCity() {

    if (!this.cityList) {
      return;
    }
    // get the search keyword
    let search = this.cityFilterCtrl.value;
    if (!search) {
      this.filteredCity.next(this.cityList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredCity.next(
      this.cityList.filter(bank => bank.CityName.toLowerCase().indexOf(search) > -1)
    );
  }
  

  
  
  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

 


 
  getCityList() {
    this._MasterService.getCityList().subscribe(data => {
      this.cityList = data;
      this.filteredCity.next(this.cityList.slice());
    });
  }


  getcityList() {
    this._MasterService.getCityList().subscribe(data => {
      this.cityList = data;
      this.filteredCity.next(this.cityList.slice());
     if(this.data){
      const ddValue = this.cityList.find(c => c.CityId == this.data.registerObj.CityId);
     this._MasterService.accountmaster.get('CityId').setValue(ddValue); 
     this.onChangeCityList(this.data.registerObj.CityId)
     }
    });
  }

  onChangeStateList(CityId) {
    if (CityId > 0) {
      this._MasterService.getStateList(CityId).subscribe(data => {
        this.stateList = data;
        this.selectedState = this.stateList[0].StateName;
        //  this._AdmissionService.myFilterform.get('StateId').setValue(this.selectedState);
      });
    }
  }
  onChangeCityList(CityId) {
    if (CityId > 0) {
      this._MasterService.getStateList(CityId).subscribe(data => {
        this.stateList = data;
        this.selectedState = this.stateList[0].StateName;
        this.selectedStateID = this.stateList[0].StateId;
        // const stateListObj = this.stateList.find(s => s.StateId == this.selectedStateID);
        // this._MasterService.accountmaster.get('StateId').setValue(this.stateList[0]);
        this.onChangeCountryList(this.selectedStateID);
      });
    } else {
      this.selectedState = null;
      this.selectedStateID = null;
      this.selectedCountry = null;
      this.selectedCountryID = null;
    }
  }
  onChangeCountryList(StateId) {
    if (StateId > 0) {
      this._MasterService.getCountryList(StateId).subscribe(data => {
        this.countryList = data;
        this.selectedCountry = this.countryList[0].CountryName;
        // this._MasterService.accountmaster.get('CountryId').setValue(this.countryList[0]);
        // this._MasterService.accountmaster.updateValueAndValidity();
      });
    }
  }



  
  getOptionText(option) {
    if (!option) return '';
    return option.FirstName + ' ' + option.LastName + ' (' + option.RegId + ')';
  }

  getSelectedObj(obj) {
    
    console.log('obj==', obj);
    
    let a, b, c;

    a = obj.AgeDay.trim();;
    b = obj.AgeMonth.trim();
    c = obj.AgeYear.trim();
    console.log(a, b, c);
    obj.AgeDay = a;
    obj.AgeMonth = b;
    obj.AgeYear = c;

    this.registerObj = obj;

    // this.setDropdownObjs();
  }


  setDropdownObjs1() {
    debugger;
    
    
    const toSelectCity = this.cityList.find(c => c.CityId == this.registerObj.CityId);
    this._MasterService.accountmaster.get('CityId').setValue(toSelectCity);
//this.onChangeCityList(this.registerObj.CityId);
    
    this._MasterService.accountmaster.updateValueAndValidity();

    
  }

 

  onClose() {
    this.dialogRef.close();
  }

  onSubmit(){

    this.isLoading = 'submit';

    console.log()
  
      
        var m_data = {

         "insertPartyAccount":{
            "AccountId": 0,
            "AccountType": this._MasterService.accountmaster.get('AccountType').value || '',
            "Name": this._MasterService.accountmaster.get('PartyName').value || '',
            "ContactPerson": this._MasterService.accountmaster.get('ContactPerson').value || '',
            "ContactNo": this._MasterService.accountmaster.get('Mobile').value || 0,
            "EmailAddress": this._MasterService.accountmaster.get('EMail').value || '',
            "Website": this._MasterService.accountmaster.get('Website').value || 0,
            "BussAddress": this._MasterService.accountmaster.get('BAddress').value || 0,
            "City":  this._MasterService.accountmaster.get('City').value || '',
            "District": this._MasterService.accountmaster.get('District').value || '',
            "State": this._MasterService.accountmaster.get('State').value || '',
            "Country": this._MasterService.accountmaster.get('Country').value || '',
            "PinCode": this._MasterService.accountmaster.get('pin').value || 0,
            "gstn": this._MasterService.accountmaster.get('GSTno').value || '',
            "pan": this._MasterService.accountmaster.get('PanNo').value || '',
            "cin": this._MasterService.accountmaster.get('CINNo').value || '',
            "CreditDebit": this._MasterService.accountmaster.get('CreditDebit').value || '',
            "OpeningBalance": parseInt(this._MasterService.accountmaster.get('OpeningBalance').value) || 0,
            "CreatedBy": this.accountService.currentUserValue.user.id,
            "UpdatedBy":this.accountService.currentUserValue.user.id,
                  }
        }
        console.log(m_data);
        this._MasterService.accountInsert(m_data).subscribe(response => {
          if (response) {
            Swal.fire('Congratulations !', 'Account Master  Data  save Successfully !', 'success').then((result) => {
              if (result.isConfirmed) {
                this._matDialog.closeAll();

              }
            });
          } else {
            Swal.fire('Error !', 'Account Master Data  not saved', 'error');
          }

        });
            
  }


}

