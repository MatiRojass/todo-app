window.addEventListener("load", ()=>{

    const button = document.getElementById("create")
    const list = document.getElementById("list")
    const newTaskInput = document.getElementById("newTask")


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
        
        const closeButton = document.createElement("i")
        closeButton.className = "fa-solid fa-xmark close-button"

        todo.appendChild(checkbox)
        todo.appendChild(span)
        todo.appendChild(closeButton)

        list.appendChild(todo)

        newTaskInput.value = ""

        closeButton.addEventListener("click", () => {
            const todo = closeButton.closest("li");
            todo.remove();
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
        })
    }

    newTaskInput.addEventListener("keypress", (event)=>{
        if(event.key == "Enter"){
            if (newTaskInput.value.trim() === "") {
                alert("La tarea no puede estar vacía");
                event.preventDefault(); // Evitar que se envíe el formulario si el campo está vacío
                return;
            }
            createTask()
        }
    })

    button.addEventListener("click", createTask)
})
