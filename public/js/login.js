document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/login') {

        document.querySelector("form").addEventListener("submit", async (e) => {
            e.preventDefault();

            // Obtener los valores de los inputs
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const errorMessage = document.getElementById("errorMessage");

            // Enviar los datos al servidor
            const responste = await fetch("/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password }),
            });

            // Si la respuesta no es correcta, mostrar un mensaje de error
            if (!responste.ok) {
                const errorData = await responste.json();
                errorMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>' + " " + errorData.error;
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                console.log("Error al iniciar sesión desde el front: " + errorData.error);
            

            // Si la respuesta es correcta, redirigir al usuario a la página del perfil
            } else {
                const data = await responste.json();
                console.log(data);
                localStorage.setItem("email", email);
                console.log("Email almacenado en localStorage: " + localStorage.getItem("email"));
                window.location.href = "/perfil";
            }

            
        });
    }
});
