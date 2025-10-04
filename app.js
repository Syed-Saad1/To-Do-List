document.addEventListener('DOMContentLoaded', () => {
    const taskinp = document.getElementById('taskinp');
    const addtaskbtn = document.getElementById('addtaskbtn');
    const tasklist = document.getElementById('tasklist');
    const showimg = document.querySelector('.showimg');
    const todoscontainer = document.querySelector('.todos-container');


    const toggleEmptyState = () => {
        showimg.style.display = tasklist.children.
            length === 0 ? 'block' : 'none';
        todoscontainer.style.width = tasklist.children.
            length > 0 ? '100%' : '50%';
    }

    const addtask = (text , completed =false) => {
        event.preventDefault();
        const tasktext = taskinp.value.trim();
        if (!tasktext) {
            return;
        }
        const li = document.createElement('li');
        li.innerHTML = `
            <input type = "checkbox" class="checkbox" ${completed ?'checked' : ''} />
            <span>${tasktext}</span>
            <div class="taskbtn" >
            <button class="editbtn" ><i class="fa-solid fa-pen"></i> </button>
            <button class="deltebtn" ><i class="fa-solid fa-trash"></i> </button>
            </div>
            `;

        const checkbox = li.querySelector('.checkbox')
        const editbtn = li.querySelector('.editbtn'
        )

        if(completed){
            li.classList.add('completed');
            editbtn.disabled = true;
            editbtn.style.opacity = '0.5';
            editbtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change' , () =>{
            const ischecked = checkbox.checked;
            li.classList.toggle('completed' , ischecked);
            editbtn.disabled  = ischecked;
            editbtn.style.opacity = ischecked ? '0.5' :'1';
            editbtn.style.pointerEvents = ischecked ?'none' : 'auto';
        })
        editbtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskinp.value = li.querySelector
                    ('span').textContent;
                    li.remove();
                    toggleEmptyState();
            }
        });
        li.querySelector('.deltebtn').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        })
        tasklist.appendChild(li);
        taskinp.value = '';
        toggleEmptyState();
    };
    addtaskbtn.addEventListener('click', addtask);
    taskinp.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addtask(e);
        }
    })
});