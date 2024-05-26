import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgbCarouselModule,
    MatCardModule,
    MatGridListModule
  ],
  template: `
    <div class="home-container">
      <ngb-carousel *ngIf="images.length">
        <ng-template ngbSlide *ngFor="let image of images">
          <img [src]="image" class="d-block w-100" alt="carousel image">
        </ng-template>
      </ngb-carousel>

      <mat-grid-list cols="3" rowHeight="350px" gutterSize="16px">
        <mat-grid-tile *ngFor="let product of products">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ product.name }}</mat-card-title>
            </mat-card-header>
            <img mat-card-image [src]="getFullImageUrl(product.imgPath)" alt="{{ product.name }}">
            <mat-card-content>
              <p>{{ product.description }}</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary">{{product.price}}</button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 16px;
    }
    ngb-carousel {
      margin-bottom: 16px;
    }
    mat-card {
      max-width: 100%;
    }
    mat-card img {
      height: 200px;
      object-fit: cover;
    }
  `]
})
export class HomeComponent {

  public products: Product[]= [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  images = [
    'https://via.placeholder.com/1920x600',
    'https://via.placeholder.com/1920x600',
    'https://via.placeholder.com/1920x600'
  ];
  /*
  products = [
    { title: 'Product 1', description: 'Description for product 1', image: 'https://via.placeholder.com/400x200' },
    { title: 'Product 2', description: 'Description for product 2', image: 'https://via.placeholder.com/400x200' },
    { title: 'Product 3', description: 'Description for product 3', image: 'https://via.placeholder.com/400x200' },
    { title: 'Product 4', description: 'Description for product 4', image: 'https://via.placeholder.com/400x200' },
    { title: 'Product 5', description: 'Description for product 5', image: 'https://via.placeholder.com/400x200' },
    { title: 'Product 6', description: 'Description for product 6', image: 'https://via.placeholder.com/400x200' }
  ];*/

  public getProducts(): void {
    this.productService.getProduct().subscribe({
      next: (response: Product[]) => {
        this.products = response;
      },
      error: (error: any) => {
        alert(error.message);
      }
    });
  }

  getFullImageUrl(path: string): string {
    return `${environment.apiBaseUrl}${path}`;
  }
}
