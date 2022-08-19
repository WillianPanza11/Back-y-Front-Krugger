# Back-y-Front-Krugger
Iniciar primero el Back
0. Crear la base de datos con el nombre "KInvEmpleados"
1. Antes de ejecutar el programa (No ejecutar)
2. En la carpeta util abrir el archivo CreateRoles.java
3. Descomentar todo lo comentado, el archivo CreateRoles.java se ejecutará solo una vez.
4. Ejecutar el programa 
5. al ejecutar el programa comentar lo anteriormente comentado de CreateRoles.java
6. para hacer uso de la Apis ir a http://localhost:8080/swagger-ui/index.html#/
7. su usuario por defecto sera "admin" para usuario y contraseña
8. para probar desde el fronted agular iniciar el programa
8. para iniciar sesión "admin" 

Esta creada las carpetas model: para los modelos de la aplicación, repository: para los repositorios de la aplicación, controller: para los controladores de la aplicación, service: para los servicios de la aplicación, util: para las utilidades de la aplicación, security: para las seguridad de la aplicación y en donde se estan creando los roles y JWT

En en este caso se creo cuatro tablas en la base de datos
Para validar el ingreso debe ingresar el usuario y contraseña, con esto se validara también el Rol si es administrador o un empleado, usando Json Web Token (JWT)

se creo un archivo xml para el mapeo de las tablas de la base de datos con Dto y Repository

opcional(RECOMENADO NO HACER DADO EL HECHO QUE YA ESTA REALIZADO)
para ejecutar Swagger en el Fronted: 1. cd .\src\app\
                                     2. java -jar swagger-codegen-cli.jar generate -i http://localhost:8080/v2/api-docs -l typescript-angular -o ./serviceSwagger 
                                     


=================================================================================================================================================================
FRONT ANGULAR
1. Iniciar el BackEnd
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

OPCIONAL:(RECOMENADO NO HACER DADO EL HECHO QUE YA ESTA REALIZADO)
para ejecutar Swagger 1: cd .\src\app\
                      2: java -jar swagger-codegen-cli.jar generate -i http://localhost:8080/v2/api-docs -l   typescript-angular -o ./serviceSwagger 
                      3. En la carpeta serviceSwagger se crearan los archivos de servicios REST
                      4. En la carpeta "api" editar los archivos authcontroller.service.ts y empleadosController.service.ts, en la linea "protected basePath = '//localhost:8080/'" eliminar el utilmo slash "/" quedando asi "protected basePath = '//localhost:8080'"


