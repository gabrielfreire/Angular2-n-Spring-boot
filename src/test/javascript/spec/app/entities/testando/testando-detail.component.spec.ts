import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TestandoDetailComponent } from '../../../../../../main/webapp/app/entities/testando/testando-detail.component';
import { TestandoService } from '../../../../../../main/webapp/app/entities/testando/testando.service';
import { Testando } from '../../../../../../main/webapp/app/entities/testando/testando.model';

describe('Component Tests', () => {

    describe('Testando Management Detail Component', () => {
        let comp: TestandoDetailComponent;
        let fixture: ComponentFixture<TestandoDetailComponent>;
        let service: TestandoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TestandoDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    TestandoService
                ]
            }).overrideComponent(TestandoDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestandoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestandoService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Testando(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.testando).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
