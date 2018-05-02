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


    //generate present date
    var today = new Date().toISOString().substring(0, 10);
    console.log(today);

    function loadAPOD() {
        $.ajax({
            url: apodUrl + apiKey,
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
    })



});