export const formContent = {
  name: {
    label: "Nombre",
    placeholder: "Ingresa tu nombre y apellido",
  },
  email: {
    label: "Correo Electrónico",
    placeholder: "Ingresa tu correo electrónico",
  },
  tel: {
    label: "Teléfono móvil / WhatsApp",
    placeholder: "Código de área + 10 dígitos",
  },
  profile: {
    label: "Resume brevemente tu perfil profesional",
    placeholder: "Habilidades, intereses, objetivos",
  },
  expectations: {
    label: "Cuales son tus expectativas económicas?",
    placeholder: "",
  },
  experience: {
    label: "Cuentas con experiencia en el sector inmobiliario?",
    placeholder: "",
  },
  resume: {
    label: "Sube tu CV",
    placeholder: "",
  },
};

export function getFormContent(key: keyof typeof formContent) {
  return formContent[key];
}
