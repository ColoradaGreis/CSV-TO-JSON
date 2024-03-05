# CSV to JSON & JSON to CSV Converter

Este es un proyecto simple que proporciona una utilidad para convertir archivos CSV a JSON y viceversa. Puede ser útil para aquellos que necesitan alternar entre estos dos formatos de datos de manera fácil y eficiente. Este proyecto se ejecuta en Node.js y utiliza las bibliotecas `csvtojson` y `xlsx` para realizar las conversiones.

## Instalación

Antes de comenzar, asegúrese de tener Node.js instalado en su sistema. Luego, puede clonar este repositorio y ejecutar el siguiente comando en la terminal para instalar las dependencias:

```
npm install
```

## Uso

El proyecto proporciona dos scripts principales:

### Convertir CSV a JSON

Para convertir un archivo CSV a JSON, ejecute el siguiente comando en la terminal:

```
node csv-to-json.js archivo.csv
```

Reemplace `archivo.csv` con la ruta al archivo CSV que desea convertir. El archivo JSON resultante se creará en el mismo directorio con el mismo nombre que el archivo CSV, pero con la extensión `.json`.

### Convertir JSON a CSV

Para convertir un archivo JSON a CSV, ejecute el siguiente comando en la terminal:

```
node json-to-csv.js archivo.json
```

Reemplace `archivo.json` con la ruta al archivo JSON que desea convertir. El archivo CSV resultante se creará en el mismo directorio con el mismo nombre que el archivo JSON, pero con la extensión `.csv`.

## Dependencias

- `csvtojson`: Una biblioteca para convertir archivos CSV a JSON.
- `xlsx`: Una biblioteca para leer y escribir archivos de Excel en formato xlsx.

## Contribución

Siéntase libre de enviar solicitudes de extracción para mejorar el código, agregar nuevas características o solucionar problemas.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulte el archivo `LICENSE` para obtener más detalles.

## Contacto

Si tiene alguna pregunta o sugerencia, no dude en contactarme a través de mi dirección de correo electrónico [graciana.baratti@gmail.com].

¡Gracias por usar este proyecto!
