package ng2app.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Testando.
 */
@Entity
@Table(name = "testando")
public class Testando implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Testando name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Testando testando = (Testando) o;
        if (testando.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, testando.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Testando{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
