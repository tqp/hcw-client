import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Csi } from '../Csi';
import { CsiService } from '../csi.service';
import { Student } from '../../../people/students/Student';
import { StudentService } from '../../../people/students/student.service';
import { FormattingService } from '../../../../../../@tqp/services/formatting.service';
import { CaseManager } from '../../../people/case-managers/CaseManager';
import { CaseManagerService } from '../../../people/case-managers/case-manager.service';
import * as moment from 'moment';
import { ServicesProvidedTypeService } from '../../../reference-tables/services-provided-type/services-provided-type.service';
import { ServicesProvidedType } from '../../../reference-tables/services-provided-type/ServicesProvidedType';
import { forkJoin } from 'rxjs';

// REF: https://coryrylan.com/blog/creating-a-dynamic-checkbox-list-in-angular

@Component({
  selector: 'app-csi-detail-edit',
  templateUrl: './csi-detail-edit.component.html',
  styleUrls: ['./csi-detail-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CsiDetailEditComponent implements OnInit {
  @ViewChild('caregiverSurnameInputField', {static: false}) caregiverSurnameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public csi: Csi;
  public csiEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public studentList: Student[];
  public caseManagerList: CaseManager[];
  public servicesProvidedTypeList: ServicesProvidedType[];

  get checkboxFormArray() {
    return this.csiEditForm.controls.csiServicesProvidedCheckboxes as FormArray;
  }

  public validationMessages = {
    'csiId': [
      {type: 'required', message: 'An ID is required'}
    ],
    'studentId': [
      {type: 'required', message: 'An Student is required'}
    ],
    'caseManagerId': [
      {type: 'required', message: 'A Case Manager is required'}
    ],
    'csiDate': [
      {type: 'required', message: 'A date is required'}
    ],
    'csiServicesProvided': [
      {type: 'required', message: 'Please check the services provided'}
    ],
    'csiServicesProvidedArray': [
      {type: 'required', message: 'Please check the services provided'}
    ],
    'csiComments': [
      {type: 'required', message: 'A response is required'}
    ],

    'csiScoreFoodSecurity': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiNutritionAndGrowth': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiShelter': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiCare': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiAbuseAndExploitation': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiLegalProtection': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiWellness': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiHealthCareServices': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiEmotionalHealth': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiSocialBehavior': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiPerformance': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiEducationAndWork': [
      {type: 'required', message: 'A response is required'}
    ]
  };

  constructor(private route: ActivatedRoute,
              private csiService: CsiService,
              private studentService: StudentService,
              private caseManagerService: CaseManagerService,
              private formattingService: FormattingService,
              private servicesProvidedTypeService: ServicesProvidedTypeService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.getStudentList();
    this.getCaseManagerList();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const csiId = params['id'];
        this.newRecord = false;
        // console.log('csiId', csiId);
        this.getCsiDetail(csiId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.csi = new Csi();
        this.csi.csiId = null;
        // setTimeout(() => {
        //   this.csiRecordDateInputField.nativeElement.focus();
        // }, 0);
      }
    }).then();

    this.initializeForm();
  }

  private initializeForm(): void {
    this.csiEditForm = this.formBuilder.group({
      csiId: new FormControl({value: 0, disabled: true}),
      studentId: new FormControl({value: 0, disabled: true}),
      caseManagerId: new FormControl({value: 0, disabled: true}),
      csiDate: new FormControl(moment().format('MM/DD/YYYY'), Validators.required),
      csiComments: new FormControl('', Validators.required),
      csiServicesProvided: new FormControl(''),
      csiServicesProvidedCheckboxes: new FormArray([], minSelectedCheckboxes(1)),

      csiScoreFoodSecurity: new FormControl(''),
    });
  }

  private addCheckboxes() {
    this.servicesProvidedTypeList.forEach(() => {
      const formArray = this.csiEditForm.controls.csiServicesProvidedCheckboxes as FormArray;
      return formArray.push(new FormControl(false));
    });
  }

  private getCsiDetail(csiId: number): void {
    const servicesProvided = this.servicesProvidedTypeService.getServicesProvidedTypeList();
    const csiDetail = this.csiService.getCsiDetail(csiId);

    // We need to ensure that both the servicedProvided list and the csiDetail come back before
    // trying to populate the checkboxes... so, we use forkJoin.
    forkJoin([servicesProvided, csiDetail]).subscribe(response => {
        // console.log('response', response);

        // Use the servicesProvidedTypeList response
        this.servicesProvidedTypeList = response[0];
        this.addCheckboxes();

        // User the csiDetail response
        this.csi = response[1];
        this.csiEditForm.controls['csiId'].patchValue(this.csi.csiId);
        this.csiEditForm.controls['studentId'].patchValue(this.csi.studentId);
        this.csiEditForm.controls['caseManagerId'].patchValue(this.csi.caseManagerId);
        this.csiEditForm.controls['csiDate'].patchValue(this.formattingService.formatMySqlDateAsStandard(this.csi.csiDate));
        this.csiEditForm.controls['csiComments'].patchValue(this.csi.csiComments);
        this.csiEditForm.controls['csiServicesProvided'].patchValue(this.csi.csiServicesProvided);

        this.csiEditForm.controls['csiScoreFoodSecurity'].patchValue(this.csi.csiScoreFoodSecurity);

        // Populate Checkboxes
        const servicesProvidedCheckboxArray = this.csi.csiServicesProvided.split('|');
        this.servicesProvidedTypeList.forEach((value, index) => {
          const padded = ('000' + value.servicesProvidedTypeId).slice(-3);
          if (servicesProvidedCheckboxArray.indexOf(padded) > -1) {
            this.checkboxFormArray.controls[index].setValue(true);
          }
        });
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  onCsiServicesProvidedCheckboxChange(e) {
    const array: string[] = [];
    this.checkboxFormArray.value.forEach((value, index) => {
      if (value) {
        array.push(('000' + this.servicesProvidedTypeList[index].servicesProvidedTypeId).slice(-3));
      }
    });
    this.csiEditForm.controls['csiServicesProvided'].patchValue(array.join('|'));
  }

  private getStudentList(): void {
    this.studentService.getStudentList().subscribe(
      (response: Student[]) => {
        // console.log('response', response);
        this.studentList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getCaseManagerList(): void {
    this.caseManagerService.getCaseManagerList().subscribe(
      (response: CaseManager[]) => {
        // console.log('response', response);
        this.caseManagerList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(csiId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.csiService.deleteCsi(csiId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['csi-record/csi-record-list']).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    const csi = new Csi();
    // console.log('csiEditForm', this.csiEditForm.getRawValue());
    csi.csiId = this.csiEditForm.getRawValue().csiId;
    csi.studentId = this.csiEditForm.getRawValue().studentId;
    csi.caseManagerId = this.csiEditForm.getRawValue().caseManagerId;
    csi.csiDate = this.formattingService.formatStandardDateAsMySql(this.csiEditForm.getRawValue().csiDate);
    csi.csiComments = this.csiEditForm.getRawValue().csiComments;
    csi.csiServicesProvided = this.csiEditForm.getRawValue().csiServicesProvided;
    csi.csiScoreFoodSecurity = this.csiEditForm.getRawValue().csiFoodSecurity;

    if (this.newRecord) {
      this.csiService.createCsi(csi).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['csi/csi-detail', response.csiId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.csiService.updateCsi(csi).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['csi/csi-detail', response.csiId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.csi.csiId) {
      this.router.navigate(['csi/csi-detail', this.csi.csiId]).then();
    } else {
      this.router.navigate(['csi/csi-list']).then();
    }
  }

  public test(): void {
    // console.log('test', this.csiEditForm.getRawValue());


    // this.ordersFormArray.controls.map(value => {
    //   console.log('value', value);
    //   value.setValue(true);
    // });

    // const selectedOrderIds = this.csiEditForm.value.orders
    //   .map((checked, i) => checked ? this.servicesProvidedTypeList[i].servicesProvidedTypeId : null)
    //   .filter(v => v !== null);
    // console.log(selectedOrderIds);
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.save();
    }
    // if (event.key === 'Escape') {
    //   this.cancel();
    // }
  }

}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : {required: true};
  };

  return validator;
}