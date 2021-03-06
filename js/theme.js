var currentPage = 0;

var setPage = function(page) {
    currentPage = page;
} 

var readyState = function(callback) {
    var body = document.body;

    if (body && body.readyState == 'loaded') {
        callback();
    } else {
        if (window.addEventListener) {
            window.addEventListener('load', callback, false);
        } else {
            window.attachEvent('onload', callback);
        }
    }
}

readyState(function() {

    var currentIndex = 0;

    function renderTemplates() {
        $("#header").html(render('header'));
        $('#header ul li:nth-child(' + currentPage + ') a').addClass('active')
        $("#footer").html(render('footer'));
    }

    function appendVideo() {
        if ($("#room-booking").length) {

            $("#room-booking")
                .after('<div id="video"><iframe src="//player.vimeo.com/video/72974428" width="300" height="168" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>');
        }
    }

    /**
     * Hash helper
     */
    function parseHash(newHash, oldHash) {
        crossroads.parse(newHash);
    }

    /**
     * Position of the intro text
     */
    function introPos() {
        $('#intro').css({
            'margin-top': (($('.box:first').height() / 2) - $('#header').height() - ($('#intro').height() / 2))
        });
    }

    /**
     * Set Hash silently
     */
    function setHashSilently(hash) {
        hasher.changed.active = false;
        hasher.setHash(hash);68
        hasher.changed.active = true;
    }

    function render(templateName) {

        if (!render.cache) {
            render.cache = {};
        }

        if (!render.cache[templateName]) {
            var templateDirectory = './templates';
            var templateUrl = templateDirectory + '/' + templateName + '.html';
            var templateContents;
            $.ajax({
                url: templateUrl,
                method: 'GET',
                dataType: 'html',
                async: false,
                success: function(data) {
                    templateContents = data;
                }
            });
            render.cache[templateName] = _.template(templateContents);
        }

        return render.cache[templateName]();
    }

    /**
     * Panel offset
     */
    $('.panel').css({
        'margin-top': $('#header').height()
    });

    renderTemplates();

    appendVideo();

    $('#intro').fadeIn();

    /**
     * Window resize
     */
    $(window).resize(function() {
        introPos();
    });

    /**
     * Vegas background image slider
     */
    $.vegas('slideshow', {
        delay: 10000,
        backgrounds: [{
            src: 'img/background/ripley-background-7.jpg',
            fade: 2000
        }, {
            src: 'img/background/ripley-background-2.jpg',
            fade: 2000
        }, {
            src: 'img/background/ripley-background-8.jpg',
            fade: 2000
        }, {
            src: 'img/background/ripley-background-4.jpg',
            fade: 2000
        }, {
            src: 'img/background/ripley-background-5.jpg',
            fade: 2000
        }, {
            src: 'img/background/ripley-background-6.jpg',
            fade: 2000
        }]
    })('overlay');

    /**
     * Lightbox
     */

    $('#lightbox').on('click', function(event) {
        $('#lightbox').hide();
    });

    $('.lightbox_trigger').click(function(event) {
        event.preventDefault();

        $('#bigimg').attr({
            'src': $(this).attr("href")
        });
        $('#lightbox').show();
    });

    /**
     * Flexslider
     */
    $('.flexslider').flexslider();

});