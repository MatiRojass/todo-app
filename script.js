window.addEventListener("load", ()=>{

    const button = document.getElementById("create")
    const list = document.getElementById("list")
    const newTaskInput = document.getElementById("newTask")

    const localDataSave = () => {
        let data = []
        list.querySelectorAll("li").forEach(todo => {
            const task = {
                content: todo.querySelector("span").textContent,
                complete: todo.querySelector("button.checkbox").classList.contains("active")
            }
            data.push(task)
        })

        localStorage.setItem("tasks", JSON.stringify(data))
    }

    const loadLocalData = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks"))
        if(tasks){
            tasks.forEach(task => {
                const todo = document.createElement("li")
        
                const checkbox = document.createElement("button")
                checkbox.className = "checkbox"  
                
                const span = document.createElement("span") 
                span.textContent = task.content
                
                const deleteButton = document.createElement("i")
                deleteButton.className = "fa-solid fa-xmark delete-button"
                
                if(task.complete){
                    checkbox.classList.add("active")
                    span.style.textDecoration = "line-through"
                    checkbox.style.backgroundColor = "white"
                }
        
                todo.appendChild(checkbox)
                todo.appendChild(span)
                todo.appendChild(deleteButton)
        
                list.appendChild(todo)
        
        
                deleteButton.addEventListener("click", () => {
                    const todo = deleteButton.closest("li")
                    todo.remove()
                    localDataSave()
                })
        
                checkbox.addEventListener("click", () => {
        
                    checkbox.classList.toggle("active")
        
                    const todo = checkbox.closest("li")
                    const span = todo.querySelector("span")
                    const isActive = checkbox.classList.contains("active")
        
                    if(isActive){
                        span.style.textDecoration = "line-through"
                        checkbox.style.backgroundColor = "white"
                    }else{
                        span.style.textDecoration = "none"
                        checkbox.style.backgroundColor = "transparent"
                    }
        
                    localDataSave()
                })
        
                localDataSave()

            })
        }
    }

    loadLocalData()

    const createTask = () => {
        const newTaskContent = newTaskInput.value

        if(newTaskContent===""){
            alert("la tarea no puede estar vacia")
            return
        }


        const todo = document.createElement("li")
        
        const checkbox = document.createElement("button")
        checkbox.className = "checkbox"

        const span = document.createElement("span") 
        span.textContent = newTaskContent
        
        const deleteButton = document.createElement("i")
        deleteButton.className = "fa-solid fa-xmark delete-button"

        todo.appendChild(checkbox)
        todo.appendChild(span)
        todo.appendChild(deleteButton)

        list.appendChild(todo)

        newTaskInput.value = ""

        deleteButton.addEventListener("click", () => {
            const todo = deleteButton.closest("li")
            todo.remove()
            localDataSave()
        })

        checkbox.addEventListener("click", () => {

            checkbox.classList.toggle("active")

            const todo = checkbox.closest("li")
            const span = todo.querySelector("span")
            const isActive = checkbox.classList.contains("active")

            if(isActive){
                span.style.textDecoration = "line-through"
                checkbox.style.backgroundColor = "white"
            }else{
                span.style.textDecoration = "none"
                checkbox.style.backgroundColor = "transparent"
            }

            localDataSave()
        })

        localDataSave()
    }

    newTaskInput.addEventListener("keypress", (event)=>{
        if(event.key == "Enter"){
            if (newTaskInput.value.trim() === "") {
                alert("La tarea no puede estar vacía")
                event.preventDefault() 
                return
            }
            createTask()
        }
    })

    button.addEventListener("click", createTask)
})
