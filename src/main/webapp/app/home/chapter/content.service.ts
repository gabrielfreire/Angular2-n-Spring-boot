import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class ContentService implements OnInit {
	learnAboutFlagsContent = `Here i will show you how boolean variables can help us reach different conditions.
    Using flags to change the return of some method helps us reach certain conditions in our code.<br>
    <strong>For example:</strong><br>
    <p>If you have a code like this in your controller:</p>
    <pre><code>
    function _getUserById(id){
    	if(id === '1'){
    		return myFactory.findById(id);
    	}else if(id === '2'){
    		console.log('This is a bad ID');
    	}
    }
    </code></pre>
    <p>We have to to reach all the conditions, because after all, coverage is important, but how?</p>
        Here we are mocking our factory and we need to return an id of '1' and sometimes an id of '2' to reach both conditions
    <pre><code>
    beforeEach(module(function($provide){
	    $provide.factory('myFactory',function(){
	        return {
	            findById: jasmine.createSpy('findById').and.callFake(function(){
	                if(idIsOne){
	                    return {
	                        id: '1'
	                    }
	                }else{
	                    return {
	                        id: '2'
	                    }
	                }
	            });
	        }
	    };
    }))
    </code></pre>`;

    mockAModalContent = `Mocking a modal is a piece of cake. In this part of the documentation you will learn how to build the 
    structure of a uibModal service from UI Bootstrap module`;
	


	ngOnInit(){
		
	}
    
}