import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceReportByPaymentPeriodComponent } from './finance-report-by-payment-period/finance-report-by-payment-period.component';
import { FinanceReportByParticipantComponent } from './finance-report-by-participant/finance-report-by-participant.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { FinanceAddPaymentDialogComponent } from './finance-add-payment-dialog/finance-add-payment-dialog.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { PaymentDetailEditDialogComponent } from './payment-detail-edit-dialog/payment-detail-edit-dialog.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoanDetailEditComponent } from './loan-detail-edit/loan-detail-edit.component';


@NgModule({
  declarations: [
    FinanceAddPaymentDialogComponent,
    FinanceReportByPaymentPeriodComponent,
    FinanceReportByParticipantComponent,
    PaymentListComponent,
    PaymentDetailComponent,
    PaymentDetailEditDialogComponent,
    LoanListComponent,
    LoanDetailComponent,
    LoanDetailEditComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    ListAddRemoveItemsBasicModule,
    FlexLayoutModule,
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
