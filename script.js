let textVal = document.querySelector('.task')
let btnAdd = document.querySelector('.plus')
let taskCont = document.getElementById('task-container')
let btnDel = document.getElementsByClassName('minus')
let list = localStorage.getItem('todoList');

if(list == null)
	list = [];
else
 list = JSON.parse(list);

function saveTodo(){
	localStorage.setItem('todoList', JSON.stringify(list) );
}

function sortComp() {
	let arr = [];
	let arr2 = [];
  for(let i = 0; i< list.length; i++) {
    if(list[i].isCheck === false) {
      arr.push(list[i])
    } else {
      arr2.push(list[i])
    }
	}
  return list = [...arr,...arr2];
}

function updateList(list) {
 taskCont.innerHTML = "";
 list.map((e,i)=>{
  let checkClass = e.isCheck?"task-wrap-check":"";
  taskCont.innerHTML += `
  	<div class='task-wrap' id='task-wrap'>
      <div class='task-item ${checkClass}' data-index='${i}'>
        ${i+1} --- ${e.value}
      </div>
      <button class='minus' data-index='${i}'>-</button>
    </div>
    
  `
 })
}
function addTask() {
  if (textVal.value.length < 3) {
    return null
  } else {
    list.push({
      value: textVal.value,
      isCheck: false
    });
    textVal.value = "";
    sortComp();
    updateList(list);
    saveTodo();
  }
}
function remove() {
  taskCont.addEventListener("click",(e)=>{
    if(e.target.classList.contains('minus')){
    	list.splice(e.target.getAttribute('data-index'),1)
      sortComp();
      updateList(list)
    	saveTodo()
    }
  })
}
function isChecked() {
  taskCont.addEventListener("click",(e)=>{
    let {target} = e
    if(target.classList.contains("task-item")){
      list[target.getAttribute("data-index")].isCheck = !list[target.getAttribute("data-index")].isCheck;
      sortComp();
      updateList(list)
    	saveTodo()
    }
  })
}
sortComp();
updateList(list)
isChecked()
remove()
btnAdd.addEventListener("click", addTask)