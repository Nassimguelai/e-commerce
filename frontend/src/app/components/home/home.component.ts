import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgbCarouselModule,
    MatCardModule,
    MatGridListModule,
    EditFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public products: Product[]= [];
  constructor(private productService: ProductService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  images = [
    'https://via.placeholder.com/1920x600',
    'https://via.placeholder.com/1920x600',
    'https://via.placeholder.com/1920x600'
  ];

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

  deleteProduct(productId: number | null): void {
    if(productId !== null){
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== productId);
          this.snackBar.open('Product successfully deleted!', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['red-snackbar']
          });
        },
        error: (error: any) => {
          alert(error.message);
        }
      });
    }
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: '300px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProducts();
      }
    });
  }

  getFullImageUrl(path: string): string {
    return `${environment.apiBaseUrl}${path}`;
  }
}
