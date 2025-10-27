
// Variables globales
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

/**
 * Función para abrir la sidebar del menú móvil
 * @method openSidebar
 * @return {void} No retorna valor
 */
const openSidebar = () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evita scroll del body cuando está abierta
}

/**
 * Función para cerrar la sidebar del menú móvil
 * @method closeSidebar
 * @return {void} No retorna valor
 */
const closeSidebar = () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restaura el scroll del body
}

// Event listeners
menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

/**
 * Maneja el evento keydown para cerrar la sidebar cuando se presiona la tecla Escape
 * @method keydownHandler
 * @param {KeyboardEvent} event - Evento del teclado
 * @return {void} No retorna valor
 */
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeSidebar();
    }
});

/**
 * Implementa smooth scroll para los enlaces internos del menú sidebar
 * @method smoothScrollHandler
 * @param {Event} e - Evento del click en el enlace
 * @return {void} No retorna valor
 */
document.querySelectorAll('.sidebar-menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
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