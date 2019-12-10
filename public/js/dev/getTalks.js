let globalTalks;
let globalSessions;


function getTalks() {
    var cachedTalks = getCachedTalks();
    var cachedSessions = getCachedSessions();

    if (cachedTalks == null && cachedSessions == null) {
        $.ajax({
            url: "https://us-central1-clientside-74013.cloudfunctions.net/sessions", success: function (sessions) {
                $.ajax({
                    url: "https://us-central1-clientside-74013.cloudfunctions.net/talks", success: function (talks) {
                        globalTalks = talks;
                        globalSessions = sessions;
                        paintTalkTable();
                        paintTalkCards();
                        cacheTalks();
                        cacheSessions();
                    }
                });
            }
        });
    } else {
        globalTalks = cachedTalks;
        paintTalkTable();
        paintTalkCards();
    }
}
