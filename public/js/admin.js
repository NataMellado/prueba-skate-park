document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/admin') {

        // Renderizar los datos de los skaters
        fetch('/api/getSkaters')
        .then(response => response.json())
        .then(skaters => {
            const userData = document.getElementById('userData');
            skaters.forEach(skater => {
            const row = document.createElement('tr');
            row.classList.add('table-row');
            row.innerHTML = `         
                <td class="td-img">
                    <div class="img-container">
                        <img src="${skater.foto}" alt="Foto del skater">
                    </div>
                </td>
                <td>${skater.nombre}</td>
                <td>${skater.anos_experiencia === 0 ? '0' : skater.anos_experiencia === 1 ? '1 año' : `${skater.anos_experiencia} años`}</td>
                <td>${skater.especialidad}</td>
                <td>${skater.id}</td>
                <td>
                    <input type="checkbox" ${skater.estado ? 'checked' : ''}
                    <p>${skater.estado ? 'Aprobado' : 'En revisión'}</p>
                </td>
            `;
            userData.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

        

        // Cambiar estado del skater al hacer clic en el checkbox
        document.getElementById("userData").addEventListener("click", async (e) => {
            if (e.target.type === "checkbox") {
                const id = e.target.parentElement.previousElementSibling.textContent;
                const estado = e.target.checked;
                try {
                    const response = await fetch(`/api/skaterStatus`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id, estado }),
                    });
                    if (response.ok) {
                        console.log(`Estado del skater ${id} actualizado correctamente`);
                        alert(`Estado del skater ID: ${id} actualizado correctamente`);
                        document.location.href = "/admin";
                    } else {
                        throw new Error("Error al actualizar el estado del skater");
                    }
                } catch (error) {
                    console.error('Error al actualizar estado del skater:', error);
                }
            }
        });
        


        
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



    }
});
  
