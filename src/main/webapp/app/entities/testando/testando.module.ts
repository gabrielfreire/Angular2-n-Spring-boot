import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ng2JhSharedModule } from '../../shared';

import {
    TestandoService,
    TestandoPopupService,
    TestandoComponent,
    TestandoDetailComponent,
    TestandoDialogComponent,
    TestandoPopupComponent,
    TestandoDeletePopupComponent,
    TestandoDeleteDialogComponent,
    testandoRoute,
    testandoPopupRoute,
} from './';

let ENTITY_STATES = [
    ...testandoRoute,
    ...testandoPopupRoute,
];

@NgModule({
    imports: [
        Ng2JhSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TestandoComponent,
        TestandoDetailComponent,
        TestandoDialogComponent,
        TestandoDeleteDialogComponent,
        TestandoPopupComponent,
        TestandoDeletePopupComponent,
    ],
    entryComponents: [
        TestandoComponent,
        TestandoDialogComponent,
        TestandoPopupComponent,
        TestandoDeleteDialogComponent,
        TestandoDeletePopupComponent,
    ],
    providers: [
        TestandoService,
        TestandoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ng2JhTestandoModule {}
