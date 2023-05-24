import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private router:Router) { }

  goToBrokenPage() {
    this.router.navigate(['/shared/broken']);
  }

  handleError(error: any): number {
    let result: number = 0;
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error(`Event error - ${error}`);
      } else {
        console.error(`Error - [Status Code: ${error.status}] ${error.message}`);
        result = error.status;
      }
    } else {
      console.error(`Unhandled error - ${error}`);
    }

    return result;
  }

}
