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

opcional
para ejecutar Swagger en el Fronted: 1. cd .\src\app\
                                     2. java -jar swagger-codegen-cli.jar generate -i http://localhost:8080/v2/api-docs -l typescript-angular -o ./serviceSwagger 
                                     



