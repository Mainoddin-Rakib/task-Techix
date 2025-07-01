/* ===================================================================
    Author          : Mainoddin Rakib
* ================================================================= */

(function ($) {
    "use strict";

    // <!-- Gsap Aniamtion Start -->

    // Register GSAP Plugins

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TweenMax, ScrollToPlugin);



    // Text Invert With Scroll 
    const split = new SplitText(".text_invert", { type: "lines" });

    split.lines.forEach((target) => {
        gsap.to(target, {
            backgroundPositionX: 0,
            ease: "none",
            scrollTrigger: {
                trigger: target,
                scrub: 1,
                start: 'top 85%',
                end: "bottom center",
            }
        });
    });
    // <!-- Gsap Aniamtion End -->

    // <!-- Mobile Menu Js Start  -->
    $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "1199",
        meanExpand: ['<i class="far fa-plus"></i>'],
    });


    // <!-- Sticky Header Js Start  -->
    $(window).scroll(function () {
        if ($(this).scrollTop() > 250) {
            $("#header-sticky").addClass("sticky");
        } else {
            $("#header-sticky").removeClass("sticky");
        }
    });

    // <!-- Preloader -->
    function loader() {
        $(window).on('load', function () {
            // Animate loader off screen
            $(".preloader").addClass('loaded');
            $(".preloader").delay(600).fadeOut();
            $(".scroll-up").on("click", function (event) {
                event.preventDefault();
                jQuery("html, body").animate({
                    scrollTop: 0,
                },
                    900
                );
                return false;
            });
        });
    }
    loader();

    // <!-- Scroll top -->
    let scroll_top = document.getElementById("scroll_top");
    if (scroll_top) {
        window.onscroll = function () {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                scroll_top.classList.add('showed');
            } else {
                scroll_top.classList.remove('showed');
            }
        };

        scroll_top.addEventListener('click', function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    }

    // <!-- Video Popup Start -->
    $(".img-popup").magnificPopup({
        type: "image",
        gallery: {
            enabled: true,
        },
    });

    $('.video-popup').magnificPopup({
        type: 'iframe',
        callbacks: {
        }
    });

    // <!-- Counter Start -->
    if ($(".count-bar").length) {
        $(".count-bar").appear(
            function () {
                var el = $(this);
                var percent = el.data("percent");
                $(el).css("width", percent).addClass("counted");
            }, {
            accY: -50
        }
        );
    }
    // <!-- Counterup Start -->
    $(".count").counterUp({
        delay: 15,
        time: 4000,
    });

    // <!-- Wow Animation Start -->
    new WOW().init();


    //>> Mouse Cursor Start <<//

    if (!document.body.classList.contains("is-mobile") && document.querySelector("#custom-cursor-wrapper.tp-cursor")) {
        $(".tp-magnetic-item").wrap('<div class="tp-magnetic-wrap"></div>');

        if ($("a.tp-magnetic-item").length) {
            $("a.tp-magnetic-item").addClass("not-hide-cursor");
        }

        var $mouse = { x: 0, y: 0 };
        var $pos = { x: 0, y: 0 };
        var $ratio = 0.15;
        var $active = false;
        var $cursorDot = $("#cursorDot");

        var $cursorDotWidth = 14;
        var $cursorDotHeight = 14;
        var $cursorDotScale = 1;
        var $cursorDotOpacity = 1;
        var $cursorDotBorderWidth = 1;

        gsap.set($cursorDot, {
            xPercent: -50,
            yPercent: -50,
            width: $cursorDotWidth,
            height: $cursorDotHeight,
            borderWidth: $cursorDotBorderWidth,
            opacity: $cursorDotOpacity
        });

        document.addEventListener("mousemove", mouseMove);

        function mouseMove(e) {
            $mouse.x = e.clientX;
            $mouse.y = e.clientY;
        }

        gsap.ticker.add(updatePosition);

        function updatePosition() {
            if (!$active) {
                $pos.x += ($mouse.x - $pos.x) * $ratio;
                $pos.y += ($mouse.y - $pos.y) * $ratio;

                gsap.set($cursorDot, { x: $pos.x, y: $pos.y });
            }
        }

        $(".tp-magnetic-wrap").mousemove(function (e) {
            parallaxCursor(e, this, 2); // magnetic cursorDot = low number is more attractive
            callParallax(e, this);
        });

        function callParallax(e, parent) {
            parallaxIt(e, parent, parent.querySelector(".tp-magnetic-item"), 25); // magnetic area = higher number is more attractive
        }

        function parallaxIt(e, parent, target, movement) {
            var boundingRect = parent.getBoundingClientRect();
            var relX = e.clientX - boundingRect.left;
            var relY = e.clientY - boundingRect.top;

            gsap.to(target, {
                duration: 0.3,
                x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
                y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
                ease: Power2.easeOut
            });
        }

        function parallaxCursor(e, parent, movement) {
            var rect = parent.getBoundingClientRect();
            var relX = e.clientX - rect.left;
            var relY = e.clientY - rect.top;
            $pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
            $pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
            gsap.to($cursorDot, { duration: 0.3, x: $pos.x, y: $pos.y });
        }


        // Magnetic item hover.
        $(".tp-magnetic-wrap").on("mouseenter", function (e) {
            gsap.to($cursorDot, { duration: 0.3, scale: 2, borderWidth: 1, opacity: $cursorDotOpacity });
            $active = true;
        }).on("mouseleave", function (e) {
            gsap.to($cursorDot, { duration: 0.3, scale: $cursorDotScale, borderWidth: $cursorDotBorderWidth, opacity: $cursorDotOpacity });
            gsap.to(this.querySelector(".tp-magnetic-item"), { duration: 0.3, x: 0, y: 0, clearProps: "all" });
            $active = false;
        });


        $("[data-cursor2]").each(function () {
            $(this).on("mouseenter", function () {
                $("#cursorDot").addClass("with-blur");
                $cursorDot.append('<div class="cursorDot-drag"></div>');
                $(".cursorDot-drag").append($(this).attr("data-cursor2"));
                gsap.to($cursorDot, {
                    duration: 0.3, xPercent: is_rtl() ? 50 : -50, yPercent: -60, width: 110, height: 110, opacity: 1, borderWidth: "1px", borderColor: "rgba(255, 255, 255, 0.22)", zIndex: 1, backdropFilter: "blur(34px)",
                    backgroundColor: "rgba(14, 14, 14, 0.3)", boxShadow: "11px 11px 32.2px 0px rgba(255, 255, 255, 0.12) inset"
                });
                gsap.to(".cursorDot-drag", { duration: 0.3, scale: 1, autoAlpha: 1 });
            }).on("mouseleave", function () {
                gsap.to($cursorDot, { duration: 0.3, yPercent: -50, width: $cursorDotWidth, height: $cursorDotHeight, opacity: $cursorDotOpacity, borderWidth: $cursorDotBorderWidth, backgroundColor: "#000" });
                gsap.to(".cursorDot-drag", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps: "all" });
                $cursorDot.find(".cursorDot-drag").remove();
            });
            $(this).addClass("not-hide-cursor2");
        });
        // Show/hide cursor // 

        // Hide on hover//
        $("a, button") // class "hide-cursor" is for global use.
            .not('.cursor-hide') // omit from selection.
            .on("mouseenter", function () {
                gsap.to($cursorDot, { duration: 0.3, scale: 0, opacity: 0 });
            }).on("mouseleave", function () {
                gsap.to($cursorDot, { duration: 0.3, scale: $cursorDotScale, opacity: $cursorDotOpacity });
            });

        // Hide on click//
        $("a")
            .not('[target="_blank"]') // omit from selection.
            .not('.cursor-hide') // omit from selection.
            .not('[href^="#"]') // omit from selection.
            .not('[href^="mailto"]') // omit from selection.
            .not('[href^="tel"]') // omit from selection.
            .not(".lg-trigger") // omit from selection.
            .not(".tp-btn-disabled a") // omit from selection.
            .on('click', function () {
                gsap.to($cursorDot, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
            });

        // Show/hide on document leave/enter//
        $(document).on("mouseleave", function () {
            gsap.to("#cursor-outer", { duration: 0.3, autoAlpha: 0 });
        }).on("mouseenter", function () {
            gsap.to("#cursor-outer", { duration: 0.3, autoAlpha: 1 });
        });

        // Show as the mouse moves//
        $(document).mousemove(function () {
            gsap.to("#cursor-outer", { duration: 0.3, autoAlpha: 1 });
        });
    }

    function is_rtl() {
        return $('html').attr('dir') == 'rtl' ? true : false;
    }


    // <!-- --------------------------  Swiper Slider Start ------------------------ -->
    //>> testimonial Slider 2 Start <<//
    const serviceSlide = new Swiper(".service-slide", {
        spaceBetween: 24,
        speed: 1000,
        loop: "true",
        autoplay: "false",
        speed: 1000,
        navigation: {
            nextEl: ".service-prev",
            prevEl: ".service-next",
        },
        breakpoints: {
            475: {
                slidesPerView: 1,
            },
            991: {
                slidesPerView: 2,
            },
            1399: {
                slidesPerView: 3,
            },
        },
    });



})(jQuery);

// <!-- End jQuery




