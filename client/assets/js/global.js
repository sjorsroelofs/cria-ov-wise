(function() {

    'use strict';

    // SlideToggle the section title
    jQuery('div.section div.section-title').on('click', function() {

        var section = jQuery(this).parent();

        section.find('div.section-steps').slideToggle(200, function() {
            if(section.hasClass('open')) section.removeClass('open').addClass('closed');
            else  section.removeClass('closed').addClass('open');
        });

    });

    // Go to the next section
    jQuery('div.section div.button.arrived').on('click', function() {

        var section = jQuery(this).parent().parent();
        var nextSection = section.next('div.section');

        finishSection(section);

        if(nextSection.hasClass('section')) activateSection(nextSection);
        else finish();

    });

    // Finish a section
    function finishSection(section) {

        section.find('div.section-steps').slideToggle(200, function() {
            section.removeClass('open current').addClass('closed finished');
        });

    }

    // Activate a section
    function activateSection(section) {

        if(section.hasClass('closed')) {
            section.find('div.section-steps').slideToggle(200, function() {
                callback();
            });
        } else {
            callback();
        }

        function callback() {
            section.removeClass('closed').addClass('open current');
        }

    }

    // Finish the route
    function finish() {
        alert('Finished!');
    }

})();