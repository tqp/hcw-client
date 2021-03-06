import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExportComponent } from './export/export.component';
import { CrcMetricsComponent } from './crc-metrics/crc-metrics.component';
import { SummaryReportComponent } from './summary-report/summary-report.component';
import { CsiScoresReportComponent } from './csi-scores-report/csi-scores-report.component';
import { CaseManagerCoverageComponent } from './case-manager-coverage/case-manager-coverage.component';
import { CaregiverCoverageComponent } from './caregiver-coverage/caregiver-coverage.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: '',
        redirectTo: 'crc-metrics',
        pathMatch: 'full'
      },
      {
        path: 'summary-report',
        component: SummaryReportComponent,
        data: {
          title: 'Summary Report'
        }
      },
      {
        path: 'crc-metrics',
        component: CrcMetricsComponent,
        data: {
          title: 'CRC Metrics'
        }
      },
      {
        path: 'csi-scores-report',
        component: CsiScoresReportComponent,
        data: {
          title: 'CSI Scores Report'
        }
      },
      {
        path: 'export',
        component: ExportComponent,
        data: {
          title: 'Export'
        }
      },
      {
        path: 'case-manager-coverage',
        component: CaseManagerCoverageComponent,
        data: {
          title: 'Case Manager Coverage'
        }
      },
      {
        path: 'caregiver-coverage',
        component: CaregiverCoverageComponent,
        data: {
          title: 'Caregiver Coverage'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {
}
