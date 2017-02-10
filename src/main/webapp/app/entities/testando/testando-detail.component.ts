import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Testando } from './testando.model';
import { TestandoService } from './testando.service';

@Component({
    selector: 'jhi-testando-detail',
    templateUrl: './testando-detail.component.html'
})
export class TestandoDetailComponent implements OnInit, OnDestroy {

    testando: Testando;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private testandoService: TestandoService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['testando']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.testandoService.find(id).subscribe(testando => {
            this.testando = testando;
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
