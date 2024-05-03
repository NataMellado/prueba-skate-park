document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/perfil') {

        // Cerrar sesión
        const logout = async () => {
            try {
              const res = await fetch("/api/logout", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
              });
              localStorage.removeItem("email");
              document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
              document.location.href = "/";
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
            }
          };
          document.getElementById("logoutBtn").addEventListener("click", logout);



        // Renderizar los datos del usuario
        const email = localStorage.getItem("email");
        fetch("/api/getSkater", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener datos del usuario");
            }
        })
        .then(data => {
            document.getElementById("foto").setAttribute("src", data.foto);
            console.log(data.foto);
            document.getElementById("email").value = data.email;
            document.getElementById("nombre").value = data.nombre;
            document.getElementById("especialidad").value = data.especialidad;
            document.getElementById("experiencia").value = data.anos_experiencia;
            // document.getElementById("foto").value = data.foto;
        })
        .catch(error => {
            console.error('Error al obtener datos del usuario:', error);
        });
    


        // Eliminar cuenta
        document.getElementById("deleteBtn").addEventListener("click", async(e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            fetch(`/api/deleteSkater/${email}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                if (response.ok) {
                    alert("Cuenta eliminada correctamente");
                    
                    console.log(response.json());
                    logout();
                }
                throw new Error("Error desde el servidor");
            })
            .catch(error => {
                console.error('Error al eliminar cuenta:', error);
            });
        });



        // Actualizar datos del usuario
        document.getElementById("profileForm").addEventListener("submit", e => {
            e.preventDefault();
            const errorMessage = document.getElementById("errorMessage");
            const email = document.getElementById("email").value;
            const nombre = document.getElementById("nombre").value;
            const contraseña = document.getElementById("contraseña").value;
            const contraseña2 = document.getElementById("contraseña2").value;
            const anos_experiencia = document.getElementById("experiencia").value;
            const especialidad = document.getElementById("especialidad").value;
            const user = { nombre, contraseña, anos_experiencia, especialidad };

            // Verificar si las contraseñas coinciden
            if (contraseña !== contraseña2) {
                document.getElementById("contraseña").value = "";
                document.getElementById("contraseña2").value = "";
                errorMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>' + ' ' + 'Las contraseñas no coinciden';
                return;
            }

            // Enviar los datos al servidor
            fetch(`/api/updateSkater`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, user }),
            })

            // Respuesta del servidor
            .then(response => {
                if (response.ok) {
                    alert("Datos actualizados correctamente");
                    document.location.href = "/perfil";
                
                }
                throw new Error("Error al actualizar datos del usuario");
            })
            .catch(error => {
                console.error('Error al actualizar datos del usuario:', error);
            });
        });
       
    }
});
