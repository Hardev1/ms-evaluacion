const date = require('date-and-time');
export namespace Configuracion {
  export const mensajeCambioClave =
    'se ha modificado tu contraseña en el sistema ';
  export const mensajeRecuperarClave = 'su nueva contraseña solicitada es: ';
  export const asuntoUsuarioCreado = 'Registro en la plataforma';
  export const mensajeUsuarioCreado =
    'Has sido registrado exitosamente en la plataforma, tu correo electrónico <strong>será</strong> tu nombre de usuario, y tu contraseña es: ';
  export const hashNotificacion = '123456d';
  export const urlCorreo = 'http://localhost:5000/correo';
  export const urlSms = 'http://localhost:5000/enviar-texto';
  export const asuntoCambioClave = 'Cambio de contraseña';
  export const saludo = 'Hola';
  export const destinoArg = 'destino';
  export const asuntoArg = 'asunto';
  export const mensajeArg = 'mensaje';
  export const hashArg = 'hash';
  export const mensaje1 = 'La solicitud ';
  export const mensaje2 = ', en la fecha ';
  export const mensaje3 = ', descrita como ';
  export const mensaje4 =
    'ha sido registrada en la plataforma de evaluación de la universidad de caldas, dentro de poco será calificada por nuestros jurados';
  export const asuntoSolicitudProponente = 'Se ha registrado tu Solicitud';
  const fecha = new Date();
  export let fechaFormat = date.format(fecha, 'YYYY/MM/DD HH:mm:ss');
}
