// needs this for jquery to work 
$(document).ready(function () {
    // ticketmasker key
    const apiKey = "MHiKGa2w6tWsHGkRHBnqvfrxAry3j09d";
    // google key
    const googleApi = 'AIzaSyB--9um6iLDl4i8GW9df65UqfPtjuc-DMI';
    // column counter
    let count = 1;
    // when search button is clicked
    // e= event/element
    let city;
    $("button").click(function (e) {
        e.preventDefault();
        let input = document.getElementById("input").value;
        // find out what is in input field and assigning that value to input i.e. 'input = mt lawley'
        city = input;
        location()
    });

    function location() {
        // requests google API
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleApi}`).then(function (response) {
            // turning request into object we can select easier
            return response.json();
        }).then(function (data) {
            // shows result of search
            console.log (data)
            var googleResult = data.results[0].geometry.location
            // `= putting 2 variables (latitidue & longitude) into a string
            var origin = `${googleResult.lat},${googleResult.lng}`
            // creating a variable from ticketmaster API URL 
            // ? is start of parameter, & = start of another parameter
            let requestEventUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&latlong=${origin}&radius=400&unit=km&locale=*`

            requestEvents();
            function requestEvents() {
                fetch(requestEventUrl).then(function (ticketMasterResponse) {
                    return ticketMasterResponse.json();
                }).then(function (eventData) {
                    console.log(eventData)
                    let events = eventData._embedded.events;
                    console.log(eventData._embedded.events);
                    for (i = 0; i < events.length; i++, count++) {
                        if (count == 4) {
                            count = 1
                        }
                        // chooses the column the event will be put in
                        let column = document.querySelector(`.column:nth-child(${count})`)
                        const event = events[i];
                        let eventName = document.createElement('h3');
                        let div = document.createElement('div');
                        let img = document.createElement('img');
                        // selects highest res image
                        var highRes = event.images.reduce(function (prev, current) {
                            return prev.width > current.width ? prev : current
                        }, {});
                        // jquery to assign attributes and classes to the variables we just made
                        $(img).attr('src', highRes.url);
                        $(div).addClass('event');
                        eventName.textContent = event.name;
                        div.appendChild(eventName);
                        div.style.backgroundImage = `url('${highRes.url}')`;
                        div.style.backgroundPosition = `center`
                        div.style.backgroundSize = `cover`
                        column.appendChild(div)
                        setTimeout(() => {
                            $(div).animate({
                                opacity: '1',
                                height: '191px',
                            }, 500)
                        }, i * 100);
                    };
                });
            };
        })
    }
});