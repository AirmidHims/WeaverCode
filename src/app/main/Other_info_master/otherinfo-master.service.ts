import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OtherinfoMasterService {

  otherallform: FormGroup;
  transportform: FormGroup;
  Searchform:FormGroup;
  LoomForm:FormGroup;
  
  constructor(public _httpClient: HttpClient,
    private _formBuilder: FormBuilder) {

    this.otherallform = this.createotherallForm();
    this.transportform = this.transportForm();
    this.Searchform = this.SearchFormall();
    this.LoomForm = this.creamLoomForm();

  }



 
  SearchFormall() {
    return this._formBuilder.group({
    
      BeamCode:'',
      BeamNumber:'',
      LoomCode:'',
      start: [new Date().toISOString()],
      end: [new Date().toISOString()],
    });
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

      BeamID:'',
      BeamNumber:'',
      EmptyBeamWt :''
    });
}


creamLoomForm(){
  return this._formBuilder.group({
  LoomId:'',
  LoomCode:'',
  CompanyName:'',
  LoomNo:'',
  RPM:'',
  MfgCompany:'',
  MfgSrno:'',
  LoomTypeId:'',
  StdEfficiency:'',
  ReadingFactor:'',
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


populateFormBeam(employee) {
this.otherallform.patchValue(employee);
}
populateForm2(employee) {
  // this.myInvoiceFormGroup.patchValue(employee);
}
  public InvoiceInsert(employee) {
  return this._httpClient.post("Invoice/InvoiceSave", employee);
}

populateFormLoom(employee){
  this.LoomForm.patchValue(employee);
}

  public getBeamList(employee) {
  return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BeamList",employee)
}

  public getBeamListdatewise(employee) {
  return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BeamlistbyDate", employee)
}

public getLoomList(employee) {
  return this._httpClient.post("Generic/GetByProc?procName=Retrieve_Loomlist",employee)
}

  public getLoomListdatewise(employee) {
  return this._httpClient.post("Generic/GetByProc?procName=Retrieve_LoomlistbyDate", employee)
}

  public getCountryList(StateId) {
  return this._httpClient.post("Generic/GetByProc?procName=Retrieve_CountryMasterForCombo_Conditional", { "Id": StateId })
}


  ///Weaver project



  public beamInsert(employee) {
    return this._httpClient.post("Weaver/NewBeamInsert", employee);
  }
  public BeamUpdate(employee) {
    return this._httpClient.post("Weaver/BeamUpdate", employee);
  }

  public LoomInsert(employee) {
    return this._httpClient.post("Weaver/NewBeamInsert", employee);
  }
  public LoomUpdate(employee) {
    return this._httpClient.post("Weaver/BeamUpdate", employee);
  }
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
