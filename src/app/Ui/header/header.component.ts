import { Component } from '@angular/core';
import {LoginComponent} from '../../auth/login/login.component';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  protected readonly LoginComponent = LoginComponent;
}
