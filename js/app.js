$(function() {

    var apodUrl =  'https://api.nasa.gov/planetary/apod?',
        marsUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&',
        apiKey = 'api_key=YHKB4NTEwjCuLzyD68m3xDsYsM35V1VVL66yAea1',
        title = $('.title'),
        date = $('.date'),
        note = $('.note'),
        image = $('img'),
        copyright= $('.copyright'),
        button = $('button');


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
    button.on('click',function () {
        $(this).next().slideToggle()
    });


    function getMarsPic() {
        $.ajax({
            url: marsUrl + apiKey,
            type: 'GET',
            dataType: 'json'
        }).done(function(r) {
            loadMarsPictures(r);
        }).fail(function(error) {
            console.error(error);
        });
    }


    function loadMarsPictures (data) {
        var marsPicture = data.photos,
            galleryList = $('.mars-gallery ul'),
            counter = 0;

        for (var i = counter; i < 5; i++) {
            var li = $('<li>');
            var img = $('<img>', {
                src: marsPicture[i].img_src
            });
            galleryList.append(li);
            li.append(img);

        }
    }

    getMarsPic();

});