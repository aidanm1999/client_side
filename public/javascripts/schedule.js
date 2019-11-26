let mySchedule = [];
let conflictingTaskName;

function addToSchedule (id)
{
    id -= 1;
    if(mySchedule.length < 1 ){
        mySchedule.push(globalTalks[id]);
        paintSchedule();
        console.log(mySchedule);
    } else {
        // Get the talk object
        let talk = globalTalks[id];
        
        let isInSchedule = false;

        mySchedule.forEach(element => {
            if(talk.time == element.time) 
            {
                isInSchedule = true;
                conflictingTaskName = element.title;
            }
        });

        if(!isInSchedule)
        {
            mySchedule.push(globalTalks[id]);
            paintSchedule();
        }
        else{
            alert('Cannot add talk to schedule, you are already on '+ conflictingTaskName);
        }

        console.log("MySchedule Talks:", mySchedule);
        console.log("Global Talks:", globalTalks);
    }
}

function paintSchedule ()
{
    mySchedule.forEach(talk => {
        var times = talk.time.split('-');
        

        var talkStart = document.getElementById(times[0]);
        talkStart.innerText = talk.title;

        
        // Setting the dateTime var of the start time
        var talkStartTimeSplit = times[0].split(':');
        var talkStartHours = parseInt(talkStartTimeSplit[0]);
        var talkStartMinutes = parseInt(talkStartTimeSplit[1]);
        var talkStartTime = new Date();
        // Set Hours, minutes, secons and miliseconds
        talkStartTime.setHours(talkStartHours, talkStartMinutes, 00, 000);

        // Setting the dateTime var of the end time
        var talkEndTimeSplit = times[1].split(':');
        var talkEndHours = parseInt(talkEndTimeSplit[0]);
        var talkEndMinutes = parseInt(talkEndTimeSplit[1]);
        var talkEndTime = new Date();
        // Set Hours, minutes, secons and miliseconds
        talkEndTime.setHours(talkEndHours, talkEndMinutes, 00, 000);


        for (let time = talkStartTime; 
            Date.parse(time) < Date.parse(talkEndTime);
            time.setMinutes( time.getMinutes() + 30 )) {
            
            var hours = time.getHours();
            var minutes = time.getMinutes();
            if(minutes < 10){
                minutes = "0"+minutes;
            }
            var elementId = hours+":"+minutes; 
            var talkPart = document.getElementById(elementId);
            talkPart.setAttribute("style", "background-color:LightCyan");

        }
    });
}