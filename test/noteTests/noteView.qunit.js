define(['jquery',
    'QUnit',
    '../../scripts/views/noteView',
    '../../scripts/models/note'
],
    function($,QUnit,NoteView,Note){

        function run(){

            var testContainer = $("<div></div>"), note, noteView;


            function setup(){
                testContainer.html($("<div class ='testContainer'></div>"));
                note = new Note({title:"Josh",note: "Milk, Eggs, Bread"});
                noteView = new NoteView({model:note, el:testContainer});
                $("body").append(testContainer);
            }
            function tearDown(){
                testContainer.empty();
            }



            QUnit.asyncTest("Note View Start Test", function() {
                setup();
                QUnit.ok(testContainer.find(".note-container[data-id='" + note.get("cid")+"']").text().indexOf("Milk, Eggs, Bread")>=0);
                QUnit.equal(testContainer.find(".note-container[data-id='" + note.get("cid")+"'] .title-label").text(), "Josh");
                tearDown();
                QUnit.start();
            });

        }

        return{run:run};
    });

