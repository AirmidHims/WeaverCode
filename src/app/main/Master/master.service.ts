import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class MasterService {
  
  myFilterform: FormGroup ;
  accountmasterform:FormGroup;


  constructor(public _httpClient:HttpClient,
    private _formBuilder: FormBuilder) {
      this.myFilterform=this.filterSearchForm();
     
      this.accountmasterform=this.accountMasterForm();

      
     }                       


 

    filterSearchForm(): FormGroup {
      return this._formBuilder.group({
      
        
        Keyword : '',
        
        start: [new Date().toISOString()],
        end: [new Date().toISOString()],
      });
    }



  
  accountMasterForm(): FormGroup {
    return this._formBuilder.group({
      
      PartyName:'',
      Paystatus:'',
      OPeningbal:'',
      BrokerName:'',
      Contactperson:'',
      Mobile:'',
      EMail:'',
      website:'',
      BAddress:'',
      City:'',
      pin:'',
      Disctrict:'',
      State:'',
      Country:'',
      GSTno:'',
      PanNo:'',
      CINNo:'',
      StateId:'',
      CountryId:'',
      CityId:'',
      AadharCardNo:''
     
    });
  }

  

  populateForm3(employee) {
    // this.myClientFormGroup.patchValue(employee);
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


  ///Weaver project

  public accountInsert(employee)
{    
  return this._httpClient.post("Invoice/InvoiceUpdate",employee);
}
public accountUpdate(employee)
{    
  return this._httpClient.post("Invoice/InvoiceUpdate",employee);
}



public InvoicesUpdate(employee)
{    
  return this._httpClient.post("Invoice/InvoiceUpdate",employee);
}

}
