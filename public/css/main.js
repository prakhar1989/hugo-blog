jQuery(window).resize(function(){
	sideBarFix();
})
jQuery(window).scroll(function(){
	sideBarFix();
})
jQuery(document).ready(function(){
	sideBarFix();
	jQuery('.nav a').click(function(){
		if($(this).next().is('ul')){
			if($(this).hasClass('open')){
				$(this).next('ul').slideUp(200);
				$(this).removeClass('open');
			}
			else{
				$(this).next('ul').slideDown(200);
				$(this).addClass('open');
			}
			
			return false;
		}
		else{
			return true;
		};
	});
	jQuery('#expand_content_menu, #body_hover').click(function(){
		var expandAreaWide = jQuery('.left_sidebar_content_area').width();
		if(!jQuery('#expand_content_menu').hasClass('open'))
		{
			jQuery('#expand_content_menu').addClass('open');
			jQuery('#expand_content_menu span').removeClass('icon icon-fontawesome-webfont-1 ');
			jQuery('#expand_content_menu span').addClass('menu_cross');
			jQuery('#expand_content_menu span').html('&times;');
			jQuery('#body_hover').fadeIn(200);
			jQuery('.left_sidebar_content_area').animate({'margin-left':"0px"},100);
			jQuery('.main_content_area').animate({"margin-right":'-'+expandAreaWide+'px'},100);
			if(jQuery(window).width()>=768){
				jQuery('#expand_content_menu').animate({left:290},100);
			}
		}
		else{
			jQuery('#expand_content_menu').removeClass('open');
			jQuery('#expand_content_menu span').addClass('icon icon-fontawesome-webfont-1 ');
			jQuery('#expand_content_menu span').removeClass('menu_cross');
			jQuery('#expand_content_menu span').html('');
			jQuery('#body_hover').fadeOut(200);
			jQuery('.left_sidebar_content_area').animate({"margin-left":"-100%"},500);
			jQuery('.main_content_area').animate({"margin-right":'0px'},500);
			if(jQuery(window).width()>=768){
				jQuery('#expand_content_menu').animate({left:10},100);
			}
		}
	});
	// ********************** Accordion Code start ******************
	$('.accordion_title').each(function(){
		var activeIcon = $(this).attr('data-active-icon');
		var DeActiveIcon = $(this).attr('data-deactive-icon');
		$(this).find('.icon').removeClass(activeIcon);
		$(this).find('.icon').addClass(DeActiveIcon);
	})
	$('.panel-heading').click(function(){
		$('.panel-heading').removeClass('active');
		if(!$(this).next('.panel-collapse').hasClass('in')){
			$(this).addClass('active');
		}
		$('.accordion_title').each(function(){
			var activeIcon = $(this).attr('data-active-icon');
			var DeActiveIcon = $(this).attr('data-deactive-icon');
			$(this).find('.icon').removeClass(activeIcon);
			$(this).find('.icon').addClass(DeActiveIcon);
		})
		var activeIcon = $(this).find('.accordion_title').attr('data-active-icon');
		var DeActiveIcon = $(this).find('.accordion_title').attr('data-deactive-icon');
		if($(this).hasClass('active')){
			$(this).find('.icon').removeClass(DeActiveIcon);
			$(this).find('.icon').addClass(activeIcon);
		}
		var activeColor = $(this).find('.accordion_title').css('background-color');
		$(this).next().find('.panel-body').css({"border-color":activeColor});
	});
	// ********************** Accordion Code End ******************
});

function sideBarFix(){
	var SelectHeight;
	if(jQuery('.left_sidebar_content_area').height()>=jQuery('.main_content_area').height()){
		SelectHeight = jQuery('.left_sidebar_content_area').height();
		SelectHeight += "px"; 
		jQuery('.left_sidebar_content_area, .main_content_area').css({'min-height':SelectHeight});
	}
	else{
		SelectHeight = jQuery('.main_content_area').height();
		SelectHeight += "px"; 
		jQuery('.left_sidebar_content_area, .main_content_area').css({'min-height':SelectHeight});
	}
}