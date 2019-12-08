
function enableDarkMode() {
    // Dark mode
    if (!window.matchMedia) {
        //matchMedia method not supported
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        darkMode();
    }
}




function darkMode() {



    var darkMode = $('body').attr("class");
    if (darkMode === "body-dark-mode") {
        $("body").removeClass();
        $(".tabcontent").removeClass('tab-dark-mode');
        $("table").removeClass("table-dark");
        $(".card").removeClass("bg-dark");

        // Need a check to see which radio button had been selected
        if ($("#table-action-button").hasClass("btn-outline-light")) {
            // This means the card button is selected
            $("#table-action-button").removeClass("btn-outline-light").addClass("btn-outline-dark");
            $("#card-action-button").removeClass("btn-light").addClass("btn-dark");
        } else {
            // This means that the table button is selected
            $("#table-action-button").removeClass("btn-light").addClass("btn-dark");
            $("#card-action-button").removeClass("btn-outline-light").addClass("btn-outline-dark");
        }

    } else {
        $("body").addClass("body-dark-mode");
        $(".tabcontent").addClass("tab-dark-mode");
        $("table").addClass("table-dark");
        $(".card").addClass("bg-dark");


        if ($("#table-action-button").hasClass("btn-outline-dark")) {
            // This means the card button is selected
            $("#table-action-button").removeClass("btn-outline-dark").addClass("btn-outline-light");
            $("#card-action-button").removeClass("btn-dark").addClass("btn-light");
        } else {
            // This means that the table button is selected
            $("#table-action-button").removeClass("btn-dark").addClass("btn-light");
            $("#card-action-button").removeClass("btn-outline-dark").addClass("btn-outline-light");
        }
    }

}