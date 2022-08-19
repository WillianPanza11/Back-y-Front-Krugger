1. Iniciar el BackEnd (Instrucciones en la carpeta java/com)
2. Ejecutar el programa
3. Iniciar sesión con "admin" para usuario y contraseña
4. para crear un nuevo Empleado clic en nuevo usuario
5. llenar los campos con los datos del nuevo usuario
6. clic en crear. 
7. En la tabla, en la sección "NOMBRE USUARIO Y CONTRASEÑA" son los datos del nuevo usuario para iniciar sesion del empleado
8. Para editar datos del usuario clic sobre la tabla en el campo a editar seguido de un Enter para gurdar los cambios
9. Cerrar sesión y volver a iniciar sesión con el nuevo usuario con los datos ya dados
10. llenar los datos faltantes del nuevo usuario
11. Para editar datos del empleado clic sobre la tabla en el campo a editar seguido de un Enter para gurdar los cambios
12. para cambiar el estado del vacuna clic en el boton "Editar Datos"


Es una aplicación que se ejecuta en el servidor y se conecta a la base de datos para realizar las operaciones de CRUD.

Se puede crear un nuevo empleado, editar los datos de un empleado, eliminar un empleado, listar todos los empleados

la aplicacion consume servicios REST para realizar las operaciones de CRUD.
Documentada con Swagger desde framework Spring Boot y Spring Data JPA 

contiene validaciones de datos para evitar errores de ingreso de datos.

OPCIONAL:
para ejecutar Swagger 1: cd .\src\app\
                      2: java -jar swagger-codegen-cli.jar generate -i http://localhost:8080/v2/api-docs -l   typescript-angular -o ./serviceSwagger 
                      3. En la carpeta serviceSwagger se crearan los archivos de servicios REST
                      4. En la carpeta "api" editar los archivos authcontroller.service.ts y empleadosController.service.ts, en la linea "protected basePath = '//localhost:8080/'" eliminar el utilmo slash "/" quedando asi "protected basePath = '//localhost:8080'"


