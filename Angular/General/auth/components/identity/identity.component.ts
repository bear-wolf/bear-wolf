import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-identity',
  template: ''
})
export class IdentityComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    console.log('identity');
  }

}
