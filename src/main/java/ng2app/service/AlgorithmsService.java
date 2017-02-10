package ng2app.service;

import org.springframework.stereotype.Service;

/**
 * Created by gabriel on 06/02/2017.
 */
@Service
public class AlgorithmsService {

    public AlgorithmsService(){

    }

    public Integer[] insertionSort(Integer[] n){
        for(int i = 1; i < n.length; i++){
            int curr = n[i];
            int j = i - 1;
            while(j >= 0 && n[j] > curr){
                n[j + 1] = n[j];
                j--;
            }
            n[j + 1] = curr;
        }
        return n;
    }

    public Integer[] bubbleSort(Integer[] n){
        for(int i = 0; i < n.length; i++){
            for(int j = 0; j < n.length-1; j++){
                if(n[j] > n[j+1]){
                    int temp = n[j];
                    n[j] = n[j+1];
                    n[j+1] = temp;
                }
            }
        }
        return n;
    }
}
