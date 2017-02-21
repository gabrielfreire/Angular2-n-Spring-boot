import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class ContentService implements OnInit {
	learnAboutFlagsContent = `Here i will show you how boolean variables can help us reach different conditions.
    Using flags to change the return of some method helps us reach certain conditions in our code.<br>
    <strong>For example:</strong><br>
    <p>If you have some logic inside a callback like this in your controller:</p>
    <pre><code>
    function _solicitar(id){
    	yourService.solicitar(_request).then(_successCallBack, _errorCallBack); <span class="comment">//API call</span>
    }
    function _successCallBack(response){
    	vm.data = response;
    	if(vm.data){
	    	if(vm.data.message === 'Hi'){ <span class="comment">//Conditions</span>
	    		vm.greetings = 'Hi World';
	    	}else if(vm.data.message === 'Hello'){
	    		vm.greetings = 'Hello World';
	    	}
    	}else{
    		console.log('No response from server');
    	}
    }
    </code></pre>
    <p>We have to to reach all the conditions in order to reach a high coverage unit test, but how?</p>
    <p>The following code is a API access service mock, we will make use of $q Angular Service to mock asynchronous calls</p>
    <pre><code>
    var serviceError; <span class="comment">//Don't forget to set this variable to false inside your beforeEach(inject(function(...))) block so you can always access the success CallBack for this request</span>
    .
    .
    .
    beforeEach(module(function($provide){
	    $provide.service('yourService',function(){
	    	var data = {
	    		message: 'Hi' <span class="comment">//You have to mock your response object in order to have access to an async callback</span>
	    	};								
	    	var altData = {
	    		message: 'Hello'
	    	};
	        this.solicitar = function(data){
        		var deferred = $q.defer();
        		if(!serviceError){
        			deferred.resolve(data);
        		}else{
        			deferred.reject();
        		}
        		return deferred.promise;
	        }
	    };
    }))
    </code></pre>
    <p>Ok, our mock is done and we can access the asyn callbacks! now let's test the conditions.</p>
    <p>The default return is the [data] object as it is the only response object being passed as parameter</p>
    <pre><code>
    it('Should set greetings to Hi World', function(){ <span class="comment">//This is the default response DATA being passed</span>
    	yourController = createController();
    	rootScope.$digest(); <span class="comment">//Running $digest cycles is very useful when working with async calls</span>
    	yourController.solicitar();

    	expect(yourServiceFake.solicitar).toHaveBeenCalled();
    	rootScope.$digest(); <span class="comment">//Running $digest here so Angular can execute our API calls and take us to our callbacks</span>

    	expect(yourController.data).toBeDefined();
    	expect(yourController.data).toEqual({ message: 'Hi' });
    	expect(yourController.greetings).toEqual('Hi World');
    })
    </code></pre>
    <p>In order to return the alternative data, we need an extra condition inside our async mocked function like this:</p>
    <pre><code>
    var alternativeData; <span class="comment">//You have to set this to FALSE inside your beforeEach(inject(function(...))) block in order to be able to switch later</span>
    .
    .
    .
    beforeEach(module(function($provide){
	    $provide.service('yourService',function(){
	    	var data = {
	    		message: 'Hi' <span class="comment">//You have to mock your response object in order to have access to an async callback</span>
	    	};								
	    	var altData = {
	    		message: 'Hello'
	    	};
	        this.solicitar = function(data){
        		var deferred = $q.defer();
        		if(!serviceError){
        			if(alternativeData){ <span class="comment">//This is the extra condition, if we set alternativeData to true, it will resolve altData now!</span>
        				deferred.resolve(altData);
        			}
        			deferred.resolve(data);
        		}else{
        			deferred.reject();
        		}
        		return deferred.promise;
	        }
	    };
    }))
    </code></pre>
    <p>Now we need another IT test suite to test the second condition, like this:</p>
    <pre><code>
    it('Should set greetings to Hello World', function(){ <span class="comment">//This is the second condition response altData being passed now!</span>
    	alternativeData = true; <span class="comment">//See? i am setting alternativeData to TRUE now (before instanciating the controller) so we can resolve the altData response object</span>
    	yourController = createController();
    	rootScope.$digest();
    	yourController.solicitar();

    	expect(yourServiceFake.solicitar).toHaveBeenCalled();
    	rootScope.$digest();

    	expect(yourController.data).toBeDefined();
    	expect(yourController.data).toEqual({ message: 'Hello' });
    	expect(yourController.greetings).toEqual('Hello World');
    })
    </code></pre>`;

    mockAModalContent = `<p>Mocking a modal is a piece of cake. In this part of the documentation you will learn how to build the 
    structure of a $uibModal service from UI Bootstrap module so you can mock it easily.</p>
    <p>Inside a beforeEach block, you will $provide a service like this:</p>

    <pre><code>
    beforeEach(module(function($provide){
	    $provide.service('$uibModal',function(){
	        this.open = jasmine.createSpy('open').and.callFake(function(options){
	        	actualOptions = options;
	        	return modalInstance;
	        });
	    };
    }))
    </code></pre>
    <ul>
    	<li><strong>actualOptions: </strong><p> this is a variable that will receive the configuration object you used to create the modal</p></li>
    	<li><strong>modalInstance: </strong><p> this is the mocked object of a modal instance which we will be building now</p></li>
    </ul>
    <p>Above your first beforeEach block you will declare your modalInstance object like this:</p>
    <pre><code>
    var modalInstance = {
    	result: {
    		then: function(confirmCallBack, cancelCallBack){
    			this.confirmCallBack = confirmCallBack;
    			this.cancelCallBack = cancelCallBack;
    		}
    	},
    	close: function(item){
    		this.result.confirmCallBack(item);
    	},
    	dismiss: function(type){
    		this.result.cancelCallBack(type);
    	}
    }
    </code></pre>
    <ul>
    	<li><strong>confirmCallBack: </strong><p> this callback is triggered when the user confirms an action. When you have two options (yes or no) the user chooses YES.</p></li>
    	<li><strong>cancelCallBack: </strong><p> this callback is triggered when the user chooses NO which is a cancel option that closes the modal</p></li>
    </ul>
    <p>Mocking this structure will enable you of entering a modal async call when you have some action going on if a user chooses YES or NO</p>
    <p>Now let's see an exemple of a test suite where we are opening a modal and when the user presses YES, it will print 'Hello World' to the screen</p>
    <strong>someController.js</strong>
    <pre><code>
    vm.openDecisionDialog = _openDecisionDialog;
	    function _openDecisionDialog(){
	    	$uibModal.open({
	    		YOUR CONFIGURATION
	    	}).result.then(function(decision){
	    		if(decision){
	    			vm.greetings = 'Hello World';
	    		}else{
	    			vm.greetings = undefined;
	    		}
	    	});
	    }
    </code></pre>
    <strong>someController.spec.js</strong>
    <pre><code>
    it('Should print Hello Wolrd if the user chooses YES', function(){
    	someController.openDecisionDialog();
    	expect($uibModalFake.open).toHaveBeenCalled(); <span class="comment">//expect the modal to have been opened</span>
    	modalInstance.close(true); <span class="comment">//Now use your mocked instanced of a modal to close it passing a confirm value (true)</span>
    	expect(someController.greetings).toBeDefined();
    	expect(someController.greetings).toEqual('Hello World');
    });
    </code></pre>
    <strong>SO EASY!!</strong>`;
	


	ngOnInit(){
		
	}
    
}