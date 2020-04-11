
$(document).on('click', '.reset-form', function (e) {
    $('.nicEdit-main').html('')
    $(e.target).closest('form').trigger('reset');
    $('select').val(0)
})

$(document).on('click', 'li.responsiveGallery-item', function (e) {
    var li = $(e.target).closest('li').addClass('active');
    var id = $(e.target).closest('li').attr('data-id');
    var d = ''
    $.post('/Complaint/GetComplaintDescription', { id: id}).success(function (data) {
        SiteDialog.showdescription({ buttons: [] }, data, li);
    })
})
