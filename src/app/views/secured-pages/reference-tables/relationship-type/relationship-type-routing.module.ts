import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaregiverDetailEditComponent } from './caregiver-detail-edit/caregiver-detail-edit.component';
import { CaregiverDetailComponent } from './caregiver-detail/caregiver-detail.component';
import { CaregiverListComponent } from './caregiver-list/caregiver-list.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Care Givers'
    },
    children: [
      {
        path: '',
        redirectTo: 'caregiver-list',
        pathMatch: 'full'
      },
      {
        path: 'caregiver-list',
        component: CaregiverListComponent,
        data: {
          title: 'Caregiver List'
        }
      },
      {
        path: 'caregiver-detail/:guid',
        component: CaregiverDetailComponent,
        data: {
          title: 'Caregiver Detail'
        }
      },
      {
        path: 'caregiver-create',
        component: CaregiverDetailEditComponent,
        data: {
          title: 'Create Caregiver'
        }
      },
      {
        path: 'caregiver-detail-edit/:guid',
        component: CaregiverDetailEditComponent,
        data: {
          title: 'Edit Caregiver'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationshipTypeRoutingModule {
}