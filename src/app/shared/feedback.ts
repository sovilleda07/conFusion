// Estructura de la clase que representa el modelo de datos
// correspondiente al modelo del formulario que vamos a usar
// 1. Crear clase
export class Feedback {
    firstname: string;
    lastname: string;
    telnum: number;
    email: string;
    agree: boolean;
    contacttype: string;
    message: string;
}

// 2. Crear constante de arreglo para tipo de contacto
export const ContactType = ['None', 'Tel', 'Email'];
