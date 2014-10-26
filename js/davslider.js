/*!
 * 
 * Davslider Image Slider Plugin version 1.0
 * Developed By : Davison Joseph
 * Created Date : 20-Nov-2013
 * Copyright (C) 2013 Davison Joseph (davisonjoseph@gmail.com)
 * 
 */

(function($){
	$.fn.davslider = function(settings) {
		
		/* Slider Dimensions */
		var slider_conainer_id = $(this).attr('id');
		var sliderHeight 	=  $("#"+slider_conainer_id).css("height");
		var sliderWidth 	=  $("#"+slider_conainer_id).css("width");
		
		
		/* Default Settings */		
		var defaults = {
            animation		:"fade",
            direction		:"harizontal",
            delay			:2000,
            interval		:5000,
            columnSlices	:12,
            rowSlices		:8
        };
        
        var settings = $.extend(defaults, settings);
               
		var direction 		= settings.direction;
		var delay 			= settings.delay;
		var animation 		= settings.animation;	/* ANIMATIONS: slicefade|fade|bubble|bubbleclip|queue */
		var interval 		= settings.interval;
		var columnSlices	= settings.column;
		var rowSlices		= settings.rows;
		
		
	
		if (settings.hasOwnProperty('column')) { 
		if(columnSlices>12){columnSlices=12;}
		}else{var columnSlices	= 9; }
		if (settings.hasOwnProperty('rows')) { 
		if(rowSlices>8){rowSlices=8;}
		}else{var rowSlices	= 4; }
		
		
		/* set css defaults */
		$("ul.dav-slider-container").css("height",sliderHeight);
		$("ul.dav-slider-container").css("width",sliderWidth);
		$("#"+slider_conainer_id).css("position","relative");
		
		var sliceWidth 		=	parseInt((sliderWidth.substring(0,sliderWidth.length - 2))/columnSlices);
		var sliceHeight 	=	(sliderHeight.substring(0,sliderHeight.length - 2))/rowSlices;
		
		var slicer = "<div class='davslider-slicer'></div>";
		$(".dav-slider-container").append("<div class='dav-slider-mask'><div class='dav-slider-nav dav-slider-prev'></div><div class='dav-slider-nav dav-slider-next'></div></div>");
		
		/* create slicers */
		var NumSlicers = columnSlices*rowSlices;
		var currentSlider = $(".dav-slider-container li").find("img.active").attr("src");
		var slicerPositionX = 0;
		var slicerPositionY = 0;
		
		for(i=1; i<=NumSlicers; i++){
			$(".dav-slider-mask").append(slicer);
			$(".davslider-slicer").css({"width":sliceWidth+"px", "height":sliceHeight+"px","background-image": "url('"+currentSlider+"')"});
		}
		
		
		var Slicelevel = 0;
			for(iRow=0;iRow<rowSlices;iRow++){
				for(iCol=0;iCol<columnSlices;iCol++){			
					$(".dav-slider-mask").find(".davslider-slicer").eq(Slicelevel).css({"background-position":"-"+(iCol)*sliceWidth+"px -"+(iRow)*sliceHeight+"px","left":(iCol)*sliceWidth+"px","top":(iRow)*sliceHeight+"px"});
					Slicelevel++;
					}
				}
		
		
		
			var sliderLength = $(".dav-slider-container").find("li").length;
			var SlideOrder = 1;
			var random = true;
			
			
			setInterval(function(){
				
				if(animation=="random"){
				random = true;
				var DefAimations = Array("slicefade","bubble","bubbleclip","queue","fade");
				animation = DefAimations[Math.floor(Math.random()*DefAimations.length)];
				}else{
				random = false;
				}
				
				
				if(SlideOrder>=sliderLength){SlideOrder=0;}
				$(".dav-slider-container li").find("img").removeClass("active");			
				$(".dav-slider-container").find("li").eq(SlideOrder).find("img").addClass("active");							
				currentSlider = $(".dav-slider-container li").find("img.active").attr("src");
			
				  switch(animation){
					case "slicefade":
						if(direction=="vertical"){
							$(".davslider-slicer:odd").animate({top: "40%",opacity:0}, delay);
							$(".davslider-slicer:even").animate({top: "30%",opacity:0}, delay);
						}else{
							$(".davslider-slicer:odd").animate({left: "90%",opacity:0}, delay);
							$(".davslider-slicer:even").animate({left: "0%",opacity:0}, delay);		
						}						
							break;
					case "bubble":
							$(".davslider-slicer:odd").animate({borderRadius:"50%",opacity:0}, delay);
							$(".davslider-slicer:even").animate({borderRadius:"50%",opacity:0}, delay);	
							break;
					case "bubbleclip":
							$(".davslider-slicer:odd").animate({ borderTopLeftRadius:"50%",  borderBottomRightRadius: "100%",opacity:0}, delay);
							$(".davslider-slicer:even").animate({borderTopRightRadius:"50%",  borderBottomLeftRadius: "100%",opacity:0}, delay);		
							break;	
					case "queue":
						var children = [];
								$(".davslider-slicer").each(function() {
								children.push(this);});								
								fadeThemOut(children);
							break;								
					default:
						$(".davslider-slicer:odd").animate({opacity:0}, delay);
						$(".davslider-slicer:even").animate({opacity:0}, delay);
					}
				
				
				setTimeout(function(){
					
					$(".davslider-slicer").remove();
					for(i=1; i<=NumSlicers; i++){
					$(".dav-slider-mask").append(slicer);
					$(".davslider-slicer").css({"width":sliceWidth+"px", "height":sliceHeight+"px","background-image": "url('"+currentSlider+"')"});
						}
					
			var Slicelevel = 0;
			for(iRow=0;iRow<rowSlices;iRow++){
				for(iCol=0;iCol<columnSlices;iCol++){			
					$(".dav-slider-mask").find(".davslider-slicer").eq(Slicelevel).css({"background-position":"-"+(iCol)*sliceWidth+"px -"+(iRow)*sliceHeight+"px","left":(iCol)*sliceWidth+"px","top":(iRow)*sliceHeight+"px"});
					Slicelevel++;
					}
				}
					},delay);
				SlideOrder++;
				if(random==true){
					animation = "random";
				}
			},interval);
			
			
			
			$(".dav-slider-next").click(function(){
				alert('next');
				});
				
				
			$(".dav-slider-prev").click(function(){
				alert('prev');
				});
	}
	})(jQuery);

						function fadeThemOut(children) {
							if (children.length > 0) {
							var currentChild = children.shift();
							$(currentChild).css("zoom",1.2);
							$(currentChild).fadeOut(10, function() {
								fadeThemOut(children);
								});}
							}
