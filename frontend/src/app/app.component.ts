import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddFormComponent } from './components/add-form/add-form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddFormComponent, NavBarComponent],
  template: `
    <app-nav-bar />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'online store';
}
