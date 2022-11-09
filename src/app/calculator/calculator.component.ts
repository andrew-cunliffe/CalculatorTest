import { Component, HostBinding, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalculatorService } from './calculator.service';

type Action = 'input' | 'add' | 'subtract' | 'divide' | 'multiply' | 'clear' | 'calculate';
interface Option {
    label: string;
    action: Action;
}

@Component({
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
    public options: Option[] = [
        { label: '1', action: 'input' },
        { label: '2', action: 'input' },
        { label: '3', action: 'input' },
        { label: '+', action: 'add' },
        { label: '4', action: 'input' },
        { label: '5', action: 'input' },
        { label: '6', action: 'input' },
        { label: '-', action: 'subtract' },
        { label: '7', action: 'input' },
        { label: '8', action: 'input' },
        { label: '9', action: 'input' },
        { label: '*', action: 'multiply' },
        { label: 'C', action: 'clear' },
        { label: '0', action: 'input' },
        { label: '=', action: 'calculate' },
        { label: '/', action: 'divide' },
    ];

    private valueA: string = '';
    private valueB: string = '';
    private arithmetic?: Option;

    constructor(private calculatorService: CalculatorService, @Inject(MAT_DIALOG_DATA) public data: any) {}

    get color(): string {
        return this.data.theme;
    }

    get calculation(): string {
        let calc: string = '';

        if (this.valueB) {
            calc = this.valueB;
        } else if (this.arithmetic) {
            calc = this.arithmetic.label;
        } else {
            calc = this.valueA || '0';
        }

        return calc;
    }

    public action(option: Option): void {
        switch (option.action) {
            case 'input':
                if (this.arithmetic) {
                    this.valueB += option.label;
                } else {
                    this.valueA += option.label;
                }
                break;
            case 'clear':
                this.clear();
                break;
            case 'calculate':
                this.calculate();
                break;
            default:
                this.arithmetic = option;
        }
    }

    private clear(): void {
        this.valueA = '';
        this.valueB = '';
        this.arithmetic = undefined;
    }

    private calculate(): void {
        if (!this.arithmetic) {
            return;
        }

        this.calculatorService
            .calculate(Number(this.valueA), Number(this.valueB), this.arithmetic.action)
            .subscribe(({ result }) => {
                this.clear();
                this.valueA = result.toString();
            });
    }
}
