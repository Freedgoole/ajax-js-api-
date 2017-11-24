$(document).ready(function ready () {
    $.ajax({
        url: 'http://content.guardianapis.com/search?api-key=test',
        dataType: 'json',
        success: function (data) {
            let newList = '',
                results = data.response.results.slice(0, 10);
            for (item of results) {
                newList += `<li><a href="${item.webUrl}" class="text" target="_blank">${item.webTitle}</a></li>`;
            }
            $('#listNews').html(`<ul>${newList}</ul>`);
        },
        error: function(xhr, textStatus,err) {
            $('#error').text(`Sorry, we could'nt find news for you Please try again later`);
        }
    });
    $('.btn').on('click', ready);
});

    
    



    