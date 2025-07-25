import { Component } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl:'./dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(private auth: Auth) {
  }

  ngOnInit(){
  //   this.auth.getAllData().subscribe({
  //   next:()=>{},
  //   error:()=>{}
  // })
}
  logout() {
    this.auth.logout();
  }
}


