/**
 * Backend
 * Descripción
 *
 * OpenAPI spec version: 0.0.1
 * Contact: willypanza11@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Rol } from './rol';

export interface Usuario { 
    apellidos: string;
    cedula: string;
    direccion?: string;
    email: string;
    fechaNacimiento?: Date;
    idUsuario?: number;
    nombreUsuario?: string;
    nombres: string;
    password?: string;
    roles: Array<Rol>;
}