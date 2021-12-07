$(document).ready(() => {

    $('.nav-link').on('mouseenter', (event) => {
        $(event.currentTarget).siblings().animate({width: "100%"},200)
    })
    $('.nav-link').on('mouseleave', (event) => {
        $(event.currentTarget).siblings().animate({ width: 0}, 200)
    })


    $('.btn').on('mouseenter', (event) => {
        $(event.currentTarget).animate({
            paddingTop: "+=0.1em",
            paddingBottom: "-=0.1em"
        }, 200)
    })
    $('.btn').on('mouseleave', (event) => {
        $(event.currentTarget).animate({
            paddingTop: "-=0.1em",
            paddingBottom: "+=0.1em"
        }, 200)
    })


    $('.card').on('mouseenter', (event) => {
        $(event.currentTarget).animate({ padding: "0.5em" }, 200)
    })
    $('.card').on('mouseleave', (event) => {
        $(event.currentTarget).animate({padding: 0}, 200)
    })


    $('.reveal-panel').on('mouseenter', (event) => {
        $(event.currentTarget).find('.image-front').fadeOut(400)
        $(event.currentTarget).find('.image-back').fadeIn(400)
    })
    $('.reveal-panel').on('mouseleave', (event) => {
        $(event.currentTarget).find('.image-front').fadeIn(400)
        $(event.currentTarget).find('.image-back').fadeOut(400)
    })
})