let globalTalks;
let globalSessions;


function getTalks() {
    // Gets the sessions in the talks
    $.ajax({
        url: "https://us-central1-clientside-74013.cloudfunctions.net/sessions", success: function (sessions) {
            $.ajax({
                url: "https://us-central1-clientside-74013.cloudfunctions.net/talks", success: function (talks) {
                    globalTalks = talks;
                    globalSessions = sessions;
                    paintTalkTable();
                    paintTalkCards();
                }
            });
        }
    });


}
