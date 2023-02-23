import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OtherinfoMasterService {

  otherallform: FormGroup;
  transportform: FormGroup;

  constructor(public _httpClient: HttpClient,
    private _formBuilder: FormBuilder) {

    this.otherallform = this.createotherallForm();
    this.transportform = this.transportForm();

  }



  createotherallForm() {
    return this._formBuilder.group({
      Addlessname:'',
      stdefficency:'',
      readingfactor:'',
      Defectname:'',
      Entno:'',
      other:'',
      BeamNo:'',
      emptybeamwt:'',

    });
}


transportForm(): FormGroup {
  return this._formBuilder.group({

    TransportidL: '',
    TransportName: '',
    Tagarate: '',
    Bagrate: '',
    loadedbeamrate: '',
    Emptybeamrate: '',
    otherrate: '',
    cutpeicerate: '',
    rollrate: '',


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
