package poc.product.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import poc.product.entites.ProductEntity;
import poc.product.services.ImageService;
import poc.product.services.ProductService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    private final ImageService imageService;

    @GetMapping("/all")
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        List<ProductEntity> Products = productService.getAllProducts();
        return new ResponseEntity<>(Products, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductEntity> updateProduct(@PathVariable("id") Long id,
                                                       @RequestParam("name") String name,
                                                       @RequestParam("description") String description,
                                                       @RequestParam("price") Double price) {
        ProductEntity product = new ProductEntity();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);

        productService.updateProduct(id, product);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<ProductEntity> addProduct(@RequestParam("name") String name,
                                                    @RequestParam("description") String description,
                                                    @RequestParam("price") Double price,
                                                    @RequestParam("image") MultipartFile image) {
        ProductEntity product = new ProductEntity();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);

        ProductEntity newProduct = productService.saveProduct(product);

        Long productId = newProduct.getId();

        if (!image.isEmpty()) {
            String fileName = imageService.saveImage(image, productId);
            newProduct.setImgPath("/product/img/" + fileName);
        }

        newProduct = productService.saveProduct(newProduct);

        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }
}
