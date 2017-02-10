package ng2app.service.mapper;

import ng2app.domain.*;
import ng2app.service.dto.TestandoDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Testando and its DTO TestandoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TestandoMapper {

    TestandoDTO testandoToTestandoDTO(Testando testando);

    List<TestandoDTO> testandosToTestandoDTOs(List<Testando> testandos);

    Testando testandoDTOToTestando(TestandoDTO testandoDTO);

    List<Testando> testandoDTOsToTestandos(List<TestandoDTO> testandoDTOs);
}
