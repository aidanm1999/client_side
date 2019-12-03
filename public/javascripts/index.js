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

        // Dark mode
        if (!window.matchMedia) {
            //matchMedia method not supported
            return false;
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            //OS theme setting detected as dark
            darkMode();
        }


        // Populating talks
        getTalks();


        // Search listener
        $("#Search").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#talklist tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });

        // Add tooltip for table
        $(function () {
            $("[data-toggle='tooltip']").tooltip();
        });

    }
);