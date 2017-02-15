import { Component, OnInit } from '@angular/core';
import { Chapter } from './chapter.model';
import { ChapterService } from './chapter.service';
import { JhiLanguageService } from 'ng-jhipster';

@Component({
    selector: 'chapter',
    templateUrl: './chapter.component.html',
    styleUrls: [ 'chapter.css' ]
})
export class ChapterComponent implements OnInit {
	chapters: Chapter[];
	constructor(private chapterService: ChapterService, private jhiLanguageService: JhiLanguageService){
		//TODO something when this component thats	
	}
	//Get the chapters
	ngOnInit(){
		this.chapters = this.chapterService.getChapters();
	}
}