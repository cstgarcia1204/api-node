# API con Node.js y Express

## Descripción
Este proyecto es una API RESTful construida con Node.js y Express. Proporciona endpoints para gestionar recursos (CRUD) y sirve como base para aplicaciones web y móviles.

## Requisitos
- Node.js (versión 14.x o superior)
- npm (versión 6.x o superior)

## Instalación
1. Clona el repositorio:
   ```sh
   git clone https://github.com/cstgarcia1204/api-node.git

## Endpoints
- GET /estudiantes: Obtiene todos los estudiantes.
- GET /profesores: Obtiene todos los profesores.
- GET /cursos: Obtiene todos los cursos.
- GET /estudiantes/:id: Obtiene un estudiante por ID.
- GET /profesores/:id: Obtiene un profesor por ID.
- GET /cursos/:id: Obtiene un curso por ID.
***

- POST /estudiantes: Crea un nuevo estudiante.  
    Body: Json
    ```json
        {
            "dni": "3120279245",
            "nombre": "Mayra",
            "apellido": "Venegas",
            "email": "mayra.veve@myemail.com"
        }
    ```
- POST /profesores: Crea un nuevo profesor.  
    Body: Json
    ```json
        {
            "dni": "10492391",
            "nombre": "Vladimir",
            "apellido": "Quintana",
            "email": "vquintana@myemail.com",
            "profesion": "ingeniero",
            "telefono": "3387431760"
        }
    ```
- POST /cursos: Crea un nuevo curso.  
    Body: Json
    ```json
        {
            "nombre": "SQL Fundamentos",
            "descripcion": "Creando operaciones CRUD para inicios de SQL",
            "profesor_id": "1"
        }
    ```
- POST /resgistraEstudiante: Crea la relación de estudiante -> cursos   
    Body: Json
    ```json
        {   
            "curso_id": 2,
            "estudiante_id": 6
        }
    ```
***

- PUT /estudiantes/:id: Actualiza un estudiante por ID.  
    Body: Json
    ```json
        {
            "dni": "3120279245",
            "nombre": "Mayra",
            "apellido": "Vega",
            "email": "maira_vega@myemail.com"
        }
    ```
- PUT /profesores/:id: Actualiza un profesor por ID.  
    Body: Json
    ```json
        {
            "dni": "10492391",
            "nombre": "Vladimir",
            "apellido": "Quintana",
            "email": "vquintana@myemail.com",
            "profesion": "maestro",
            "telefono": "3374033289"
        }
    ```
- PUT /cursos/:id: Actualiza un curso por ID.  
    Body: Json
    ```json
        {
            "id": 1,
            "nombre": "NodeJS + Express",
            "descripcion": "Realizando una API REST",
            "profesor_id": 3
        }
    ```
***

- DELETE /estudiantes/:id: Elimina un estudiante por ID.
- DELETE /profesores/:id: Elimina un profesor por ID.
- DELETE /cursos/:id: Elimina un curso por ID.

