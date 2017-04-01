import { Component, OnInit } from '@angular/core';
import { Chapter } from './chapter.model';
import { ChapterService } from './chapter.service';
import { JhiLanguageService } from 'ng-jhipster';
import { HighlightJsContentDirective } from 'angular2-highlight-js/lib/highlight-js-content.directive';

@Component({
    selector: 'chapter',
    templateUrl: './chapter.component.html',
    styleUrls: [ 'chapter.css' ]
})
export class ChapterComponent implements OnInit {
	chapters: Chapter[];
	constructor(private chapterService: ChapterService, private jhiLanguageService: JhiLanguageService){
		//TODO something when this component is created	
	}
	ngOnInit(){
		//for log purposes
		console.log('-> loading chapters...');
		//Get the chapters
		this.chapters = this.chapterService.getChapters();
		//for log purposes
		console.log('-> chapters loaded!');
	}
}