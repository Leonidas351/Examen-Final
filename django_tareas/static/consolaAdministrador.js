function editarUsuario(idEditar)
{
    /*
    console.log(idEditar)
    PREGUNTA 3
    Capturar informacion del usuario desde base de datos y llenar
    inputs dentro de la ventana modal de editar usuario, permiter que
    el usuario pueda editar los datos. No olvida de cargar el ID en el innerHTML
    dentro del elemento H1 cuyo id es cargaId

    Los campos a editar son:
    Nro de celular
    Profesion del usuario

    El resto de campos:
    Nombre
    Apellido
    Email
    Fecha Ingreso
    Colocarlos como solo lectura (propiedad readonly en el tag HTML)
    
    */
    fetch(`/conseguirInfoUsuario?idEditar=${idEditar}`)
    .then(response => response.json())
    .then(data => {
        let NameOfEditee = document.getElementById('NameOfEditee')
        let LastNameOfEditee = document.getElementById('LastNameOfEditee')
        let StartDateOfEditee = document.getElementById('StartDateOfEditee')
        let EmailOfEditee = document.getElementById('EmailOfEditee')
        let cargaId = document.getElementById('cargaId')
        console.log('carga id:')
        console.log(cargaId)
        NameOfEditee.value = data.usersFirstName
        LastNameOfEditee.value = data.usersLastName
        StartDateOfEditee.value = data.usersStartDate
        EmailOfEditee.value = data.usersEmail

    })
}

function getCookie(name)
{
    let cookieValue = null;
    if(document.cookie && document.cookie !== "")
    {
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++)
        {
            const cookie = cookies[i].trim();
            if(cookie.substring(0,name.length + 1) === (name + "="))
            {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue 
}

function actualizarUsuario()
{
    /*
    PREGUNTA 4
    Capturar los datos de los campos input's de la ventana de editar usuario,
    el id del usuario lo puedes capturar de la carga realizada en el elemento
    H1 cuyo id es cargaId. Con los datos capturados postearlos en la base de datos
    y actualizar la informacion del usuario
    */
    let newPhone = document.getElementById('newPhone')
    let newProf = document.getElementById('newProf')
    let cargaId = document.getElementById('cargaId')
    console.log('carga id de act Us:')
    console.log(cargaId)
    
    datos = {
        'newPhone':newPhone.value,
        'newProf':newProf.value,
        'cargaId':cargaId.innerHTML
    }
    console.log(datos)

    fetch('/modUser',{
        method:"POST",
        headers:{
            "X-Requested-With":"XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body:JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        editarUsuario(cargaId.innerHTML)
    })
}