package ng2app.web.rest;

import com.codahale.metrics.annotation.Timed;
import ng2app.service.TestandoService;
import ng2app.web.rest.util.HeaderUtil;
import ng2app.service.dto.TestandoDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Testando.
 */
@RestController
@RequestMapping("/api")
public class TestandoResource {

    private final Logger log = LoggerFactory.getLogger(TestandoResource.class);

    private static final String ENTITY_NAME = "testando";
        
    private final TestandoService testandoService;

    public TestandoResource(TestandoService testandoService) {
        this.testandoService = testandoService;
    }

    /**
     * POST  /testandos : Create a new testando.
     *
     * @param testandoDTO the testandoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testandoDTO, or with status 400 (Bad Request) if the testando has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/testandos")
    @Timed
    public ResponseEntity<TestandoDTO> createTestando(@RequestBody TestandoDTO testandoDTO) throws URISyntaxException {
        log.debug("REST request to save Testando : {}", testandoDTO);
        if (testandoDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testando cannot already have an ID")).body(null);
        }
        TestandoDTO result = testandoService.save(testandoDTO);
        return ResponseEntity.created(new URI("/api/testandos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /testandos : Updates an existing testando.
     *
     * @param testandoDTO the testandoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testandoDTO,
     * or with status 400 (Bad Request) if the testandoDTO is not valid,
     * or with status 500 (Internal Server Error) if the testandoDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/testandos")
    @Timed
    public ResponseEntity<TestandoDTO> updateTestando(@RequestBody TestandoDTO testandoDTO) throws URISyntaxException {
        log.debug("REST request to update Testando : {}", testandoDTO);
        if (testandoDTO.getId() == null) {
            return createTestando(testandoDTO);
        }
        TestandoDTO result = testandoService.save(testandoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testandoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /testandos : get all the testandos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testandos in body
     */
    @GetMapping("/testandos")
    @Timed
    public List<TestandoDTO> getAllTestandos() {
        log.debug("REST request to get all Testandos");
        return testandoService.findAll();
    }

    /**
     * GET  /testandos/:id : get the "id" testando.
     *
     * @param id the id of the testandoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testandoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/testandos/{id}")
    @Timed
    public ResponseEntity<TestandoDTO> getTestando(@PathVariable Long id) {
        log.debug("REST request to get Testando : {}", id);
        TestandoDTO testandoDTO = testandoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testandoDTO));
    }

    /**
     * DELETE  /testandos/:id : delete the "id" testando.
     *
     * @param id the id of the testandoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/testandos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestando(@PathVariable Long id) {
        log.debug("REST request to delete Testando : {}", id);
        testandoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
