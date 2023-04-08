const tasksDiv = document.querySelector('#tasks')

const createNewBtn = document.querySelector("#createNew");
const createNewDiv = document.querySelector("#createNewDiv");

const cancel = document.querySelector('#cancel');

createNewBtn.addEventListener('click', function (){
    createNewDiv.style.visibility = 'visible';
})

cancel.addEventListener('click', function(){
  createNewDiv.style.visibility = 'hidden';
})


let taskTxt = document.querySelector('#task');

const createBtn = document.querySelector('#createBtn');

let tasks = [];

if(localStorage.getItem('task')===null){
  tasks=[];
}else{
  tasks = JSON.parse(localStorage.getItem('task'));
}
  for(let i=0; i<tasks.length; i++){
    const taskDiv = document.createElement('div')
    taskDiv.className = 'task';
    const p = document.createElement('span');
    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.className = 'inputDone';
    inputCheckbox.id = i;
    const iconGrip = document.createElement('i')
    iconGrip.className='fa-solid fa-grip-vertical';

    const iconTrash = document.createElement('i')
    iconTrash.className="fa-solid fa-trash";
    iconTrash.id=i;

    const iconStar = document.createElement('i')
    iconStar.className='fa-regular fa-star'
    iconStar.id=i;

    if(tasks[i][1]==true){
      p.style.textDecoration='line-through';
      inputCheckbox.checked=true;
    }
    if(tasks[i][2]==true){
      iconStar.className='fa-solid fa-star'
      taskDiv.style.color='var(--background)'
      taskDiv.style.background = 'var(--accentColor)'
    }
  
    p.innerText=tasks[i][0]
    p.className = 'txt'
    taskDiv.appendChild(inputCheckbox)
    taskDiv.appendChild(p)
    taskDiv.appendChild(iconStar)
    taskDiv.appendChild(iconTrash)
    taskDiv.appendChild(iconGrip)
    tasksDiv.appendChild(taskDiv)
  }



createBtn.addEventListener('click', function(){
  if(taskTxt.value!=''){
    let newTask = {
      task: taskTxt.value,
      done: false,
      important: false
    }
    console.log(newTask.task)
    tasks.push(Object.values(newTask))
    localStorage.setItem('task', JSON.stringify(tasks))
  
    createNewDiv.style.visibility = 'hidden';
  
    const taskDiv = document.createElement('div')
    taskDiv.className = 'task';
    const p = document.createElement('span');
  
    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'radio';
    inputCheckbox.className = 'inputDone';
    let lenght = tasks.length
    p.innerText=tasks[lenght-1];
    p.style.width = '90%'
    p.className = 'txt'

    const iconGrip = document.createElement('i')
    iconGrip.className='fa-solid fa-grip-vertical';
    inputCheckbox.id = tasks.length-1;

    const iconTrash = document.createElement('i')
    iconTrash.className="fa-solid fa-trash";
    iconTrash.id = tasks.length-1

    const iconStar = document.createElement('i')
    iconStar.className='fa-regular fa-star'
    iconStar.id=tasks.length-1;
    taskDiv.appendChild(inputCheckbox)
    taskDiv.appendChild(p)
    taskDiv.appendChild(iconStar)
    taskDiv.appendChild(iconTrash)
    taskDiv.appendChild(iconGrip)
    tasksDiv.appendChild(taskDiv)
  
    taskTxt.value = ''
    location.reload()
  }
  else{
    createNewDiv.style.visibility = 'hidden';
    taskTxt.value = ''
    setTimeout(() => (alert("Invalid task")), 300);
  }
})

const currentTasks = localStorage.getItem('task')

// =====Deleting task======
const trashIcon = document.querySelectorAll('.fa-trash');

trashIcon.forEach(el => {
    let id = el.id
    el.addEventListener('click', function(){
    tasks.splice(id, 1)
    localStorage.setItem('task', JSON.stringify(tasks))
    location.reload()
  })
})

// =====Setting tasks as important=====
const starIcon = document.querySelectorAll('.fa-star')

starIcon.forEach(el => {
  let id = el.id;
  el.addEventListener('click', function(){
    if(el.className=='fa-solid fa-star'){
      el.className='fa-regular fa-star'
      tasks[id][2]=false;
      localStorage.setItem('task', JSON.stringify(tasks))
    }
    else{
      el.className='fa-solid fa-star'
      tasks[id][2]=true;
      localStorage.setItem('task', JSON.stringify(tasks))
    }
    location.reload()
  })
})
// =====Setting tasks as done=====
const taskDone = document.querySelectorAll('.inputDone')


taskDone.forEach(el => {
  let id = el.id
    el.addEventListener('click', function(){
      if(el.checked==true){
        el.parentElement.children[1].style.textDecoration='line-through';
        tasks[id][1]=true;
        tasks.push(tasks.splice(id, 1)[0]);
        localStorage.setItem('task', JSON.stringify(tasks))
      }
      else{
        el.parentElement.children[1].style.textDecoration='none';
        tasks[id][1]=false;
        localStorage.setItem('task', JSON.stringify(tasks))
      }
    location.reload()
  })
})




// =====Sorting list===== 
const gripIcon = document.querySelectorAll('.fa-grip-vertical');
const dragArea = document.querySelector('#tasks');
new Sortable(dragArea, {
  group: 'list-of-tasks',
  handle: ".fa-grip-vertical",
  animation: 350,
  draggable: ".task",
  ghostClass: 'ghost',
  store: {
    /** 
     * @param {Sortable}
     * @returns {Array} 
    */
    get: function(sortable){
      let order = localStorage.getItem(sortable.options.group.name);
      return order ? order.split('|') : [];
    },
    /**
    * @param {Sortable}
    */
   set: function(sortable){
    let order = sortable.toArray();
    localStorage.setItem(sortable.options.group.name, order.join('|'));
   }
    
  }
  
})
gripIcon.forEach(el => {
  el.addEventListener('click', function(){
    el.style.cursor = 'grabbing';
})

})



console.log(tasks)
