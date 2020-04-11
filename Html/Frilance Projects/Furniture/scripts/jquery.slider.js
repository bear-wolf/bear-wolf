jQuery.fn.slider = function (_options) {
    // defaults options
    var _options = jQuery.extend({
        Current: ".Slider",
        speed: 2000,
        rotate_speed: 10000,
        pager: false, /* true, false - show pager*/
        elements_path: '.absolute li',
        absolute_path: '.absolute',
        hoverClass: 'Active',
        pagerClass: 'pagination',
        placePager: '#PlacePager',
        position: 'Left', /* arrow: left-right, top - bottom*/
        elements_one: 169, /* size one element from padding or margin*/
        navigation: '.Slider .Navigation',
        BigImages: "img.BaseImages",
        SmallImages: "img.SmallPhoto",
        screen: 1,
        slide: 1,
        ItemClick: false,
        group: false,
        border: false
    }, _options);

    return this.each(function () {
        var _THIS = jQuery(this);
        var _Current = _options.Current;
        var _el = $(_options.elements_path);
        var _absolute = $(_options.absolute_path);
        var _pager = _options.pager;        
        var _block_width = $(_Current).find(".Relative").find(_options.elements_path).width();
        var Count = null;
        var _el_pager = $("." + _options.pagerClass);
        var _el_place_pager = $(_options.placePager);
        var _el_count_length = _options.elements_one;
        var _el_navigation = $(_options.navigation);
        var PagerClass = _options.pagerClass;
        var _speed = _options.speed;
        var _rotate_speed = _options.rotate_speed;
        var Active = _options.hoverClass;
        var _name_position = _options.position;
        var _screen = _options.screen;
        var _slide = _options.slide;
        var BigImage = _options.BigImages;
        var SmallImage = _options.SmallImages;
        var _border = _options.border;
        var _group = _options.group;
        var _ItemClick = _options.ItemClick;
        // set parametrs *******************************************************
        

        var _findPagerClass = "." + PagerClass;
        var $active;
        var Last = "Last";
        var NAL = $(_Current + " a.ArrowLeft");
        var NAR = $(_Current + " a.ArrowRight");
        var play = 0;
        var Click = false;
        var CurrentGroup = 1;
        var All = null;
        var PrevActive;
        var point = ".";
        var ArrowOffset = 0;
        var CurrentPosition = -1;

        //Inner Slider
        var  IWidth = null,
             ICount = null,
             ISlide = null,
             IArrowOffset = 0;

        InitSlider = function () {
            var c = $(_Current);
            c.attr("data-itemlength", _el_count_length);
            c.attr("data-border", _border);
            c.attr("data-slide", _slide);
            c.attr("data-group", _group);
            c.attr("data-prev-active", 1);
            c.attr("data-speed", _speed);
            c.attr("data-click-lock", "-1 -1");
            c.attr("data-arrow-offset", ArrowOffset);
            c.attr("data-big-images", BigImage);
            c.attr("data-small-images", SmallImage);
            c.attr("data-item-click", _ItemClick);
            c.attr("data-item", _options.elements_path);
            c.attr("data-absolute", _options.absolute_path);
            
            var o = _Current.substring(1);
            c.find(_el_navigation).attr("data-base", o);
            c = $(_Current).find(_el);
            c.parent().attr("data-base", o);

            Count = $(_Current).find(_options.elements_path).size();

            c.eq(0).find(".Text").show();
            c.eq(0).find(".ReadMore").show();
            c.eq(0).addClass(Active);

        };

        ReadData = function (c) {
            _Current = c;
            _el_count_length = $(c).data("itemlength");
            _border = $(c).data("border");
            _slide = $(c).data("slide");
            _group = $(c).data("group");
            All = $(c).find(_el).size();
            _speed = $(c).data("speed");
            BigImage = $(c).data("big-images");
            SmallImage = $(c).data("small-images");
            _ItemClick = $(c).data("item-click");            
            _el = $(c).data("item");
            _absolute = $($(c).data("absolute"));

            PrevActive = $(c).data("prev-active");
            ArrowOffset = $(c).data("arrow-offset");            
        };

        SaveData = function (n) {
            $(_Current).data("arrow-offset", n);
        };

        ShowNavigation = function () {
            _el_navigation.show();
        };
        
        InitSlider();
        ReadData(_Current);

        ChangeArrow = function (c, $active) {
            var AL = $(c).find("a.ArrowLeft");
            var AR = $(c).find("a.ArrowRight");
            var count = null;
            ArrowOffset = $(_Current).data("arrow-offset");

            if (_border) {
                if ($active.attr("rel") == 1) AL.addClass(Last);
                if ($active.attr("rel") == All) AR.addClass(Last);
                if ($active.attr("rel") > 1) AL.removeClass(Last);
                if ($active.attr("rel") < All) AR.removeClass(Last);
            }
            else {
                if (ArrowOffset == 0) AL.addClass(Last);
                if (ArrowOffset > 0) AL.removeClass(Last);
                if ((All - _slide) == ArrowOffset) { AR.addClass(Last); }
                else AR.removeClass(Last);

                if (ArrowOffset + _slide == All) AR.addClass(Last);
                if (_slide == All) {
                    AR.addClass(Last);
                    AL.addClass(Last);
                }               
            }
        };

        Pager = function () {
            var o = _Current.substring(1);
            var NewPager = "<div class='" + PagerClass + "' data-base='" + o + "'>";
            for (i = 1; i <= Count; i++) {
                NewPager = NewPager + "<a href='javascript:void(0)' rel='" + i + "'>" + i + "</a>"
            }
            NewPager = NewPager + "</div>";

            $(_Current).find(_el_place_pager).append(NewPager);
            if (_pager) { $(_Current).find(_findPagerClass).show(); }
            else { $(_Current).find(_findPagerClass).hide(); }

            $(_Current).find(_findPagerClass).find("a:first").addClass(Active);    		//First element select						
            $active = $(_Current).find(_findPagerClass).find("a:first"); //go back to first					
            ChangeArrow(_Current, $active);
        };

        Pager();
        ShowNavigation();        
        _absolute.css({ 'width': _block_width * _el_count_length });

        InnerSlider = function () {            
            var inner = $(_Current).find(_options.elements_path + point + Active).find(".InnerAbsolute");
            var ISl = $(_Current).find(_options.elements_path + point + Active).find(".InnerSlider");
            
            IWidth = inner.find("ul li").width();
            ICount = inner.find("ul li").size();
            inner.find("ul li").eq(0).addClass(Active);
            ISlide = inner.data("slide");
            inner.attr("data-inner-arrow-offset", 0);
            inner.attr("data-repeat",0);

            var AL = ISl.find("a.AL");
            var AR = ISl.find("a.AR");

            AL.addClass(Last);
            if (ICount <= ISlide) AR.addClass(Last);

            IWidth = IWidth * ICount;
            inner.css("width", IWidth);
        }

        SetBigImages = function (c, start) {
            if (start) {
                $(BigImage).attr("src", $(c).find(SmallImage).attr("src"));
            }
            else {
                var t = c.find(".SmallText").text();                
                $(BigImage).attr("title", t);
                $(BigImage).parent().attr("title", t);
                $(BigImage).attr("src", c.find(SmallImage).attr("src"));
            }
            return true;
        }

        InnerSlider();
        SetBigImages(_Current,true);
        
        $(_Current).find(_options.elements_path).find("a.inBigImages").bind("click", function () {
            _Current = $(point + $(this).parent().parent().data("base"));
            ReadData(_Current);
            ClickItem(_Current, $(this).parent());
        });

        //On Click
        $(_Current).find(".pagination a").bind("click", function () {            
            var t = $(this);
            var tp = t.parent();
            var b = "base";
            Click = true;
            _Current = point + tp.data(b);
            ReadData(_Current);
            ClickItem(_Current, t);
            Click = false;
        });

        $(_Current).find(_options.elements_path).find(".InnerSlider").find("a.AL").on("click", function () {            
            var inner = $(_Current).find(_options.elements_path + point + Active).find(".InnerAbsolute");
            var ISl = $(_Current).find(_options.elements_path + point + Active).find(".InnerSlider");
            var AL = ISl.find("a.AL");
            var AR = ISl.find("a.AR");
            IWidth = inner.find("ul li").width();
            ICount = inner.find("ul li").size();
            ISlide = inner.data("slide");
            IArrowOffset = inner.data("inner-arrow-offset");
            var ILeft = 0;
            ILeft = parseInt(inner.css("left"));
            ILeft = Math.abs(ILeft);
            if (ILeft != 0) IArrowOffset = Math.abs(ILeft / IWidth);
            ILeft = ILeft - IWidth;
            IArrowOffset = IArrowOffset - 1;            
            inner.animate({ left: -ILeft }, _speed, function () { });
            ISl.find("li").removeClass(Active);
            ISl.find("li").eq(IArrowOffset).addClass(Active);

            AR.removeClass(Last);
            if (IArrowOffset <= 0) { AL.addClass(Last); IArrowOffset = 0; }
            inner.data("inner-arrow-offset", IArrowOffset);

            return false;
        });
        $(_Current).find(_options.elements_path).find(".InnerSlider").find("a.AR").on("click", function () {
            var inner = $(_Current).find(_options.elements_path + point + Active).find(".InnerAbsolute");
            var ISl = $(_Current).find(_options.elements_path + point + Active).find(".InnerSlider");
            var AL = ISl.find("a.AL");
            var AR = ISl.find("a.AR");            

            IWidth = inner.find("ul li").width();
            ICount = inner.find("ul li").size();
            ISlide = inner.data("slide");
            IArrowOffset = inner.data("inner-arrow-offset");

            var ILeft = 0;
            ILeft = parseInt(inner.css("left"));
            ILeft = Math.abs(ILeft);
            if (ILeft != 0) IArrowOffset = Math.abs(ILeft / IWidth);
            ILeft = ILeft+IWidth;
            IArrowOffset = IArrowOffset + 1;            
            inner.animate({ left: -ILeft }, _speed, function () { });            
            ISl.find("li").removeClass(Active);
            ISl.find("li").eq(IArrowOffset).addClass(Active);

            AL.removeClass(Last);
            if (IArrowOffset + ISlide >= ICount) { AR.addClass(Last); IArrowOffset = ICount - ISlide;}
            inner.data("inner-arrow-offset", IArrowOffset);

            return false;
        });
        
        function rotate(Current, $active) {
            ReadData(Current);
            var ActBlock = $(Current).find(_absolute);
            var triggerID = ($active.attr("rel") - 1) * _screen;
            var mnoj = isNaN(parseInt(ActBlock.css("left"))) ? "0" : parseInt(ActBlock.css("left"));
            var Direction = 0;
            var delta = 1;
            if (mnoj < 0) ArrowOffset = Math.abs(mnoj) / ActBlock.find("li").width();

            if (_border) {
                if (parseInt(PrevActive) < $active.attr("rel")) { Direction = 1; }
                else if (PrevActive == $active.attr("rel")) { Direction = 0; }
                else Direction = -1;
                ChangeArrow($(_Current), $active);
                //if ($active.attr("rel") >= All) { return; }
                if ($active.attr("rel") > All) { return; }                
                if (isNaN(mnoj)) mnoj = 0;
                                
                if (Direction < 0) {
                    if (mnoj == 0) return;
                    if (Click) delta = PrevActive - $active.attr("rel");
                    mnoj = Math.abs(mnoj) - delta*_el_count_length;
                }
                else {
                    if ($active.attr("rel") >= _slide) {
                        if (Click) delta = $active.attr("rel") - PrevActive;
                        if (ArrowOffset + 1 >= All) return;
                        if (Direction > 0) mnoj = Math.abs(mnoj) + delta*_el_count_length;
                    }

                    if (parseInt(ActBlock.css("left")) != -mnoj) {
                        ActBlock.find(".Text").hide();
                        ActBlock.find(".ReadMore").hide();
                    }
                }
                PrevActive = $active.attr("rel");
            }
            else {
                mnoj = triggerID * _el_count_length;
                if (ArrowOffset + _slide > All) return;
                //if ($active.attr("rel") == All) { return; }
            }        
            if ($active.attr("rel") == All && !Click) return;
            
            ActBlock.animate({ left: -mnoj }, _speed, function () {
                var el = ActBlock.find(point + Active);
                el.find(".Text").css("eft", mnoj);
                el.find(".ReadMore").css("Left", mnoj + 20);
                el.find(".Text").show();
                el.find(".ReadMore").show();
            });
        };

        rotateSwitch = function (_Current) {
            play = setInterval(function () { //Set timer - this will repeat itself every 3 seconds
                $active = $(_Current).find("a." + Active).next();
                if ($active.length === 0) { //If paging reaches the end...
                    $active = _el_pager.find("a:first"); //go back to first					
                }
                rotate(_Current, $active); //Trigger the paging and slider function
            }, _rotate_speed); //Timer speed in milliseconds (3 seconds)*/
        };

        //rotateSwitch(_Current); //Run function on launch		

        // Context element click
        $(_Current).find(_el).bind('click', function (event) {
            var t = $(this);
            var d = "dialog";
            if (t.data(d) != undefined && t.data(d) != null) $(t.data(d)).addClass(Active);            
            _Current = point + t.parent().data("base");
            ReadData(_Current);
            //if (!_ItemClick) return true;// No Click;            
            ClickItem(_Current,t);
            return true;
        });

        function ClickItem(c, t) {
            var ActBlock = $(c).find(_options.absolute_path);
            var mnoj = isNaN(parseInt(ActBlock.css("left"))) ? "0" : parseInt(ActBlock.css("left"));
            ArrowOffset = Math.abs(mnoj / _el_count_length);            
            PrevActive = $active.attr("rel");
            $(c).data("prev-active", PrevActive);
            $(c).data("arrow-offset", ArrowOffset);
            ActiveNext(t, $(c), t.index());
        };

        function ActiveNext(t, Current, i) {
            var pn = Current.find(".pagination a");
            var li = Current.find(_el);
            ChangeArrow(Current, $active);
            if (_border) {
                CurrentPosition = i;
                li.find(".Text").hide();
                li.find(".ReadMore").hide();

                li.removeClass(Active);
                pn.removeClass(Active);
                pn.eq(i).addClass(Active);
                li.eq(i).addClass(Active);
                t.addClass(Active);
                var l = Math.abs(parseInt($(Current).find(_absolute).css("left")));

                t.find(".Text").css("Left", l);
                t.find(".ReadMore").css("Left", l + 20);
                t.find(".Text").show();
                t.find(".ReadMore").show();
                $active = Current.find(".pagination a." + Active);
                if ($active.attr("rel") == PrevActive) return;
                rotate(Current, $active);
                SetBigImages(li.filter(point + Active),false);
            }
            else {
                if (All == _slide) return;
                SetBigImages(li,false);
            }
        }

        var RightTimeoutId = 0;
        var LeftTimeoutId = 0;
        var _spd = 300;

        ImplementationOffset = function (l) {            
            var current = $(_Current);
            var el = current.find(_findPagerClass).children("a." + Active);
            var cur = current.find(_el);
            var pn = current.find(".pagination a");            
            var i = null;
            PrevActive = $active.attr("rel");
            $(_Current).data("prev-active", PrevActive);
            switch (l) {
                case "Left": {
                    i = current.find(_el).filter(point + Active).index() - 1;
                    cur.removeClass(Active);
                    cur = cur.eq(parseInt(el.attr("rel")) - 2);
                    break;
                }
                case "Right": {
                    i = current.find(_el).filter(point + Active).index() + 1;
                    cur.removeClass(Active);
                    cur = cur.eq(parseInt(el.attr("rel")));
                    break;
                }
                default: break;
            }

            cur.addClass(Active);
            pn.removeClass(Active);
            $active = pn.eq(i);
            $active.addClass(Active);            

            SetBigImages(cur,false);

            if (_border) { ActiveNext(cur, $(_Current), cur.index()); }
            else
            {
                ChangeArrow(_Current, $active);
                clearInterval(play);
                rotate(_Current, $active);
                //rotateSwitch(_Current); // Resume rotation				
            }
            return;
        }
       
        $(NAL).click(function () {
            var t = $(this);
            ReadData(point + t.parent().data("base"));            
            if (t.hasClass(Last)) { return false; }
            ArrowOffset--;
            SaveData(ArrowOffset);
            ImplementationOffset("Left");
            InnerSlider();
            return false;            
        }).dblclick(function () {
            return false;
        });

        $(NAR).click(function () {
            var t = $(this);
            ReadData(point + t.parent().data("base"));
            
            if (t.hasClass(Last)) { return false; }
                ArrowOffset++;
                SaveData(ArrowOffset);
                ImplementationOffset("Right");
                InnerSlider();
                return false;            
        }).dblclick(function () {
            return false;
        });
    });
}

