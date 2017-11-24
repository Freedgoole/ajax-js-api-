
let currentPage = 1;

function getItemsOnPage(pageToGet = 1) {
    $.ajax({
        url: `https://content.guardianapis.com/search?show-fields=standfirst&show-blocks=body&page=${pageToGet}&api-key=92b0025a-489b-4ea7-813a-9f4448e16b90`,
        dataType: 'json',
        success: function (data) {
            let newList = '',
            results = data.response.results.slice(0, 10);
        $("#next").on("click", function () {
            getItemsOnPage(pageToGet+1);
        });
        $("#prev").on("click", function () {
            if (pageToGet>1)
                getItemsOnPage(pageToGet-1);            
        });
        $(".pagination button").on("click", function () {
                currentPage = $(this).data("page");
                getItemsOnPage(currentPage);
        });
            $("#next").on("click", function(){
                currentPage = $(this).data("page");
                getItemsOnPage(currentPage);
        })

            for (item of results) {
                if (item.blocks && item.blocks.body && item.blocks.body[0].bodyTextSummary) {
                    main = item.blocks.body[0].bodyTextSummary;
                    var sliced = main.slice(0,500);
                    if (sliced.length < main.length) {
                    sliced += '...';
                    }
                }
                newList += `<li class="accordion-sect"><h2 class="title" target="_blank">${item.webTitle}<span class="row"></span></h2><div class="accordion-text"><p>${sliced}</p><a href="${item.webUrl}">Read full news</a></div></li>`; 
            }
            $('.accordion').html(`<ul>${newList}</ul>`);
        },
        error: function(xhr, textStatus,err) {
            $('#error').text(`Sorry, we could'nt find news for you Please try again later`);
        }  
    });
}
$(document).ready(function () {
    getItemsOnPage(currentPage);
});
$('body').on('click', '.accordion ul h2', function(){
    $('.accordeon .accordion-text').not($(this).next()).slideUp(20);
    $(this).next().slideToggle(500);
    $('span').removeClass("active"); 
    $(this).toggleClass("active");
})


    
    



    