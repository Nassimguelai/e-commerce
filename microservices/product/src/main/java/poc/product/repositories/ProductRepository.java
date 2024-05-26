package poc.product.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import poc.product.entites.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
}
