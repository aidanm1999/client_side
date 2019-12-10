function paintTalkTable() {
    var talkList = document.getElementById("talk-table");
    //talkList.innerHTML="";
    for (i = 0; i < globalTalks.length; i++) {
        var value = globalTalks[i];    // using ad-hoc object

        // Create table datas
        var tableRow = document.createElement("tr");
        var tableHeadNumber = document.createElement("td"); // Add scope = row                
        var tableDataName = document.createElement("td");
        var tableDataSpeaker = document.createElement("td");
        var tableDataSession = document.createElement("td");
        var tableDataTag = document.createElement("td");
        var tableDataInterested = document.createElement("td");
        var tableDataRating = document.createElement("td");
        tableDataRating.setAttribute("id", "avg_rating_" + value.id + "_in_table");
        var tableDataYourRating = document.createElement("td");





        // CREATE TEXT NODES -------------------------------------------------------------------------------------------------------------------
        // NUMBER
        var numberText = document.createTextNode(parseInt(value.id));

        // NAME
        var nameText = document.createTextNode(value.title);

        // SPEAKER
        var speakerText = document.createTextNode(value.speaker);

        // SESSION
        var sessionLocation = "";
        globalSessions.forEach(element => {
            if (element.id == value.session) {
                sessionLocation = element.location;
            }
        });
        var sessionText = document.createTextNode(sessionLocation);

        // TAGS
        var tagString = "";
        value.tags.forEach(element => {
            tagString = tagString.concat("#", element, " ");
        });
        var tagText = document.createTextNode(tagString);

        // INTERESTED
        var interestedLink = document.createElement('a');
        interestedLink.setAttribute("onclick", "openTab(event, 'Schedule');addToSchedule(" + value.id + ");");
        interestedLink.setAttribute("title", "Add event to your schedule");
        interestedLink.setAttribute("class", "btn btn-primary");
        interestedLink.setAttribute("href", "#");
        var interestedText = document.createTextNode(value.time);
        interestedLink.appendChild(interestedText);


        // AVERAGE RATING
        var rating = 0;
        if (value.ratings.length > 0) {
            value.ratings.forEach(element => {
                rating += parseInt(element);
            });
            rating = rating / value.ratings.length;
        }
        var ratingText = document.createTextNode(rating.toFixed(2));

        // YOUR RATING
        var yourRatingText = document.createElement("select");
        yourRatingText.setAttribute("class", "form-control");
        //yourRatingText.setAttribute("label", "Your rating");
        yourRatingText.setAttribute("id", value.id);

        var labelForRating = document.createElement("label");
        labelForRating.setAttribute("for", value.id);
        labelForRating.setAttribute("hidden", "");
        var labelForRatingText = document.createTextNode(value.id);
        labelForRating.appendChild(labelForRatingText);
        //labelForRating.setAttribute("hidden", "");


        for (let index = 0; index <= 5; index++) {
            var optionElement = document.createElement("option");
            optionElement.setAttribute("value", index);


            if (index == 0) {
                optionElement.setAttribute("hidden", "");
            }
            var textNodeInOption = document.createTextNode(index);
            optionElement.appendChild(textNodeInOption);
            yourRatingText.appendChild(optionElement);
        }

        yourRatingText.addEventListener("change", (function (event) {
            $.ajax({
                url: "https://us-central1-clientside-74013.cloudfunctions.net/talkRatings?eventId=" + event.target.id + "&rating=" + event.target.value, success: function (result) {
                    var newAvg = 0;
                    if (result.ratings.length > 0) {
                        result.ratings.forEach(element => {
                            newAvg += parseInt(element);
                        });
                        newAvg = newAvg / result.ratings.length;
                    }
                    var newAvgElementInTable = document.getElementById("avg_rating_" + event.target.id + "_in_table");
                    newAvgElementInTable.innerHTML = newAvg.toFixed(2);
                    var newAvgElementInCard = document.getElementById("avg_rating_" + event.target.id + "_in_card");
                    newAvgElementInCard.innerHTML = newAvg.toFixed(2);
                    //Chart is not yet updated
                }
            });

        }));





        // Add text nodes to table datas
        tableHeadNumber.appendChild(numberText);
        tableDataName.appendChild(nameText);
        tableDataSpeaker.appendChild(speakerText);
        tableDataSession.appendChild(sessionText);
        tableDataTag.appendChild(tagText);
        tableDataInterested.appendChild(interestedLink);
        tableDataRating.appendChild(ratingText);
        tableDataYourRating.appendChild(labelForRating);
        tableDataYourRating.appendChild(yourRatingText);

        // Add table datas to table row
        tableRow.appendChild(tableHeadNumber);
        tableRow.appendChild(tableDataName);
        tableRow.appendChild(tableDataSpeaker);
        tableRow.appendChild(tableDataSession);
        tableRow.appendChild(tableDataTag);
        tableRow.appendChild(tableDataInterested);
        tableRow.appendChild(tableDataRating);
        tableRow.appendChild(tableDataYourRating);

        // Add table row to table
        talkList.appendChild(tableRow);

        createChart();
        //sortTable(0);
    }
}