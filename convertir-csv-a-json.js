const csvtojson = require('csvtojson');
const fs = require('fs');

const csvFilePath = 'productsCSV.csv';
const jsonFilePath = 'resultado.json';

csvtojson({ delimiter: ';' })
  .fromFile(csvFilePath)
  .then((jsonArray) => {
    const jsonData = jsonArray.map((row) => {
      const formattedLongName = row["long_name"].toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) || 'No Encontrado';
      const contentDetail = parseFloat(row["content_detail"])
      const generated_ean = row["generated_ean"] === "true"
      const pack = row["pack"] === "false"? null : [parseInt(row["pack"])]

      return {
        "ean": parseInt(row["ean"]) || null,
        "sku_sap": parseInt(row["sku_sap"])|| null,
        "sku_vtex": parseInt(row["sku_vtex"])|| null,
        "short_name": row["short_name"],
        "long_name": formattedLongName,
        "content_detail": contentDetail,
        "measure_unit": row["measure_unit"],
        "brand": row["brand"],
        "category": row["first_category"],
        "proxy_duration": row["proxy_duration"],
        "pack": pack,
        "aisle": row["aisle"],
        "generated_ean": generated_ean,
        "autoshoppable_available": true,
      };
    });
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');

    console.log('Conversión completa.');
  })
  .catch((err) => console.error(err));
