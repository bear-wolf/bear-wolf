$(document).ready(function ()
{
	DDL.Init();
});

var DDL = new function ()
{
	this.Init = function ()
	{
		var empty = $();
		var open = empty;
		$('select').each(function ()
		{
			var sel = $(this).hide();
			var drop = $('<div class="select-dropdown"></div>')
			.width(sel.width())
			.hide();
			var title = $('<div class="select-title"></div>')
			.text($('option:selected', sel).text())
			var wrap = $('<div class="select-wrap"></div>')
			.click(function (event)
			{
				open.slideUp('fast');
				open = (open[0] == drop[0]) ? empty : drop;
				open.slideDown('fast');
				event.stopPropagation();
			})
			.append($('<div class="select-button"></div>'))
			.append(title);
			$('option', sel).each(function ()
			{
				var opt = $(this);
				$('<div class="select-option"></div>')
				.appendTo(drop)
				.text(opt.text())
				.click(function (event)
				{
					opt.prop('selected', true);
					title.text(opt.text());
					drop.slideUp('fast');
					open = empty;
					sel.trigger('change');
					event.stopPropagation();
				});
			});
			sel.after(drop).after(wrap);
		});
		$('html').click(function ()
		{
			open.slideUp('fast');
			open = empty;
		});
	}
}