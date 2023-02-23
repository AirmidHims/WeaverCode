import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class YarninwardService {

  yarninventoryform: FormGroup;

  constructor(public _httpClient: HttpClient,
    private _formBuilder: FormBuilder) {
  
    this.yarninventoryform = this.yarnInventoryForm();

  }


 yarnInventoryForm(): FormGroup {
    return this._formBuilder.group({
      entrydate:'',
      challanno:'',
      challandate:'',
      lotno:'',
      partyname:'',
      yarncount:'',
      Millname:'',
      shade:'',
      wtbag:'',
      conebag:'',
      totalbags:'',
      totalgrwt:'',
      totalntwt:'',
      category:'',
      scale:'',
      rate:'',
      amount:'',
      totalweight:'',
      totalamount:'',
      authorisedby:'',
      checkedby:'',
      tanspoerttype:'',
      vechicleno:'',
      remark:'',

     
    });
  }


  populateForm3(employee) {

  }
  populateForm2(employee) {
    // this.myInvoiceFormGroup.patchValue(employee);
  }
  public InvoiceInsert(employee) {
    return this._httpClient.post("Invoice/InvoiceSave", employee);
  }



  public getCityList() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveCityMasterForCombo", {})
  }

  public getStateList(CityId) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_StateMasterForCombo_Conditional", { "Id": CityId })
  }

  public getCountryList(StateId) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_CountryMasterForCombo_Conditional", { "Id": StateId })
  }


  ///Weaver project

  public accountInsert(employee) {
    return this._httpClient.post("Invoice/InvoiceUpdate", employee);
  }
  public accountUpdate(employee) {
    return this._httpClient.post("Invoice/InvoiceUpdate", employee);
  }



  public InvoicesUpdate(employee) {
    return this._httpClient.post("Invoice/InvoiceUpdate", employee);
  }

}
