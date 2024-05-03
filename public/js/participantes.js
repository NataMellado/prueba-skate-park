document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/participantes') {
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
  