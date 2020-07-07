(function () {
	//------------------------Variables-----------------------
	const calendar_bar = document.querySelector('.nav_calendario');
	const btnAddTask = document.getElementById('add_task');
	const inputAddTask = document.getElementById('introducir_tarea');
	const list = document.getElementById('lista');
	const processList = document.getElementById('lista_proceso');
	const listCompleted = document.getElementById('lista_completada');

	//----------------------EventListener----------------------

	//Muestra el cual estado esta activo del calendario
	calendar_bar.addEventListener('click', statusActive);

	//Agrega la tarea a la lista de tareas en proceso
	btnAddTask.addEventListener('click', addTask);

	//Agrega o quita el checkmark de la tarea
	list.addEventListener('click', taskCheckmark);

	//Elimina la tarea de la lista de tareas
	list.addEventListener('click', taskDelete);

	//Carga el local storage
	document.addEventListener('DOMContentLoaded', localStorageLoaded);

	//-------------------------funciones-------------------

	//Muestra cual estado esta activo en la barra de navegacion
	function statusActive(e) {
		e.preventDefault();
		if(!e.target.classList.contains('active')) {
			//Elimina los estados activo
			for (var i = 0; i < calendar_bar.children.length; i++) {
				if (calendar_bar != e.target) {
					calendar_bar.children[i].classList.remove('active');
				}
			}
			//Activa el estado seleccionado
			e.target.classList.add('active');
		}
	}


	//Añade la tarea a la lista de procesos
	function addTask(e) {
		e.preventDefault();

		let task = inputAddTask.value,
			newTask = document.createElement('li'),
			checkbox = document.createElement("input"),
			checkmark = document.createElement("span"),
			content = document.createTextNode(task),
			btnDelete = document.createElement('a');

		//Verifica si el input no esta vacio
		if (task.length <= 0) {
			inputAddTask.classList.add('error');
			return false;
		} else {
			inputAddTask.classList.remove('error');
		}

		//Crea el boton de eliminar la tarea
		btnDelete.innerText = 'X';
		btnDelete.setAttribute('href','#');
		btnDelete.classList.add('borrar_tarea');
		
		//Crea la checkmark
		checkmark.classList.add('checkmark');

		//Crea el checkbox
		checkbox.setAttribute('type', 'checkbox');

		//Añade el boton de elimminar, el checkmark y el checkbox a la nueva tarea
		newTask.className = 'checkcontainer'
		newTask.appendChild(checkbox);
		newTask.appendChild(checkmark);
		newTask.appendChild(content);
		newTask.appendChild(btnDelete);

		//Añade la tarea a la lista de proceso
		processList.appendChild(newTask);

		addTaskLocalStorage(newTask.innerText.slice(0,-2));

		//Vacia el escrito que haya en input
		inputAddTask.value = "";
	}

	//Añade o quita un check si la tarea esta completada o no
	function taskCheckmark(e) {
		e.preventDefault();

		if (e.target.classList.contains('checkmark')) {
			let task = e.target.parentElement,
				checkmark = task.children[0];

			if (!checkmark.hasAttribute('checked')) {
				//agrega el check en la tarea completada
				checkmark.setAttribute('checked','checked');
				//lo inserta de primero en la lista de tareas de tareas completadas
				listCompleted.insertBefore(task,listCompleted.children[0]);
			} else {
				//quita el check en la tarea completada
				checkmark.removeAttribute('checked');
				//lo inserta de primero en la lista de tareas de tareas en proceso
				processList.insertBefore(task,processList.children[0]);
			}
		}
		e.stopPropagation();
	}

	//Elimina la tarea
	function taskDelete(e) {
		e.preventDefault();
		let task = e.target;
		
		if (task.classList.contains('borrar_tarea')) {
			task.parentElement.remove();
			console.log(task);
		}
	
		e.stopPropagation();
	}
/*
	function localStorageLoaded() {
		
	}
*/
	function addTaskLocalStorage(task) {
		let taskList;

		//Obtenemos las tareas almacenadas en local storage
		taskList = getTaskLocalStorage();

		//Añadir la nueva tarea
		//tasks.push(task);

		//Convertir de string a arreglo para el local storage y lo añade al local storage
		//localStorage.setItem('tareas', JSON.stringify(tasks));
		let i = 0;
		for (let task in localStorage) { 
			if (i < localStorage.length) {
//				console.log(`${task}`);
			} else {
				return false;
			}
		}

	}

	function getTaskLocalStorage() {
		let tasks;

		//revisando los valores en el local storage
		if (localStorage.getItem('tareas') === null) { //Si esta vacia, se agrega un arreglo vacio
			tasks = [];
		} else { //Si tiene contenido, agrega la tarea al arreglo
			tasks = JSON.parse(localStorage.getItem('tareas'));
		}

		return tasks;
	}


/*
	//Agrega la tarea al local storage
	function addTaskLocalStorage(task) {
		let tasks;

		//obtiene las tareas almacenadas
		tasks = getTaskLocalStorage();

		//añade la nueva tarea
		tasks.push(task);

		//convierte de string a arreglo para el local storage
		localStorage.setItem('process_task', JSON.stringify(tasks));

	}
	function obtenerTareasLocalStorage() {
		let tareas;

		//revisando los valores en el local storage
		if (localStorage.getItem('tareas') === null) { //Si esta vacia, se agrega un arreglo vacio
			tareas = [];
		} else { //Si tiene contenido, agrega la tarea al arreglo
			tareas = JSON.parse(localStorage.getItem('tareas'));
		}

		return tareas;
	}
*/













}());