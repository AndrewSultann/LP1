$(document).ready(function() {
        
    // $("a.image").fancybox();
    
    $('#contact_form_1').validate({
        errorPlacement: function (error, element)
        {
            element.after(error);
        }
    });
    $('#contact_form').validate({
        errorPlacement: function (error, element)
        {
            element.after(error);
        }
    });
    
    function goToByScroll(id){
          // Remove "link" from the ID
        id = id.replace("link", "");
          // Scroll
        $('html,body').animate({
            scrollTop: $(id).offset().top},
            'slow');
    }

    $('a.navLinkBtn, #back-to-top').click(function(e) { 
        var link = $(this).attr('href');

        if (link.indexOf('#') > -1) {
            // Prevent a page reload when a link is pressed
            e.preventDefault(); 
              // Call the scroll function
            goToByScroll(link);   
        }
    });
    
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
    }

    // Form- toggle
   
    $('.request_consultation').on('click', function(e){
        e.preventDefault();

        var screenWidth = screen.width;
        var bodyWidth = $('body').outerWidth();
        if (screenWidth > bodyWidth){
            var bodyCurrentPadding = parseInt($('body').css('padding-right'));
            var body_padding = (bodyCurrentPadding + (screenWidth - bodyWidth)) + 'px';
            
            $('body').css('padding-right', body_padding);
        }

        $('body').addClass('sidebar-open');
    })

    $('.contact-form .close').on('click', function(){
        hideSidebar();
    })
    $('.panel-overlay').on('click', function(){
        hideSidebar();
    });

    function hideSidebar(){
        $('body').removeClass('sidebar-open');
        $('body').css('padding-right', "");
    }
    
    var formTitle = "Get Your Free Quote";
    createForm('#contact_form_1');

    function createForm(formId){
        var form_html_id = "slide_panel_form";
        if(formId.length){
            $(formId).clone().attr('id', form_html_id).appendTo('.sliding-form-holder .contact-form').append('<span class="cta-sub">*Your details are kept confidential</span>');

            $("#"+form_html_id).find('.form-group').each(function() {
                console.log($(this).children())
                $(this).children().each(function() {
                    var typeName = $(this).prop('nodeName');
                    if(typeName == 'LABEL'){
                       var oldID = $(this).attr('for');
                       var newID = oldID + "_sldFrm";

                       $(this).attr('for', newID);
                    } else {
                        var oldID = $(this).attr('id');
                        var newID = oldID + "_sldFrm";

                       $(this).attr('id', newID);
                    }
                });
            });
        }
        $('.sliding-form-holder h2.title').html(formTitle);
        

        if(!jQuery().validate){
            //if jQuery Validate doesn't exist, add it to the page from the CDN
            $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js')
                .done(function() {
                    applyFormValidation();
                });
        } else {
            applyFormValidation();
        }


        function applyFormValidation(){
            $('#'+form_html_id).validate({
                errorPlacement: function (error, element)
                {
                    element.after(error);
                }
            });
        }
    }
}); 