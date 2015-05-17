$(function(){
	// generate task content function
	function generateListContent(task) {
		return '<span class="drag">&#8597</span>'+
			   // '<a href="/tasks/'+task._id+'" class="name">'+task.name+'</a>'+
			   '<span class="name">'+task.name+'</span>'+
			   '<a href="#" data-task-del="'+task._id+'">X</a>';
	}

	// add task to list function
	function appendToList(tasks) {
		var list = [];
		var content, task;
		for (var i in tasks) {
			task = tasks[i];
			content = generateListContent(task);
			list.push('<li id="'+task._id+'">'+content+'</li>');
		}
		$('.task-list').append(list);
	}

	// render all tasks on initial page load
	$.get('/tasks', appendToList);

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
		var $this = $(this);

		$.ajax({
			type: 'DELETE',
			url: '/tasks/'+$this.data('task-del')
		}).done(function() {
			$this.parents('li').remove();
		});
	});

	// edit task
	$('.task-list').on('dblclick', 'li', function() {
		var $this = $(this);

		var task_id = $this.attr('id');
		var task_name = $this.children('.name').text();

		content = '<span class="drag">&#8597</span>'+
				  '<input name="name" value="'+task_name+'" data-task-name="'+task_id+'">'+
				  '<a href="#" data-task-save="'+task_id+'">save</a>|'+
				  '<a href="#" data-task-cancel="'+task_id+'">cancel</a>'+
				  '<a href="#" data-task-del="'+task_id+'">X</a>';
		$this.html(content);

		$('input[value="'+task_name+'"]').focus();  // move cursor to input
	});

	// update task
	$('.task-list').on('click', 'a[data-task-save]', function(event) {
		var $this = $(this);
		var task_name =  $this.siblings('input').val();

		$.ajax({
			type: 'PUT',
			url: '/tasks/'+$this.data('task-save'),
			data: { name: task_name }
		}).done(function(taskName) {
			var content = generateListContent({ _id: $this.data('task-save'), name: $this.siblings('input').val() });
			$this.parent().html(content);
		});
	});

	// cancel edit task
	$('.task-list').on('click', 'a[data-task-cancel]', function(event) {
		var $this = $(this);
		var content = generateListContent({ _id: $this.data('task-cancel'), name: $this.siblings('input').val() });
		$this.parent().html(content);
	});
});
