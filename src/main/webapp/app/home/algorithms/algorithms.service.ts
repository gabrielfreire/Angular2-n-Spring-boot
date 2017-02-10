import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AlgorithmService {
	private insertionUrl = "/api/insertion-sort";
	private bubbleUrl = "/api/bubble-sort";

	constructor(private http: Http){
		//TODO
	};

	makeInsertionSort(arr : Array<number>): Observable<Response>{
		return this.http.post(this.insertionUrl, arr);
	};

	makeBubbleSort(arr : Array<number>) : Observable<Response>{
		return this.http.post(this.bubbleUrl, arr);
	};
}