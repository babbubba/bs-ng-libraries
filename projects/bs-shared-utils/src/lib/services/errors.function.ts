import { HttpErrorResponse } from '@angular/common/http';

export function handleError(error: any): number {
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



