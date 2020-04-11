var QuestionCheck = new function() {

    var _current = 1;
    var _currentGroup = 0;

    this.Init = function() {
        QuestionCheck.Reset();

        var g1 = $("#Grid1");
        var g2 = $("#Grid2");
        var f = $(".Field");
        var a = "Active";
        var t = $(".Page.Question1");
        var TitleSpan = $("span[group='Group0']");
        
        TitleSpan.show();
        $(g1).show();
        $(g2).show();

        $(".BlockVariant li").click(function() {
            var t = $(this);
            var group = t.closest('th').data('group');

            if (!$('div[data-group="' + group + '"] .testResults.q' + t.closest('ul').data('q')).is(":visible")) {
                t.closest('ul').find('li').removeClass(a);
                t.addClass(a);
                $(".quiz_buttons .Button").addClass(a);
            }
        });

        $('.linkedTable').bind("click", function () {
            var th = $(this);
            _currentGroup = th.data('group-number');
            if (!th.data("is-link")) return;
            $(t).animate({ left: -1000 }, 300, function () { $(t).css({ left: 1050 }); });
            TitleSpan.hide();
            $(f).hide();
            $("[data-group='Group" + _currentGroup + "']").show();
            $(t).animate({ left: 25 }, 300);
            th.data("is-link", false);
        });
    };

    this.Reset = function(num) {
        $('.param').hide();
        $('.testResults').css('display', 'none');

        $('td, li').removeClass('tdTrue');
        $(".tdFirst .Border").removeClass("true");

        $('.param.q' + _current).show();
        $('.q' + _current + '-grid').addClass('tdTrue');

        $(".quiz_buttons .Button").removeClass("Active");

        var tRes = $('div[data-group="Group' + _currentGroup + '"] .testResults.q' + _current);
        if (tRes.data("is-answered")) {
            tRes.css('display', 'block');
            if (tRes.hasClass(true)) $(".Border").addClass("true");
        } else {
            tRes.css('display', 'none');
            if ($(".BlockVariant .param.q" + _current + " li").hasClass("Active")) $(".quiz_buttons .Button").addClass("Active");
        }
    };

    this.ChangeQuestion = function(next, max) {
        if (next) _current = _current != max ? _current + 1 : 1;
        else _current = _current != 1 ? _current - 1 : max;
        QuestionCheck.Reset();
    };

    this.Check = function () {
        var li = $(".BlockVariant .param.q" + _current + " li.Active");
        var testResults = $('div[data-group="Group' + _currentGroup + '"] .testResults.q' + _current);

        if (li.length == 0) return;

        testResults.css('display', 'block');

        $(".quiz_buttons .Button").removeClass("Active");

        if (li.data('is-correct')) {
            testResults.addClass("true");
            $(".tdFirst .Border").addClass("true");
        } else {
            testResults.addClass("false");
        }

        testResults.data("is-answered", true);
    };

    this.TryAgain = function () {
        var tRes = $('div[data-group="Group' + _currentGroup + '"] .testResults.q' + _current);
        tRes.data("is-answered", "");
        tRes.removeClass('true');
        tRes.removeClass('false');
        $(".BlockVariant .param.q" + _current + " li").removeClass("Active");
        QuestionCheck.Reset();
    };

    this.GetValues = function() {
        var obj = { group: _currentGroup, result: [] };

        for (var i = 1; i <= (_currentGroup == 1 ? 3 : 2) ; i++) {
            var activeLi = $('th[data-group="Group' + _currentGroup + '"] .BlockVariant .param.q' + i + ' li.Active');

            var answer = activeLi != null ? activeLi.data('var') : '';
            var isCorrect = activeLi != null ? activeLi.data('is-correct') : false;

            obj.result.push({ isAnswered: $('div[data-group="Group' + _currentGroup + '"] .testResults.q' + i).data("is-answered"), answer: answer, isCorrect: isCorrect });
        }

        var arrJSON = JSON.stringify(obj);
        return encodeURIComponent(arrJSON);
    };

    this.RestoreState = function(JSONstring) {
        if (JSONstring == null || JSONstring == '') return;

        try {
            var obj = $.parseJSON(decodeURIComponent(JSONstring));
            
            _currentGroup = obj.group;
            
            for (var i = 0; i < (_currentGroup == 1 ? 3 : 2) ; i++) {
                if (!obj.result[i].isAnswered) continue;

                _current = i + 1;

                $('th[data-group="Group' + _currentGroup + '"] .BlockVariant .param.q' + _current + ' li[data-var="' + obj.result[i].answer + '"]').addClass('Active');
                QuestionCheck.Check();
            }
            
            $("span[group='Group0']").hide();
            $(".Field").hide();
            $("[data-group='Group" + _currentGroup + "']").show();
            $('td[data-is-link]').data("is-link", false);

            _current = 1;
            QuestionCheck.Reset();

        } catch(e) {
        }
    };
}