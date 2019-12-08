// This is the initial page that should be rendered for 
$(document).ready(
    async function () {

        // Service worker registration
        if ('serviceWorker' in navigator) {
            console.log("Will the service worker register?");
            navigator.serviceWorker.register('service-worker.js')
                .then(function (reg) {
                    console.log("Yes, it did.");
                }).catch(function (err) {
                    console.log("No it didn't. This happened: ", err)
                });
        }

        // Populating talks
        getTalks();

        // Search listeners
        $("#table-search").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#talk-table tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });

        $("#card-search").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#talk-cards-div .talk-card-padding").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });

        // Add tooltip for table
        $(function () {
            $("[data-toggle='tooltip']").tooltip();
        });

        // Checks the device type to see if cards or table should be displayed
        deviceChecker();

        // Enables dark mode on supported devices
        enableDarkMode();




        $("#print-button").click(function () {
            var isDarkMode = $('body').attr("class");
            if (isDarkMode === "body-dark-mode") {
                darkMode();
                window.print();
                darkMode();
            } else {
                window.print();
            }

        });
    }
);


function deviceChecker() {
    var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);
    if (isMobile) {
        // Set view to card over table in the talks tab
        if ($("#table-action-button").hasClass("btn-outline-dark") == false) {
            // This means the table button is selected
            // Now function check if user is in dark mode or light mode
            if (darkMode === "body-dark-mode") {
                $("#table-action-button").removeClass("btn-light").addClass("btn-outline-light");
                $("#card-action-button").removeClass("btn-outline-light").addClass("btn-light");
            } else {
                $("#table-action-button").removeClass("btn-dark").addClass("btn-outline-dark");
                $("#card-action-button").removeClass("btn-outline-dark").addClass("btn-dark");
            }

            displayTalkType("card");
        }
    }
}

function displayTalkType(type) {
    if (type == "card") {
        // Hide table show card
        $("#card-div").removeAttr("style").attr("style", "display: block;");
        $("#table-div").removeAttr("style").attr("style", "display: none;");

        // Change the styling of the buttons
        if ($("#card-action-button").hasClass("btn-outline-dark")) {
            // Table selected - light mode
            $("#card-action-button").removeClass("btn-outline-dark").addClass("btn-dark");
            $("#table-action-button").removeClass("btn-dark").addClass("btn-outline-dark");
        } else {
            // Card selected - dark mode
            $("#card-action-button").removeClass("btn-outline-light").addClass("btn-light");
            $("#table-action-button").removeClass("btn-light").addClass("btn-outline-light");
        }


    } else if (type == "table") {
        // Hide card show table
        $("#card-div").removeAttr("style").attr("style", "display: none;");
        $("#table-div").removeAttr("style").attr("style", "display: block;");

        // Change the styling of the buttons
        if ($("#table-action-button").hasClass("btn-outline-dark")) {
            // Table selected - light mode
            $("#card-action-button").removeClass("btn-dark").addClass("btn-outline-dark");
            $("#table-action-button").removeClass("btn-outline-dark").addClass("btn-dark");
        } else {
            // Card selected - dark mode
            $("#card-action-button").removeClass("btn-light").addClass("btn-outline-light");
            $("#table-action-button").removeClass("btn-outline-light").addClass("btn-light");
        }
    }
}