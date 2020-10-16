import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsModule } from './reports/reports.module';
import { CrcMembersModule } from './crc-members/crc-members.module';
import { AccountModule } from './account/account.module';
import { MicrofinanceModule } from './microfinance/microfinance.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Custom Modules
    ReportsModule,
    CrcMembersModule,
    AccountModule,
    MicrofinanceModule
  ]
})
export class SecuredPagesModule {
}
