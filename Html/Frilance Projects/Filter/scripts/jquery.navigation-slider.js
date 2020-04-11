jQuery.fn.navigation_slider = function (_options) {
    // defaults options
    var _options = jQuery.extend({
        _current: ".slider",
        _speed: 800,
        _rotate_speed: 7000,
        _is_pager: false, /* true, false - show pager*/
        _item: '.absolute li',
        _item_length: 169,
        _item_click: true,
        _item_base: '.absolute',
        _hoverClass: 'active',
        _pager_class: 'pagination',
        _pager: '#placepager',
        _position: 'left', /* arrow: left-right, top - bottom*/
        _navigation: '.navigation',
        _big_images: "img.BaseImages",
        _small_images: "img.SmallPhoto",
        _slide: 1,
        _group: 1,
        _border: false,
        _play: true,
        _logic:0
    }, _options);

    return this.each(function () {

        var point = ".";
        var jItem = {
            current: _options._current,
            $current: $(_options._current),
            border: false,
            logic: _options._logic,
            Item: {
                $tag: $(_options._current).find(_options._item),
                tag: _options._item,
                click: _options._item_click,
                count: $(_options._current).find(_options._item).size(),
                length: _options._item_length,
                border: _options._border,
                index: 0,
                InnerSlider: {
                    create: false
                }
            },
            Slide: {
                count: _options._slide,
                group: _options._group
            },
            Animate: {
                $tag: $(_options._current).find(_options._item_base),
                tag: _options._item_base,
                speed: _options._speed,
                rotate: _options._rotate_speed,
                arrowOffSet: 0, /*зміщення картинок*/
                play: _options._play,

                Position: {
                    Left: 0,
                    Top: 0,
                    bool_left: (_options._position == "left") ? true : false,
                    bool_top: (_options._position == "top") ? true : false,
                }
            },
            Photo: {
                small: _options._small_images,
                big: _options._big_images,
                $big: $(_options._current).find(_options._big_images),
                $small: $(_options._current).find(_options._small_Images)
            },
            Navigation: {
                $tag: $(_options._current).find(_options._navigation),
                tag: _options._navigation,
                Pager: {
                    $tag: $(_options._current).find(_options._pager),
                    tag: point + _options._pager_class,
                    create: _options._is_pager,
                    place: $(_options._current).find(_options.placePager)
                }
            },

            InitData: function () {
                var t = this;
                var c = t.$current;
                var o = t.current.substring(1);

                if (!t.Item.border) { t.Item.click = false; }

                c.attr("data-current", t.current);
                c.attr("data-itemlength", t.Item.length);
                c.attr("data-border", t.Item.border);
                c.attr("data-slide", t.Slide.count);
                c.attr("data-group", t.Slide.group);
                c.attr("data-prev-active", 1);
                c.attr("data-speed", t.Animate.speed);
                c.attr("data-arrow-offset", t.Animate.arrowOffSet);
                c.attr("data-big-images", t.Photo.big);
                c.attr("data-small-images", t.Photo.small);
                c.attr("data-item-click", t.Item.click);
                c.attr("data-item", t.Item.tag);
                c.attr("data-absolute", t.Animate.tag);
                c.attr("data-pagerclass", t.Navigation.Pager.tag);
                c.attr("data-position-left", t.Animate.Position.bool_left);
                c.attr("data-position-top", t.Animate.Position.bool_top);
                c.attr("data-logic", t.logic);
                c.attr("data-rotate-speed", t.Animate.rotate);
                
                
                t.Navigation.$tag.attr("data-base", o);
                t.Photo.$big = $(t.Photo.big);

                t.Photo.$small = t.$current.find(t.Item.$tag).filter(":first").find(t.Photo.small);

                c = t.Item.$tag;
                c.parent().attr("data-base", o);

                t.count_item = t.$current.find(t.Item.$tag).size();

                c.eq(0).find(".Text").show();
                c.eq(0).find(".ReadMore").show();
            },

            ReadData: function () {
                var t = this;
                var c = t.$current;

                t.Item.length = c.data("itemlength");
                t.Item.border = c.data("border");
                t.Slide.count = c.data("slide");
                t.Slide.group = c.data("group");
                t.Item.count = t.Item.$tag.size();
                t.Animate.speed = c.data("speed");
                t.Item.click = c.data("item-click");
                t.Item.tag = c.data("item");
                t.Animate.$tag = c.find(c.data("absolute"));
                t.Navigation.Pager.tag = c.data("pagerclass");
                t.Navigation.Pager.$tag = c.find(c.data("pagerclass"));
                t.Photo.big = c.data("big-images");
                t.Photo.$big = $(c.data("big-images"));
                t.Photo.small = c.data("small-images");
                t.Photo.$small = t.Item.$tag.eq(t.Item.index).find(c.data("small-images"));
                t.logic = c.data("logic");
                t.Animate.rotate = c.data("rotate-speed");

                jEvent.prev_active = c.data("prev-active");
                t.Item.offset = c.data("arrow-offset");
                t.Animate.Position.bool_left = c.data("position-left");
                t.Animate.Position.bool_top = c.data("position-top");
            },

            Rotate: function (content) {
                var t = this;
                content = content + "px";

                if (t.Animate.Position.bool_left) {
                    t.Animate.$tag.animate({ "left": content }, t.Animate.speed, function () {
                        var _ = t.Item.$tag.find(point + Active);
                        content = Math.abs(parseInt(t.Animate.$tag.css("left")));
                        t.Animate.Position.Left = content;
                        t.InnerContent(jItem);
                    });
                }
                else
                    if (t.Animate.Position.bool_top) {

                        t.Animate.$tag.animate({ "top": content }, t.Animate.speed, function () {
                            var _ = t.Item.$tag.find(point + Active);
                            content = Math.abs(content);
                            t.Animate.Position.Top = content;                        
                        });
                    }
            },

            InnerContent: function (slider) {
                var t = this;
                var item = slider.Item.$tag.filter("." + Active);
                var object = [item.find(".Text"), item.find(".ReadMore")];
                slider.Item.$tag.find(".Text").hide();
                slider.Item.$tag.find(".ReadMore").hide();

                var offSet = 0;
                if (slider.Animate.Position.bool_left) { offSet = slider.Animate.Position.Left; }
                else if (slider.Animate.Position.bool_top) offSet = slider.Animate.Position.Top;

                
                offSet = offSet + "px";
                object[0].attr("style", "left:" + offSet);
                object[1].attr("style", "left:" + offSet);

                object[0].show();
                object[1].show();

            },

            GetPosition: function () {
                var t = this;
                if (isNaN(t.Animate.Position.Top) || isNaN(t.Animate.Position.Left)) {
                    t.Animate.Position.Top = Math.abs(parseInt(t.Animate.$tag.css("top")));
                    t.Animate.Position.Left = Math.abs(parseInt(t.Animate.$tag.css("left")));
                }
            },

            SaveData: function (off, event) {
                var t = this;
                if (!t.Item.border) { off = off / t.Slide.group }

                if (event == null) { t.Animate.arrowOffSet = Math.floor(off / t.Item.length); }
                else if (!event.RemainderDivision.create) t.Animate.arrowOffSet = Math.floor(off / t.Item.length);
                t.$current.data("arrow-offset", t.Animate.arrowOffSet);
            }
        };

        var jEvent = {
            NAL: jItem.$current.find("a.arrowleft"),
            NAR: jItem.$current.find("a.arrowright"),

            $active: null,
            prev_active: 0,
            index: 0,
            Direction: 0,
            label: 0, //mitka
            label_arrow: false,

            // залишок 
            RemainderDivision: {
                create: false,
                value: 0,
            },

            ChangeArrow: function (o) {
                var t = this;
                var count = null;
                var r = t.$active.attr("rel");
                if (r == 1) t.NAL.addClass(Last);
                if ((r == o.Item.count) || (o.Item.count <= o.Slide.count)) t.NAR.addClass(Last);
                
                if (o.Item.border) {
                    if (r > 1) t.NAL.removeClass(Last);
                    if (r < o.Item.count) t.NAR.removeClass(Last);
                }
                else {
                    i = o.Item.count % o.Slide.group;
                    d = Math.floor(o.Item.count / o.Slide.group);


                    if (o.Item.count % (o.Animate.arrowOffSet * o.Slide.group) == 0 ||
                        ((t.RemainderDivision.create))) {
                        t.NAR.addClass(Last);
                        t.NAL.removeClass(Last);
                    }
                    else
                        if (o.Animate.arrowOffSet == 0 && o.Item.count > o.Slide.group ||
                            (d - o.Animate.arrowOffSet == 1 && i != 0 && !t.RemainderDivision.create)) {
                            t.NAR.removeClass(Last);
                        }

                    if (o.Animate.arrowOffSet != 0) t.NAL.removeClass(Last)
                    if ((o.Animate.arrowOffSet == 0 && !t.RemainderDivision.create)) t.NAL.addClass(Last);
                }

                switch (o.logic) {
                    case 1: {
                        //+1 слайд
                        var current = o.Item.$tag.filter("." + Active).index() + 1;
                        if (o.Item.count > current) { t.NAR.removeClass(Last) } else t.NAR.addClass(Last);
                        if (current > 1) { t.NAL.removeClass(Last); }
                        break;
                    }
                    default: break;
                }
            },

            SaveData: function (o) {
                var c = o.$current;
                c.attr("data-remainderDivision", this.RemainderDivision.value);
            },

            ReadData: function (o) {
                var c = o.$current;
                this.RemainderDivision.create = true;
                this.RemainderDivision.value = c.attr("data-remainderDivision");
            },

            ClickItem: function (o) {
                var th = this;
                var an = o.Animate.$tag;
                var mnoj = 0;
                if (o.Animate.Position.bool_left) {
                    mnoj = isNaN(parseInt(an.css("left"))) ? "0" : Math.abs(parseInt(an.css("left")));
                }
                else
                    if (o.Animate.Position.bool_top) {
                        mnoj = isNaN(parseInt(an.css("top"))) ? "0" : Math.abs(parseInt(an.css("top")));
                    }

                o.Animate.arrowOffSet = Math.abs(mnoj / o.Item.length);
                th.prev_active = th.$active.attr("rel");
                o.$current.data("prev-active", th.prev_active);
                o.$current.data("arrow-offset", o.Animate.arrowOffSet);

                th.SwitchItem(o, "click");
            },

            SwitchItem: function (o, l) {
                var t = this;
                o.GetPosition();
                var li = o.Item.$tag;
                var pn = o.Navigation.Pager.$tag.find("a");
                var i = o.Navigation.Pager.$tag.find(point + Active).index();
                var d = 0;
                var label_arrow = false;
                t.prev_active = t.$active.attr("rel");
                o.$current.data("prev-active", t.prev_active);

                label_arrow = false;
                switch (l) {
                    case "Left": {
                        i = (o.Slide.group > 1) ? i - o.Slide.group : i - 1;
                        break;
                    }
                    case "Right": {
                        i = (o.Slide.group > 1) ? i + o.Slide.group : i + 1;
                        label_arrow = true; break;
                    }
                    case "click": { i = t.index; break; }
                    default: { break; }
                }
                li.removeClass(Active);
                pn.removeClass(Active);
                t.$active = pn.eq(i);

                jVisual.SetBigImages(o, false);

                var off = 0;
                if (o.Animate.Position.bool_left) {
                    off = o.Animate.Position.Left;
                }
                else
                    if (o.Animate.Position.bool_top) {
                        off = o.Animate.Position.Top;
                    }

                t.MDirection();

                switch (o.logic) {
                    case 1: {
                        //Slide+1
                        li.eq(i).addClass(Active);
                        pn.eq(i).addClass(Active);                        

                        switch (l) {
                            case "Right": {

                                var left = Math.abs(parseInt(o.Animate.$tag.css("left")));

                                var offset = left / o.Item.length;
                                if (offset + o.Slide.count < o.Item.count) {
                                    off = left + o.Item.length;
                                } else off = left;

                                
                                break;
                            }
                            case "Left": {
                                var left = Math.abs(parseInt(o.Animate.$tag.css("left")));                                                                
                                if (left > 0) off = left - o.Item.length;

                                break;
                            }
                            default: break;
                        }

                        o.Rotate(-off);
                        o.SaveData(off, null);

                        t.ChangeArrow(o);
                        jItem.InnerContent(o);
                        return;
                    }
                    default: break;
                }

                if (!o.Item.border){
                    clearInterval(play);
                    li.eq(i).addClass(Active);
                    pn.eq(i).addClass(Active);
                    i = t.CalculatePage(o, label_arrow);
                    switch (l) {
                        case "Right": {
                            off += (o.Item.length * i);
                            o.Rotate(-off);
                            o.SaveData(off, t);
                            break;
                        }
                        case "Left": {
                            if (t.RemainderDivision.create) {
                                t.RemainderDivision.create = false;
                            } else i = o.Slide.group;

                            off -= (o.Item.length * i);
                            o.Rotate(-off);
                            o.SaveData(off, t);
                            break;
                        }
                        default: break;
                    }
                }
                t.ChangeArrow(o);
                jItem.InnerContent(o);
            },

            CalculatePage: function (o, a) {
                var t = this;
                var i = o.Item.count % o.Slide.group;
                var d = Math.floor(o.Item.count / o.Slide.group);
                if (d > 1) {
                    if (o.Animate.arrowOffSet == 0) { i = 0; }
                    else i = o.Item.count % o.Slide.group;
                }
                //залишок                    
                if (d - o.Animate.arrowOffSet == 1 && i != 0) {
                    if (a) {
                        t.RemainderDivision.create = true;
                        t.RemainderDivision.value = i;
                    }
                    t.SaveData(o);
                    t.label = true;
                }
                else i = o.Slide.group;

                return i;
            },

            MDirection: function () {
                var t = this;
                var r = t.$active.attr("rel");
                if (t.prev_active < r) { t.Direction = 1; } // right
                else if (t.prev_active == r) { t.Direction = 0; } // none
                else t.Direction = -1; // left
            }
        }

        var jVisual = {

            Navigation: function (o) { o.$tag.show(); },

            SetBigImages: function (o, start) {
                if (start) {
                    o.Photo.$big.attr("src", o.Photo.$small.attr("src"));
                }
                else {
                    var t = o.Item.$tag.find(".SmallText").text();
                    o.Photo.$big.attr("title", t);
                    o.Photo.$big.parent().attr("title", t);
                    o.Photo.$big.attr("src", o.Photo.$small.attr("src"));
                }
                return true;
            },

            Pager: function (obj) {
                var o = obj.current.substring(1);
                var t = obj.Navigation.Pager;

                var NewPager = "<div class='" + obj.Navigation.Pager.tag.substring(1) + "' data-base='" + o + "'>";
                for (i = 1; i <= obj.Item.count; i++) NewPager = NewPager + "<a href='javascript:void(0)' rel='" + i + "'>" + i + "</a>";
                NewPager = NewPager + "</div>";

                t.$tag.append(NewPager);

                if (t.create) { t.$tag.show(); }
                else { t.$tag.hide(); }

                jEvent.$active = t.$tag.find("a").first().addClass(Active);
                obj.Item.$tag.first().addClass(Active);

                jVisual.SetBigImages(obj, true);

                if (obj.Item.border) {
                    jEvent.$active.addClass(Active);
                    obj.Item.$tag.filter(":first").addClass(Active);
                }

                jEvent.ChangeArrow(obj);
            }
        }

        var jInner = {

            IWidth: null,
            ICount: null,
            ISlide: null,
            IArrowOffset: 0,

            VisualizeSlider: function (o) {
                var t = this;
                var inner = o.Item.$tag.find(point + Active).find(".InnerAbsolute");
                var ISl = o.Item.$tag.find(point + Active).find(".InnerSlider");
                var AL = ISl.find("a.AL");
                var AR = ISl.find("a.AR");

                t.IWidth = inner.find("ul li").width();
                t.ICount = inner.find("ul li").size();
                inner.find("ul li").eq(0).addClass(Active);
                t.ISlide = inner.data("slide");
                inner.attr("data-inner-arrow-offset", 0);
                inner.attr("data-repeat", 0);

                AL.addClass(Last);
                if (t.ICount <= t.ISlide) AR.addClass(Last);

                t.IWidth = t.IWidth * t.ICount;
                inner.css("width", t.IWidth);
            },

            ArrowRight: function (o) {
                var inner = $(_Current).find(_options._item + point + Active).find(".InnerAbsolute");
                var ISl = $(_Current).find(_options._item + point + Active).find(".InnerSlider");
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
                ILeft = ILeft + IWidth;
                IArrowOffset = IArrowOffset + 1;
                inner.animate({ left: -ILeft }, _speed, function () { });
                ISl.find("li").removeClass(Active);
                ISl.find("li").eq(IArrowOffset).addClass(Active);

                AL.removeClass(Last);
                if (IArrowOffset + ISlide >= ICount) { AR.addClass(Last); IArrowOffset = ICount - ISlide; }
                inner.data("inner-arrow-offset", IArrowOffset);

            },

            ArrowLeft: function (o) {
                var inner = $(_Current).find(_options._item + point + Active).find(".InnerAbsolute");
                var ISl = $(_Current).find(_options._item + point + Active).find(".InnerSlider");
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
            }
        }

        var Active = _options._hoverClass;
        var Last = "last";
        var play = 0;
        var Click = false;

        jItem.InitData();

        jVisual.Pager(jItem);
        jVisual.Navigation(jItem.Navigation);

        if (jItem.Animate.Position.bool_left) {
            jItem.Animate.$tag.css({ 'width': jItem.Item.length * (jItem.Item.count + 1) });
        }
        else
            if (jItem.Animate.Position.bool_top) {
                jItem.Animate.$tag.css({ 'height': jItem.Item.length * (jItem.Item.count + 1) });
            }

        jInner.VisualizeSlider(jItem);

        jItem.Item.$tag.find("a.inBigImages").bind("click", function () {
            var t = $(this).parent();
            jItem.current = point + t.parent().data("base");
            jItem.$current = $(jItem.current);
            jItem.ReadData();
            
            jEvent.index = t.index();
            jEvent.ClickItem(jItem);            
        })

        //On Click
        jItem.Navigation.Pager.$tag.find("a").bind("click", function () {
            var t = $(this);
            var tp = t.parent();
            var b = "base";
            Click = true;
            jItem.current = point + tp.data(b);
            jItem.$current = $(jItem.current);
            jItem.ReadData();

            jEvent.index = t.index();
            jEvent.ClickItem(jItem);
            Click = false;
        });

        jItem.Item.$tag.find(".innerSlider").find("a.AL").on("click", function () {
            jItem.current = point + t.parent().data("base");
            jItem.$current = $(jItem.current);
            jItem.ReadData();

            jInner.ArrowLeft(jItem);

            return false;
        });
        jItem.Item.$tag.find(".innerSlider").find("a.AR").on("click", function () {
            jInner.ArrowRight(jItem);
            return false;
        });

        rotateSwitch = function (o) {
            play = setInterval(function () {
                console.log("rotateSwitch=" + play + " speed=" + o.Animate.rotate);
                if (!o.Animate.play) return;
                var off = 0;
                var pager = o.Navigation.Pager.$tag;
                var Nav = [o.Navigation.$tag.find(".arrowleft"), o.Navigation.$tag.find(".arrowright")];
                
                

                //------------------
                switch (o.logic) {
                    case 1:
                        {
                            // Slide +1
                            if (Nav[1].hasClass(Last)) {
                                Nav[1].removeClass(Last);
                                Nav[0].addClass(Last);
                                $active = pager.find("a").removeClass(Active).first().addClass(Active);
                                o.Item.$tag.removeClass(Active).first().addClass(Active);
                                o.Rotate(0);
                                return;
                            }
                            else {
                                Nav[0].removeClass(Last);
                                $active = pager.find(point + Active).next();
                                pager.find("a").removeClass(Active).eq($active.index()).addClass(Active);
                                o.Item.$tag.removeClass(Active).eq($active.index()).addClass(Active);
                                if ($active.index() + 1 >= o.Item.count) Nav[1].addClass(Last);
                                var left = Math.abs(parseInt(o.Animate.$tag.css("left")));
                                off -= left + o.Item.length;
                                var offset = left/o.Item.length;
                                if (offset + o.Slide.count < o.Item.count) {
                                    o.Rotate(off);
                                }
                            }

                            jItem.InnerContent(o);

                            return;
                        }                   
                    default: break;
                }

                if (o.Slide.group != 1){
                    var number = (pager.find(point + Active).index() + o.Slide.group);
                    if (pager.find(point + Active).index() + o.Slide.count >= o.Item.count) {
                        if (Nav[1].hasClass(Last)) {
                            o.Rotate(0);
                            $active = pager.find("a").removeClass(Active).first().addClass(Active);
                            o.Item.$tag.removeClass(Active).first().addClass(Active);
                            Nav[0].addClass(Last);
                            Nav[1].removeClass(Last);
                            return;
                        }
                        Nav[1].addClass(Last);
                        return;
                    } else {
                        Nav[0].removeClass(Last);
                    }

                    //ArrowInit($(".arrowleft"), jItem, "right");
                    ArrowInit($(".arrowleft"), o, "right");

                    //jItem.ReadData();
                    if ((number + 1) > o.Item.count) return false;
                    $active = pager.find("a").removeClass(Active).eq(number).addClass(Active);
                    if ($active.index() != 0) off -= $active.index() * o.Item.length;
                    if ($active.index() + 1 + o.Slide.count >= o.Item.count) {
                        Nav[1].addClass(Last);
                    }
                    o.Rotate(off);
                }
            }, o.Animate.rotate); //Timer speed in milliseconds (3 seconds)*/
        };
        
        if (jItem.Animate.play) {
            rotateSwitch(jItem);
            var obj = $(point + jItem.Item.$tag.parent().data("base"));
            obj.hover(function () {
                var t = $(this);
                jItem.current = t.data("current");
                clearInterval(play);

                jItem.$current = $(jItem.current);
                jItem.Animate.play = false;
            }, function () {
                var t = $(this);
                rotateSwitch(jItem);

                jItem.current = t.data("current");
                jItem.$current = $(jItem.current);
                jItem.Animate.play = true;
            })
        }

        jItem.Item.$tag.find("img").bind('click', function (event) {
            var t = $(this);
            var index = t.closest("li").index();
            jItem.current = point + t.closest("ul").data("base");
            jItem.$current = $(jItem.current);
            jItem.Item.index = index;
            jItem.ReadData();
            jItem.Navigation.Pager.$tag.find("a").removeClass(Active).eq(index).addClass(Active);
            jItem.Item.$tag.removeClass(Active).eq(index).addClass(Active);

            jEvent.ChangeArrow(jItem);
        });

        // Item click
        jItem.Item.$tag.bind('click', function (event) {
            var t = $(this);
            var d = "dialog"; // open-dialog
            if (t.data(d) != undefined && t.data(d) != null) $(t.data(d)).addClass(Active);
            jItem.current = point + t.parent().data("base");
            jItem.$current = $(jItem.current);
            jItem.Item.index = t.index();
            jItem.ReadData();
            if (!jItem.Item.click) return true; // No Click;            
            jItem.Navigation.Pager.$tag.find("a").removeClass(Active).eq(t.index()).addClass(Active);
            jItem.Item.$tag.removeClass(Active).eq(t.index()).addClass(Active);

            jEvent.ChangeArrow(jItem);
            return true;
        });

        var RightTimeoutId = 0;
        var LeftTimeoutId = 0;
        var _spd = 300;

        jEvent.NAL.click(function () {
            var t = $(this);
            ArrowInit(t, jItem, "left");
            jItem.ReadData();
            if (t.hasClass(Last)) { return false; }

            jEvent.SwitchItem(jItem, "Left");
            if (jItem.Item.InnerSlider.create) jInner.VisualizeSlider();

            return false;
        }).dblclick(function () {
            return false;
        });

        function ArrowInit(t, o, d) {
            o.current = point + t.parent().data("base");
            o.$current = $(jItem.current);
            var r = 0;
            var i = o.Item.$tag.filter(point + Active).index();
            switch (d) {
                case "left": {
                    if (o.Item.border) {
                        o.Item.index = i - 1;
                    } else o.Item.index = i - o.Slide.group;
                    break;
                }
                case "right": {
                    if (o.Item.border) {
                        o.Item.index = i + 1;
                    } else o.Item.index = i + o.Slide.group;
                    break;
                }
                default: break;
            }
        }

        jEvent.NAR.click(function () {
            var t = $(this);
            ArrowInit(t, jItem, "right");
            jItem.ReadData();

            if (t.hasClass(Last)) { return false; }

            jEvent.SwitchItem(jItem, "Right");            
            if (jItem.Item.InnerSlider.create) jInner.VisualizeSlider();

            return false;
        }).dblclick(function () {
            return false;
        });
    });
}
