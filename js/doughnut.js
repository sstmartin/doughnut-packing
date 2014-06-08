$(document).ready(function() {

    // Initialization
    $("#main").hide();
    $("#criticalerror").hide();
    $("#packing").hide();
    //$('#runner').runner();
    //$("#runner").hide();
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
    var alltrials = 12;

    //TIME Variables
    var timerrunning = 0;
    var stats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var resumptionspots = ['','','','','','','','','','','',''];
    var statspos = 0;
    var startTime = 0;
    
    //CONSTANTS
    //Trials Constant (note layout [trial-1][first or second part][variable]
    var trials = [[[36, 'Crispy', 'Heart', 'Kit Kat', 'None'], [45, 'Sticky', 'Diamond', 'M&M', 'Chocolate']],
        [[27, 'Sticky', 'Round', 'Smarties', 'Vanilla'], [21, 'Crispy', 'Star', 'None', 'None']],
        [[49, 'Original', 'Diamond', 'Kit Kat', 'Chocolate'], [18, 'Chewy', 'Round', 'Smarties', 'Strawberry']],
        [[23, 'Original', 'Round', 'Kit Kat', 'Strawberry'], [45, 'Sticky', 'Star', 'Smarties', 'Vanilla']],
        [[40, 'Sticky', 'Star', 'M&M', 'Chocolate'], [29, 'Chewy', 'Diamond', 'None', 'None']],
        [[34, 'Sticky', 'Heart', 'Smarties', 'None'], [17, 'Chewy', 'Star', 'Kit Kat', 'Vanilla']],
        [[28, 'Original', 'Round', 'Kit Kat', 'Chocolate'], [41, 'Sticky', 'Star', 'Smarties', 'Strawberry']],
        [[35, 'Sticky', 'Star', 'None', 'Chocolate'], [44, 'Chewy', 'Heart', 'M&M', 'None']],
        [[50, 'Chewy', 'Round', 'None', 'Vanilla'], [13, 'Sticky', 'Diamond', 'M&M', 'Strawberry']],
        [[25, 'Chewy', 'Star', 'Smarties', 'None'], [49, 'Original', 'Round', 'None', 'Chocolate']],
        [[26, 'Sticky', 'Star', 'None', 'Vanilla'], [18, 'Original', 'Round', 'Smarties', 'None']],
        [[22, 'Chewy', 'Round', 'Smarties', 'Strawberry'], [33, 'Crispy', 'Heart', 'Kit Kat', 'Chocolate']]];

    var practicetrials = [[[8, 'Chewy', 'Diamond', 'None', 'Chocolate'],[9, 'Sticky', 'Round', 'M&M', 'Vanilla']],
    [[6, 'Chewy', 'Diamond', 'Kit Kat', 'Vanilla'], [9, 'Sticky', 'Round', 'Smarties', 'None']],
    [[10, 'Original', 'Heart', 'M&M', 'Chocolate'], [6, 'Chewy', 'Star', 'Kit Kat', 'Vanilla']]];

    var firsttask = ['Blank', 'Original', 'Crispy', 'Chewy', 'Sticky'];
    var secondtask = ['Blank', 'Round', 'Heart', 'Star', 'Diamond'];
    var thirdtask = ['Blank', 'None', 'M&M', 'Smarties', 'Kit Kat'];
    var fifthtask = ['Blank', 'None', 'Chocolate', 'Strawberry', 'Vanilla'];

    var packingstates = [[0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0]];




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
        if (experiment >= 0 && (selector === 0 && state_requested === 4)) {
            errorTwo();
        }
        else {
            errorOne();
        }
    }

    function errorOne() {
        $("#alertentries").hide();
        $("#errorarea").html("Error Alert");

        setTimeout(function() {
            $("#subtask" + state_requested).css({"border": "4px solid #ff0000"});
            $("#alertentries").show();
            $("#errorarea").html("");
        }, 2000);

        //Reds the boxout for 5000-2000 seconds!
        setTimeout(function( ) {
            $("#subtask" + state_requested).css({"border": "4px solid gray"});
        }, 5000);
    }

    function errorTwo() {
        $("#main").hide();
        $("#criticalerror").show();

        setTimeout(function() {
            $("#main").show();
            $("#criticalerror").hide();

            //Reset Trail
            ordervisible = 0;
            selector = 0;
            $("#alertentries").hide();
            $('#alertentries tr:last').remove();
            $('#alertentries tr:last').remove();
            $("#order").show();

            //Extra Clear Boxes
            $(".maintask").val("0");
            $("select").prop('selectedIndex', 0);

            state_requested = 1;
        }, 20000); //Set Time here in milliseconds to wait
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
            firsttype = trials[trial][0][3];
            secondtype = trials[trial][1][3];

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
            firsttype = trials[trial][0][4];
            secondtype = trials[trial][1][4];

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
        //THIS IS WHERE I NEED TO INTERRUPT?

        if (packingstates[trial][state_requested] === 1) {

            //Set this value to 0 so Type 2 Will not repeat packing task on reset
            packingstates[trial][state_requested] = 0;

            $("#main").hide();
            $("#packing").show();

            $("#linetwo span:last").remove();
            generateCase();

            setTimeout(function() {
                $("#main").show();
                $("#packing").hide();

                //MAKE SURE TO CLEAR QUESTIONS ALREADY ACCESSED
                alreadydone = [];

                //Extra Clear Boxes
                $(".maintask").val("0");
                $("select").prop('selectedIndex', 0);

                //Start the Timer
                //$('#runner').runner('lap');
                timerrunning = 1;
                
                //Start the homemade timer
                startTime = new Date().getTime();

            }, 30000); //Set Time here in milliseconds to wait
        }

        //Increment the Subtask
        state_requested = state_requested + 1;

        //Reset the Selector to Have to be clicked again
        selector = 0;

        //Clear Order
        if (state_requested === 6) {
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

        //$('#runner').runner('start');

        startMain();
    });
    
    $("#starttrial").click(function() {
        user = parseInt($("#usernum").val());
        experiment = -555;

        trials = practicetrials;
        alltrials = 3;

        $("#launcher").empty();

        //$('#runner').runner('start');

        startMain();
    });

    //MAIN SECTION

    //All Subtasks

    //Checks when you click on any text box
    $("input").click(function() {
        indicator = $(this).attr("id").substring(0, 1);

        //Resets to Gray Border (catching error)
        if (parseInt(indicator) >= 1 && parseInt(indicator) <= 5) {
            $("#subtask" + indicator).css({"border": "4px solid gray"});
        }


        if (timerrunning === 1 && $("#main").is(":visible")) {
            var endTime = new Date().getTime();
            
            timerrunning = 0;
            //var lapper = $("#runner").runner("lap");
            //stats[statspos] = lapper;
            //statspos = statspos + 1;
            
            //New timer
            var dif = endTime - startTime;
            ms = dif%1000;
            s = Math.floor(dif/1000)%60;
            m = Math.floor(dif/1000/60)%60;
            stats[statspos] = m + ":" + s + "." + ms;
            statspos = statspos + 1;
        }

        //If in the packing task
        if ($("#packing").is(":visible")) {
            // DO NOTHING
        }
        //If in that awkward waiting to process stage
        else if (state_requested === 6) {
            if (indicator !== 'p') {
                error();
            }
        }
        //If they haven't clicked on the selector yet
        else if (selector === 0 && ordervisible === 1) {
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

            $("#subtask6").css({"border": "1px solid gray"});

            //Increment Trial
            trial = trial + 1;

            state_requested = 1;

            //If all trials are done
            if (trial === alltrials) {
                $("#main").hide();
                $("#end").html("Thank you for participating");
                writeToServer();
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

    window.onbeforeunload = function() {
        return 'Are You Sure You Want to Exit the Production Task?';
    };

    /*
     * DOUGHNUT PACKING TASK SECTION
     */
    var alreadydone = [];

    function generateCase() {
        doughnuts = Math.floor((Math.random() * 31) + 5);

        //CHECKS TO SEE IF ALREADY DONE THIS VALUE
        while (jQuery.inArray(doughnuts, alreadydone) > - 1)
            doughnuts = Math.floor((Math.random() * 31) + 5);

        alreadydone.push(doughnuts);

        var rightboxes = 3;

        if (doughnuts % 2 === 0) {
            rightboxes = 4;
        }

        $("#linetwo").append("<span>" + rightboxes + "-count</span>");
        $(".prompt").html("Given " + "<em>" + doughnuts + "</em> doughnuts, " + " how many " + "<em>2</em>-count and <em>" + rightboxes + "</em>-count boxes do you need?");

        $("input[name=leftbox]").val('');
        $("input[name=rightbox").val('');

        $(".prompt").show();
    }


    //Keeps textboxes numbers only and clears when clicked
    $(".numbersOnly").keyup(function() {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    $(".numbersOnly").click(function() {
        $(this).val("");
    });

    //When submit is hit
    $("#submitdoughnut").click(function() {

        var left = parseInt($("input[name=leftbox]").val());
        var right = parseInt($("input[name=rightbox]").val());

        var first = 0;
        var second = 0;

        //Check Math of Calculations
        if (doughnuts % 2 === 0) {
            second = Math.floor(doughnuts / 4);
            if ((doughnuts - (second * 4)) === 1)
                second = second - 1;
            first = Math.floor((doughnuts - (second * 4)) / 2);
        }
        else {
            second = Math.floor(doughnuts / 3);
            if ((doughnuts - (second * 3)) === 1)
                second = second - 1;
            first = Math.floor((doughnuts - (second * 3)) / 2);
        }

        if (left === first && right === second) {
            $("#validzone").html("CORRECT");

            setTimeout(function() {
                $("#validzone").html("");
                $("#linetwo span:last").remove();

                generateCase();
            }, 500);
        }
        else {
            $("#validzone").html("INCORRECT");

            setTimeout(function() {
                $("#validzone").html("");
            }, 1000);
        }
    });

    /* INFORMATION RECORDING
     * Information recording section. This part includes
     * relevant handlers/functions for recording the
     * relevant information. Includes AJAX call to
     * execute external scripts responsible for storing
     * the information.
     */


    function writeToServer() {
        
        var sendthis = user.toString();
        var andthis = experiment.toString();
        var andalsothis = stats.toString();
        var resumptions = resumptionspots.toString();
        
        var request = $.ajax({
            url:"storedata.php",
            type:"POST",
            data: ({sendthis:sendthis,andthis:andthis,andalsothis:andalsothis,resumptions:resumptions}),
            
            success : function(msg) {
                //$("#dataoutput").html(msg);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                //$("#dataoutput").html("API Error");
            }
        });
    }
});