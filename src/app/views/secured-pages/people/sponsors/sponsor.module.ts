import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorRoutingModule } from './sponsor-routing.module';
import { SponsorListComponent } from './sponsor-list/sponsor-list.component';
import { SponsorDetailComponent } from './sponsor-detail/sponsor-detail.component';
import { SponsorDetailEditComponent } from './sponsor-detail-edit/sponsor-detail-edit.component';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '../../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    SponsorListComponent,
    SponsorDetailComponent,
    SponsorDetailEditComponent
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
    // Custom Imports
    SponsorRoutingModule
  ]
})
export class SponsorModule {
}
