$(function(){
	// render all tasks on initial page load
	$.get('/tasks', appendToList);

	// add task to list
	function appendToList(tasks) {
		var list = [];
		var content, task;
		for (var i in tasks) {
			task = tasks[i];
			content = '<a href="#" data-task-del="'+task._id+'">X</a>' + 
					  '<a href="#" data-task-edit="'+task._id+'">edit</a>' + 
					  '<a href="/tasks/'+task._id+'" class="name">'+task.name+'</a>';
			// list.push($('<li>', { html: content }));
			list.push('<li id="' + task._id + '">' + content + '</li>');
		}
		$('.task-list').append(list);
	}

	// create task
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

	// delete task
	$('.task-list').on('click', 'a[data-task-del]', function(event) {
		var target = $(event.currentTarget);

		$.ajax({
			type: 'DELETE',
			url: '/tasks/'+target.data('task-del')
		}).done(function() {
			target.parents('li').remove();
		});
	});

	// edit task
	$('.task-list').on('click', 'a[data-task-edit]', function(event) {
		var target = $(event.currentTarget);
		var task_id = target.data('task-edit');
		var task_name = target.siblings('.name').text();

		content = '<a href="#" data-task-del="'+task_id+'">X</a>' + 
				  '<input name="name" value="'+task_name+'" data-task-name="'+task_id+'">' + 
				  '<a href="#" data-task-save="'+task_id+'">save</a>' + 
				  '<a href="#" data-task-cancel="'+task_id+'">cancel</a>';
		target.parent().html(content);
	});

	// update task
	$('.task-list').on('click', 'a[data-task-save]', function(event) {
		var target = $(event.currentTarget);
		var task_name =  target.siblings('input').val();

		$.ajax({
			type: 'PUT',
			url: '/tasks/'+target.data('task-save'),
			data: { name: task_name }
		}).done(function(taskName) {
			var task_id = target.data('task-save');

			content = '<a href="#" data-task-del="'+task_id+'">X</a>' + 
					  '<a href="#" data-task-edit="'+task_id+'">edit</a>' + 
					  '<a href="/tasks/'+task_id+'" class="name">'+task_name+'</a>';

			target.parent().html(content);
		});
	});

	// edit task cancel
	$('.task-list').on('click', 'a[data-task-cancel]', function(event) {
		var target = $(event.currentTarget);
		var task_id = target.data('task-cancel');
		var task_name = target.siblings('input').val();

		content = '<a href="#" data-task-del="'+task_id+'">X</a>' + 
				  '<a href="#" data-task-edit="'+task_id+'">edit</a>' + 
				  '<a href="/tasks/'+task_id+'" class="name">'+task_name+'</a>';
		target.parent().html(content);
	});
});
