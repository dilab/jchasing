/*!
 * jChasing menu
 * http://www.the-di-lab.com/
 *
 * Copyright 2010, The-Di-Lab 
 * Date: Mar 23 2010
 * */
(function ($) 
{
    $.fn.jchasing = function (options) 
    {
        var defaults = {       
            go: "swing",
            back: "swing",
            goDuration: "500",
            backDuration: "500"
        }
        var options = $.extend(defaults, options);
       	function Runner(){
       		var liObj = document.createElement("li");
       		$(liObj).addClass("runner");       		
       		liObj.setHeighth = function(h){
       			$(liObj).css("height",h);
       		}       		
       		liObj.setWidth = function(w){
       			$(liObj).css("width",w);
       		}       		
       		return liObj;
       	}       
        return this.each(function (){
            var o = options;          				 	 
            var thisObj = this;                      	  
            var runner = new Runner();
            //get first li element
            var firstLi= $(thisObj).children("ul").eq(0).children("li").eq(0);
            //get current
            var current = $(thisObj).children("ul").eq(0).children("li.current").eq(0);
            //set runner properties          	
          	if(current.offset()!=null){            	
            	runner.setHeighth($(current).css("height"));
            	runner.setWidth($(current).css("width"));            
            	$(runner).css("left",$(current).offset().left);            	
            	$(runner).css("top",$(current).offset().top);
            }else{
            	runner.setHeighth($(firstLi).css("height"));
            	runner.setWidth($(firstLi).css("width"));    
            	$(runner).css("position","absolute");           
            	$(runner).css("left",$(firstLi).offset().left);            	
            	$(runner).css("top",$(firstLi).offset().top);
            }
            //append Runner to main div
            $(thisObj).children().append(runner);            
            //remember its original position
            var orgLeft = $(runner).offset().left;
        	var orgTop = $(runner).offset().top;
        	var orgWidth = $(runner).css("width");
        	var orgHeight = $(runner).css("height");    
        	//bind hover to every li DOM object
        	$(thisObj).children("ul").eq(0).children("li").not(".runner").each(function(){         			
        			$(this).hover(function(e){
        				var lft = $(this).offset().left;
        				var top = $(this).offset().top;
        				var wtd = $(this).css("width");   
        				var hgt = $(this).css("height");       				
        				runner.setWidth(wtd);
        				runner.setHeighth(hgt);
        				if(""!=$(runner).queue("fx")){
        					$(runner).dequeue("fx");
        				}  	
        				$(runner).animate({
							left: lft+"px",
							top: top+"px"
						}, { duration: parseInt(o.goDuration), queue: true,easing:o.go});        				
        			},function(e){   
        				if(""!=$(runner).queue("fx")){
        					$(runner).dequeue("fx");
        				}        
        				runner.setWidth(orgWidth);
        				runner.setHeighth(orgHeight);
        				$(runner).animate({
							left: orgLeft+"px",
							top: orgTop+"px"
						}, { duration: parseInt(o.backDuration), queue: true,easing:o.back});   
        			});
        	});
        });
    };
})(jQuery);
