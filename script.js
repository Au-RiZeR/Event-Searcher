$(document).ready(function() {
    const apiKey = "166a433c57516f51dfab1f7edaed8413";
    let city = "perth";
    let main = document.getElementById("expanded")
    $("button").click(function(e) {
        e.preventDefault();
        let input = document.getElementById("input").value;
        city = input;
        console.log(city);
        console.log(input);
        requestUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=MHiKGa2w6tWsHGkRHBnqvfrxAry3j09d&radius=100&unit=km&locale=*&city=perth&countryCode=AU&stateCode=wa`;
        console.log(requestUrl);
        weather();
    });

    function weather() {
        fetch(requestUrl).then(function(response) {
            return response.json();
        }).then(function(data) {
            let events = data._embedded.events
            console.log(data._embedded.events)
            for (let i = 0; i < events.length; i++) {
                const element = events[i];
                let eventName = document.createElement('h4')
                let div = document.createElement('div')
                let img = document.createElement('img')
                var highest = element.images.reduce(function(prev, current) {
                    return prev.width > current.width ? prev : current
                  }, {});
                  
                //   console.log(highest);
                $(img).attr('src', highest.url);
                $(div).addClass('event');
                eventName.textContent = events[i].name;
                div.appendChild(eventName)
                div.appendChild(img)
                main.append(div)
            }
        });
    }
});