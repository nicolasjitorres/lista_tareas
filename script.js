// Informacion de las fechas, tipo date

const dateNumber = document.getElementById('dateNumber');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');
const dateText = document.getElementById('dateText');

// Contenedor de tareas
const taskConteiner = document.getElementById('taskConteiner');


// Funcion para agregar las fechas
const setDate = () => {

  // Crea una nueva instancia del objeto Date
  const date = new Date();

  // Asigna el resultado de la operacion al contenido del elemento. 'toLocaleStrig' convierte la fecha en una cadena de texto con formato localizado.
  dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
  dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
  dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
  dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
  // los atributos numeric, short, long indican como queremos que se muestre la variable.

};


// Funcion para agregar nueva tarea, recibe el evento en este caso
const addNewTask = event => {

  // Con esto logramos que no se haga el submit y se recargue o nos lleve a otra pagina
  event.preventDefault();

  // Con esto obtenemos el valor que hay dentro del input
  const { value } = event.target.taskText;

  // Si el input no tiene nada entonces se corta la ejecucion de la funcion
  if (!value) return;

  // Creamos un nuevo elemento HTML y lo guardamos en la variable task, devuelve la referencia pero aun no se agrega al documento
  const task = document.createElement('div');

  // Le agregamos las clases necesarias al elemento
  task.classList.add('task', 'roundBorder');

  // Cuando damos click al elemento llamamos a una funcion, addEventListener es un metodo que se utilizar para asignar un controlador de eventos a un elemento del DOM
  task.addEventListener('click', changeTaskState);

  // Le añadiremos el valor del input extraido anteriormente como contenido al elemento creado
  task.textContent = value;

  // Se añade la tarea al contenedor al comienzo con prepend que añade al comienzo
  taskConteiner.prepend(task);

  // Con esto reiniciamos el form para que se limpie el input
  event.target.reset();

};


const changeTaskState = event => {

  // esto nos permite añadir la clase si el elemento no la tiene o quitar si la tiene (el elemeto que llama la funcion)
  event.target.classList.toggle('done');

};

const order = () => {

  // Creamos los arrays que contendran los elementos para ordenarlos
  const done = [];
  const toDo = [];

  // Con esto separamos las tareas por hacer y hechas en los arreglos definidos anteriormente
  taskConteiner.childNodes.forEach(element => {
    element.classList.contains('done') ? done.push(element) : toDo.push(element);
  });

  // Retornamos con el Spread operator una lista que contenga primero las tareas por hacer y en ultimo las hechas
  return [...toDo, ...done];

};

const renderOrderedTasks = () => {

  // Añadimos cada elemento del array al contenedor de tareas
  order().forEach(element => taskConteiner.appendChild(element));

};



// Llamamos a la funcion para agregar fechas
setDate();