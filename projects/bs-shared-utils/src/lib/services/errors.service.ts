import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private router:Router) { }

  goToBrokenPage() {
    this.router.navigate(['/shared/broken']);
  }

}
