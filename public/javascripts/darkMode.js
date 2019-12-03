
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
    } else {
        $("body").addClass("body-dark-mode");
        $(".tabcontent").addClass("tab-dark-mode");
        $("table").addClass("table-dark");
    }

}