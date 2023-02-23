import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BeaminventoryService {


  accountmasterform: FormGroup;
  beaminventoryform: FormGroup;

  constructor(public _httpClient: HttpClient,
    private _formBuilder: FormBuilder) {
   
    // this.accountmasterform = this.accountMasterForm();
    this.beaminventoryform = this.beaminventoryForm();

  }


 

  filterForm(): FormGroup {
    return this._formBuilder.group({

      //   FirstName: ['', [
      //      Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      //   ]],
      //   LastName:['', [
      //     Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      //  ]],
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],

    });
  }


  beaminventoryForm(): FormGroup {
    return this._formBuilder.group({

      beaminwardid:'',
      inwardtime:'',
      inwarddate:'',
      gpchalno:'',
      chaldate:'',
      partyname:'',
      sizingname:'',
      partysetno:'',
      contactno:'',
      contactdate:'',
      contmeters:'',
      currrecmtrs:'',
      prerecmtrs:'',
      totalcuts:'',
      totalbeammtrs:'',
      totalproduction:'',
      totalweftcons:'',
      transporttype:'',
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
