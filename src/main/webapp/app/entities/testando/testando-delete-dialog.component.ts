import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Testando } from './testando.model';
import { TestandoPopupService } from './testando-popup.service';
import { TestandoService } from './testando.service';

@Component({
    selector: 'jhi-testando-delete-dialog',
    templateUrl: './testando-delete-dialog.component.html'
})
export class TestandoDeleteDialogComponent {

    testando: Testando;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private testandoService: TestandoService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager,
        private router: Router
    ) {
        this.jhiLanguageService.setLocations(['testando']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
        this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
    }

    confirmDelete (id: number) {
        this.testandoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testandoListModification',
                content: 'Deleted an testando'
            });
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-testando-delete-popup',
    template: ''
})
export class TestandoDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private testandoPopupService: TestandoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.testandoPopupService
                .open(TestandoDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
