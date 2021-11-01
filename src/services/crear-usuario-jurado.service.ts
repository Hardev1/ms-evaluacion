import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { Keys } from '../config/keys';
import {Jurado} from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class CrearUsuarioJuradoService {
  constructor(/* Add @inject to inject parameters */) {}

  CrearUsuario(datos: Jurado) {
    let url = `${Keys.urlCrearUsuario}?${Keys.nombreArg}=${datos.nombre}&${Keys.apellidoArg}=${datos.apellido}&${Keys.documentoArg}=${datos.documento}&${Keys.emailArg}=${datos.email}&${Keys.telefonoArg}=${datos.telefono}&${Keys.fechaNacimientoArg}=${datos.fechaNacimiento}`;
    let response;
    fetch(url).then((res: any) => {
      response = res.text();
    });
    return response;
  }
}
