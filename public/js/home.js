document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/') {
        fetch('/api/getSkaters')
        .then(response => response.json())
        .then(skaters => {
            const userData = document.getElementById('userData');
            skaters.forEach(skater => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${skater.id}</td>
                <td><img src="${skater.foto}" alt="Foto del skater"></td>
                <td>${skater.nombre}</td>
                <td>${skater.anos_experiencia}</td>
                <td>${skater.especialidad}</td>
                <td>${skater.estado ? 'Aprobado' : 'En revisión'}</td>
            `;
            userData.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
  