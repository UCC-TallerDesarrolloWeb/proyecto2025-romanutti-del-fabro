// Variables globales
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

// Función para abrir la navbar
function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evita scroll del body cuando está abierta
}

// Función para cerrar la navbar
function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restaura el scroll del body
}

// Event listeners
menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// Cerrar navbar con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSidebar();
    }
});

// Smooth scroll para los enlaces internos
document.querySelectorAll('.sidebar-menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            closeSidebar(); // Cerrar sidebar después de hacer clic en un enlace
        }
    });
});