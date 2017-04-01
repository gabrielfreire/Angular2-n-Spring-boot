import { Injectable } from "@angular/core";

@Injectable()
export class ContentService {
	itAndDescribe = `
		<strong>Jasmine is a behavior-driven development framework for testing JavaScript code</strong>
		<p>It does not depend on any other JavaScript frameworks. It does not require a DOM. 
		And it has a clean, obvious syntax so that you can easily write tests</p>
		<p>A test suite begins with a call to the global Jasmine function describe with two parameters: a string and a function. 
		The string is a name or title for a spec suite - usually what is being tested. 
		The function is a block of code that implements the suite.</p>
		
		<h3><strong>Specs</strong></h3>
		<p>Specs are defined by calling the global Jasmine function it, which, like describe takes a string and a function. 
		The string is the title of the spec and the function is the spec, or test. A spec contains one or more expectations 
		that test the state of the code. An expectation in Jasmine is an assertion that is either true or false. 
		A spec with all true expectations is a passing spec. A spec with one or more false expectations is a failing spec.</p>

		<h3><strong>It's just Functions</strong></h3>
		<p>Since describe and it blocks are functions, they can contain any executable code necessary to implement the test. 
		JavaScript scoping rules apply, so variables declared in a describe are available to any it block inside the suite.</p>

		<strong>Example: </strong>
		<pre><code class="javascript highlight">
		describe("A test suite", function() {
		  it("contains spec with an expectation", function() {
		    expect(true).toBe(true);
		  });
		});	
		</pre></code>

		<h3><strong>Expectations</strong></h3>
		<p>Expectations are built with the function expect which takes a value, called the actual. 
		It is chained with a Matcher function, which takes the expected value.</p>
		<pre><code class="javascript highlight">
		it("and has a positive case", function() {
		  	expect(true).toBe(true);
		});
		it("and can have a negative case", function() {
	      	expect(false).not.toBe(true);
	  	});
		</pre></code>
		<strong>Matchers</strong>
		<p>Each matcher implements a boolean comparison between the actual value and the expected value. 
		It is responsible for reporting to Jasmine if the expectation is true or false. Jasmine will then 
		pass or fail the spec.</p>
		<p>Any matcher can evaluate to a negative assertion by chaining the call to expect with a not before calling 
		the matcher.</p>
		<pre><code class="javascript highlight">
		it("and has a positive case", function() {
		  	expect(true).toBe(true);
		});
		it("and can have a negative case", function() {
	      	expect(false).not.toBe(true);
	  	});
		</pre></code>

		<strong>Included Matchers</strong>
		<p>Jasmine has a rich set of matchers included. Each is used here - all expectations and specs pass. 
		There is also the ability to write custom matchers for when a project's domain calls for specific assertions
		that are not included below.</p>

		<pre><code class="javascript highlight">
		describe("Included matchers:", function() {
			it("The 'toBe' matcher compares with ===", function() {
			  var a = 12;
			  var b = a;

			  expect(a).toBe(b);
			  expect(a).not.toBe(null);
			});
		
		  	it("works for simple literals and variables", function() {
		      var a = 12;
		      expect(a).toEqual(12);
		    });

		    it("should work for objects", function() {
		      var foo = {
		        a: 12,
		        b: 34
		      };
		      var bar = {
		        a: 12,
		        b: 34
		      };
		      expect(foo).toEqual(bar);
		    });
		});
		</pre></code>

		<pre><code class="javascript highlight">
		it("The 'toBeDefined' matcher compares against 'undefined'", function() {
		    var a = {
		      foo: "foo"
		    };

		    expect(a.foo).toBeDefined();
		    expect(a.bar).not.toBeDefined();
		});
		</pre></code>
		<pre><code class="javascript highlight">
		it("The 'toBeDefined' matcher compares against 'undefined'", function() {
		    var a = {
		      foo: "foo"
		    };

		    expect(a.foo).toBeDefined();
		    expect(a.bar).not.toBeDefined();
	    });
		</pre></code>
		<p>There are a lot of matchers, you should visit <a href="https://jasmine.github.io">Jasmine Docs</a></p>
	`;
	// ********************************** 
	learnAboutFlagsContent = `Here i will show you how boolean variables can help us reach different conditions.
    Using flags to change the return of some method helps us reach certain conditions in our code.<br>
    <strong>For example:</strong><br>
    <p>If you have some logic inside a callback like this in your controller:</p>
    <pre><code class="javascript highlight">
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
    <pre><code class="javascript highlight">
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
	        };
	    });
    }))
    </code></pre>
    <p>Ok, our mock is done and we can access the asyn callbacks! now let's test the conditions.</p>
    <p>The default return is the [data] object as it is the only response object being passed as parameter</p>
    <pre><code class="javascript highlight">
    it('Should set greetings to Hi World', function(){ <span class="comment">//This is the default response DATA being passed</span>
    	yourController = createController();
    	rootScope.$digest(); <span class="comment">//Running $digest cycles is very useful when working with async calls</span>
    	yourController.solicitar();

    	expect(yourServiceFake.solicitar).toHaveBeenCalled();
    	rootScope.$digest(); <span class="comment">//Running $digest here so Angular can execute our API calls and take us to our callbacks</span>

    	expect(yourController.data).toBeDefined();
    	expect(yourController.data).toEqual({ message: 'Hi' });
    	expect(yourController.greetings).toEqual('Hi World');
    });
    </code></pre>
    <p>In order to return the alternative data, we need an extra condition inside our async mocked function like this:</p>
    <pre><code class="javascript highlight">
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
    }));
    </code></pre>
    <p>Now we need another IT test suite to test the second condition, like this:</p>
    <pre><code class="javascript highlight">
    it('Should set greetings to Hello World', function(){ <span class="comment">//This is the second condition response altData being passed now!</span>
    	alternativeData = true; <span class="comment">//See? i am setting alternativeData to TRUE now (before instanciating the controller) so we can resolve the altData response object</span>
    	yourController = createController(); <span class="comment">//Now we create the controller again with the alternativeData pointing to TRUE!</span>
    	rootScope.$digest();
    	yourController.solicitar();

    	expect(yourServiceFake.solicitar).toHaveBeenCalled();
    	rootScope.$digest(); <span class="comment">//$digest cycle to make async calls and have access to solicitar() callbacks!</span>

    	expect(yourController.data).toBeDefined();
    	expect(yourController.data).toEqual({ message: 'Hello' });
    	expect(yourController.greetings).toEqual('Hello World');
    });
    </code></pre>`;
    // ********************************** 
    mockAModalContent = `<p>Mocking a modal is a piece of cake. In this part of the documentation you will learn how to build the 
    structure of a $uibModal service from UI Bootstrap module so you can mock it easily.</p>
    <p>Inside a beforeEach block, you will $provide a service like this:</p>

    <pre><code class="javascript highlight">
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
    <pre><code class="javascript highlight">
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
    <pre><code class="javascript highlight">
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
    <pre><code class="javascript highlight">
    it('Should print Hello Wolrd if the user chooses YES', function(){
    	someController.openDecisionDialog();
    	expect($uibModalFake.open).toHaveBeenCalled(); <span class="comment">//expect the modal to have been opened</span>
    	modalInstance.close(true); <span class="comment">//Now use your mocked instanced of a modal to close it passing a confirm value (true)</span>
    	expect(someController.greetings).toBeDefined();
    	expect(someController.greetings).toEqual('Hello World');
    });
    </code></pre>
    <strong>SO EASY!!</strong>`;
	
    
}