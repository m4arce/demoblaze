
# Demoblaze Automation Project

Este proyecto automatiza las pruebas funcionales de la aplicación web **www.demoblaze.com**, una tienda en línea que permite a los usuarios explorar productos, agregarlos al carrito y realizar compras. 

El objetivo principal es garantizar la calidad del flujo de usuario mediante pruebas automatizadas que validen los escenarios clave del negocio.



## Cobertura del Proyecto

El proyecto cubre los siguientes módulos y funcionalidades principales:

1. **Registro de Usuario (Sign-Up)**:
   - Validación de registro con datos válidos e inválidos.
   - Manejo de errores en campos obligatorios.

2. **Inicio de Sesión (Login)**:
   - Inicio de sesión con credenciales válidas e inválidas.
   - Validación de mensajes de error.

3. **Página de Inicio (Home)**:
   - Navegación por las categorías de productos.
   - Visualización de detalles de productos.

4. **Carrito de Compras (Cart)**:
   - Agregar y eliminar productos del carrito.
   - Validación de precios y cantidades.

5. **Proceso de Compra (Purchase)**:
   - Completar una compra con datos válidos.
   - Validación de errores en campos obligatorios y datos inválidos.
   - Confirmación de que el carrito se vacía después de una compra exitosa.


## Tecnologías utilizadas

El proyecto utiliza las siguientes tecnologías y herramientas:

- **Lenguaje**: JavaScript (Node.js) [Node.js](https://nodejs.org/)
- **Framework de Pruebas**: [Cucumber.js](https://cucumber.io/)
- **Automatización de Navegadores**: [Playwright](https://playwright.dev/)
- **Generación de Reportes**: 
  - JSON: Generado automáticamente por Cucumber.js.
  - HTML: Generado con [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter).
- **Gestión de Dependencias**: npm (Node Package Manager)


## Instalación dependencias

```bash
  npm install
```
    
## Ejecución Tests

Para ejecutar los Test por orden de archivo

```bash
  npm run test
```
Para ejecutar los Test por orden del archivo cucumber.js

```bash
  npx cucumber-js
```
Para ejecutar los Test por orden del archivo cucumber.js con tag

```bash
  npx cucumber-js --tags "@tag_de_la_prueba"
```
Para limpiar reporte

```bash
  npm run clean:reports 
```
Para crear html y ver reporte
```bash
  npm run report
```
## Reporte de Pruebas

A continuación, se muestra un ejemplo del reporte generado después de ejecutar las pruebas:

![Reporte de Pruebas](utils/assets/demo_report.png)

## Authors

- [@m4arce](https://www.github.com/m4arce)

