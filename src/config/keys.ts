const date = require('date-and-time');
const createHash = require('hash-generator');
export namespace Keys {
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
  export const mensaje1Solicitud = 'La solicitud ';
  export const mensaje2Solicitud = ', en la fecha ';
  export const mensaje3Solicitud = ', descrita como ';
  export const mensaje4Solicitud =
    'ha sido registrada en la plataforma de evaluación de la universidad de caldas, dentro de poco será calificada por nuestros jurados';
  export const asuntoSolicitudProponente = 'Se ha registrado tu Solicitud';
  export const asuntoInvitacionEvaluar = 'Invitación solicitud a evaluar';
  export const mensaje1InvitacionEvaluar = 'se te ha asignado la siguiente solicitud: ';
  export const mensaje2InvitacionEvaluar = 'Por favor dar respuesta a este correo. ';
  export const mensaje3InvitacionEvaluar = 'En caso de aceptar/rechazar calificar la solicitud asignada, haz click aquí: ';
  const fecha = new Date();
  export let fechaFormat = date.format(fecha, 'YYYY/MM/DD HH:mm:ss');
  
  let hashLength = 15;
  export let hash = createHash(hashLength);
  export let enlace = 
  `<a href="http://localhost:4200${hash}" style="font-weight:bold;">Confirmar respuesta</a>`;
  
  export const url_validar_token = "http://localhost:5001/validar-token"
  export const rol_administrador = "614a59a2353790287cca0b39"
  export const arg_token = "token";
  export const arg_rol_validar = "rol"

  export const carpetaImagenProponente = "../../archivos/proponentes/";
  export const nombreCampoImagenProponente = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenProponente = 1024 * 1024;
  export const carpetaDocumentoPersona = '../../archivos/documentos';
  export const nombreCampoDocumentoPersona = 'file';
  export const extensionesPermitidasDOC: string[] = ['.PDF', '.DOC', '.DOCX', '.XLS', '.XLSX'];
}
