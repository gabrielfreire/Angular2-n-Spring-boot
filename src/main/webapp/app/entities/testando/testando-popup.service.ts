import { Injectable, Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Testando } from './testando.model';
import { TestandoService } from './testando.service';
@Injectable()
export class TestandoPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private testandoService: TestandoService
    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.testandoService.find(id).subscribe(testando => {
                this.testandoModalRef(component, testando);
            });
        } else {
            return this.testandoModalRef(component, new Testando());
        }
    }

    testandoModalRef(component: Component, testando: Testando): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.testando = testando;
        modalRef.result.then(result => {
            console.log(`Closed with: ${result}`);
            this.isOpen = false;
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            this.isOpen = false;
        });
        return modalRef;
    }
}
