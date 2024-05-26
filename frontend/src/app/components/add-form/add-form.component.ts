import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
  template: `
    <mat-card>
      <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>Product Name</mat-label>
          <input matInput formControlName="name" placeholder="Enter product name">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" placeholder="Enter product description"></textarea>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Price</mat-label>
          <input matInput type="number" formControlName="price" placeholder="Enter product price">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Image</mat-label>
          <button mat-icon-button matPrefix (click)="fileInput.click()">
            <mat-icon>attach_file</mat-icon>
          </button>
          <input type="text" readonly matInput formControlName="image" [value]="fileName" placeholder="Upload product image">
          <input type="file" hidden #fileInput (change)="handleFileInputChange(fileInput.files)">
          <mat-error *ngIf="productForm.get('image')?.hasError('required')">Image is required</mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="productForm.invalid">Add Product</button>
      </form>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 400px;
      margin: 2em auto;
      padding: 2em;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 1em;
    }
  `]
})
export class AddFormComponent {
  productForm: FormGroup;
  fileName: string = '';
  file_store: FileList | null = null;

  constructor(private productService: ProductService) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      image: new FormControl('', [Validators.required])
    });
  }

  handleFileInputChange(files: FileList | null): void {
    if (files) {
      this.file_store = files;
      if (files.length) {
        const file = files[0];
        this.fileName = file.name;
        this.productForm.patchValue({ image: file });
      } else {
        this.fileName = '';
      }
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      if (this.file_store) {
        formData.append('image', this.file_store[0]);
      }

      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          console.log('Product ajouté avec succès !', response);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du produit :', error);
        }
      });      
    }
  }
}
