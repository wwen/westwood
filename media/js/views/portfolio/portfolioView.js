/**
* About View
* Author:       Will Wang
* Description:  About us information
* Date:         06/09/2014
**/

define(['jquery',
		'underscore',
		'backbone',
		'text!templates/portfolio/portfolioTmpl.html'
	   ], function($, _, Backbone, portfolioTemplate) {

	   		var PortfolioView = Backbone.View.extend({
	   			tagName: 'div',
	   			id: 'service_content',
	   			flag: 1,

	   			events: {
	   				"click #image_before": "spread",
	   				"click #play": "play",
	   				"click #stop": "stop"
	   			},

	   			initialize: function() {
	   				this.render();
	   			},

	   			render: function() {
	   				this.$el.html(portfolioTemplate);

	   				var that = this;

	   				_.defer(function() {
	   					that.imgLoader();
	   				});
	   			},

	   			imgLoader: function() {
	   				//first time to get images by ajax call
	   				var oRequest = new XMLHttpRequest();
	   				var imageObj = {};
	   				var list = $("#image_container li");
	   				var num = 4;
	   				var numb = 1;
	   				//console.log(list.eq(1));

	   				oRequest.open("get", "./media/js/views/portfolio/image.json", false);
	   				oRequest.setRequestHeader("Content-type", "application/json");

	   				oRequest.onreadystatechange = function() {
	   					if(oRequest.readyState == 4 && oRequest.status == 200) {
	   						imageObj = JSON.parse(oRequest.responseText);
	   					}
	   				}
	   				
	   				oRequest.send(null);

	   				//initialize image, loading 4 images at first time
   					for (var i=0; i<4; i++) {
	   					var imgtmpl = '<img src="' + imageObj[i].after + '" alt="westwood" />';
	   					list.eq(i).append(imgtmpl);
	   					list.eq(i).css({left: i*750+"px"});

	   					//load the first un-constructed image
	   					if(i == 0) {
	   						$("#image_before .showcase").attr("src", imageObj[i].before);
	   					}
	   				}
	   				
	   				this.slide(imageObj, num, list, numb);
	   			},

	   			//automatic slide
	   			slide: function(image, num, list, numb) {
	   				var imgNum = image.length;

					var set = window.setInterval(function() {
						var count = 0;

						list.animate({left: "-=750px"}, 500, "linear", function() {
							//Because ist has 4 elements, the callback function of animate 
							//will execute 4 times. So set a count to let callback function 
							//just execute 1 time.
							count++;
							while(count == 1){
								if(list.eq(0).css("left") == "-750px") {
									
									//remove the first image
									list.eq(0).addClass("remove");
									$(".remove").remove();
									
									//add new image to the lists, 1 image per time
									list.last().after('<li style="left: 2250px;"><img src="' + image[num].after + '" alt="westwood" /></li>');
									num++;
									
									//add new un-constructed image, 1 image per time
									$("#image_before .showcase").attr("src", image[numb].before);
									numb++;
									
									//re-get list array
									list = $("#image_container li");

									//reset num and numb when achive the last image
									if (num == imgNum) {
										num = 0;
									}
									if (numb == imgNum) {
										numb = 0;
									}
								}
								break;
							}
						});
						
						// reset all the images position, work for if loading all images 1 time
						/*if ($("#image_container li").css("left") == "-1500px") {
							window.setTimeout(function() {
								list.animate({left: "+=2250px"}, 500, "linear");
								clearInterval(set);
								slide();
							}, 2000);
						}*/
					}, 5000);
	   			},

	   			spread: function() {
	   				var arrow = ["../westwood/media/images/generic/arrow_down.jpg",
	   							 "../westwood/media/images/generic/arrow_up.jpg"
	   							];

	   				if(this.flag == 1){
	   					$("#image_before .arrow").attr("src", arrow[1]);
	   					this.flag--;
	   				} else {
	   					$("#image_before .arrow").attr("src", arrow[0]);
	   					this.flag++;
	   				}
	   				
	   				$("#image_before .showcase").toggle("fast");;
	   			}

	   		});	

	   		return PortfolioView;
});