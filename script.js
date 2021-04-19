// needs this for jquery to work 
$(document).ready(function () {
    // ticketmasker key
    var origin
    $('#currentLocale').click(function (e) {
        e.preventDefault();
        getLocation()
    });
    //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    function showPosition(position) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${googleApi}`).then(function (response) {
            return response.json();
        }).then(function (data) {
            // shows result of search
            console.log(data)
            var currentAddress = data.results[0].formatted_address
            $('#input').val(currentAddress);
        })
    }
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.")
        }
    }



    const apiKey = "MHiKGa2w6tWsHGkRHBnqvfrxAry3j09d";
    // google key
    const googleApi = 'AIzaSyB--9um6iLDl4i8GW9df65UqfPtjuc-DMI';
    // column counter
    // when search button is clicked
    // e= event/element
    let emptyPage = 0;
    let city;
    let prevSearch = "Kashyyyyyyyyyyk"
    let prevStartDate;
    let prevEndDate;
    let page = 1
    getLocalStorage()
    function getLocalStorage() {
        if (localStorage.getItem('search')) {
            prevSearch = localStorage.getItem('search')
            $('#input').val(prevSearch);
        }
    }
    $("input").keyup(function (e) {
        if (e.keyCode === 13) {
            page = 0
            location()
            // get enter to work to submit "search events" button
        }
    });

    $("#searchButton").click(function () {
        page = 0
        location()
    });



    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml1 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
        .add({
            targets: '.ml1 .letter',
            scale: [0.3, 1.2],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 1200,
            delay: (el, i) => 70 * (i + 1)
        }).add({
            targets: '.ml1 .line',
            scaleX: [0, 1],
            opacity: [0.5, 1],
            easing: "easeOutExpo",
            duration: 700,
            offset: '-=875',
            delay: (el, i, l) => 80 * (l - i)
        })
    // Title animation from https://tobiasahlin.com/moving-letters/#1


    function location() {
        var getStartDate = function () {
            if ($('#start-date').val() != "") {
                return `&startDateTime=${$('#start-date').val()}T00:01:00Z`
            }
            return ""
        }
        var getEndDate = function () {
            if ($('#end-date').val() != "") {
                return `&endDateTime=${$('#end-date').val()}T23:59:00Z`
            }
            return ""
        }

        $('#back').click(function (e) {
            e.preventDefault();
            console.log('back')
            page--
            placeholderFunc()
        });
        $('#next').click(function (e) {
            e.preventDefault();
            console.log('next')
            page++
            placeholderFunc()
        });
        // return "" = empty in that section of the API parameters (eg. &startDateTime=)
        var endDate = getEndDate();
        var startDate = getStartDate();

        console.log(startDate)

        // template literal allows variables within strings i.e T001:01:00Z is placed after the value of startDate
        // variables had to be before if conditions check below as JS did not know the date values until after the check was done.


        let input = document.getElementById("input").value;
        // find out what is in input field and assigning that value to input i.e. 'input = mt lawley'
        city = input;
        if (city != prevSearch || startDate != prevStartDate || endDate != prevEndDate) {
            placeholderFunc()
            function placeholderFunc() {

                if (!city) {
                    $('#searchButton').removeClass('is-success');
                    $('#searchButton').addClass('is-danger');
                    $('#searchButton').text("Enter Location")
                    // modify text in the button to inform user to add text
                    // if there is no value in city alert user.

                }
                else {
                    $('#back').attr('disabled', '');
                    $('#next').attr('disabled', '');
                    for (let c = 1; c <= 3; c++) {
                        var columnC = $(`.column:nth-child(${c})`)
                        console.log(columnC[0].childNodes.length)
                        // ColumnC was in an Array by itself. Had to identiy the Array number [0] before diverting to childNodes.length.
                        for (i = 0; i < columnC[0].childNodes.length; i++) {
                            // chooses the column the event will be put in
                            let divC = columnC[0].childNodes[i]
                            // based on the count number - manipulate that column/element
                            setTimeout(() => {
                                $(divC).animate({
                                    opacity: '0',
                                    height: '0px',
                                    // reverse the animatation - see ln 158
                                }, 500)
                            }, i * 100);

                        }
                    }





                    $('#searchButton').addClass("is-loading")
                    getEvents()
                    function getEvents() {
                        setTimeout(() => {













                            $(".column").remove();
                            for (let i = 0; i < 3; i++) {
                                let column = document.createElement('div')
                                $(column).addClass('column');
                                // looping and doing this 3 times
                                // adding new div element and column class to eventually replace old searches and start fresh
                                $('#expanded').append(column);
                            }
                            let count = 1;
                            // On a new search - always create div element in the first column



                            $('#searchButton').removeClass('is-danger');
                            $('#searchButton').addClass('is-success');
                            $('#search').animate({
                                height: '20vh'
                            }, 1000)
                            $('input').animate({
                                height: '25px'
                            }, 1000)
                            $('#currentLocale').animate({
                                height: '23px'
                            }, 1000)

                            // if there is nothing in city dont execute search - else add the loading class and continue.


                            // requests google API
                            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleApi}`).then(function (response) {

                                // turning request into object we can select easier
                                return response.json();
                            }).then(function (data) {
                                // shows result of search
                                console.log(data)
                                var googleResult = data.results[0].geometry.location
                                // `= putting 2 variables (latitidue & longitude) into a string
                                origin = `${googleResult.lat},${googleResult.lng}`
                                // creating a variable from ticketmaster API URL 


                                // Date format in YYYY-MM-DD - No need to reformat in JS to match ticketmaster API
                                // ? is start of parameter, & = start of another parameter
                                let requestEventUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&latlong=${origin}&radius=50&unit=km&locale=*${startDate}${endDate}&page=${page}`

                                requestEvents();
                                function requestEvents() {
                                    fetch(requestEventUrl).then(function (ticketMasterResponse) {
                                        return ticketMasterResponse.json();
                                    }).then(function (eventData) {
                                        console.log(eventData)
                                        let events = eventData._embedded.events;
                                        console.log(eventData._embedded.events);
                                        let searchPages = eventData.page.totalPages
                                        console.log(searchPages)
                                        for (i = 0; i < events.length; i++, count++) {
                                            if (count == 4) {
                                                count = 1
                                            }
                                            // chooses the column the event will be put in
                                            let column = document.querySelector(`.column:nth-child(${count})`)
                                            // based on the count number - manipulate that column/element
                                            const event = events[i];
                                            let eventName = document.createElement('h3');
                                            let div = document.createElement('div');
                                            // created "a" element
                                            let a = document.createElement('a');
                                            let img = document.createElement('img');
                                            // selects highest res image
                                            var highRes = event.images.reduce(function (prev, current) {
                                                return prev.width > current.width ? prev : current
                                            }, {});
                                            // jquery to assign attributes and classes to the variables we just made
                                            $(img).attr('src', highRes.url);
                                            // gave "a" element url
                                            $(a).attr('href', event.url);
                                            $(div).addClass('event');
                                            $(eventName).addClass('name');
                                            eventName.textContent = event.name;
                                            // attached "a" to div
                                            div.appendChild(a);
                                            a.appendChild(eventName);
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
                                            $('#searchButton').text("Search Events")
                                            if (page == 0) {
                                                $('#back').attr('disabled', '');
                                            } else {
                                                $('#back').removeAttr('disabled');
                                            }
                                            if (page < searchPages - 1) {
                                                $('#next').removeAttr('disabled');
                                            }
                                        };
                                        localStorage.setItem('search', city)
                                        prevSearch = city
                                        prevStartDate = startDate
                                        prevEndDate = endDate

                                    });
                                };
                            })

                        }, checkIfEventsExist())
                    };
                }
            }
        }
    }

    var checkIfEventsExist = function () {
        if (emptyPage == 0) {
            emptyPage++
            return 0
        }
        return 950
    }




});



// link event to modal button (specified in html)
// select event, modal pops up with Event title, date & time, a button that says "buy tickets" (which links to ticket master website) & a map 
// need to let users know they will be leaving the website when the click the "buy tickets" button https://www.solodev.com/blog/web-design/how-to-make-an-external-link-pop-up-modal.stml
