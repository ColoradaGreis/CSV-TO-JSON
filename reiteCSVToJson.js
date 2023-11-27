const csvtojson = require('csvtojson');
const fs = require('fs');

const csvFilePath = 'ReiteCSV.csv';
const jsonFilePath = 'resultadoReite.json';

csvtojson({ delimiter: ';' })
  .fromFile(csvFilePath)
  .then((jsonArray) => {
    const jsonData = jsonArray.map((row) => {

      return {
  
        "short_name": row["short_name"],
        "productId": row["productIdReite"],
        "name": row["productNameReite"]
      };
    });

    // Guardar el resultado en un archivo JSON
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');

    console.log('Conversión de Reite completa.');
  })
  .catch((err) => console.error(err));