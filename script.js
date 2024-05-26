window.addEventListener("load", ()=>{

    const button = document.getElementById("create")
    const list = document.getElementById("list")
    const newTaskInput = document.getElementById("newTask")

     // Función para guardar las tareas en el almacenamiento local
     const guardarTareasEnLocalStorage = () => {
        const tareas = [];
        list.querySelectorAll("li").forEach(todo => {
            const tarea = {
                contenido: todo.querySelector("span").textContent,
                completada: todo.querySelector("button.checkbox").classList.contains("active")
            };
            tareas.push(tarea);
        });
        localStorage.setItem("tareas", JSON.stringify(tareas));
    };

    // Función para cargar las tareas desde el almacenamiento local
    const cargarTareasDesdeLocalStorage = () => {
        const tareas = JSON.parse(localStorage.getItem("tareas"));
        if (tareas) {
            tareas.forEach(tarea => {
                const todo = document.createElement("li");
                const checkbox = document.createElement("button");
                checkbox.className = "checkbox";
                const span = document.createElement("span");
                span.textContent = tarea.contenido;
                const closeButton = document.createElement("i");
                closeButton.className = "fa-solid fa-xmark delete-button";
                todo.appendChild(checkbox);
                todo.appendChild(span);
                todo.appendChild(closeButton);
                if (tarea.completada) {
                    checkbox.classList.add("active");
                    span.style.textDecoration = "line-through";
                    checkbox.style.backgroundColor = "white";
                }
                list.appendChild(todo);
    
                closeButton.addEventListener("click", () => {
                    const todo = closeButton.closest("li");
                    todo.remove();
                    guardarTareasEnLocalStorage(); // Guardar las tareas después de eliminar una
                });
    
                checkbox.addEventListener("click", () => {
                    checkbox.classList.toggle("active");
                    const todo = checkbox.closest("li");
                    const span = todo.querySelector("span");
                    const isActive = checkbox.classList.contains("active");
                    if (isActive) {
                        span.style.textDecoration = "line-through";
                        checkbox.style.backgroundColor = "white";
                    } else {
                        span.style.textDecoration = "none";
                        checkbox.style.backgroundColor = "transparent";
                    }
                    guardarTareasEnLocalStorage(); // Guardar las tareas después de marcar como completada/incompleta
                });
            });
        }
    };

    cargarTareasDesdeLocalStorage(); // Cargar las tareas al cargar la página

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
        closeButton.className = "fa-solid fa-xmark delete-button"

        todo.appendChild(checkbox)
        todo.appendChild(span)
        todo.appendChild(closeButton)

        list.appendChild(todo)

        newTaskInput.value = ""

        closeButton.addEventListener("click", () => {
            const todo = closeButton.closest("li");
            todo.remove()
            guardarTareasEnLocalStorage(); // Guardar las tareas después de eliminar una
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

            guardarTareasEnLocalStorage(); // Guardar las tareas después de marcar como completada/incompleta
        })

        guardarTareasEnLocalStorage(); // Guardar las tareas después de crear una nueva tarea
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
