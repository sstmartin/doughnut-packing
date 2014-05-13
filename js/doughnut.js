$(document).ready(function() {

    // Initialization
    $("#main").hide();
    $("#packing").hide();
    $('#runner').runner();
    $('#alertentries').hide();

    /* GLOBAL VARIABLES
     * Global variables section. This section includes
     * all of the relevant global variavles that are
     * neccessary to determine state and record 
     * execution information.
     */

    //USER Information Variables
    var user = -1;
    var experiment = -1;

    //MAIN TASK Variables
    var ordervisible = 0;
    var state_requested = 1;
    var selector = 0;
    var trial = 0;

    //TIME Variables
    var time = 0;


    //CONSTANTS
    //Trials Constant (note layout [trial-1][first or second part][variable]
    var trials = [[[36, 'Crispy', 'Heart', 'None', 'Kit Kat'], [45, 'Sticky', 'Diamond', 'Chocolate', 'M&M']],
        [[27, 'Sticky', 'Round', 'Vanilla', 'Smarties'], [21, 'Crispy', 'Star', 'None', 'None']]];

    var firsttask = ['Blank', 'Original', 'Crispy', 'Chewy', 'Sticky'];
    var secondtask = ['Blank', 'Round', 'Heart', 'Star', 'Diamond'];
    var thirdtask = ['Blank', 'M&M', 'Smarties', 'Kit Kat'];
    var fifthtask = ['Blank','None','Chocolate','Strawberry','Vanilla'];

    /* FUNCTIONS
     * Function section. This section is responsible
     * for including all relevant functions for the 
     * entire task. It is organized into subsections,
     * based off of which task is executing.
     */

    function startMain() {
        $("#main").show();
    }

    function error() {
        if (experiment === 0) {
            errorOne();
        }
        else {
            errorTwo();
        }
    }

    function errorOne() {
        $("#alertentries").hide();
        $("#errorarea").html("Error Alert");

        $("#subtask" + state_requested).css({"border": "4px solid #ff0000"});

        setTimeout(function() {
            $("#subtask" + state_requested).css({"border": "4px solid gray"});
            $("#alertentries").show();
            $("#errorarea").html("");
        }, 1000);
    }

    function errorTwo() {

    }

    //FUNCTION RESPONSIBLE FOR CHECKING EACH STATE (WORKING FINE!)
    function checkSubmitted() {
        firstrow = trials[trial][0][0];
        secondrow = trials[trial][1][0];
        allcorrect = 1;

        //If they are in the first subtask
        if (state_requested === 1) {
            firsttype = trials[trial][0][1];
            secondtype = trials[trial][1][1];

            for (i = 1; i < 5; i++) {
                //If this is the first row column
                if (firsttype === firsttask[i]) {
                    //If the value is not correct
                    if ($("#1-" + i).val() !== firstrow.toString()) {
                        error();
                        allcorrect = 0;
                    }
                }
                //This is the second row check
                else if (secondtype === firsttask[i]) {
                    //If the value is not correct
                    if ($("#1-" + i).val() !== secondrow.toString()) {
                        error();
                        allcorrect = 0;
                    }
                }
                else {
                    if ($("#1-" + i).val() !== "0") {
                        error();
                        allcorrect = 0;
                    }
                }
            }

            //Check Total Box
            if ($("#1-5").val() !== (firstrow + secondrow).toString()) {
                error();
                allcorrect = 0;
            }
        } //END OF FIRST SUBTASK

        //Second Subtask
        else if (state_requested === 2) {
            firsttype = trials[trial][0][2];
            secondtype = trials[trial][1][2];

            firsttypeD = trials[trial][0][1];
            secondtypeD = trials[trial][1][1];

            for (i = 1; i < 5; i++) {
                //If this is the first row column
                if (firsttype === secondtask[i]) {
                    //If the value is not correct
                    if ($("#2-" + i).val() !== firstrow.toString() || $("#2-" + i + "-s").val() !== firsttypeD) {
                        error();
                        allcorrect = 0;
                    }
                }
                //This is the second row check
                else if (secondtype === secondtask[i]) {
                    //If the value is not correct
                    if ($("#2-" + i).val() !== secondrow.toString() || $("#2-" + i + "-s").val() !== secondtypeD) {
                        error();
                        allcorrect = 0;
                    }
                }
                else {
                    if ($("#2-" + i).val() !== "0") {
                        error();
                        allcorrect = 0;
                    }
                }
            }
        } // END OF SECOND SUBTASK
        
        //Third Subtask
        else if (state_requested === 3) {
            firsttype = trials[trial][0][4];
            secondtype = trials[trial][1][4];

            firsttypeD = trials[trial][0][2];
            secondtypeD = trials[trial][1][2];

            for (i = 1; i < 4; i++) {
                //If this is the first row column
                if (firsttype === thirdtask[i]) {
                    //If the value is not correct
                    if ($("#3-" + i).val() !== firstrow.toString() || $("#3-" + i + "-s").val() !== firsttypeD) {
                        error();
                        allcorrect = 0;
                    }
                }
                //This is the second row check
                else if (secondtype === thirdtask[i]) {
                    //If the value is not correct
                    if ($("#3-" + i).val() !== secondrow.toString() || $("#3-" + i + "-s").val() !== secondtypeD) {
                        error();
                        allcorrect = 0;
                    }
                }
                else {
                    if ($("#3-" + i).val() !== "0") {
                        error();
                        allcorrect = 0;
                    }
                }
            }
        } // END OF THIRD SUBTASK


        //Fourth Subtask
        if (state_requested === 4) {
            firsttype = trials[trial][0][1];
            secondtype = trials[trial][1][1];

            for (i = 1; i < 5; i++) {
                //If this is the first row column
                if (firsttype === firsttask[i]) {
                    //If the value is not correct
                    if ($("#4-" + i).val() !== firstrow.toString()) {
                        error();
                        allcorrect = 0;
                    }
                }
                //This is the second row check
                else if (secondtype === firsttask[i]) {
                    //If the value is not correct
                    if ($("#4-" + i).val() !== secondrow.toString()) {
                        error();
                        allcorrect = 0;
                    }
                }
                else {
                    if ($("#4-" + i).val() !== "0") {
                        error();
                        allcorrect = 0;
                    }
                }
            }
        } //END OF FOURTH SUBTASK
        
        //Fifth Subtask
        else if (state_requested === 5) {
            firsttype = trials[trial][0][3];
            secondtype = trials[trial][1][3];

            firsttypeD = trials[trial][0][2];
            secondtypeD = trials[trial][1][2];
     
            for (i = 1; i < 5; i++) {
                //If this is the first row column
                if (firsttype === fifthtask[i]) {
                    //If the value is not correct
                    if ($("#5-" + i).val() !== firstrow.toString() || $("#5-" + i + "-s").val() !== firsttypeD) {
                        error();
                        allcorrect = 0;
                    }
                }
                //This is the second row check
                else if (secondtype === fifthtask[i]) {
                    //If the value is not correct
                    if ($("#5-" + i).val() !== secondrow.toString() || $("#5-" + i + "-s").val() !== secondtypeD) {
                        error();
                        allcorrect = 0;
                    }
                }
                else {
                    if ($("#5-" + i).val() !== "0") {
                        error();
                        allcorrect = 0;
                    }
                }
            }
        } // END OF FIFTH
        
        
        //If ALL CORRECT
        if (allcorrect === 1) {
            nextSubTask();
        }
    }

    function nextSubTask() {
        //Increment the Subtask
        state_requested = state_requested + 1;

        //Reset the Selector to Have to be clicked again
        selector = 0;

        //Clear Order
        if(state_requested === 6){
            ordervisible = 0;
        }

        //Cleans up boxes
        $(".maintask").val("0");

        //Reset Selector Boxes to Default
        $("select").prop('selectedIndex', 0);

    }

    /* INTERACTION HANDLERS
     * Document interaction section. This part includes
     * all of the relevant procedures and handlers for
     * all of the tasks. It is organized based off of 
     * which subtask is happening.
     */

    //ALL SECTIONS
    $(":button").hover(function() {
        $(this).css("background-color", "#9e9e9e");
    });
    $(":button").mouseleave(function() {
        $(this).css("background-color", "#c4c4c4");
    });
    $(":button").mousedown(function() {
        $(this).css("background-color", "#eeeeee");
    });
    $(":button").mouseup(function() {
        $(this).css("background-color", "#9e9e9e");
    });

    //LOGIN SECTION
    $("#start").click(function() {
        user = parseInt($("#usernum").val());
        experiment = parseInt($("#expnum").val());

        $("#launcher").empty();

        startMain();
    });

    //MAIN SECTION

    //All Subtasks

    //Checks when you click on any text box
    $("input").click(function() {
        //If This is a Low Cost Experiment
        if (experiment === 0) {
            indicator = $(this).attr("id").substring(0, 1);

            //If they haven't clicked on the selector yet
            if (selector === 0 && ordervisible === 1) {
                //If they click on a subtask entry field
                if (indicator !== 's') {
                    error();
                }
                //If they click on a selector
                else if (indicator === 's') {
                    they_clicked = parseInt($(this).attr("id").substring(3));

                    //If they clicked on the right subtask
                    if (they_clicked === state_requested) {
                        selector = they_clicked;
                    }
                    else {
                        error();
                    }
                }
            }
            //If they have already correctly clicked in the selector
            else if (selector !== 0) {

                //If they click on the selector again
                if (indicator === 's') {
                    error();
                }
                //If they click on an incorrect subtask entry field
                else if (indicator !== state_requested.toString()) {
                    error();
                }
                //If they click on submit
                else if ($(this).attr("id").substring(2) === 's') {
                    //THIS IS WHERE I NEED TO INTERRUPT
                    checkSubmitted();
                }
            }
        }
    });

    //Show Order Button
    $("#order").click(function() {
        $("#order").hide();

        $("#alertentries").append("<tr align ='center'>" +
                "<td>" + trials[trial][0][0] + "</td>" +
                "<td>" + trials[trial][0][1] + "</td>" +
                "<td>" + trials[trial][0][2] + "</td>" +
                "<td>" + trials[trial][0][3] + "</td>" +
                "<td>" + trials[trial][0][4] + "</td></tr>");

        $("#alertentries").append("<tr align ='center'>" +
                "<td>" + trials[trial][1][0] + "</td>" +
                "<td>" + trials[trial][1][1] + "</td>" +
                "<td>" + trials[trial][1][2] + "</td>" +
                "<td>" + trials[trial][1][3] + "</td>" +
                "<td>" + trials[trial][1][4] + "</td></tr>");

        $("#alertentries").show();
        ordervisible = 1;
    });

    //Process Order Button 
    $("#process").click(function() {

        if (state_requested === 6) {
            $("#alertentries").hide();
            $('#alertentries tr:last').remove();
            $('#alertentries tr:last').remove();


            //Increment Trial
            trial = trial + 1;

            state_requested = 1;

            //If all trials are done
            if (trial === 2) {
                $("#main").hide();
                $("#end").html("THANK YOU");
            }
            else {
                $("#order").show();
            }
        }
        else {
            //DO NOTHING FOR THE TIME BEING
        }
    });

    // Clears Textbox when clicked
    $(".maintask").click(function() {
        $(this).val("");
    });
    // Resets Cleared textbox to 0 when clicked away
    $(".maintask").focusout(function() {
        if ($(this).val() === "") {
            $(this).val("0");
        }
    });

    /* INFORMATION RECORDING
     * Information recording section. This part includes
     * relevant handlers/functions for recording the
     * relevant information. Includes AJAX call to
     * execute external scripts responsible for storing
     * the information.
     */
});

