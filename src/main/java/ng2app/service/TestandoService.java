package ng2app.service;

import ng2app.domain.Testando;
import ng2app.repository.TestandoRepository;
import ng2app.service.dto.TestandoDTO;
import ng2app.service.mapper.TestandoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Testando.
 */
@Service
@Transactional
public class TestandoService {

    private final Logger log = LoggerFactory.getLogger(TestandoService.class);
    
    private final TestandoRepository testandoRepository;

    private final TestandoMapper testandoMapper;

    public TestandoService(TestandoRepository testandoRepository, TestandoMapper testandoMapper) {
        this.testandoRepository = testandoRepository;
        this.testandoMapper = testandoMapper;
    }

    /**
     * Save a testando.
     *
     * @param testandoDTO the entity to save
     * @return the persisted entity
     */
    public TestandoDTO save(TestandoDTO testandoDTO) {
        log.debug("Request to save Testando : {}", testandoDTO);
        Testando testando = testandoMapper.testandoDTOToTestando(testandoDTO);
        testando = testandoRepository.save(testando);
        TestandoDTO result = testandoMapper.testandoToTestandoDTO(testando);
        return result;
    }

    /**
     *  Get all the testandos.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TestandoDTO> findAll() {
        log.debug("Request to get all Testandos");
        List<TestandoDTO> result = testandoRepository.findAll().stream()
            .map(testandoMapper::testandoToTestandoDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one testando by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public TestandoDTO findOne(Long id) {
        log.debug("Request to get Testando : {}", id);
        Testando testando = testandoRepository.findOne(id);
        TestandoDTO testandoDTO = testandoMapper.testandoToTestandoDTO(testando);
        return testandoDTO;
    }

    /**
     *  Delete the  testando by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Testando : {}", id);
        testandoRepository.delete(id);
    }
}
