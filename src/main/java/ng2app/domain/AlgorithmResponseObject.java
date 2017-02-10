package ng2app.domain;

/**
 * Created by gabriel on 07/02/2017.
 */
public class AlgorithmResponseObject {


    private Integer[] sortedArray;
    private int size;

    //Create an algorithmic response object with a given size
    public AlgorithmResponseObject(Integer[] a){
        this.sortedArray = a;
        this.size = a.length;
    }

    public AlgorithmResponseObject(){ }
    public int size(){
        return this.sortedArray.length;
    }

    public Integer[] getSortedArray() {
        return sortedArray;
    }

    public void setSortedArray(Integer[] sortedArray) {
        this.sortedArray = sortedArray;
    }

    @Override
    public String toString(){
        String m = "";
        for(int i = 0; i < this.sortedArray.length; i++){
            if(i == this.sortedArray.length-1){
                m += this.sortedArray[i];
            }else{
                m += this.sortedArray[i] + ", ";
            }
        }
        return m;
    }
}
