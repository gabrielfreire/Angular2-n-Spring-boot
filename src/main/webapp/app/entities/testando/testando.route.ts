import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TestandoComponent } from './testando.component';
import { TestandoDetailComponent } from './testando-detail.component';
import { TestandoPopupComponent } from './testando-dialog.component';
import { TestandoDeletePopupComponent } from './testando-delete-dialog.component';

import { Principal } from '../../shared';


export const testandoRoute: Routes = [
  {
    path: 'testando',
    component: TestandoComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'ng2JhApp.testando.home.title'
    }
  }, {
    path: 'testando/:id',
    component: TestandoDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'ng2JhApp.testando.home.title'
    }
  }
];

export const testandoPopupRoute: Routes = [
  {
    path: 'testando-new',
    component: TestandoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'ng2JhApp.testando.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'testando/:id/edit',
    component: TestandoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'ng2JhApp.testando.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'testando/:id/delete',
    component: TestandoDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'ng2JhApp.testando.home.title'
    },
    outlet: 'popup'
  }
];
