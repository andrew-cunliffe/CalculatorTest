import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
    public dialogForm: FormGroup;

    public colors = [
        { label: 'Red', value: 'red' },
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' },
    ];

    constructor(private form: FormBuilder, private dialog: MatDialog) {
        this.dialogForm = this.form.group({
            theme: ['blue', []],
        });
    }

    public openDialog(): void {
        this.dialog.open(CalculatorComponent, { data: this.dialogForm.getRawValue() });
    }
}
