

(function(global,$){

    // new an object
    const Greetr = function(firstName,lastName,language){

        return new Greetr.init(firstName,lastName,language);
    }

    // hidden within the scope of the IIFE ans never directly accessible
    const supportedLangs = ['en','es'];

    // informal greetings
    const greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    // formal greetings
    const fornalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    // logger messages
    const logMessages = {
        en: 'Logged in',
        es: 'Inició sesión'
    }

    // prototype holds methods (to save memory space)
    Greetr.prototype = {

        // 'this' refers to the calling object at execution time
        fullName: function(){
            return `${this.firstName}  ${this.lastName}`;
        },

        validate: function(){
            // check that is a valis language
            // references the externally inaccessible 'supportedLangs' within the closure
            if (supportedLangs.indexOf(this.language) === -1){
                throw 'Invalid language'
            }
        },

        // retrieve messages from object by referring to properties using[] syntax
        greeting: function(){
            return `${greetings[this.language]}  ${this.firstName} !`;
        },

        fornalGreeting: function(){
            return `${fornalGreetings[this.language]} , ${this.fullName()} ~`
        },

        greet: function(formal){
            var msg;

            // if undefind or null it will be coerced to 'false'
            if(formal){
                msg = this.fornalGreeting();
            }
            else{
                msg = this.greeting();
            }

            if(console){
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },

        log: function(){
            if(console){
                console.log(`${logMessages[this.language]} : ${this.fullName()}`)
            }
            // make chainable
            return this;
        },

        setLang: function(lang){

            // set the language
            this.language = lang;

            // validate
            this.validate();

            // make chainable
            return this;
        },

        HTMLGreeting: function(selector, formal){
            if(!$){
                throw 'jQuery not loaded'
            }
            if(!selector){
                throw 'Missing jQuery selector'
            }

            var msg;
            if(formal){
                msg = this.fornalGreeting();
            }
            else{
                msg = this.greeting();
            }

            // inject the message in the chosen place in the DOM
            $(selector).html(msg);

            // make chainable
            return this;
        }
    };

    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstName,lastName,language){

        const vm = this;
        vm.firstName = firstName || '';
        vm.lastName = lastName || '';
        vm.language = language || 'en';
    }

    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
    global.Greetr = global.G$ = Greetr; 
    
})(window,jQuery);
