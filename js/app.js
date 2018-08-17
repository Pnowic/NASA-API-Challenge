$(function() {

    var apodUrl =  'https://api.nasa.gov/planetary/apod?',
        marsUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&',
        apiKey = 'api_key=YHKB4NTEwjCuLzyD68m3xDsYsM35V1VVL66yAea1',
        title = $('.title'),
        date = $('.date'),
        note = $('.note'),
        image = $('img'),
        copyright= $('.copyright'),
        explanationButton = $('.explanation-button'),
        newApodButton = $('.APOD-button'),
        marsButton = $('.mars-button');



    //generate random date
    var end = new Date(),
        start = new Date(2001, 0, 1);

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().substring(0, 10)
    }

    //APOD + data

    function loadAPOD() {
        $.ajax({
            url: apodUrl + 'date=' + randomDate(start, end)+ '&' + apiKey,
            type: 'GET',
            dataType : 'json'
        }).done(function(response){
            console.log(response);
            showAPODdata(response);
        }).fail(function(error) {
            console.log(error);
        })
    }

    function showAPODdata(data) {
        title.text(data.title);
        date.text(data.date);
        copyright.text(data.copyright);
        note.text(data.explanation);
        image.attr("src", data.url)
    }

    loadAPOD();

    note.hide();

    explanationButton.on('click',function () {
        note.slideToggle()
    });

    newApodButton.on('click', loadAPOD);



    //Gallery section

    function getMarsPic() {
        $.ajax({
            url: marsUrl + apiKey,
            type: 'GET',
            dataType: 'json'
        }).done(function(response) {

            var marsPicture = response.photos,
                galleryList = $('.mars-gallery .mars-gallery-list'),
                counter = 0;

            function loadMarsPictures () {
                for (var i = counter; i < counter + 6; i++) {
                    var li = $('<li>');
                    var img = $('<img>', {
                        src: marsPicture[i].img_src
                    });
                    galleryList.append(li);
                    li.append(img);

                }
                counter = counter + 6;
            }

            loadMarsPictures();

            marsButton.on('click', function(){
                loadMarsPictures()
            })

        }).fail(function(error) {
            console.error(error);
        });
    }

    getMarsPic();
});