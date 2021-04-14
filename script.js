$(document).ready(function () {
    const apiKey = "166a433c57516f51dfab1f7edaed8413";
    let city = "perth";
    let main = document.getElementById("expanded")
    $("button").click(function (e) {
        e.preventDefault();
        let input = document.getElementById("input").value;
        city = input;
        requestUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=MHiKGa2w6tWsHGkRHBnqvfrxAry3j09d&radius=100&unit=km&locale=*&city=perth&countryCode=AU&stateCode=wa`;
        console.log(requestUrl);
        weather();
    });
    function weather() {
        fetch(requestUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            let events = data._embedded.events;
            console.log(data._embedded.events);
            for (i = 0, count = 1; i < events.length; i++, count++) {
                if (count == 4) {
                    count = 1
                }
                let  column = document.querySelector(`.column:nth-child(${count})`)
                const element = events[i];
                let eventName = document.createElement('h4');
                let div = document.createElement('div');
                let img = document.createElement('img');
                var highRes = element.images.reduce(function (prev, current) {
                    return prev.width > current.width ? prev : current
                }, {});
                $(img).attr('src', highRes.url);
                $(div).addClass('event');
                eventName.textContent = element.name;
                div.appendChild(eventName);
                div.appendChild(img);

                    column.appendChild(div)
                    setTimeout(() => {
                        $(div).fadeIn(500);
                    }, i * 50);

                //   $(`.event`).fadeIn(2000);
            //querySelector(`.column:nth-child(${count})`).append(div)
            };
        });
    };
});