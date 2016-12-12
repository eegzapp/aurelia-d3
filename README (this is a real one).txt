

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

Notes:
--------------------------------
- Store name/password so you don't have to submit it every push
    - ssh-add -k ~/.ssh/id_rsa (haven't tried this, got it off stackoverflow)
- Adapted the d3 heirarchy code from the jsfiddle here https://jsfiddle.net/t4vzg650/6/
    - it needed to be put into the context of both Aurelia and ES2015 classes (which was my adaptation)
