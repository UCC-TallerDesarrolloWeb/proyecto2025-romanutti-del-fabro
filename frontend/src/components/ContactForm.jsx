import { useState } from "react";
import "@styles/contact.scss";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Maneja los cambios en los campos del formulario
   * @method handleChange
   * @param {Event} e - Evento del input
   * @returns {void} Actualiza el estado del formulario
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Valida los campos del formulario de contacto
   * @method handleSubmit
   * @param {Event} e - Evento del formulario
   * @returns {void} No retorna valor, valida y muestra mensajes de error
   */
  const handleSubmit = (e) => {
    // Prevenir el envío automático del formulario
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.subject.trim() === "" ||
      formData.message.trim() === ""
    ) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    // Validar que el nombre no contenga solo números
    if (isNaN(formData.name.trim()) === false) {
      setErrorMessage("Por favor, no introduzcas números en el nombre");
      return;
    }

    // Limpiar mensaje de error
    setErrorMessage("");

    // Mostrar mensaje de éxito
    alert("Formulario enviado correctamente. ¡Gracias por contactarnos!");

    // Limpiar formulario
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <h2>Contáctanos</h2>
      <p>
        ¿Tienes alguna pregunta o necesitas más información? ¡Estamos aquí para
        ayudarte!
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        {errorMessage && (
          <p id="error-message" className="error-message">
            {errorMessage}
          </p>
        )}

        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nombre y Apellido"
        />

        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="tuemail@ejemplo.com"
        />

        <label htmlFor="subject">Asunto:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder="Asunto del mensaje"
        />

        <label htmlFor="message">Mensaje:</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Escribe tu mensaje aquí..."
        />

        <button type="submit" className="submit-button">
          Enviar
        </button>
      </form>

      <div className="contact-info">
        <h3>Información de Contacto</h3>
        <p>
          <strong>Email:</strong> contactofastcars@gmail.com
        </p>
        <p>
          <strong>Teléfono:</strong> +54 09 1234 5678
        </p>
        <p>
          <strong>Dirección:</strong> Pio Leon 185, Jesus Maria, Argentina
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
