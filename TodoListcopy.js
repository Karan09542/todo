// curd operation
class kuberbhandari{
    constructor(){
        this.key = "sitaram";

        // हरिॐ
        if(localStorage.getItem("sitaram") == undefined){
            localStorage.setItem("sitaram", JSON.stringify({}))
        }
    }
    // हरिॐ
    create = (input) => {
        let data = JSON.parse(localStorage.getItem(this.key));
        data[Object.keys(data).length] = input;
        localStorage.setItem(this.key, JSON.stringify(data));
    }
    // हरिॐ
    read = () => {
        return JSON.parse(localStorage.getItem(this.key)) || {}
    }

    delete = (index) => {
        this.update(index)
    }
    update = (index, val=null)=> {

        let data = JSON.parse(localStorage.getItem(this.key))
        if(val == null) {
            delete data[index];
        } else data[index] = val;
        localStorage.setItem(this.key, JSON.stringify(data));
        
    }


}

const bholabhandari = new kuberbhandari()
const taskContainer = document.getElementById("ram")
let [inputTask, editTask] = document.getElementsByTagName("input")
let [add_btn, sumbit_btn, cancel_btn] = document.getElementsByTagName("button")

const updateHouse = document.getElementById("update")

// append task with index
let index = 0;
appendTask = (input,flag=false) => {
    if(flag) bholabhandari.create(input)

    let task = document.createElement("div")
    task.innerHTML = `
    <span class="data" data-index=${index}>${input}</span>
    <small>
        <span>
            <button style="color: #045de9;font-weight: bold;" onclick=toggle(this)>&#10003</button> <button onclick=updateTask(this)
                style="color: rgb(15, 179, 69); font-weight: 500;">EDIT</button>
            <button style="color: red; font-weight: 700;" onclick=deleteTask(this)>&#10005</button>
        </span>
    </small>
`
    taskContainer.querySelector("p").after(task)
    index++
}

// toggle
function toggle(ram){
    // 3 parentElement is div of class data
    ram.parentElement.parentElement.parentElement.querySelector("span").classList.toggle("toggle")
}

// delete
function deleteTask(ram){
    let task = ram.parentElement.parentElement.parentElement.querySelector("span")
    bholabhandari.delete(task.getAttribute("data-index"))
    task.parentElement.remove()
    index--

}

// हरिॐ
// appendListTask on window load from localStorage
(()=> {
    let len = Object.keys(bholabhandari.read()).length
    if(len > 0) {
        for(let i = 0; i<len ; i++){
            appendTask(bholabhandari.read()[i])
        }
    }
})()

// add task on runtime
add_btn.addEventListener("click", ()=>{
    
    inputTask.value == "" ? "" : appendTask(inputTask.value, true)
    inputTask.value = ""
})

// edit upadete

function updateTask(ram){
    let taskElem = ram.parentElement.parentElement.parentElement.querySelector("span")
    editTask.value = taskElem.innerHTML
    updateHouse.style.display = "block"
    sumbit_btn.addEventListener("click", ()=> {
        if(editTask.value !== "") {
            taskElem.innerHTML = editTask.value
            bholabhandari.update(taskElem.getAttribute("data-index"), editTask.value)
        }
        updateHouse.style.display = "none"
    })
    cancel_btn.addEventListener("click", ()=> {
        updateHouse.style.display = "none"
    })
}

let empty = ()=> {
    let emp = taskContainer.querySelector("p")
    Object.keys(bholabhandari.read()).length > 0? emp.style.display = "none" : emp.style.display = "block";
}
empty()

let observeTask = new MutationObserver(ram => {
   if(ram[0].type == "childList") empty()
})

observeTask.observe(taskContainer, {childList: true})

let keypressed = {}

document.addEventListener("keydown", (ram)=> {
    keypressed[ram.key] = true;
    handleKey()
})
document.addEventListener("keyup", (ram)=>{
    delete keypressed[ram.key];
    handleKey()
})

function handleKey(){
    if(keypressed["Control"] && keypressed["z"]){
        console.log("radheshyam sitaram हर हर महादेव")
    }
    console.log(keypressed)
}

