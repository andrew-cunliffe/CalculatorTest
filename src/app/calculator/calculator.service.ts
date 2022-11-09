import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CalculatorResult {
    result: number;
}

@Injectable({ providedIn: 'root' })
export class CalculatorService {
    constructor(private http: HttpClient) {}

    public calculate(valueA: number, valueB: number, operator: string): Observable<CalculatorResult> {
        return this.http.post<CalculatorResult>(`http://localhost:3000/${operator}`, { valueA, valueB });
    }
}
