import { Component, Input } from "@angular/core";
import { ErrorText } from './error.model';

@Component({
    selector: 'error',
    templateUrl: 'error.html',
    styleUrls: ['error.css']
})
export class ErrorComponent {
    @Input()
    error: ErrorText;
}