package ng2app.repository;

import ng2app.domain.Testando;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Testando entity.
 */
@SuppressWarnings("unused")
public interface TestandoRepository extends JpaRepository<Testando,Long> {

}
