jQuery.fn.myslider = function (_options) {
    // defaults options
    var _options = jQuery.extend({
        speed: 2000,
        rotate_speed: 10000,
        pager: false, /* true, false - show pager*/
        navigation: true, /* true, false - skip the navigation left right top bottom*/
        elements_path: '.Relative .absolute td',
        absolute_path: '.Slider .absolute',
        hoverClass: 'active',
        pagerClass: 'pagination',
        placePager: '#PlacePager',
        position: 'left', /* arrow: left-right, top - bottom*/
        elements_one: 247, /* size one element from padding or margin*/
        navigation: '.Slider .Navigation', /* path navigation block*/
        screen: 0
    }, _options);

    return this.each(function () {
        var _THIS = jQuery(this);
        var _el = $(_options.elements_path);
        var _absolute = $(_options.absolute_path);
        var _pager = _options.pager;
        var _block_width = $(".Relative").width();
        var _el_count = $(_el, _THIS).size();
        var _el_pager = $("." + _options.pagerClass);
        var _el_place_pager = $(_options.placePager);
        var _el_count_length = _options.elements_one;
        var _el_navigation = $(_options.navigation);
        var _namePagerClass = _options.pagerClass;
        var _speed = _options.speed;
        var _rotate_speed = _options.rotate_speed;
        var _name_hoverClass = _options.hoverClass;
        var _name_position = _options.position;
        var _screen = _options.screen;
        // set parametrs *******************************************************

        var _findPagerClass = "." + _namePagerClass;
        var $active;
        var InBlock = 4; // number of elements in the block
        //Set Default State of each portfolio piece    	

        // Show or hide navigation
        ShowNavigation = function () {
            //if (_block_width > (_el_count * _el_count_length)) { _el_navigation.hide();}
            //else 
            _el_navigation.show();
        }

        //change the arrows
        ChangeArrow = function () {
            if ($($active).attr("rel") == 1) {
                $("a.ArrowLeft").addClass("last");
                $("a.ArrowRight").removeClass("last");
            }
            else $("a.ArrowRight").removeClass("last");

            if (_screen > 0) {
                if ($($active).attr("rel") == _el_count / _screen) {
                    $("a.ArrowRight").addClass("last");
                    $("a.ArrowLeft").removeClass("last");
                }
                else {
                    if ($($active).attr("rel") != 1) $("a.ArrowLeft").removeClass("last");
                }
            }
            else {
                if ($($active).attr("rel") == _el_count) {
                    $("a.ArrowRight").addClass("last");
                    $("a.ArrowLeft").removeClass("last");
                }
                else {
                    if ($($active).attr("rel") != 1) $("a.ArrowLeft").removeClass("last");
                }
            }

        };

        Pager = function () {
            var NewPager = "<div class='" + _namePagerClass + "'>";
            for (i = 1; i <= _el_count; i++) {
                NewPager = NewPager + "<a href='javascript:void(0)' rel='" + i + "'>" + (i + 1) + "</a>"
            }
            NewPager = NewPager + "</div>";

            _el_place_pager.append(NewPager);
            if (_pager) { $(_findPagerClass).show(); }
            else { $(_findPagerClass).hide(); }

            //alert("sdd="+_el_pager);
            //_el_pager.find("a:first").addClass(_name_hoverClass);    		//First element select			
            $(_findPagerClass).find("a:first").addClass(_name_hoverClass);    		//First element select						
            $active = $(_findPagerClass).find("a:first"); //go back to first					
            ChangeArrow();
        };
        Pager();
        ShowNavigation();

        _absolute.css({ 'width': _block_width * _el_count_length });

        //Paging + Slider Function
        rotate = function () {
            var triggerID = ($active.attr("rel") - 1) * InBlock; //Get number of times to slide			

            $(_findPagerClass).children("a").removeClass(_name_hoverClass); //Remove all active class			
            $active.addClass(_name_hoverClass); //Add active class (the $active is declared in the rotateSwitch function)
            ChangeArrow();

            var i = $(_findPagerClass).children("a." + _name_hoverClass).index();
            $(_el).removeClass(_name_hoverClass);
            $(_el).eq(i).addClass(_name_hoverClass);

            //****highlighted item. Place call external functions********

            //*=============			

            //$(_absolute).animate({ _name_position: - mnoj}, _speed); //Slider Animation									
            //if (_block_width < (_el_count_length*i))
            //{
            var mnoj = triggerID * _el_count_length;
            $(_absolute).animate({ left: -mnoj }, _speed); //Slider Animation
            //}
            //alert(" _block_width="+_block_width+" active="+(_el_count_length*i));
        };

        //Rotation + Timing Event
        rotateSwitch = function () {
            play = setInterval(function () { //Set timer - this will repeat itself every 3 seconds
                $active = _el_pager.find("a." + _name_hoverClass).next();
                if ($active.length === 0) { //If paging reaches the end...
                    $active = _el_pager.find("a:first"); //go back to first					
                }
                rotate(); //Trigger the paging and slider function
            }, _rotate_speed); //Timer speed in milliseconds (3 seconds)
        };

        rotateSwitch(); //Run function on launch		

        //On Hover
        $(_el).hover(function () {
            clearInterval(play); //Stop the rotation        
        }, function () { rotateSwitch(); }); //Resume rotation

        // Context element click
        $(_el).click(function () {
            var i = $(this).index(); _name_hoverClass
            $active = $(_findPagerClass).children("a").eq(i);
            $active.addClass(_name_hoverClass);

            $(_findPagerClass).children("a").removeClass(_name_hoverClass);
            $(_findPagerClass).children("a").eq(i).addClass(_name_hoverClass);

            ChangeArrow();
        });




        //On Click
        $(_findPagerClass + " a").click(function () {
            $active = $(this);
            rotate(); //Trigger rotation immediately		
            rotateSwitch(); // Resume rotation	
        })


        var RightTimeoutId = 0;
        var LeftTimeoutId = 0;
        var _spd = 300;

        $('.ArrowRight').click(function () {
            RightTimeoutId = setTimeout(function () {
                $active = $(_findPagerClass).children(" a." + _name_hoverClass).next();
                if ($("a.ArrowRight").hasClass("last")) { return false; }
                ChangeArrow();

                //Reset Timer
                clearInterval(play); //Stop the rotation		
                rotate(); //Trigger rotation immediately

                rotateSwitch(); // Resume rotation	
                return false;
            }, _spd);
        }).dblclick(function () {
            clearTimeout(RightTimeoutId);
            clearTimeout(RightTimeoutId - 1);

            $active = $(_findPagerClass).children(" a." + _name_hoverClass).next();
            if ($("a.ArrowRight").hasClass("last")) { return false; }
            ChangeArrow();

            //Reset Timer
            clearInterval(play); //Stop the rotation		
            rotate(); //Trigger rotation immediately

            rotateSwitch(); // Resume rotation	
            return false;
        });

        $('.ArrowLeft').click(function () {
            LeftTimeoutId = setTimeout(function () {
                $active = $(_findPagerClass).children("a." + _name_hoverClass).prev();
                if ($("a.ArrowLeft").hasClass("last")) { return false; }
                ChangeArrow();

                //Reset Timer
                clearInterval(play); //Stop the rotation
                rotate(); //Trigger rotation immediately
                rotateSwitch(); // Resume rotation				
                return false; //Prevent browser jump to link anchor	
            }, _spd);
        }).dblclick(function () {
            clearTimeout(LeftTimeoutId);
            clearTimeout(LeftTimeoutId - 1);

            $active = $(_findPagerClass).children("a." + _name_hoverClass).prev();
            if ($("a.ArrowLeft").hasClass("last")) { return false; }
            ChangeArrow();

            //Reset Timer
            clearInterval(play); //Stop the rotation
            rotate(); //Trigger rotation immediately
            rotateSwitch(); // Resume rotation				
            return false; //Prevent browser jump to link anchor	
        });


    });

}
