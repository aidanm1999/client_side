function createChart() {
    let talkNames = [];
    let talkAvgRatings = [];
    let talkIds = [];
    let counter = 0;

    globalTalks.forEach(element => {
        talkNames.push(element.title);
        var avg = 0;
        if (element.ratings.length > 0) {
            element.ratings.forEach(element => {
                avg += parseInt(element);
            });
            avg = avg / element.ratings.length;
        }
        talkAvgRatings.push(avg.toFixed(2));
        talkIds.push(counter);
        counter += 1;
    });

    var ctx = document.getElementById('ratings').getContext('2d');

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: talkIds,
            datasets: [{
                label: '⭐ Average Ratings ',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: talkAvgRatings,
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        console.log(tooltipItem[0].label);

                        return talkNames[tooltipItem[0].label];// data['labels'][tooltipItem[0]['index']];
                    },
                    // label: function (tooltipItem, data) {
                    //     return "label";// data['datasets'][0]['data'][tooltipItem['index']];
                    // },
                    // afterLabel: function (tooltipItem, data) {
                    //     // var dataset = data['datasets'][0];
                    //     // var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
                    //     return "AfterLabel";// return '(' + percent + '%)';
                    // }
                },
            }
        }
    });
}


function repaintChart() { }

