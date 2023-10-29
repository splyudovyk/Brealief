$(document).ready(function () {
    /*Carousels*/

    /*Initialize carousel with Materialize function*/
    $('.carousel').carousel();

    /*Carousel shifts automatically every 1000 milliseconds (10 seconds)*/
    autoplay();
    function autoplay() {
        $('.carousel').carousel('next');
        setTimeout(autoplay, 10000);
    }

    /*Carousel Buttons Shift Carousels Left and Right*/

    /*All carousel buttons*/
    carouselButton('#left-1', '.mental-health', 'prev');  //Mental health carousel left button
    carouselButton('#right-1', '.mental-health', 'next');  //Mental health carousel right button
    carouselButton('#left-2', '.therapy-games', 'prev');  //Therapy games carousel left button
    carouselButton('#right-2', '.therapy-games', 'next');  //Therapy games carousel right button

    /*Function for shifting carousel*/
    function carouselButton(button, carousel, movement) {
        $(button).on('click', () => {
            $(carousel).carousel(movement);
        });
    }
});