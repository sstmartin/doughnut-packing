$(document).ready(function() {
    
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
    var subtask = 0;
    
    //TIME Variables
    var time = 0;
    
    
    /* FUNCTIONS
     * Function section. This section is responsible
     * for including all relevant functions for the 
     * entire task. It is organized into subsections,
     * based off of which task is executing.
     */
    
    
    /* INTERACTION HANDLERS
     * Document interaction section. This part includes
     * all of the relevant procedures and handlers for
     * all of the tasks. It is organized based off of 
     * which subtask is happening.
     */
    
    //LOGIN SECTION
    $(".startbut").click(function() {
       alert("Frame Working"); 
    });
    
    /* INFORMATION RECORDING
     * Information recording section. This part includes
     * relevant handlers/functions for recording the
     * relevant information. Includes AJAX call to
     * execute external scripts responsible for storing
     * the information.
     */
});

