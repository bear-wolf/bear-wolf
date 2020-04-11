$(function() {

    setToggleInputs();

    $('.Slider').myslider();

    $("#Language , #Input").hide();
    $(".Footer ul li:last").addClass("last");

    //$(".Towns td:first").addClass("active");

    LoadSliderBedrooms();
    MyFind();

    $(".IconDate").datepicker();
    $(".datepicker").datepicker();
    //$(".datepicker").datepicker("option", "dateFormat", "d M, y");
    //$(".IconDate").datepicker("option", "dateFormat", "d M, y");	        

    $(".Language").click(function() {
        if ($("#Language").css("display") == "none") {
            $("#Language").show("slow");
        }
        else $("#Language").hide("slow");
    });

    $(".Input").click(function() {
        if ($("#Input").css("display") == "none") {
            $("#Input").show("slow");
        }
        else $("#Input").hide("slow");
    });

    FindTowns();

    $(".MetroForms a.close").click(function() {
        $(".MetroForms").hide();
    })
    $(".InMetro th.metro").click(function() {
        $(".MetroForms").show();
    })

})

function FindTowns() {
    $(".Towns.Finds td").click(function() {
        $(".Towns.Finds td").removeClass("active");
        $(this).addClass("active");
        var element = $(this).attr("idElement");

        $(".FindBlock").show();
        $(".FindBlock .hide").hide();
        $(".FindBlock #" + element).show();
    });
}
function CloseDescription(element) {
    var el = $(element).attr("idElement");
    $("#" + el).hide();
    $(element).hide();
    $(".operation .link .show").show();
}

function ClickDescription(element) {
    var el = $(element).hasClass("hide");
    if (el == "false") {
        el = $(element).attr("idElement");
        $("#" + el).hide();
        $(element).removeClass("hide");
    }
    else {
        el = $(element).attr("idElement");
        $("#" + el).show();
        $(element).hide();
        $(".operation .link .hide").show();
     }
    
}

function setToggleInputs() {

    jQuery("[class*='toggle-inputs']").each(function (i) {
        var defaultValue = jQuery(this).val();

        jQuery(this).bind("click", function () {
            if (jQuery(this).val() == defaultValue) {
                jQuery(this).val('');
            }
        });

        jQuery(this).bind("focus", function () {
            if (jQuery(this).val() == defaultValue) {
                jQuery(this).val('');
            }
        });

        jQuery(this).bind("blur", function () {
            if (jQuery(this).val() == '') {
                jQuery(this).val(defaultValue);
            }
        });

    });

    return true;
}

function MyFind() {
    var bed1 = Number($("#MyFind_MinValue").val()) * 6;
    var bed2 = Number($("#MyFind_MaxValue").val()) * 6;

    bed1 = bed1 == bed2 ? Number(bed1) - 3 : bed1;


    $("#NewFindTown").val(bed1 + ";" + bed2);
    jQuery("#NewFindTown").slider({
        from: 0,
        to: 144,
        step: 6,
        skin: 'blue',
        limits: false,
        value: bed1 + ";" + bed2,
        calculate: function (value) {
            return value > 138 ? "00:00" : Math.round(value / 6) + ":00";
        },
        onstatechange: function (value) {
            var vs = value.split(";");
            var value1 = $.trim(vs[0]);
            var value2 = $.trim(vs[1]);
            $("#MyFind_MinValue").val(Math.round(Number(value1 / 6)));
            $("#MyFind_MaxValue").val(Math.round(Number(value2 / 6)));
        },
        callback: function (value) {
            //$('#hdnPage').val(1);
            //SearchByFilter();
        }
    });
}

function LoadSliderBedrooms() {
    var bed1 = Number($("#BedroomsRange_MinValue").val()) * 6;
    var bed2 = Number($("#BedroomsRange_MaxValue").val()) * 6;

    bed1 = bed1 == bed2 ? Number(bed1) - 3 : bed1;


    $("#amountBedrooms").val(bed1 + ";" + bed2);
    jQuery("#amountBedrooms").slider({
        from: 0,
        to: 144,
        step: 6,
        skin: 'blue',
        limits: false,
        value: bed1 + ";" + bed2,
        calculate: function (value) {
            return value > 138 ? "00:00" : Math.round(value / 6) + ":00";
        },
        onstatechange: function (value) {
            var vs = value.split(";");
            var value1 = $.trim(vs[0]);
            var value2 = $.trim(vs[1]);
            $("#BedroomsRange_MinValue").val(Math.round(Number(value1 / 6)));
            $("#BedroomsRange_MaxValue").val(Math.round(Number(value2 / 6)));
        },
        callback: function (value) {
            //$('#hdnPage').val(1);
            //SearchByFilter();
        }
    });
}