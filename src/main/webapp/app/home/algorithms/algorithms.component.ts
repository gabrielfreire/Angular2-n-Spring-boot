import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlgorithmService } from './algorithms.service';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'algorithms',
    templateUrl: './algorithms.component.html',
    styleUrls: []
})
export class AlgorithmsComponent implements OnInit {

	insertion: Array<number>;
	bubble: Array<number>;
	resultA: any;
	resultB: any;

	constructor(private algorithmService: AlgorithmService){

	}
	ngOnInit(){

	}

	//Use insertion sort
	insertionSort(insertion){
		this.algorithmService.makeInsertionSort(JSON.parse(insertion)).subscribe(
			(res) =>
			 {
				if(res.status == 200){
					this.resultA = res.json().sortedArray;
				}else{
					this.resultA = res.status;
				}
			},
			(res) =>{
				console.log("error", res.json());
			}
			
		)
	}
	//Use bubble sort
	bubbleSort(bubble){
		this.algorithmService.makeBubbleSort(JSON.parse(bubble)).subscribe(
			(res) => {
				if(res.status == 200){
					this.resultB = res.json().sortedArray;
				}else{
					this.resultB = res.status;
				}
			},
			(res) =>{
				console.log("error", res.json());
			}
		)
	}

}