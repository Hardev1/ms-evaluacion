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
  export const urlCrearEvaluador = 'http://localhost:3001/crear-evaluador'
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
  export const mensaje1InvitacionEvaluar = 'Se te ha asignado la siguiente solicitud: ';
  export const mensaje2InvitacionEvaluar = 'Por favor dar respuesta a este correo. ';
  export const mensaje3InvitacionEvaluar = 'En caso de aceptar/rechazar calificar la solicitud asignada, haz click aquí: ';
  export const fecha = new Date();
  export let fechaFormat = date.format(fecha, 'YYYY/MM/DD HH:mm:ss');
  
  let hashLength = 15;
  export let hash = createHash(hashLength);
  export let enlace = 
  `http://localhost:4200/invitacion-evaluar/responder-invitacion`;

  export const nombreArg = 'nombre';
  export const apellidoArg = 'apellido';
  export const documentoArg = 'documento';
  export const fechaNacimientoArg = 'fechaNacimiento';
  export const emailArg = 'email';
  export const telefonoArg = 'telefono';
  
  export const url_validar_token = "http://localhost:5000/validar-token";
  export const rol_administrador = "61805a211f07963610f583a9";
  export const rol_evaluador = "614a59a2353790287cca0b39";
  export const rol_auxiliar = "618db07d8db6b0dee6d62fa0";
  export const arg_token = "token";
  export const arg_rol_validar = "rol"

  export const carpetaImagenProponente = "../../archivos/proponente";
  export const carpetaSolicitud = '../../archivos/solicitud';
  export const carpetaResultadoSolicitud = '../../archivos/resultadoSolicitud'
  export const nombreCampoImagenProponente = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenProponente = 7000 * 7000;
  export const nombreCampoSolicitud = 'file';
  export const extensionesPermitidasDOC: string[] = ['.PDF', '.DOC', '.DOCX', '.XLS', '.XLSX', '.ZIP', '.RAR', '.TAR'];

  export const asuntoRecordatorio = "Recordatorio para evaluar";
  export const MensajeRecordatorio = "Recuerda evaluar esta solicitud que aceptaste calificar en la plataforma de evaluacion Ucaldas.";

  export const asuntoResultado = "Resultado de la evaluacion";
  export const mensajeResultado1 = "Tu solicitud ";
  export const mensajeResultado2 = "ya ha sido evaluada, el veredicto de los evaluadores es el siguiente: <br>";

  export const asuntoSolicitudExistente = "Solicitud ya existente";
  export const mensajeSollicitudExitente1 = "La solicutud ";
  export const mensajeSollicitudExitente2 = "Ya ha sido evaluada en la plataforma previamente";
}
