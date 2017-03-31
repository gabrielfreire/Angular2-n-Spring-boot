package ng2app.web.rest;

import com.codahale.metrics.annotation.Timed;
import ng2app.domain.AlgorithmResponseObject;
import ng2app.service.AlgorithmsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

/**
 * Created by gabriel on 06/02/2017.
 */
@RestController
@RequestMapping("/api")
public class AlgorithmsResource {
    private final Logger log = LoggerFactory.getLogger(AlgorithmsResource.class);

    private final AlgorithmsService algorithmsService;
    private String type;

    public AlgorithmsResource(AlgorithmsService algorithmsService){
        this.algorithmsService = algorithmsService;
    }

    @PostMapping(path = "/insertion-sort", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE})
    @Timed
    public ResponseEntity<AlgorithmResponseObject> insertionSort(@RequestBody Integer[] arrayOfNumbers){
        log.debug("Sorting an array using Insertion Sort");
        AlgorithmResponseObject sortedArray = new AlgorithmResponseObject(algorithmsService.insertionSort(arrayOfNumbers));
        System.out.println(sortedArray.toString());
        return new ResponseEntity<>(sortedArray, HttpStatus.OK);
    }

    @PostMapping(path = "/bubble-sort", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE})
    @Timed
    public ResponseEntity<AlgorithmResponseObject> bubbleSort(@RequestBody Integer[] arrayOfNumbers){
        log.debug("Sorting an array using Bubble Sort");
        AlgorithmResponseObject sortedArray = new AlgorithmResponseObject(algorithmsService.bubbleSort(arrayOfNumbers));
        return new ResponseEntity<>(sortedArray, HttpStatus.OK);
    }

    @GetMapping(path = "/type", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE })
    public ResponseEntity<String> getType(){
        return new ResponseEntity(this.type, HttpStatus.OK);
    }

    @PostMapping(path = "/type", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE })
    public ResponseEntity<String> saveType(@RequestBody String type){
        this.type = type;
        String result = "Type changed to " + type;
        return new ResponseEntity(result, HttpStatus.OK);
    }

}
