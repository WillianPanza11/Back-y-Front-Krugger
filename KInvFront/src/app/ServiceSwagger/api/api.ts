export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './basicErrorController.service';
import { BasicErrorControllerService } from './basicErrorController.service';
export * from './empleadoController.service';
import { EmpleadoControllerService } from './empleadoController.service';
export const APIS = [AuthControllerService, BasicErrorControllerService, EmpleadoControllerService];
