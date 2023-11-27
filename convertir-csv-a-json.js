const csvtojson = require('csvtojson');
const fs = require('fs');

const csvFilePath = 'tu_archivo.csv';
const jsonFilePath = 'resultado.json';

csvtojson({ delimiter: ';' })
  .fromFile(csvFilePath)
  .then((jsonArray) => {
    const jsonData = jsonArray.map((row) => {
      // Convierte la primera letra a mayúsculas y el resto a minúsculas
      const formattedLongName = row["long_name"].toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
      const id = parseInt(row["id"], 10)
      const contentDetail = parseFloat(row["content_detail"])

      return {
        "id": id,
        "ean": row["ean"],
        "short_name": row["short_name"],
        "long_name": formattedLongName,
        "content": {
          "content_detail": contentDetail,
          "measure_unit": row["measure_unit"]
        },
        "brand": row["brand"],
        "first_category": row["first_category"],
        "second_category": row["second_category"],
        "proxy_duration": row["proxy_duration"],
        "is_pack": row["is_pack"],
        "primary_image": row["primary_image"],
        "aisle": row["aisle"],
      };
    });

    // Guardar el resultado en un archivo JSON
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');

    console.log('Conversión completa.');
  })
  .catch((err) => console.error(err));
