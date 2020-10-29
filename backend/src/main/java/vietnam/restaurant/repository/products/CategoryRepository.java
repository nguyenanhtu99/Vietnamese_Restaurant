package vietnam.restaurant.repository.products;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vietnam.restaurant.models.products.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}