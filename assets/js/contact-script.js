/**
 * Valida los campos del formulario de contacto
 * @method errorVer
 * @param {Event} event - Evento del formulario
 * @return {void} No retorna valor, valida y muestra mensajes de error
 */
const errorVer = (event) => {
    // Prevenir el envío automático del formulario
    event.preventDefault();
    
    const errorMessage = document.getElementById('error-message');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Verificar si algún campo está vacío
    if (nameInput.value.trim() === '' || 
        emailInput.value.trim() === '' || 
        subjectInput.value.trim() === '' || 
        messageInput.value.trim() === '') {
        errorMessage.textContent = 'Por favor, completa todos los campos.';
        return;
    }
    
    // Verificar si el nombre contiene números
    if (isNaN(nameInput.value.trim()) === false) {
        errorMessage.textContent = 'Por favor, no introduzcas números en el nombre';
        return;
    }
    
    // Si llegamos aquí, el formulario es válido
    errorMessage.textContent = '';
    alert('Formulario enviado correctamente. ¡Gracias por contactarnos!');
    
    // Opcional: limpiar el formulario
    nameInput.value = '';
    emailInput.value = '';
    subjectInput.value = '';
    messageInput.value = '';
}
