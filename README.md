///////////////////////////////////////////////////////////////////////////
//  NOTE_TAKER
//  Joshua Van Blake
///////////////////////////////////////////////////////////////////////////

    Note Taker is a web based application that allows a user to create notes to oneself on the web.

    Directions to Host

        Once the zip file is extracted, require.js requires that each of its resources be
        brought in through the same domain through an http request. This just means that it needs to exist on simple http server.
        Python has a simple script that can do this for you. Depending on which version of Python you are using either of these
        commands run from the root directory of the zip to serve the files locally"

            'python -m http.server [port]'  //port by default is 8000 if left blank
            'python -m SimpleHttpServer [port]'  //port by default is 8000 if left blank

        If for any reason the files cannot be served locally, a version of this will be hosted at:

            http://vanblake.com/NoteMaker/index.html

    Technologies

        Require.js - Organization of front end dependencies.
        Backbone.js - Models, Collections, and Views that represent relevant parts of the webpage.
        JQuery/JQueryUI - Animations, event helpers, and templating in the app.
        Qunit - Testing framework that works very well with Backbone.js.
        Underscore.js - Functional Javascript library.

    Testing

        This code is not fully Test Driven since there is a time limit on the development of the project.
        There is however one Unit test over a simple noteView to demonstrate how to write tests over a view
        if one would like to go back at a later time and fully test the code.

    Usage

        The UI is designed with simplicity in mind. Basic CRUD actions for each note.
        All of which get persisted to the local browser Storage.
            -Create Notes with the big plus.
            -Delete all notes with the Trash Can.
            -Delete one note with the localized "x".
            -Edit title or text inline on the note.

    Possible Future Features

        -Ordering Notes
        -Searching Notes
        -Note Customization (Color, Font, Size etc..)
        -Note Grouping
