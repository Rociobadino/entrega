const socketClient = io();

// const agregarMensaje = document.getElementById("agregarMensaje")

// const formulario = document.getElementById("form")
// const inputUsuario = document.getElementById("user")
// const inputMensaje = document.getElementById("message")


function agregarMensaje() {
    const info = {
        user: document.getElementById("user").value,
        messages: document.getElementById("message").value
    }
    socketClient.emit('mensaje',info)
    const form = document.getElementById("form")
    form.reset()
    console.log(info)
}

// formulario.addEventListener("click", (e) => {
// 	e.preventDefault();
//     const info = {
//         nombre: inputUsuario.value,
//         mensaje: inputMensaje.value
//     }
//     socketClient.emit('mensaje',info)
// })


//guardar los mensajes
// formulario.onsubmit = (e) =>{
//     e.preventDefault()
//     const info = {
//         nombre: inputUsuario.value,
//         mensaje: inputMensaje.value
//     }
//     socketClient.emit('mensaje',info)
// }