import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { logoUrlMatcher } from './logo-url.validator';

@Component({
    selector: 'app-carrier-form',
    templateUrl: './carrier-form.component.html',
    styleUrls: ['./carrier-form.component.scss']
})

export class CarrierFormComponent implements OnChanges {
    @Input()
    carrier: any;

    @Output()
    update = new EventEmitter<any>();

    @Output()
    create = new EventEmitter<any>();

    @Output()
    hideForm = new EventEmitter();

    APP_ID = 666;

    carrierName: string;

    form = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        is_public: [false],
        logo_url: ['', [Validators.required, logoUrlMatcher]]
    });

    ngOnChanges(changes: SimpleChanges) {
        if (this.carrier && this.carrier.id) {
            const value = { ...this.carrier };
            this.carrierName = this.carrier.name;
            this.form.patchValue(value);
        }
    }

    constructor(
        private fb: FormBuilder
    ) {}

    updateCarrier() {
        const payload = this.form.value;
        payload.app_id = this.APP_ID;
        this.update.emit({
            payload,
            id: this.carrier.id,
        });
    }

    createCarrier () {
        this.create.emit({
            ...this.form.value,
            app_id: this.APP_ID
        });
    }

    cancel() {
        this.hideForm.emit();
    }
}
