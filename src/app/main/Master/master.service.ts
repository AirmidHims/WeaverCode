import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class MasterService {
  
  myFilterform: FormGroup ;
  accountmaster:FormGroup;


  constructor(public _httpClient:HttpClient,
    private _formBuilder: FormBuilder) {
      this.myFilterform=this.filterSearchForm();
     
      this.accountmaster=this.accountMasterForm();

      
     }                       


 

    filterSearchForm(): FormGroup {
      return this._formBuilder.group({
      
        
        Keyword : '',
        AccountType:'',
        start: [new Date().toISOString()],
        end: [new Date().toISOString()],
      });
    }



  
  accountMasterForm(): FormGroup {
    return this._formBuilder.group({
      AccountType:'',
      PartyName:'',
      Paystatus:'',
       Name:'',
       ContactPerson:'',
      Mobile:'',
      EMail:'',
      Website:'',
      BAddress:'',
      City:'',
      pin:'',
      District:'',
      State:'',
      Country:'',
      GSTno:'',
      PanNo:'',
      CINNo:'',
      StateId:'',
      CountryId:'',
      CityId:'',
      AadharCardNo:'',
      OpeningBalance:'0',
      CreditDebit:''

    });
  }

  

  populateFormAccountMaster(employee) {
    this.accountmaster.patchValue(employee);
  }
  populateForm2(employee) {
    // this.myInvoiceFormGroup.patchValue(employee);
  }
  public InvoiceInsert(employee)
{    
  return this._httpClient.post("Invoice/InvoiceSave",employee);
}




  public getCityList() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveCityMasterForCombo",{})
  }

  public getStateList(CityId) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_StateMasterForCombo_Conditional",{"Id": CityId})
  }
  
  public getCountryList(StateId) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_CountryMasterForCombo_Conditional",{"Id": StateId})
  }

  public getAccountList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_AccountList",employee)
  }

  ///Weaver project

  public accountInsert(employee)
{    
  return this._httpClient.post("Weaver/NewAccountInsert",employee);
}
public accountUpdate(employee)
{    
  return this._httpClient.post("Weaver/AccountUpdate",employee);
}



public InvoicesUpdate(employee)
{    
  return this._httpClient.post("Invoice/InvoiceUpdate",employee);
}

}
