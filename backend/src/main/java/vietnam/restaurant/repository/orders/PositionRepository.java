package vietnam.restaurant.repository.orders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vietnam.restaurant.models.orders.Position;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {
}
