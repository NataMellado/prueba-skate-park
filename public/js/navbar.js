document.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem('email');
    if (email) {
        const miCuenta = document.getElementById('miCuenta');
        if (miCuenta) {
            miCuenta.innerHTML = `<i class="fas fa-user"></i> ${email}`;
        }
    }
});