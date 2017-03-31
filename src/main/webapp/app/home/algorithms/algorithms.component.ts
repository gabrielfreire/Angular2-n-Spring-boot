import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlgorithmService } from './algorithms.service';

@Component({
    selector: 'algorithms',
    templateUrl: './algorithms.component.html',
    styleUrls: []
})
export class AlgorithmsComponent {

	insertion: Array<number>;
	bubble: Array<number>;
	resultA: any;
	resultB: any;

	constructor(private algorithmService: AlgorithmService){}

	//Use insertion sort
	insertionSort(insertion){
		this.algorithmService.makeInsertionSort(JSON.parse(insertion)).subscribe(
			(res) => {
				this.resultA = res.json().sortedArray;	
			},
			(err) => {
				console.log("error", err.json());
			}			
		)
	}
	//Use bubble sort
	bubbleSort(bubble){
		this.algorithmService.makeBubbleSort(JSON.parse(bubble)).subscribe(
			(res) => {
				this.resultB = res.json().sortedArray;
			},
			(err) => {
				console.log("error", err.json());
			}
		)
	}

}