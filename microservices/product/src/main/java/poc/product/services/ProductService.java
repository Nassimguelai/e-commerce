package poc.product.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import poc.product.entites.ProductEntity;
import poc.product.repositories.ProductRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    public ProductEntity saveProduct(ProductEntity product) {
        return productRepository.save(product);
    }
}
