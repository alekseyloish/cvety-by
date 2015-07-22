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
        $('.related-offers__nav-link').on('click', function(e) {
            e.preventDefault();
            
            var item = $(this).closest('.related-offers__nav-item'),
                tabsContent = $('.related-offers__item'), 
                itemPos = item.data('class-tab'); 
            
            tabsContent.filter('.related-offers__item--' + itemPos)
                .add(item)
                .addClass('related-offers__item--active')
                .siblings()
                .removeClass('related-offers__item--active');
        });
    });

    
    
});