function paintTalkCards() {
    var cardContainer = document.getElementById("talk-cards-div");
    //talkList.innerHTML="";
    for (i = 0; i < globalTalks.length; i++) {
        var value = globalTalks[i];


        // Card layout:
        // Padding
        //// Card
        ////// Image
        ////// Body
        //////// Card Title
        //////// 4 x Card Texts
        ////////// Each Card Text Contains Icon and Text
        //////// Footer Options


        // Method layout
        //// Image
        //// Body
        //// Padding
        //// Parents
        //// Combine

        // Image
        var imageHeader = document.createElement("img");
        imageHeader.setAttribute("class", "card-img-top talk-card-image");
        imageHeader.setAttribute("src", "/public/images/talks/" + (i + 1) + "-min.jpg?tr=w-400,h-300,bl-30,q-50");
        imageHeader.setAttribute("alt", value.title);

        // Body
        var bodyDiv = document.createElement("div");
        bodyDiv.setAttribute("class", "card-body");

        // Body - Title
        var titleOfCard = document.createElement("h4");
        titleOfCard.setAttribute("class", "card-title");
        var titleOfCardText = document.createTextNode(value.id + " - " + value.title);
        titleOfCard.appendChild(titleOfCardText);
        bodyDiv.appendChild(titleOfCard);

        // Body - Speaker
        var speakerP = document.createElement("p");
        speakerP.setAttribute("class", "card-text");
        var speakerPI = document.createElement("i");
        speakerPI.setAttribute("class", "material-icons-round talk-card-middle-icon");
        var speakerPIText = document.createTextNode("person");
        speakerPI.appendChild(speakerPIText);
        speakerP.appendChild(speakerPI);
        var speakerPS = document.createElement("span");
        speakerPS.setAttribute("class", "talk-card-middle-text");
        var speakerPSText = document.createTextNode(value.speaker);
        speakerPS.appendChild(speakerPSText);
        speakerP.appendChild(speakerPS);
        bodyDiv.appendChild(speakerP);

        // Body - Location
        var locationP = document.createElement("p");
        locationP.setAttribute("class", "card-text");
        var locationPI = document.createElement("i");
        locationPI.setAttribute("class", "material-icons-round talk-card-middle-icon");
        var locationPIText = document.createTextNode("apartment");
        locationPI.appendChild(locationPIText);
        locationP.appendChild(locationPI);
        var locationPS = document.createElement("span");
        locationPS.setAttribute("class", "talk-card-middle-text");
        var sessionLocation = "";
        globalSessions.forEach(element => {
            if (element.id == value.session) {
                sessionLocation = element.location;
            }
        });
        var locationPSText = document.createTextNode(sessionLocation);
        locationPS.appendChild(locationPSText);
        locationP.appendChild(locationPS);
        bodyDiv.appendChild(locationP);

        // Body - Average Rating
        var rating = 0;
        if (value.ratings.length > 0) {
            value.ratings.forEach(element => {
                rating += parseInt(element);
            });
            rating = rating / value.ratings.length;
        }
        var ratingP = document.createElement("p");
        ratingP.setAttribute("class", "card-text");
        var ratingPI = document.createElement("i");
        ratingPI.setAttribute("class", "material-icons-round talk-card-middle-icon");
        var ratingPIText = document.createTextNode("star");
        ratingPI.appendChild(ratingPIText);
        ratingP.appendChild(ratingPI);
        var ratingPS = document.createElement("span");
        ratingPS.setAttribute("class", "talk-card-middle-text");
        var ratingPSText = document.createTextNode(rating.toFixed(2));
        ratingPS.setAttribute("id", "avg_rating_" + value.id + "_in_card");
        ratingPS.appendChild(ratingPSText);
        ratingP.appendChild(ratingPS);
        bodyDiv.appendChild(ratingP);

        // Body - Tags
        var tagsP = document.createElement("p");
        tagsP.setAttribute("class", "card-text");
        var tagsPI = document.createElement("i");
        tagsPI.setAttribute("class", "material-icons-round talk-card-middle-icon");
        var tagsPIText = document.createTextNode("local_offer");
        tagsPI.appendChild(tagsPIText);
        tagsP.appendChild(tagsPI);
        var tagsPS = document.createElement("span");
        tagsPS.setAttribute("class", "talk-card-middle-text");
        var tagString = "";
        value.tags.forEach(element => {
            tagString = tagString.concat("#", element, " ");
        });
        var tagsPSText = document.createTextNode(tagString);
        tagsPS.appendChild(tagsPSText);
        tagsP.appendChild(tagsPS);
        bodyDiv.appendChild(tagsP);

        // Body - Interested
        var interestedDiv = document.createElement("div");
        interestedDiv.setAttribute("class", "col-md-8 talk-card-cta-option-div");
        var interestedLink = document.createElement('a');
        interestedLink.setAttribute("onclick", "openTab(event, 'Schedule');addToSchedule(" + value.id + ");");
        interestedLink.setAttribute("title", "Add event to your schedule");
        interestedLink.setAttribute("class", "btn btn-primary talk-card-cta-option");
        interestedLink.setAttribute("href", "#");
        var interestedText = document.createTextNode(value.time);
        interestedLink.appendChild(interestedText);
        interestedDiv.appendChild(interestedLink);

        // Body - Your Rating
        var yourRatingDiv = document.createElement("div");
        yourRatingDiv.setAttribute("class", "col-md-4 talk-card-cta-option-div");
        var yourRatingText = document.createElement("select");
        yourRatingText.setAttribute("class", "form-control");
        //yourRatingText.setAttribute("label", "Your rating");
        yourRatingText.setAttribute("id", value.id);

        var labelForRating = document.createElement("label");
        labelForRating.setAttribute("for", value.id);
        labelForRating.setAttribute("hidden", "");
        var labelForRatingText = document.createTextNode(value.id);
        labelForRating.appendChild(labelForRatingText);
        yourRatingDiv.appendChild(labelForRating);
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

        yourRatingDiv.appendChild(yourRatingText);

        // Body - Options Div
        var optionsDiv = document.createElement("div");
        optionsDiv.setAttribute("class", "row");
        optionsDiv.appendChild(interestedDiv);
        optionsDiv.appendChild(yourRatingDiv);
        bodyDiv.appendChild(optionsDiv);



        // Parents
        var talkCard = document.createElement("div");
        // If dark mode, add class card bg-dark instead of card
        var darkMode = $('body').attr("class");
        if (darkMode == "body-dark-mode") {
            talkCard.setAttribute("class", "card bg-dark");
        } else {
            talkCard.setAttribute("class", "card");
        }
        talkCard.appendChild(imageHeader);
        talkCard.appendChild(bodyDiv);

        var cardWithPadding = document.createElement("div");
        cardWithPadding.setAttribute("class", "col-md-4 col-sm-6 col-xs-12 talk-card-padding");
        cardWithPadding.appendChild(talkCard);


        // Combine
        cardContainer.appendChild(cardWithPadding);

    }

}