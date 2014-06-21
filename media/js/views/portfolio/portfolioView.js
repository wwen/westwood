/**
* About View
* Author:       Will Wang
* Description:  About us information
* Date:         06/09/2014
**/

define(['jquery',
        'underscore',
        'backbone',
        'text!templates/portfolio/portfolioTmpl.html',
        'text!templates/portfolio/imgpopupTmpl.html',
        'text!templates/portfolio/pagecoverTmpl.html'
       ], function($, _, Backbone, portfolioTemplate, imgpopupTemplate, pagecoverTemplate) {

            var PortfolioView = Backbone.View.extend({
                tagName: 'div',
                id: 'portfolio_content',
                flag: 1,


                events: {
                    "click #image_before": "spread",
                    "click #thumbnail": "showAll",
                    "click #close_showall": "showGallery"
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
                    var imgNum = 0;
                    var that = this;

                    oRequest.open("get", "./media/js/views/portfolio/image.json", false);
                    oRequest.setRequestHeader("Content-type", "application/json");

                    oRequest.onreadystatechange = function() {
                        if(oRequest.readyState == 4 && oRequest.status == 200) {
                            imageObj = JSON.parse(oRequest.responseText);
                        }
                    }
                    
                    oRequest.send(null);

                    var portfolioActive = $(".folio-list-active");
                    var showallActive = $(".list-active");

                    for (var y in imageObj) {
                        if (y === portfolioActive.html()) {

                            //initialize image, loading 4 images at first time
                            for (var i=0; i<4; i++) {
                                var imgtmpl = '<img src="' + imageObj[y][i].after + '" alt="westwood" />';
                                list.eq(i).html(imgtmpl);
                                list.eq(i).css({left: i*750+"px"});

                                //load the first un-constructed image
                                if(i == 0) {
                                    $("#image_before .showcase").attr("src", imageObj[y][i].before);
                                }
                            }

                            imgNum = imageObj[y].length;
                            this.slide(imageObj[y], num, list, numb, imgNum);

                            for (var a=0; a<imgNum; a++) {
                                $("#showall .thumbnail").append('<img class="showall_image" src="' + imageObj[y][a].after + '" alt="westwood" />');
                            }
                            $("#showall .thumbnail").append('<div class="clearfix"></div>');
                        }
                    }

                    //changing the catagary
                    $("#portfolio_content > #sidebar").on("click", "li", imageObj, function(e) {
                        if (!e.target.className) {
                            list.trigger('stopslide');
                            list = $("#image_container li");

                            list.off('stopslide');
                            $("#prev").off("click");
                            $("#next").off("click");
                            $("#stop").off("click");
                            $("#play").off("click");

                            portfolioActive = $(".folio-list-active");
                            portfolioActive.removeClass("folio-list-active");
                            e.target.setAttribute("class", "folio-list-active");

                            showallActive = $(".list-active");
                            showallActive.removeClass("list-active");
                            for (var c=0; c < $("#showall #sidebar li a").length; c++) {
                                if ($("#showall #sidebar li a").eq(c).html() === e.target.innerHTML) {
                                    $("#showall #sidebar li a").eq(c).addClass("list-active");
                                }
                            }

                            for (var z in imageObj) {
                                if (z === e.target.innerHTML) {
                                    for (var j=0; j<4; j++) {
                                        var imgtmpl = '<img src="' + imageObj[z][j].after + '" alt="westwood" />';
                                        list.eq(j).html(imgtmpl);
                                        list.eq(j).css({left: j*750+"px"});

                                        //load the first un-constructed image
                                        if(j == 0) {
                                            $("#image_before .showcase").attr("src", imageObj[z][j].before);
                                        }
                                    }
                                    
                                    imgNum = imageObj[z].length;
                                    that.slide(imageObj[z], num, list, numb, imgNum);

                                    $("#showall .thumbnail").html("");
                                    for (var b=0; b<imgNum; b++) {
                                        $("#showall .thumbnail").append('<img class="showall_image" src="' + imageObj[z][b].after + '" alt="westwood" />');
                                    }
                                    $("#showall .thumbnail").append('<div class="clearfix"></div>');
                                }
                            }
                        }
                    });

                    //changing the showall catagary
                    $("#showall #sidebar ul").on("click", "li", imageObj, function(e) {
                        if (!e.target.className) {
                            showallActive = $(".list-active");
                            showallActive.removeClass("list-active");
                            e.target.setAttribute("class", "list-active");

                            for (var d in imageObj) {
                                if (d === e.target.innerHTML) {
                                    imgNum = imageObj[d].length;
                                    $("#showall .thumbnail").html("");
                                    for (var f=0; f<imgNum; f++) {
                                        $("#showall .thumbnail").append('<img class="showall_image" src="' + imageObj[d][f].after + '" alt="westwood" />');
                                    }
                                    $("#showall .thumbnail").append('<div class="clearfix"></div>');
                                }
                            }
                        }
                    });

                    $("#showall .thumbnail").on("click", "img", function(e) {
                        that.$el.append(pagecoverTemplate);
                        $("#pagecover").append(imgpopupTemplate);
                        
                        

                        $("#popup").append('<img src="..' + e.currentTarget.src.slice(16) +'" alt="westernwood">');
                       
                        $("#close_popup").click(function() {
                            $("#popup").remove();
                            $("#pagecover").remove();
                        }); 
                    });
                },

                //slide
                slide: function(image, num, list, numb, imgNum) {
                    var autoMoveleft = function() {
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
                                    list.eq(0).removeClass("remove");
                                    
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
                    };

                    var set = window.setInterval(autoMoveleft, 4000);


                    _.extend(list, Backbone.Events);                    
                    list.on('stopslide', function() {
                        window.clearInterval(set);
                    });
                    
                    //we can't get and use the value returned by a callback function
                    //so need a nother funtion and pass a function as parameter
                    //the passed function will excute the function that need the to use
                    //the value, that is why we bind play.click event in the parameter function
                    $("#stop").on('click', function(){
                       window.clearInterval(set);
                       set = null;
                    });
                    
                    $("#play").click(function() {
                        if(!set) {
                            set = window.setInterval(autoMoveleft, 4000);
                        }
                    });

                    //manually move image to left
                    $("#prev").click(function() {
                        clearInterval(set);

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
                        
                        set = window.setInterval(autoMoveleft, 4000);
                    });
                    
                    //manually move image to right
                    $("#next").click(function() {
                        clearInterval(set);

                        var count = 0;

                        list.last().remove();

                        if (num >= 0 && num<=4) {
                            list.first().before('<li style="left: -750px;"><img src="' + image[num+imgNum-5].after + '" alt="westwood" /></li>');
                            num--;
                        } else {
                            list.first().before('<li style="left: -750px;"><img src="' + image[num-5].after + '" alt="westwood" /></li>');       
                            num--;
                        }

                        if (num == -1) {
                            num = imgNum - 1;
                        }

                        list = $("#image_container li");

                        list.animate({left: "+=750px"}, 500, "linear", function() {
                            count++;
                            while (count == 1) {
                                if (numb == 1) {
                                    $("#image_before .showcase").attr("src", image[imgNum-1].before);
                                    numb--;
                                } else if (numb == 0) {
                                    numb = imgNum;
                                    $("#image_before .showcase").attr("src", image[numb-2].before);
                                    numb--;
                                } else {
                                    $("#image_before .showcase").attr("src", image[numb-2].before);
                                    numb--;
                                }
                                
                                break;
                            }
                        });

                        set =window.setInterval(autoMoveleft, 4000);
                    });
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
                },

                showAll: function() {
                    $("#image_gallery #showall").css({"z-index": "0"});
                },

                showGallery: function() {
                    $("#image_gallery #showall").css({"z-index": "-1"});
                },

                clearSet: function() {
                    window.clearInterval(set);
                }
            }); 

            return PortfolioView;
});