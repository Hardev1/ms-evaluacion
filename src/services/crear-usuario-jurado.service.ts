import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Keys} from '../config/keys';
import {Jurado} from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class CrearUsuarioJuradoService {
  constructor(/* Add @inject to inject parameters */) {}

  async CrearEvaluador(datos: Jurado) {
    const body = {
      nombre: datos.nombre,
      apellido: datos.apellido,
      documento: datos.documento,
      fechaNacimiento: datos.fechaNacimiento,
      email: datos.email,
      telefono: datos.telefono
    };
    const response = await fetch(`${Keys.urlCrearEvaluador}`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
    });
  }
}
