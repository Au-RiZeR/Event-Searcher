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

    $("#input").keyup(function (e) {
        if (e.keyCode === 13) {
            location()
        }
    });
    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml1 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false})
      .add({
        targets: '.ml1 .letter',
        scale: [0.3,1.2],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 70 * (i+1)
      }).add({
        targets: '.ml1 .line',
        scaleX: [0,1],
        opacity: [0.5,1],
        easing: "easeOutExpo",
        duration: 700,
        offset: '-=875',
        delay: (el, i, l) => 80 * (l - i)
    })
    
    $("button").click(function (e) {
        location()
    });
    function location() {
        $('#search').animate({
            height: '10vh'
        },1000)
        $('#searchButton').addClass("is-loading")
        let input = document.getElementById("input").value;
        // find out what is in input field and assigning that value to input i.e. 'input = mt lawley'
        city = input;
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
                        $(eventName).addClass('name');
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
                        $('#searchButton').removeClass('is-loading');
                    };
                    // $(".event").hover(function (e) {

                    //     var chosen = $(e)
                    //     chosen = chosen[0].target
                    //     title = $(chosen).find("h3")[0]
                    //     console.log(title)
                    //     $(title).animate({
                    //         transform: 'rotate(360deg)'
                    //     }, 500)
                        
                        
                    // }, function () {
                    //     // out
                    // }
                // );
                });
            };
        })
    }








});