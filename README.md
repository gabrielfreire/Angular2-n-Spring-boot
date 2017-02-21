# Karma Documentation for my teammates at Accenture
http://karmaforgods.herokuapp.com/#/
### * Angular 2
### * Java Spring-boot / H2 in-memory database
### * bootstrap 4

## Building for production

To optimize the Karma Documentation application for production, run:

    ./mvnw -Pprod clean package

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.war

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.


## Testing

To launch this application's tests, run:

    ./mvnw clean test

### Client tests

Unit tests are run by [Karma][] and written with [Jasmine][]. They're located in `src/test/javascript/` and can be run with:

    npm test

UI end-to-end tests are powered by [Protractor][], which is built on top of WebDriverJS. They're located in `src/test/javascript/e2e`
and can be run by starting Spring Boot in one terminal (`./mvnw spring-boot:run`) and running the tests (`gulp itest`) in a second one.

Not done yet, thought!

#### www.gabrielfreire.com.br
#### https://br.linkedin.com/in/gabriel-freire-20929024
