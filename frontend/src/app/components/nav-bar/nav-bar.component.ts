import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar class="custom-toolbar">
      <img src="assets/logo.png" alt="Logo" class="logo">
      <span class="spacer"></span>
      <button mat-button routerLink="/">Home</button>
      <button mat-button routerLink="/add-product">Add Product</button>
    </mat-toolbar>
  `,
  styles: [`
    .custom-toolbar {
      background-color: #34495E;
      height: 80px;
      .mat-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      button{
        color: white;
      }
      .logo {
        height: 80px;
      }
      .spacer {
        flex: 1 1 auto;
      }
    }
  `]
})
export class NavBarComponent {
}
