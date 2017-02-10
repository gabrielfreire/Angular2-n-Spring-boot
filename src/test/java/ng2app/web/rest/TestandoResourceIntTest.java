package ng2app.web.rest;

import ng2app.Ng2JhApp;

import ng2app.domain.Testando;
import ng2app.repository.TestandoRepository;
import ng2app.service.TestandoService;
import ng2app.service.dto.TestandoDTO;
import ng2app.service.mapper.TestandoMapper;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TestandoResource REST controller.
 *
 * @see TestandoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Ng2JhApp.class)
public class TestandoResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TestandoRepository testandoRepository;

    @Autowired
    private TestandoMapper testandoMapper;

    @Autowired
    private TestandoService testandoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private EntityManager em;

    private MockMvc restTestandoMockMvc;

    private Testando testando;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestandoResource testandoResource = new TestandoResource(testandoService);
        this.restTestandoMockMvc = MockMvcBuilders.standaloneSetup(testandoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Testando createEntity(EntityManager em) {
        Testando testando = new Testando()
                .name(DEFAULT_NAME);
        return testando;
    }

    @Before
    public void initTest() {
        testando = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestando() throws Exception {
        int databaseSizeBeforeCreate = testandoRepository.findAll().size();

        // Create the Testando
        TestandoDTO testandoDTO = testandoMapper.testandoToTestandoDTO(testando);

        restTestandoMockMvc.perform(post("/api/testandos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testandoDTO)))
            .andExpect(status().isCreated());

        // Validate the Testando in the database
        List<Testando> testandoList = testandoRepository.findAll();
        assertThat(testandoList).hasSize(databaseSizeBeforeCreate + 1);
        Testando testTestando = testandoList.get(testandoList.size() - 1);
        assertThat(testTestando.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTestandoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testandoRepository.findAll().size();

        // Create the Testando with an existing ID
        Testando existingTestando = new Testando();
        existingTestando.setId(1L);
        TestandoDTO existingTestandoDTO = testandoMapper.testandoToTestandoDTO(existingTestando);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestandoMockMvc.perform(post("/api/testandos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingTestandoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Testando> testandoList = testandoRepository.findAll();
        assertThat(testandoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestandos() throws Exception {
        // Initialize the database
        testandoRepository.saveAndFlush(testando);

        // Get all the testandoList
        restTestandoMockMvc.perform(get("/api/testandos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testando.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getTestando() throws Exception {
        // Initialize the database
        testandoRepository.saveAndFlush(testando);

        // Get the testando
        restTestandoMockMvc.perform(get("/api/testandos/{id}", testando.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testando.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTestando() throws Exception {
        // Get the testando
        restTestandoMockMvc.perform(get("/api/testandos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestando() throws Exception {
        // Initialize the database
        testandoRepository.saveAndFlush(testando);
        int databaseSizeBeforeUpdate = testandoRepository.findAll().size();

        // Update the testando
        Testando updatedTestando = testandoRepository.findOne(testando.getId());
        updatedTestando
                .name(UPDATED_NAME);
        TestandoDTO testandoDTO = testandoMapper.testandoToTestandoDTO(updatedTestando);

        restTestandoMockMvc.perform(put("/api/testandos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testandoDTO)))
            .andExpect(status().isOk());

        // Validate the Testando in the database
        List<Testando> testandoList = testandoRepository.findAll();
        assertThat(testandoList).hasSize(databaseSizeBeforeUpdate);
        Testando testTestando = testandoList.get(testandoList.size() - 1);
        assertThat(testTestando.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTestando() throws Exception {
        int databaseSizeBeforeUpdate = testandoRepository.findAll().size();

        // Create the Testando
        TestandoDTO testandoDTO = testandoMapper.testandoToTestandoDTO(testando);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestandoMockMvc.perform(put("/api/testandos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testandoDTO)))
            .andExpect(status().isCreated());

        // Validate the Testando in the database
        List<Testando> testandoList = testandoRepository.findAll();
        assertThat(testandoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestando() throws Exception {
        // Initialize the database
        testandoRepository.saveAndFlush(testando);
        int databaseSizeBeforeDelete = testandoRepository.findAll().size();

        // Get the testando
        restTestandoMockMvc.perform(delete("/api/testandos/{id}", testando.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Testando> testandoList = testandoRepository.findAll();
        assertThat(testandoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Testando.class);
    }
}
