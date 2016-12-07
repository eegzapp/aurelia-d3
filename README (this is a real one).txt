

Setting up the skeleton Hello World project
--------------------------------------------
    - Created project on github
    - Cloned project locally
        - github clone https://github.com/eegzapp/aurelia-d3.github
    - cd to local clone
    - Initialized npm
        - npm init
    - Installed aurelia-cli globally
        - npm install aurelia-cli -g
    - Use aurelia-cli to bootstrap project
        - au new --here
        - Options: Web, Babel, Sass, No unit testing, Visual studio code, Yes create project, Yes install dependencies
    - Test that the skeleton app runs
        - au run
        - Open browser to http://localhost:9000/ by default. Should see something like "Hello World!".
        - optional flags are:
            - au run --watch (updates running client bundle whenever changes are saved)
            - au build --env prod (creates a production build)

