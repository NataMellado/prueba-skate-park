document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/registro') {
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            
            // Verificar si las contraseñas coinciden
            const contraseña = document.getElementById('contraseña').value;
            const contraseña2 = document.getElementById('contraseña2').value;
            if (contraseña !== contraseña2) {
                errorMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>' + ' ' + 'Las contraseñas no coinciden';
                return;
            }

            // Obtener los datos del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const especialidad = document.getElementById('especialidad').value;
            const anos_experiencia = document.getElementById('experiencia').value;
            const foto = document.getElementById('foto').files[0];

            // Crear un objeto FormData
            const datos = JSON.stringify({ nombre, email, contraseña, anos_experiencia, especialidad});
            const formData = new FormData();
            formData.append('datos', datos);
            formData.append('foto', foto);

            // Enviar los datos al servidor
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    errorMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>' + ' ' + errorData.error;
                    registerForm.reset();
                    return;
                } else {
                    console.log('Usuario registrado:', email);
                    localStorage.setItem('email', email);
                    console.log('Email almacenado en localStorage: ' + localStorage.getItem('email'));
                    alert('Usuario registrado correctamente');
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Error al registrar usuario:', error.message);
            }
        });
    }
});
