import { Injectable } from '@angular/core';
import { delay, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  allowedEmails: string[] = [
    "george.bluth@reqres.in",
    "janet.weaver@reqres.in",
    "emma.wong@reqres.in",
    "eve.holt@reqres.in",
    "charles.morris@reqres.in",
    "tracey.ramos@reqres.in",
    "michael.lawson@reqres.in", 
    "lindsay.ferguson@reqres.in", 
    "tobias.funke@reqres.in",
    "byron.fields@reqres.in",
    "george.edwards@reqres.in",
    "rachel.howell@reqres.in"
  ];

  checkIfEmailExists(value: string) {
    return of(this.allowedEmails.includes(value)).pipe(
      delay(1000)
    )
  }
}
