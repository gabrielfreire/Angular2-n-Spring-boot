import { Injectable } from "@angular/core";

import { Chapter } from "./chapter.model";
import { ContentService } from "./content.service";

@Injectable()
export class ChapterService{
	chapters: Chapter[] = [];
	constructor(private contentService: ContentService){
		this.createChapter(this.chapterMockAModal);
		this.createChapter(this.chapterLearnAboutFlags);
		this.createChapter(this.chapterRootScope);
	}
	chapterLearnAboutFlags = new Chapter("Learn about flags in Karma", "Learn about flags in Karma", this.contentService.learnAboutFlagsContent);
	chapterMockAModal = new Chapter("Mocking a uibModal ui.bootstrap Service", "Learn how to mock a modal from the uibModal service from angular-bootstrap", this.contentService.mockAModalContent);
	chapterRootScope = new Chapter("Chapter undefined", "Learn how to...", "undefined");
	

		
	getChapters(){
		return this.chapters;
	}
	createChapter(chapter: Chapter){
		this.chapters.push(chapter);
	}


	
}