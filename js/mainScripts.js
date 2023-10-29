$(document).ready(function () {

    /*Change Image Background of Title on Home Page Using Image Choices*/

    /*All images in choice list can be clicked on to change background*/
    changeBgImg('#choice-1', "url(/img/nature-img-1.jpg)", "rgba(27, 46, 129, 0.644)");
    changeBgImg('#choice-2', "url(/img/nature-img-2.jpg)", "rgba(20, 20, 100, 0.644)");
    changeBgImg('#choice-3', "url(/img/nature-img-3.jpg)", "rgba(50, 18, 100, 0.644)");
    changeBgImg('#choice-4', "url(/img/nature-img-4.jpg)", "rgba(42, 20, 70, 0.644)");
    changeBgImg('#choice-5', "url(/img/nature-img-5.jpg)", "rgba(20, 60, 100, 0.644)");
    changeBgImg('#choice-6', "url(/img/nature-img-6.jpg)", "rgba(10, 55, 70, 0.644)");

    /*Function for changing background image and image choice styles*/
    function changeBgImg(choice, imgurl, layercolor) {
        //Image choice style changes on hover
        $(choice).hover(() => {
            $(choice).css("cursor", "pointer");  //Mouse cursor becomes pointer
            $(choice).css("border", "2.5px solid white");  //White border appears
        }, () => {
            //Styles reset when no longer hovering over image
            $(choice).css("border", "none");
        });

        //Changes made on click
        $(choice).on('click', () => {
            //Background style changes on click
            $('.bg-img-main').css("--bg-img", imgurl);  //Background images changes to clicked on image
            $('.layer').css("--layer-color", layercolor);  //Background shading color changes depending on image

            //Shows previously hidden image choice (previous background) while hiding clicked on image choice
            $('.bg-choice').show();
            $(choice).hide();
        });
    }

    /*Change Audio and Inspirational Quote on Home Page Using Image Choices*/

    /*Each image choice has a different audio and quote*/
    changeAudQuo('#choice-1', "./mp3/soundscape1.mp3", "“Happiness can be found even in the darkest of times, if one only remembers to turn on the light.” — Albus Dumbledore");
    changeAudQuo('#choice-2', "./mp3/soundscapemountain.mp3", "“Take your time healing, as long as you want. Nobody else knows what you’ve been through. How could they know how long it will take to heal you?” — Abertoli");
    changeAudQuo('#choice-3', "./mp3/soundscapeforest-med.mp3", "“You can’t control everything.Sometimes you just need to relax and have faith that things will work out.Let go a little and just let life happen.” — Kody Keplinger");
    changeAudQuo('#choice-4', "./mp3/soundscapebeach.mp3", "“You, yourself, as much as anybody in the entire universe, deserve your love and affection.” — Buddha");
    changeAudQuo('#choice-5', "./mp3/soundscapelake.mp3", "“Let your story go. Allow yourself to be present with who you are right now.” – Russ Kyle");
    changeAudQuo('#choice-6', "./mp3/soundscapewaterfall2.mp3", "“One small crack does not mean that you are broken, it means that you were put to the test and you didn’t fall apart.” — Linda Poindexter");

    /*Function for changing audio and quote*/
    function changeAudQuo(choice, mp3, quote) {
        //Audio changes on click
        $(choice).on('click', () => {
            $('.soundscape').attr("src", mp3);
            $('aside').text(quote);
        });
    }

    /*Instructions for choice selection appear when user hovers over background image choice list*/
    $("#bg-choices").hover(() => {
        //Instructions become visible
        $('#bg-choice-instructions').css('visibility', 'visible');

        //Instructions follow cursor with an offset
        $(document).mousemove(function (e) {
            $('#bg-choice-instructions').offset({ top: e.pageY + 25, left: e.pageX - 300 });
        });
    }, () => {
        //Instructions disappear when user stops hovering over 
        $('#bg-choice-instructions').css("visibility", "hidden");
    });

    /*Title and image background choices fade out on index.html when scrolling down to main content*/
    $(window).scroll(() => {
        /*Gets height of title and amount scrolled*/
        var scrollTop = $(window).scrollTop();
        var height = $('#title').height();

        /*Title gradually fades out and eventually fully disappears*/
        $('#title').css({
            'opacity': (((0.4 * height) - scrollTop) / (0.4 * height))
        });

        /*All image choices fade on scroll*/
        fadeOnScroll('#choice-1');
        fadeOnScroll('#choice-2');
        fadeOnScroll('#choice-3');
        fadeOnScroll('#choice-4');
        fadeOnScroll('#choice-5');
        fadeOnScroll('#choice-6');

        /*Function for fading out of background image choices*/
        function fadeOnScroll(identifier) {
            //Gets the distance from the top of the section to the 
            var heightB = $('#title').height() - $(identifier).offset().top;

            //Checks that the background choices are not above the area being viewed
            if (heightB > 0) {
                //If the choices have not been scrolled past, gradually fades them out
                $(identifier).css({
                    'opacity': ((2 * heightB - scrollTop) / (heightB))
                });
            } else {
                //If have been scrolled past, they will not be displayed
                $(identifier).css('opacity', 0);
            }
        }
    });

    /*Nav Bar Buttons*/

    /*All nav bar buttons/elements change styles on hover*/
    buttons = ['sign-in', 'sign-up', 'your-acc', 'return', 'title-links', 'title-ment', 'title-ther',
               'twenforate', 'food-snake', 'matching', 'mood-tracker', 'resources', 'importance',
               'effects', 'mood-track', 'change-pass', 'your-prof']  //Array of button classes
    for(let i = 0; i < buttons.length; i++){  //Iterates through array
        changeButtonOnHover('.' + buttons[i]);
    }

    /*Function for changing button appearance on hover*/
    function changeButtonOnHover(button) {
        $(button).hover(() => {
            $(button).addClass('z-depth-3'); //Applies drop shadow
            $(button).css("background-color", "rgba(180, 189, 231, 0.7)");  //Lighter color background
            $(button).css("cursor", "pointer");  //Mouse cursor changes to pointer
        }, () => {
            //Styles reset to original when not hovering
            $(button).removeClass('z-depth-3');
            $(button).css("background-color", 'rgba(0, 0, 0, 0)');
        });
    }

    /*Nav Bar Dropdowns*/

    /*Dropdowns initially hidden*/
    $('.primary').hide();  //Primary links dropdown
    $('.secondary').hide();  //Secondary links dropdown
    $('.your-acc-links').hide();  //Your account dropdown

    /*Primary or account dropdown display when hovering over certain elements*/
    showGen('.title-links', '.primary', '.arrow-ud');  //Primary dropdown displayed if hovering over "Links" title
    showGen('.primary', '.primary', '.arrow-ud');  //Primary dropdown displayed if hovering over primary dropdown
    showGen('.secondary', '.primary', '.arrow-ud');  //Primary dropdown displayed if hovering over secondary dropdown
    showGen('.your-acc', '.your-acc-links', '.arrow-ud-2');  //Account dropdown displayed if hovering over "Your Account" title
    showGen('.your-acc-links', '.your-acc-links', '.arrow-ud-2');  //Account dropdown displayed if hovering over account dropdown
    
    /*Function for displaying primary/account dropdown*/
    function showGen(element, element2, arrow) {
        $(element).hover(() => {
            $(element2).show();  //Primary dropdown is displayed
            $(arrow).html("&#11165;");  //Arrow in primary dropdown title is pointed up
        }, () => {
            $(element2).hide();  //Primary dropdown is hidden
            $(arrow).html("&#11167;");  //Arrow in primary dropdown title is pointed down
        });
    }

    /*Secondary mental health dropdown is displayed if hovering over
      "Mental Health Resources" title and mental health secondary dropdown*/
    showSpec('.title-ment', '.ment', '.arrow-lr-1');
    showSpec('.ment', '.ment', '.arrow-lr-1');

    /*Secondary therapy games dropdown is displayed if hovering over
      "Therapy Games" title and therapy games secondary dropdown*/
    showSpec('.title-ther', '.ther', '.arrow-lr-2');
    showSpec('.ther', '.ther', '.arrow-lr-2');

    /*Function for displaying secondary dropdowns*/
    function showSpec(hovered, element, arrow) {
        $(hovered).hover(() => {
            $('.secondary').show();
            $(element).show();  //Selected secondary dropdown is shown 
            $(element).siblings().hide();  //Other secondary dropdown remains hidden
            $(arrow).html("&#11164;");  //Arrow in secondary dropdown title is pointed left
        }, () => {
            $('.secondary').hide();  //Secondary dropdown title is hidden
            $(arrow).html("&#11166;");  //Arrow in secondary dropdown title is pointed right
        });
    }

    /*Return Back Button on Nav Bar*/

    /*Return link returns to previous page*/
    $('.return-link').on('click', () => {
        //Checks if there is a page to return to
        if (document.referrer.indexOf(window.location.hostname) != -1) {
            //If there is a page to return to, gets previous page link and links it to Return Back button
            var prevPage = document.referrer;
            $('.return-link').attr('href', prevPage);
        } else {
            //Displays error message if there is no page to return to
            alert('There is nowhere to return to.');
        }
    });

    /*Input Mood on Mood Tracker using Image Choices*/

    /*Image choice assigned meanings*/
    changeMood("#Energetic-Negative", "Angry/Frustrated");
    changeMood("#Energetic-Neutral", "Restless/Nervous");
    changeMood("#Energetic-Positive", "Excited/Elated");
    changeMood("#Neutral-Negative", "Sad");
    changeMood("#Neutral-Neutral", "Neutral/Bored");
    changeMood("#Neutral-Positive", "Happy");
    changeMood("#Passive-Negative", "Hopeless/Depressed");
    changeMood("#Passive-Neutral", "Tired");
    changeMood("#Passive-Positive", "Content/Relaxed");

    /*Function for changing mood selection*/
    function changeMood(choice, adj) {
        //Mood choice style changes on hover
        $(choice).hover(() => {
            $(choice).css("cursor", "pointer");  //Mouse cursor becomes pointer
            $(choice).css("border", "2.5px solid white");  //White border appears
            $(choice).css("height", "115px"); //Height increases
            $(choice).css("width", "115px");   //Width increases
            $("#select").text(adj);            //Change text
        }, () => {
            //Styles reset when no longer hovering over image
            $(choice).css("border", "none");
            $(choice).css("height", "100px");
            $(choice).css("width", "100px");
            $("#select").text("");
        });

        //Change form data when clicked
        $(choice).on("click", () => {
            var mood = document.getElementById("mood");     //Set variable to input
            mood.value = adj;                               //Set input textvalue
        });
    }

    /*Start Button for Games*/

    /*Hides Start Game button and shaded layer when button is clicked*/
    $('.start-button').on('click', () => {
        $('.game-layer').hide();
    });

    /*"Start Game" button style changes appearance on hover*/
    $('.start-button').hover(() => {
        $('.start-button').addClass('z-depth-3'); //Applies drop shadow
        $('.start-button').css("background-color", "rgba(180, 189, 231, 0.7)");  //Lighter color background
        $('.start-button').css("border-width", "4px");  //Thicker border
        $('.start-button').css("cursor", "pointer");  //Mouse cursor changes to pointer
    }, () => {
        //Styles reset to original when not hovering
        $('.start-button').removeClass('z-depth-3');
        $('.start-button').css("background-color", 'rgba(180, 189, 231, 0.4)');
        $('.start-button').css("border-width", "3px");
    });
    
});