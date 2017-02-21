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
		//TODO something when this component is created	
	}
	ngOnInit(){
		//Get the chapters
		this.chapters = this.chapterService.getChapters();
	}
}