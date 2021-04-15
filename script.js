$(document).ready(function () {
    const apiKey = "MHiKGa2w6tWsHGkRHBnqvfrxAry3j09d";
    let city = "perth";
    const googleApi = 'AIzaSyB--9um6iLDl4i8GW9df65UqfPtjuc-DMI';
    let count = 1
    $("button").click(function (e) {
        e.preventDefault();
        let input = document.getElementById("input").value;
        city = input;
        location()
    });

    function location() {
        
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleApi}`).then(function (response) {
            return response.json();
        }).then(function (data) {
            var googleResult = data.results[0].geometry.location
            var origin = `${googleResult.lat},${googleResult.lng}`
            let requestUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&latlong=${origin}&radius=400&unit=km&locale=*`

            weather();
            function weather() {
                fetch(requestUrl).then(function (response1) {
                    return response1.json();
                }).then(function (data2) {
                    console.log(data2)
                    let events = data2._embedded.events;
                    console.log(data2._embedded.events);
                    for (i = 0; i < events.length; i++, count++) {
                        if (count == 4) {
                            count = 1
                        }
                        let column = document.querySelector(`.column:nth-child(${count})`)
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
                        div.style.backgroundImage = `url('${highRes.url}')`;
                        div.style.backgroundPosition = `center`
                        div.style.backgroundSize = `cover`
                        column.appendChild(div)
                        setTimeout(() => {
                            div.style.backgroundImage = img;
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