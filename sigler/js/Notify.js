/**
 * Notify PetRide Widget
 *
 * @example
 * Notify("Notify Message", null, null);
 * 
 * @param {string}   text           Text to show
 * @param {Function} callback       Default Callback
 * @param {Function} close_callback Close Callback
 * @param {string}   style          Bootstrap Style
 */
Notify = function(text, callback, close_callback, style) {
	text = "&nbsp;<b>" + text + "</b>";

	var time = '3000';
	var $container = $('#notifications');
	var icon = '<i class="fa fa-paw "></i>';
 
	if (typeof style == 'undefined' ) style = 'warning'
  
	var html = $('<div class="alert alert-' + style + '  hide">' + icon +  " " + text + '</div>');

	$('<a>',{
		text: '',
		class: 'button close',
		style: 'padding-left: 10px;',
		href: '#',
		click: function(e){
			e.preventDefault()
			close_callback && close_callback()
			remove_notice()
		}
	}).prependTo(html)

	$container.prepend(html)
	html.removeClass('hide').hide().fadeIn('slow')

	function remove_notice() {
		html.stop().fadeOut('slow').remove()
	}
	
	var timer =  setInterval(remove_notice, time);

	$(html).hover(function(){
		clearInterval(timer);
	}, function(){
		timer = setInterval(remove_notice, time);
	});
	
	html.on('click', function () {
		clearInterval(timer)
		callback && callback()
		remove_notice()
	});
}
