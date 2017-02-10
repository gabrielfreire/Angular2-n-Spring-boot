import './vendor.ts';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { Ng2JhSharedModule, UserRouteAccessService } from './shared';
import { Ng2JhAdminModule } from './admin/admin.module';
import { Ng2JhAccountModule } from './account/account.module';
import { Ng2JhEntityModule } from './entities/entity.module';

import { LayoutRoutingModule } from './layouts';
import { HomeComponent, AlgorithmsComponent } from './home';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';


@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        Ng2JhSharedModule,
        Ng2JhAdminModule,
        Ng2JhAccountModule,
        Ng2JhEntityModule
    ],
    declarations: [
        JhiMainComponent,
        HomeComponent,
        AlgorithmsComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        { provide: Window, useValue: window },
        { provide: Document, useValue: document },
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class Ng2JhAppModule {}
