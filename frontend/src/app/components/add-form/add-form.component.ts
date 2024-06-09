import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent {
  productForm: FormGroup;
  fileName: string = '';
  file_store: FileList | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
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
          this.snackBar.open('Product successfully added!', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['green-snackbar']
          });
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du produit :', error);
        }
      });
    }
  }
}
