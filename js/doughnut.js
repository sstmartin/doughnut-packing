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
    var selector = 0;

    //TIME Variables
    var time = 0;


    /* FUNCTIONS
     * Function section. This section is responsible
     * for including all relevant functions for the 
     * entire task. It is organized into subsections,
     * based off of which task is executing.
     */

    function startMain() {
        $("#main").show();
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
        user = $("#usernum").val();
        experiment = $("#expnum").val();

        $("#launcher").empty();
        
        //Start Timer
        $('#runner').runner('start');

        startMain();
    });

    //MAIN SECTION

    //All Subtasks

    //Show Order Button
    $("#order").click(function() {
        alert("" + $('#runner').runner('lap'));
        
        $("#order").hide();
        $("#alertentries").show();
        $("#runner").runner('reset');
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

