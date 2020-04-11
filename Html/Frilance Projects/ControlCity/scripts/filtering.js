$(function () {
    restore();
    $.datepicker.setDefaults(
    $.extend(
    $.datepicker.regional['ua']
   
  )

);
    function restore() {
        var o = getState();
        if (o != null && o != "undefined" && o != "")
        {
            _.each(o.SelectedCategories, function (element, index, list) {
                var i = $("input[data-name='SelectedCategories'][data-id='" + element + "']")
                $("input[data-name='SelectedCategories'][data-id='" + element + "']").attr('checked', true)
            })
            _.each(o.SelectedStatuses, function (element, index, list) {
                var i = $("input[data-name='SelectedStatuses'][data-id='" + element + "']")
                $("input[data-name='SelectedStatuses'][data-id='" + statusToString(element) + "']").attr('checked', true)
            })
            _.each(o.SelectedTypes, function (element, index, list) {
                var i = $("input[data-name='SelectedTypes'][data-id='" + element + "']")
                $("input[data-name='SelectedTypes'][data-id='" + element + "']").attr('checked', true)
            })
            $("input[name='Edited'][value='" + o.Edited + "']").attr('checked', true)
            $("#from").attr('value', o.StartDate)
            $("#to").attr('value', o.EndDate)
            $("#EndDate").attr('value', o.EndDate)
            $("#StartDate").attr('value', o.StartDate)
            $("[name='Search']").attr('value',o.Search)
        }
       
    }
    function statusToString(num) {
        if (num==0)
        {
            return "New"
        }
        else if (num==1)
        {
            return "Rejected"
        }
        else if (num==2)
        {
            return "InProgress"
        }
        else return "Done"
    }
    /*$(document).on('change', '#Status', function (e) {
        var S = getState();
        S.Status = this.value;
        $("div.paging-sorting-update>input[type=hidden]").attr("data-paging-sorting-state", JSON.stringify(S));
    })*/
    $(document).on('change', '.watched', function (e) {
        if (this.checked) {
           // $(".watched").attr('checked', false)
           // $(this).attr('checked', true)
            var o = getState();
            o.Edited = $(this).attr('data-id')
            setState(o)
        }
        else {
            var o = getState();
            o.Edited = 3;
            setState(o)
        }
    })
    $(document).on('click', '#reset-calendar', function (e) {
        $("#StartDate").val("");
        $("#EndDate").val("");
        $("#from").val("");
        $("#to").val("");
        $(".check-filter").attr('checked', false)
        var o = getState();
        o.Search = "";
        o.SelectedCategories = [];
        o.SelectedTypes = [];
        o.SelectedStatuses = [];
        o.Edited = "";
        o.StartDate = "";
        o.EndDate = "";
        setState(o);
        location.search = "";
    })
    function getState() {
        var o = $("div.paging-sorting-update>input[type=hidden]").attr("data-paging-sorting-state");
        if (o != "undefined" && o != null && o != "")
        {
            return JSON.parse(o);
        }
        else return "undefined"
        
    }
    function setState(object)
    {
        object.PagingSortingInfo.Page = 1;
        $("div.paging-sorting-update>input[type=hidden]").attr("data-paging-sorting-state", JSON.stringify(object));
        
    }
    function add(object,name,newvalue)
    {
        if (_.find(object[name],function(id){return id==newvalue;})==null)
        {
            if (object[name] == null)
                object[name]=[]
            object[name].push(newvalue);
            setState(object);
        }
        else {

        }
    }
    function remove(object,name,oldvalue)
    {
        if (object[name] != null) {
            for (var i = 0; i < object[name].length; i++) {
                if (object[name][i] == oldvalue) {

                    object[name].splice(i, 1);
                    setState(object);
                }
                else { }

            }
        }
    }
    $(document).on('change', '.check-filter', function (e) {
        if (this.checked) {
            add(getState(), $(e.target).attr('data-name'), $(e.target).attr('data-id'))
        }
        else {
            remove(getState(), $(e.target).attr('data-name'), $(e.target).attr('data-id'));
        }
    })
    $("#from").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
        },
        onSelect: function (selectedDate) {
            var state = getState();
            state.StartDate = selectedDate;
            $("#StartDate").attr('value', selectedDate)
            $("div.paging-sorting-update>input[type=hidden]").attr("data-paging-sorting-state",JSON.stringify(state));
        }
    });
    $("#to").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function (selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
        },
        onSelect: function (selectedDate) {
            var state = getState();
            state.EndDate = selectedDate;
            $("#EndDate").attr('value', selectedDate)
            $("div.paging-sorting-update>input[type=hidden]").attr("data-paging-sorting-state", JSON.stringify(state));
        }
    });
});