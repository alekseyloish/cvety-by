$(document).ready(function(){

    // open/close more contacts on header
    $(function() {
    
        var moreContactToogle = $('.contacts__more'),
            fullContactsContainer = $('.full-contacts'),
            fullContacts = fullContactsContainer.find('.full-contacts__inner'),
            closeContacts = $('.full-contacts__close')
        
        moreContactToogle.on('click', function(e) {
            e.preventDefault();
            
            fullContactsContainer.fadeIn(100)
                .animate({
                    opacity: 1,
                    width: 620
                }, 200)
                .delay(100)
                .animate({
                    height: 135
                }, 500, function() {
                    fullContacts.delay(200).fadeIn(300);
                });
        });
        
        closeContacts.on('click', function(e) {
            e.preventDefault();
            
            fullContacts.fadeOut(300);
            fullContactsContainer.delay(500)
                .animate({
                    height: 0
                }, 500)
                .delay(100)
                .animate({
                    width: 0
                }, 200, function() {
                    $(this).css('display', 'none');
                });
        });
    });
    
    
    // uchecked all radio buttons in filter
    $(function() {
        var paramItem = $('.param__item'),
            paramRadioBtn = paramItem.find('input:radio'),
            customRadioBtn = paramRadioBtn.next('span');
        
        customRadioBtn.find('.fa').on('click', function(e) {
            e.preventDefault();
            
            var $this = $(this),
                parentBox = $this.closest('.param__list');
            
            parentBox.find(paramRadioBtn).each(function() {
                $(this).prop('checked', false);
            });
        });
    });
    
    
    // Tabs
    $(function() {
        $('.tabs__controls-item').children('a').on('click', function(e) {
            e.preventDefault();
            
            var item = $(this).closest('.tabs__controls-item'),
                tabsContent = $('.tabs__content-item'), 
                itemPos = item.data('class-tab'); 
            
            tabsContent.filter('.tabs__content-item--' + itemPos)
                .add(item)
                .addClass('is-active')
                .siblings()
                .removeClass('is-active');
        });
    });
    
    
    // Init carousel (universal)
    $(function() {
        $('.carousel').each(function() {

            var maxItems = $(this).attr('data-max-items'),
                tabletItems = $(this).attr('data-tablet-items'),
                $slideSpeed = $(this).attr('data-slide-speed'),
                $autoPlayInterval = $(this).attr('data-auto-play-interval');

            console.log('tabletItems = ' + tabletItems);
            
            if (maxItems > 1  &&  tabletItems == undefined) {
                tabletItems = maxItems - 1;
            } else {
                tabletItems = 1;
            }
            
            console.log('tabletItems = ' + tabletItems);
            
            
            if ( $(this).hasClass('comparison__list') ) {  // option for comparison page
                
                $(this).owlCarousel({
                    items : 3, // 3 items above 1024px browser width
                    itemsDesktop : [1024,2], // 2 items between 1024px and 768px
                    itemsDesktopSmall : [768,1], // betweem 768px
                    navigation: false,
                    pagination: false,
                    responsive: true,
                    slideSpeed: $slideSpeed,
                    width: 'auto'
                });
                
            } else {  // option for any carousel slider
                
                $(this).owlCarousel({
                    autoPlay: $autoPlayInterval,
                    items: maxItems,
                    itemsDesktop: maxItems,
                    itemsTablet: tabletItems,
                    itemsmobile: 1,
                    navigation: false,
                    pagination: false,
                    responsive: true,
                    slideSpeed: $slideSpeed,
                    width: 'auto'
                });
            }

            var owlAPI = $(this).data('owlCarousel'),
                sliderControls = $(this).parent().parent().find('.carousel-control');

            $(sliderControls).find('.carousel-control__arrow--prev').click(function(e) {
                e.preventDefault();
                owlAPI.prev();
            });
            $(sliderControls).find('.carousel-control__arrow--next').click(function(e) {
                e.preventDefault();
                owlAPI.next();
            });

        });
    });
    
    
    // Remove item from comparison list on comparison page
    $(function() {
        var owlData = $('.comparison__list').data('owlCarousel'),
            comparisonList = $('.comparison__list'),
            parentContainer = comparisonList.parent().parent(),
            
            defaultMessage = "<h4 class=\"comparison__message\">Нет товаров для сравнения</h4>",
            
            btnRemoveItem = $('.product-comparison__remove-item');
        
        
        btnRemoveItem.on('click', function(e) {
            e.preventDefault();
            
            var $this = $(this),
                countItems = $this.closest(comparisonList).find('.owl-item'),
                targetPositionItem = $this.closest('.owl-item').index();
            
            console.log('targetPositionItem = ' + targetPositionItem );
            console.log('countItems = ' + countItems.length );
            console.log('defaultMessage = ' + defaultMessage );
            
            if ( countItems.length <= 1 ) {
                owlData.removeItem(targetPositionItem);
                
                parentContainer.find('.comparison__control').remove();
                parentContainer.append(defaultMessage);
                
            } else {
                owlData.removeItem(targetPositionItem);
            }
            
        });
    });
    
    
    // Визуализация выбора способа оплаты на странице оформления заказа
    $(function() {
        var payment = $('.payments__item');
        
        payment.on('click', function(e) {
            var $this = $(this);
            
            payment.removeClass('is-active');
            $this.toggleClass('is-active');
        });
        
        
        payment.hover(function() {
            var $this = $(this),
                paymentDesc = $('.payments__desc'),
                paymentId = $this.data('pid'),
                currentPaymentArrow = $('.p-description__arrow');
            
            var $thisWidth = $this.outerWidth(),
                $thisPosition = $this.offset(),
                arrowNewPosition = parseInt($thisPosition.left + $thisWidth/2);
            
            /* currentPaymentArrow.offset(function(i, val) {
                return {
                    top:val.top + 0,
                    left: val.left + arrowNewPosition
                }
            }); */
            
            paymentDesc.find('.p-description').hide();
            $('#payment-desc__' + paymentId).show();
            
        }, function() {
            var $this = $(this),
                paymentDesc = $('.payments__desc'),
                paymentId = $this.data('pid');
            
            paymentDesc.find('.p-description').hide();
            $('#payment-desc__' + paymentId).hide();
        });
    });
    
    
    // Accordion function
    $(function() {
        
        $('.accordion__trigger').on('click', function(e) {
            e.preventDefault();
            
            var $this = $(this),
                accordionItem = $this.closest('.accordion__item'),
                accordionList = $this.closest('.accordion__list'),
                accordionItems = accordionList.find('.accordion__item'),
                accordeonContent = accordionItem.find('.accordion__content'),
                accordeonOtherContent = accordionList.find('.accordion__content'),
                
                duration = 250;
            
            if (!accordionItem.hasClass('is-active')) {
                accordionItem.addClass('is-active').siblings().removeClass('is-active');
                accordeonOtherContent.slideUp(duration);
                accordeonContent.slideDown(duration);
            } else {
                accordeonOtherContent.slideUp(duration);
                
                accordionItem.removeClass('is-active');
            }
        });
    });
    
    
    // init custom scrollbar
    $(function() {
        $(window).load(function(){
            $(".custom-scrollbar").mCustomScrollbar({
                theme: "dark"
            });
        });
    });
    
    
    // init visualization rating
    $(function() {
        $('.rating-stars__item').hover(
            function() {
                var index = $(this).index();
                
                $('.rating-stars__item').each(function() {
                    if ($(this).index() <= index) $(this).addClass('active');
                    else $(this).removeClass('active');
                });
            },
            function() {
                $('.rating-stars__item').removeClass('active');
        });
    });
    
    
    // asasas
    $(function() {
        
        $('.param__heading').on('click', function(e) {
            
            if ( $(window).width() <= 978 ) {
                e.preventDefault();
                
                var $this = $(this),
                    filterItem = $this.closest('.filter__param'),
                    filterList = $this.closest('.filter'),
                    filterItems = filterList.find('.filter__param'),
                    filterContent = filterItem.find('.param__list'),
                    filterOtherContent = filterList.find('.param__list'),

                    duration = 250;

                if (!filterItem.hasClass('is-active')) {
                    filterItem.addClass('is-active').siblings().removeClass('is-active');
                    filterOtherContent.slideUp(duration);
                    filterContent.slideDown(duration);
                } else {
                    filterOtherContent.slideUp(duration);

                    filterItem.removeClass('is-active');
                }
            } else {
                return false;
            }
        });
    });
    
    
    $(function() {
    
        $('#add_postcard').on('click', function() {
            $('.postcard').toggleClass('active');
        });
        
    });

    
    
});