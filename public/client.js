$(function(){
	// render all tasks on initial page load
	$.get('/tasks', appendToList);

	// add task to list
	function appendToList(tasks) {
		var list = [];
		var content, task;
		for (var i in tasks) {
			task = tasks[i];
			content = '<a href="#" data-task="'+task._id+'">X</a>' + 
				'<a href="/tasks/'+task._id+'">'+task.name+'</a> ';
			list.push($('<li>', { html: content }));
		}
		$('.task-list').append(list);
	}

	// create new task
	$('form').on('submit', function(event) {
		event.preventDefault();
		var form = $(this);
		var taskData = form.serialize();

		$.ajax({
			type: 'POST',
			url: '/tasks',
			data: taskData
		}).done(function(taskName) {
			appendToList([taskName]);
			form.trigger('reset');
		});
	})

	// delete block
	$('.task-list').on('click', 'a[data-task]', function(event) {
		var target = $(event.currentTarget);

		$.ajax({
			type: 'DELETE',
			url: '/tasks/'+target.data('task')
		}).done(function() {
			target.parents('li').remove();
		});
	});
});