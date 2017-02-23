import { Injectable } from "@angular/core";

import { Chapter } from "./chapter.model";
import { ContentService } from "./content.service";

@Injectable()
export class ChapterService{
	chapters: Chapter[] = [];
	constructor(private contentService: ContentService){
		this.createChapter(this.chapterItAndDescribe);
		this.createChapter(this.chapterStructure);
		this.createChapter(this.chapterFactory);
		this.createChapter(this.chapterService);
		this.createChapter(this.chapterMockAModal);
		this.createChapter(this.chapterLearnAboutFlags);
		this.createChapter(this.chapterRootScope);
	}
	chapterLearnAboutFlags = new Chapter("The use of boolean variables inside Karma/Jasmine", 
										"Using boolean variables to cover all conditions", 
										this.contentService.learnAboutFlagsContent);
	chapterMockAModal = new Chapter("Mocking a $uibModal ui.bootstrap Service", 
									"Learn how to mock a modal from the uibModal service from angular-bootstrap", 
									this.contentService.mockAModalContent);
	chapterRootScope = new Chapter("Chapter Something", 
									"Learn how to... something", 
									"Coming Soon...");
	chapterFactory = new Chapter("How to mock a Factory", 
								"Learn how to mock a singleton factory for data handling", 
								"Coming Soon...");
	chapterService = new Chapter("How to mock a Service", 
								"Learn how to mock a API calling service using $httpBackEnd from Angular Mocks", 
								"Coming Soon...");
	chapterStructure = new Chapter("The structure of a .spec file", 
								"Demo of a .spec file", 
								"Coming Soon...");
	chapterItAndDescribe = new Chapter("it() and describe()", 
								"Definitions for it() function and describe() function", 
								"Coming Soon...");

	getChapters(){
		return this.chapters;
	}
	createChapter(chapter: Chapter){
		this.chapters.push(chapter);
	}


	
}