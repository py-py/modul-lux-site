/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    var body = $('body');
    var html = $('html');

    // Navbar menu dropdown

    var customScrollbar = $(".customScrollbar");

    customScrollbar.each(function () {
        var option = {
            cursorcolor: "#424242",
            cursorwidth: '5px',
            cursorborder: 'none',
            scrollspeed: "60",
            mousescrollstep: "40",
            cursoropacitymax: "1"
        };
        for (var k in option) {
            if (option.hasOwnProperty(k)) {
                if ($(this).attr('data-scroll-' + k) != null) {
                    option[k] = $(this).data('scroll-' + k);
                }
            }
        }
        $(this).niceScroll({
            cursorcolor: option.cursorcolor,
            cursorwidth: option.cursorwidth,
            cursorborder: option.cursorborder,
            scrollspeed: option.scrollspeed,
            mousescrollstep: option.mousescrollstep,
            cursoropacitymax: option.cursoropacitymax
        });
    });

    // Button caret dropdow
    var btnDropdown = $('.js-navbar').find('.navbar-menu i');

    btnDropdown.on('click', function (e) {
        $(this).siblings('.drop-menu').slideToggle('fast', function () {
            customScrollbar.getNiceScroll().resize();
        });
        $(this).siblings('a').toggleClass('active');
        $(this).toggleClass('clicked');
        e.stopPropagation();
    });

    // Navbar vertial and Navbar mobile
    var headerNavbar = $('.header-navbar');
    var headerNavbarMobile = $('.header-navbar-mobile');
    var navbarMobileBtn = $('.js-toggle-navbar-mobile');
    var navbarBtn = $('.js-toggle-navbar');
    var btnCloseNavbar = $('.js-close-navbar');

    navbarBtn.on('click', function () {
        headerNavbar.toggleClass('opened');
    });

    navbarMobileBtn.on('click', function () {
        headerNavbarMobile.slideToggle('fast');
        $(this).toggleClass("is-active");
    });

    btnCloseNavbar.on('click', function () {
        headerNavbar.toggleClass('opened');
    });

    $(window).on('scroll', function (event) {
        headerNavbar.removeClass('opened');
    });


    $(window).on('click', function (event) {
        if (!$(event.target).closest(headerNavbar).length && !$(event.target).closest(navbarBtn).length && headerNavbar.hasClass('opened')) {
            headerNavbar.removeClass('opened');
        }
        if (!$(event.target).closest(headerNavbarMobile).length && !$(event.target).closest(navbarMobileBtn).length && headerNavbar.css('style') !== 'none') {
            headerNavbarMobile.slideUp('fast');
            navbarMobileBtn.removeClass("is-active");
        }
    });

    html.easeScroll({
        frameRate: 150,
        animationTime: 1200,
        stepSize: 130
    });

    // Navbar fixed when scroll
    var header = $(".js-header");
    var headerOffset = header.data('scroll-offset');
    $(window).scroll(function () {
        if ($(this).scrollTop() > headerOffset) {
            header.addClass('header-sm pos-fixed');
        } else {
            header.removeClass("header-sm pos-fixed");
        }
    });


    /*Search box1*/
    var searchBox = $('.search-box'),
        searchBtn = $('.search-box .js-btn-search'),
        searchInput = $('.search-box .input-holder');

    searchBtn.on('click', function () {
        searchBox.toggleClass('search-box-open');
        if (searchInput.hasClass('fadeInUp')) {
            searchInput.removeClass('fadeInUp').addClass('fadeOutDown');
        } else if (searchInput.hasClass('fadeOutDown')) {
            searchInput.removeClass('fadeOutDown').addClass('fadeInUp');
        } else {
            searchInput.addClass('fadeInUp');
        }
    });

    $(window).on('click', function (event) {
        if (!$(event.target).closest(searchBox).length && !$(event.target).closest(searchBtn).length && searchBox.hasClass('search-box-open')) {
            searchBox.removeClass('search-box-open');
            if (searchInput.hasClass('fadeInUp')) {
                searchInput.removeClass('fadeInUp').addClass('fadeOutDown');
            } else if (searchInput.hasClass('fadeOutDown')) {
                searchInput.removeClass('fadeOutDown').addClass('fadeInUp');
            } else {
                searchInput.addClass('fadeInUp');
            }
        }
    });

    /*Mini shop cart*/
    var miniShopCart = $(".mini-shopcart");
    var btnMiniShopCart = $(".js-btn-cart");

    if (miniShopCart && btnMiniShopCart) {
        btnMiniShopCart.on("click", function () {
            miniShopCart.toggleClass("open");
        });

        $(window).on('click', function (event) {
            if (!$(event.target).closest(miniShopCart).length && !$(event.target).closest(btnMiniShopCart).length) {
                miniShopCart.removeClass('open');
            }
        });
    }

    /*ISOTOPE*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'li', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        var $buttonGroup = $('.filter-tope-group');
        $buttonGroup.on('click', 'li', function () {
            $buttonGroup.find('.active').removeClass('active');
            $(this).addClass('active');
        });
    });

    // init Isotope
    var $grid = $topeContainer.each(function () {
        $(this).isotope({
            itemSelector: '.isotope-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.isotope-item'
            }
        });
    });

    // layout Isotope after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.isotope('layout');
    });


    /* owl custom*/
    var owlSelector = $('.owl-carousel');
    owlSelector.each(function () {
        var option = {
            items: 3,
            margin: 0,
            loop: false,
            center: false,
            mousedrag: true,
            touchdrag: true,
            pulldrag: true,
            autowidth: false,
            nav: false,
            navtext: ["<i data-toggle='tooltip' title='Previous' class='fa fa-angle-left'></i>", "<i data-toggle='tooltip' title='Next' class='fa" +
            " fa-angle-right'></i>"],
            dots: false,
            dotsdata: false,
            autoplay: false,
            smartspeed: 650,
            animateout: null,
            animatein: null,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3
        };

        for (var k in option) {
            if (option.hasOwnProperty(k)) {
                if ($(this).attr('data-carousel-' + k) != null) {
                    option[k] = $(this).data('carousel-' + k);
                }
            }
        }


        $(this).owlCarousel({
            margin: option.margin,
            loop: option.loop,
            center: option.center,
            mouseDrag: option.mousedrag,
            touchDrag: option.touchdrag,
            pullDrag: option.pulldrag,
            nav: option.nav,
            navText: option.navtext,
            dots: option.dots,
            dotsData: option.dotsdata,
            autoplay: option.autoplay,
            smartSpeed: option.smartspeed,
            animateIn: option.animatein,
            animateOut: option.animateout,
            autoWidth: option.autowidth,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: option.xs
                },
                // breakpoint from 768 up
                480: {
                    items: option.sm,
                    autoplay: false,
                    touchDrag: false,
                    pullDrag: false
                },
                // breakpoint from 768 up
                768: {
                    items: option.md
                },
                992: {
                    items: option.lg
                },
                1200: {
                    items: option.items
                }
            }
        });

    });

    // MatchHeight
    var matchHeigh = $('.matchHeigh');
    if (matchHeigh) {
       matchHeigh.matchHeight();
    }

    owlSelector.on('refreshed.owl.carousel', function () {
        $.fn.matchHeight._update();
    });




    // Background parallax
    function backgroundResize() {
        var windowH = $(window).height();
        $(".parallax").each(function (i) {
            var path = $(this);
            var contW = path.width();
            var contH = path.height();
            var imgW = path.attr("data-img-width");
            var imgH = path.attr("data-img-height");
            var ratio = imgW / imgH;
            var diff = 100;
            diff = diff ? diff : 0;
            var remainingH = 0;
            if (path.hasClass("parallax") && !$("html").hasClass("touch")) {
                remainingH = windowH - contH;
            }
            imgH = contH + remainingH + diff;
            imgW = imgH * ratio;
            if (contW > imgW) {
                imgW = contW;
                imgH = imgW / ratio;
            }
            path.data("resized-imgW", imgW);
            path.data("resized-imgH", imgH);
            path.css("background-size", imgW + "px " + imgH + "px");
        });
    }

    function parallaxBG() {
        $(".parallax").each(function () {
            var attrImage = $(this).attr('data-background');
            if (attrImage !== undefined) {
                $(this).css('background-image', 'url(' + attrImage + ')');
            }
        });
    }

    parallaxBG();

    $(window).resize(backgroundResize);
    $(window).focus(backgroundResize);
    backgroundResize();
    function parallaxPosition(e) {
        var heightWindow = $(window).height();
        var topWindow = $(window).scrollTop();
        var bottomWindow = topWindow + heightWindow;
        var currentWindow = (topWindow + bottomWindow) / 2;
        $(".parallax").each(function (i) {
            var path = $(this);
            var height = path.height();
            var top = path.offset().top;
            var bottom = top + height;
            if (bottomWindow > top && topWindow < bottom) {
                var imgH = path.data("resized-imgH");
                var min = 0;
                var max = -imgH + heightWindow;
                var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow;
                top = top - overflowH;
                bottom = bottom + overflowH;
                var value = 0;
                if ($('.parallax').is(".titlebar")) {
                    value = min + (max - min) * (currentWindow - top) / (bottom - top) * 2;
                } else {
                    value = min + (max - min) * (currentWindow - top) / (bottom - top);
                }
                var orizontalPosition = path.attr("data-oriz-pos");
                orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
                $(this).css("background-position", orizontalPosition + " " + value + "px");
            }
        });
    }
    if (!html.hasClass("touch")) {
        $(window).resize(parallaxPosition);
        $(window).scroll(parallaxPosition);
        parallaxPosition();
    }

    /*Seekbar*/
    var html5Slider = document.getElementById('pricepicker');
    if (html5Slider != undefined) {
        noUiSlider.create(html5Slider, {
            start: [ 50, 200 ],
            connect: true,
            range: {
                'min': 0,
                'max': 1000
            }
        });
        var nodes = [document.getElementById('lower-value'), document.getElementById('upper-value')];
        html5Slider.noUiSlider.on('update', function( values, handle ) {
            nodes[handle].innerHTML = "$" + values[handle];
        });
    }



    /*View List or Grid*/
    var listElement = $("[data-view=list]");
    var gridElement = $("[data-view=grid]");

    if (listElement.hasClass('current')) {
        body.addClass('shop-view-list');
    } else if (gridElement.hasClass('current')) {
        body.addClass('shop-view-grid');
    }

    listElement.on('click', function () {
        if (!$(this).hasClass('current')) {
            body.removeClass('shop-view-grid').addClass('shop-view-list');
            gridElement.removeClass('current');
            $(this).addClass('current');
        }
        $.fn.matchHeight._update();

        return false;
    });
    gridElement.on('click', function () {
        if (!$(this).hasClass('current')) {
            body.removeClass('shop-view-list').addClass('shop-view-grid');
            listElement.removeClass('current');
            $(this).addClass('current');
        }
        $.fn.matchHeight._update();
        return false;
    });

    /*Chosen Select*/
    /*Chosen Select Custom*/
    var config = {
        '.chosen-select.no-search': {disable_search_threshold: 10, width: "100%"},
        '.chosen-select': {width: "100%"}
    };

    for (var selector in config) {
        if (config.hasOwnProperty(selector)) {
            $(selector).chosen(config[selector]);
        }
    }

    /*Input number controller*/
    $('.quantity').each(function() {
        var spinner = $(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.increase'),
            btnDown = spinner.find('.decrease'),
            min = input.attr('min'),
            max = input.attr('max');

        btnUp.click(function() {
            var oldValue = parseFloat(input.val());
            var newVal = undefined;
            if (oldValue >= max) {
                newVal = oldValue;
            } else {
                newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.click(function() {
            var oldValue = parseFloat(input.val());
            var newVal = undefined;
            if (oldValue <= min) {
                newVal = oldValue;
            } else {
                newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

    });

    /*accordion*/
    var accordion_select = $('.accordion');
    if (accordion_select) {
        accordion_select.each(function () {
            $(this).accordion({
                "transitionSpeed": 400,
                transitionEasing: 'ease-in-out'
            });
        });
    }


    // Modal
    var remodalInst = $('.remodal').remodal();

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    $('#dropStyle').on('change', function () {
        var str = "";
        $( "#dropStyle").find("option:selected" ).each(function() {
            str += $( this ).text();
        });
        if (str == 'Dark') {
            $('.js-header-style').addClass('navbar-dropdow-dark').removeClass('navbar-dropdow-light');
        } else if (str == 'Light') {
            $('.js-header-style').addClass('navbar-dropdow-light').removeClass('navbar-dropdow-dark');
        }
    });


    // checkbox check out
    //set initial state.
    var paneShipping = $('#js-pane-shipping');
    $('#ckcShipping').on('change', function() {
        if(this.checked) {
            paneShipping.slideDown('fast');
        } else {
            paneShipping.slideUp('fast');
        }
    });

    $('.btn-close-panel').on('click', function () {
       $('.control-panel').toggleClass('open');
    });

    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 800,
        outDuration: 800,
        linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"]):not([data-remodal-target^="loginModal"])',
        loading: true,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="single6"></div>', // e.g '<img src="loading.svg" />'
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'body',
        transition: function(url){ window.location.href = url; }
    });

    /*Preloader animsition*/
    $(window).on('load', function () {
        /**
         * Opens the modal window
         */
        //remodalInst.open();
    });

})
(jQuery);

