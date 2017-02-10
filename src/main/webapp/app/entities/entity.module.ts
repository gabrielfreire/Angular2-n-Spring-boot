import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { AlgorithmsComponent } from './Algorithms/algorithms.component';

import { Ng2JhTestandoModule } from './testando/testando.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Ng2JhTestandoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [
    	
    ],
    entryComponents: [],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ng2JhEntityModule {}
