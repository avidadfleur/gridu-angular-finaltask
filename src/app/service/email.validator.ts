import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
  } from '@angular/forms';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
import { EmailService } from './email.service';

  
  export class EmailValidator {
    static createValidator(emailService: EmailService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return emailService
          .checkIfEmailExists(control.value)
          .pipe(
            map((result: boolean) =>
              result ? null : { emailDoesNotExists: true } 
            )
          );
      };
    }
  }