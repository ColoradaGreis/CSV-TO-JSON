const fs = require('fs');

function flattenObject(obj, prefix = '') {
    const flatObject = {};
    for (const key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        // Tratar las propiedades especiales (por ejemplo, measures) de manera diferente
        if (key === 'measures') {
          const measures = obj[key];
          measures.forEach((measure, index) => {
            Object.assign(flatObject, flattenObject(measure, `${prefix}${key}_${index}_`));
          });
        } else {
          Object.assign(flatObject, flattenObject(obj[key], `${prefix}${key}_`));
        }
      } else {
        flatObject[`${prefix}${key}`] = obj[key];
      }
    }
    return flatObject;
  }
  
  function jsonToCsv(jsonData, csvFilePath) {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      console.error('El JSON debe ser un array no vacío.');
      return;
    }
  
    // Aplanar las propiedades anidadas y los arrays de objetos
    const flattenedData = jsonData.map(obj => flattenObject(obj));
  
    // Obtener las columnas del CSV a partir de las propiedades del primer objeto en el array
    const columns = Object.keys(flattenedData[0]);
  
    // Crear el encabezado CSV
    const header = columns.join(',');
  
    // Crear el contenido CSV
    const rows = flattenedData.map(obj => columns.map(col => {
      // Convertir las propiedades de measures a una cadena legible
      if (col.startsWith('metadata_measures')) {
        const measureIndex = parseInt(col.split('_')[2]);
        return obj[col] ? `${obj[col].value} ${obj[col].type}` : '';
      }
      return obj[col];
    }).join(','));
  
    // Unir encabezado y filas
    const csvContent = [header, ...rows].join('\n').replace(/,/g, ';');
  
    // Guardar el contenido en un archivo CSV
    fs.writeFileSync(csvFilePath, csvContent, 'utf-8');
  
    console.log(`La conversión del JSON a ${csvFilePath} ha sido exitosa.`);
  }


// Ejemplo de uso
const jsonData = [
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "0Bj9QLbiyOHbEZPY7ZGK",
        "productId": "DEV_0Bj9QLbiyOHbEZPY7ZGK",
        "productName": "Dentastix Razas Pequeñas 45 g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 45,
                    "type": "grams"
                }
            ],
            "brand": "Pedigree",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/0Bj9QLbiyOHbEZPY7ZGK/000000000000573497-UN-01.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "27KJuHMVXV1gSV2tnKwU",
        "productId": "DEV_27KJuHMVXV1gSV2tnKwU",
        "productName": "Oikos Yogur Griego",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 150,
                    "type": "grams"
                }
            ],
            "brand": "Danone",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/27KJuHMVXV1gSV2tnKwU/728531-7802955007799.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "2WtAKVxlRGO7ZvupTZxQ",
        "productId": "DEV_2WtAKVxlRGO7ZvupTZxQ",
        "productName": "Queque Marmol Nutrabien",
        "prices": {
            "DEV_CNV_002": 1000
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 70,
                    "type": "grams"
                }
            ],
            "brand": "Nutrabien",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/2WtAKVxlRGO7ZvupTZxQ/MARMOL.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "44xLxt61vQmEpWJR2692",
        "productId": "DEV_44xLxt61vQmEpWJR2692",
        "productName": "Sprite Zero 350ml",
        "prices": {
            "DEV_CNV_005": 1100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.35,
                    "type": "liters"
                }
            ],
            "brand": "Coca-Cola",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/44xLxt61vQmEpWJR2692/kMxRxWnhsmdF8Z4fm-Bebida-Zero-lata-350-ml.jpeg"
        },
        "storesIds": [
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "4A1dp2vnFCg5z5ZNU1pt",
        "productId": "DEV_4A1dp2vnFCg5z5ZNU1pt",
        "productName": "Manzana Pink Granel",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1,
                    "type": "grams"
                }
            ],
            "brand": "Jumbo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/4A1dp2vnFCg5z5ZNU1pt/181563-1000-1000.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "4ODCWH0sWWfBCtXS7dzQ",
        "productId": "DEV_4ODCWH0sWWfBCtXS7dzQ",
        "productName": "Galletón Nutrabien Variedades",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 40,
                    "type": "grams"
                }
            ],
            "brand": "Nutrabien",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/GALLETON_AVENA_PASAS.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "4Otgx4aWkC6HIzvOWAvl",
        "productId": "DEV_4Otgx4aWkC6HIzvOWAvl",
        "productName": "Gatorade Zero Blue Berry 500ml",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.5,
                    "type": "liters"
                }
            ],
            "brand": "CCU",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/4Otgx4aWkC6HIzvOWAvl/gatorade-zero-blueberry.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "4rVcpsro0NhhcsJ8bxCA",
        "productId": "DEV_4rVcpsro0NhhcsJ8bxCA",
        "productName": "Kuky Clasica",
        "prices": {
            "DEV_CNV_004": 900,
            "DEV_CNV_001": 900
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 120,
                    "type": "grams"
                }
            ],
            "brand": "McKay",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/4rVcpsro0NhhcsJ8bxCA/698056-1000-1000.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "5hMooIYZ9uLrvSqkMXiu",
        "productId": "DEV_5hMooIYZ9uLrvSqkMXiu",
        "productName": "Wasil Plato Listo 380gr",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 380,
                    "type": "grams"
                }
            ],
            "brand": "Wasil",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/5hMooIYZ9uLrvSqkMXiu/7801305004143-2-500x500.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "6A91XPzjEv9Y8dbVDQSJ",
        "productId": "DEV_6A91XPzjEv9Y8dbVDQSJ",
        "productName": "Naranja Granel",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1,
                    "type": "grams"
                }
            ],
            "brand": "Jumbo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/6A91XPzjEv9Y8dbVDQSJ/416123-1000-1000.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "7B2nboNNLJsiDV1HzEiD",
        "productId": "DEV_7B2nboNNLJsiDV1HzEiD",
        "productName": "Churu Tuna Recipe",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 56,
                    "type": "grams"
                }
            ],
            "brand": "Inaba",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/7B2nboNNLJsiDV1HzEiD/churu-atun.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "7a7f6RPfQWzbalUnHRUx",
        "productId": "DEV_7a7f6RPfQWzbalUnHRUx",
        "productName": "Pepsi Zero 1.5Lts",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1.5,
                    "type": "liters"
                }
            ],
            "brand": "Pepsi",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/7a7f6RPfQWzbalUnHRUx/398291-1000-1000.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "7alozJT6fUacMGEegfG7",
        "productId": "DEV_7alozJT6fUacMGEegfG7",
        "productName": "Limón Soda 500ml",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 500,
                    "type": "liters"
                }
            ],
            "brand": "CCU",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/7alozJT6fUacMGEegfG7/limon-soda-2.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "BkDWfRaw2Yq8YUGeLKBz",
        "productId": "DEV_BkDWfRaw2Yq8YUGeLKBz",
        "productName": "Club Social Integral 9 Paquetes",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 234,
                    "type": "grams"
                }
            ],
            "brand": "Club Social",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/BkDWfRaw2Yq8YUGeLKBz/1053281-800-450.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CDRy6AWQ3KuE8Ncll7Cy",
        "productId": "DEV_CDRy6AWQ3KuE8Ncll7Cy",
        "productName": "Galletas de Vino 155 g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 155,
                    "type": "grams"
                }
            ],
            "brand": "McKay",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CDRy6AWQ3KuE8Ncll7Cy/Galleta-Vino-McKay-155-g.jpg"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CE1OI760EsNK0QfmwWpn",
        "productId": "DEV_CE1OI760EsNK0QfmwWpn",
        "productName": "Gatorade Cool Blue 500ml",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.5,
                    "type": "liters"
                }
            ],
            "brand": "CCU",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CE1OI760EsNK0QfmwWpn/gatorade-cool-blue-1.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_001",
        "productId": "DEV_CNV_001",
        "productName": "Agua con Gas 600ml",
        "prices": {
            "DEV_CNV_005": 1100,
            "DEV_CNV_001": 100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.6,
                    "type": "liters"
                }
            ],
            "brand": "Vital",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/thumbnail/155452-750-750.jpg"
        },
        "storesIds": [
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_002",
        "productId": "DEV_CNV_002",
        "productName": "Agua sin Gas 600ml",
        "prices": {
            "DEV_CNV_005": 1000,
            "DEV_CNV_001": 100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.6,
                    "type": "liters"
                }
            ],
            "brand": "Vital",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/thumbnail/175940-750-750.webp"
        },
        "storesIds": [
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_003",
        "productId": "DEV_CNV_003",
        "productName": "Jugo AMA Variedades 200cc",
        "prices": {
            "DEV_CNV_005": 990,
            "DEV_CNV_002": 100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.2,
                    "type": "liters"
                }
            ],
            "brand": "Ama",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_003/JUGO_AMA_MANZANA_DURAZNO_200.webp"
        },
        "storesIds": [
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_004",
        "productId": "DEV_CNV_004",
        "productName": "Jugo Piña Sin azúcar 200ml",
        "prices": {
            "DEV_CNV_002": 600,
            "DEV_CNV_003": 600
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.2,
                    "type": "liters"
                }
            ],
            "brand": "Andina",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_004/JUGO_PINA_ANDINA_200.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_005",
        "productId": "DEV_CNV_005",
        "productName": "Barra Wild Protein Variedades 45gr",
        "prices": {
            "DEV_CNV_005": 1400,
            "DEV_CNV_004": 1400,
            "DEV_CNV_001": 1410
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 45,
                    "type": "grams"
                }
            ],
            "brand": "WildFoods",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_005/WILD_PROTEIN_CHOCOLATE_MANI.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_006",
        "productId": "DEV_CNV_006",
        "productName": "Coca-Cola Original 1.5lt",
        "prices": {
            "DEV_CNV_002": 2190,
            "DEV_CNV_003": 2190
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1.5,
                    "type": "liters"
                }
            ],
            "brand": "Coca-Cola",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/COCA_ORIGINAL_1500.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_007",
        "productId": "DEV_CNV_007",
        "productName": "Coca-Cola Zero 1.5 lt",
        "prices": {
            "DEV_CNV_002": 2190,
            "DEV_CNV_003": 2190
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1.5,
                    "type": "liters"
                }
            ],
            "brand": "Coca-Cola",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/COCA_ZERO_1500.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_008",
        "productId": "DEV_CNV_008",
        "productName": "Coca-Cola Zero 350ml",
        "prices": {
            "DEV_CNV_005": 1100,
            "DEV_CNV_004": 1100,
            "DEV_CNV_001": 1100,
            "DEV_CNV_002": 1050,
            "DEV_CNV_003": 1100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.35,
                    "type": "liters"
                }
            ],
            "brand": "Coca-Cola",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_008/COCA_ZERO_350.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_003",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_009",
        "productId": "DEV_CNV_009",
        "productName": "Compota Vivo Variedades 90gr",
        "prices": {
            "DEV_CNV_005": 600,
            "DEV_CNV_004": 600,
            "DEV_CNV_001": 600,
            "DEV_CNV_003": 600
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 90,
                    "type": "grams"
                }
            ],
            "brand": "Vivo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_009/COMPOTA_MANZANA_VIVO_90.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_003",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_010",
        "productId": "DEV_CNV_010",
        "productName": "Crackelet tripack 255gr",
        "prices": {
            "DEV_CNV_002": 1500,
            "DEV_CNV_003": 1500
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 255.0,
                    "type": "grams"
                }
            ],
            "brand": "Costa",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/CRAKELET_TRIPACK_255.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_011",
        "productId": "DEV_CNV_011",
        "productName": "De Todito 290gr",
        "prices": {
            "DEV_CNV_002": 1500,
            "DEV_CNV_003": 1500
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 290.0,
                    "type": "grams"
                }
            ],
            "brand": "Evercrisp",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/DE_TODITO_290.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_012",
        "productId": "DEV_CNV_012",
        "productName": "Ensalada César 430gr",
        "prices": {
            "DEV_CNV_004": 4990,
            "DEV_CNV_001": 4990
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 430.0,
                    "type": "grams"
                }
            ],
            "brand": "Jumbo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_012/ENSALADA_CESAR_430.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_013",
        "productId": "DEV_CNV_013",
        "productName": "Fanta 1.5lt",
        "prices": {
            "DEV_CNV_002": 2190,
            "DEV_CNV_003": 2190
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1.5,
                    "type": "liters"
                }
            ],
            "brand": "Coca-Cola",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/FANTA_ZERO_1500.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_014",
        "productId": "DEV_CNV_014",
        "productName": "Gusanos Ácidos 90gr",
        "prices": {
            "DEV_CNV_005": 1500,
            "DEV_CNV_004": 1200,
            "DEV_CNV_001": 1200,
            "DEV_CNV_002": 1500,
            "DEV_CNV_003": 1500
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 90.0,
                    "type": "grams"
                }
            ],
            "brand": "Fini",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_014/GUSANOS_ACIDOS_FINI_90.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_003",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_015",
        "productId": "DEV_CNV_015",
        "productName": "Frescolita 350ml",
        "prices": {
            "DEV_CNV_002": 1300
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.35,
                    "type": "liters"
                }
            ],
            "brand": "Coca-Cola",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/FRESCOLITA_350.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_016",
        "productId": "DEV_CNV_016",
        "productName": "Galletas Arroz Chocolate 20g",
        "prices": {
            "DEV_CNV_005": 600,
            "DEV_CNV_004": 600,
            "DEV_CNV_001": 600,
            "DEV_CNV_002": 700
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 20.0,
                    "type": "grams"
                }
            ],
            "brand": "Mizos",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_016/MIZOS_CHOCOLATE_20.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_017",
        "productId": "DEV_CNV_017",
        "productName": "Granola Mango/Frambuesa",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 395.0,
                    "type": "grams"
                }
            ],
            "brand": "",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/GRANOLA_MANGO_FRAMBUESA.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_018",
        "productId": "DEV_CNV_018",
        "productName": "Harina De Cachapas 500gr",
        "prices": {
            "DEV_CNV_002": 2490
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 500.0,
                    "type": "grams"
                }
            ],
            "brand": "PAN",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/HARINA_CACHAPA.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_019",
        "productId": "DEV_CNV_019",
        "productName": "Harina Pan 1kg",
        "prices": {
            "DEV_CNV_002": 2990,
            "DEV_CNV_003": 2990
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1000.0,
                    "type": "grams"
                }
            ],
            "brand": "PAN",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/HARINA_PAN_1KG.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_020",
        "productId": "DEV_CNV_020",
        "productName": "Inca Kola 350ml",
        "prices": {
            "DEV_CNV_004": 1100,
            "DEV_CNV_001": 1100,
            "DEV_CNV_002": 1050,
            "DEV_CNV_003": 1100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.35,
                    "type": "liters"
                }
            ],
            "brand": "Inca Kola",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_020/INCA_KOLA_350.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_003",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_021",
        "productId": "DEV_CNV_021",
        "productName": "Jamón Pierna Ahumado 125gr",
        "prices": {
            "DEV_CNV_002": 1800,
            "DEV_CNV_003": 2200
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 125.0,
                    "type": "grams"
                }
            ],
            "brand": "La Preferida",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/JAMON_PIERNA_AHUMADO_125.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_022",
        "productId": "DEV_CNV_022",
        "productName": "Ketchup Doypack 500 gr",
        "prices": {
            "DEV_CNV_002": 1990
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 500.0,
                    "type": "grams"
                }
            ],
            "brand": "JB",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/KETCHUP_DOYPACK_JB_500.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_023",
        "productId": "DEV_CNV_023",
        "productName": "Papas Fritas Original 130gr",
        "prices": {
            "DEV_CNV_002": 2390,
            "DEV_CNV_003": 2390
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 130.0,
                    "type": "grams"
                }
            ],
            "brand": "Kryzpo",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/KRYZPO_ORIGINAL_130.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_024",
        "productId": "DEV_CNV_024",
        "productName": "Papas Fritas Original 37gr",
        "prices": {
            "DEV_CNV_005": 1100,
            "DEV_CNV_004": 1100,
            "DEV_CNV_001": 1100,
            "DEV_CNV_003": 1100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 37.0,
                    "type": "grams"
                }
            ],
            "brand": "Kryzpo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_024/KRYZPO_ORIGINAL_37.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_003",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_025",
        "productId": "DEV_CNV_025",
        "productName": "Maltín Polar 355ml",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.355,
                    "type": "liters"
                }
            ],
            "brand": "Polar",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/MALTIN_POLAR_355.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_026",
        "productId": "DEV_CNV_026",
        "productName": "Mankeke un.",
        "prices": {
            "DEV_CNV_005": 350,
            "DEV_CNV_004": 350,
            "DEV_CNV_001": 350,
            "DEV_CNV_002": 300,
            "DEV_CNV_003": 300
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 30.0,
                    "type": "grams"
                }
            ],
            "brand": "Marinela",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_026/MANKEKE_30.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_003",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_027",
        "productId": "DEV_CNV_027",
        "productName": "Mantequilla con Sal 250gr",
        "prices": {
            "DEV_CNV_002": 2990,
            "DEV_CNV_003": 2990
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 250.0,
                    "type": "grams"
                }
            ],
            "brand": "Colún",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/MANTEQUILLA_COLUN_250.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_028",
        "productId": "DEV_CNV_028",
        "productName": "Margarina Mavesa 500gr",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 500.0,
                    "type": "grams"
                }
            ],
            "brand": "Mavesa",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/MARGARINA_MAVESA_500.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_029",
        "productId": "DEV_CNV_029",
        "productName": "Maruchan Queso 64gr",
        "prices": {
            "DEV_CNV_004": 1400,
            "DEV_CNV_001": 1400,
            "DEV_CNV_002": 1400
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 64.0,
                    "type": "grams"
                }
            ],
            "brand": "Maruchan",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/MARUCHAN_QUESO_64.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_030",
        "productId": "DEV_CNV_030",
        "productName": "Mayonesa Regular Doypack 372gr.",
        "prices": {
            "DEV_CNV_002": 3490
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 372.0,
                    "type": "grams"
                }
            ],
            "brand": "Hellmann's",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/MAYONESA_HELLMANNS_372.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_031",
        "productId": "DEV_CNV_031",
        "productName": "Mayonesa Mavesa 445gr",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 445,
                    "type": "grams"
                }
            ],
            "brand": "Mavesa",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/MAYONESA_MAVESA_445.jpg"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_032",
        "productId": "DEV_CNV_032",
        "productName": "Mermelada Frutilla 250gr",
        "prices": {
            "DEV_CNV_002": 1500,
            "DEV_CNV_003": 1500
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 250.0,
                    "type": "grams"
                }
            ],
            "brand": "Watts'",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/MERMELADA_WATTS_FRUTILLA_250.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_033",
        "productId": "DEV_CNV_033",
        "productName": "Monster Regular 473ml",
        "prices": {
            "DEV_CNV_001": 100,
            "DEV_CNV_002": 1890,
            "DEV_CNV_003": 1890
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.473,
                    "type": "liters"
                }
            ],
            "brand": "Monster",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/MONSTER_REGULAR_473.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_034",
        "productId": "DEV_CNV_034",
        "productName": "Monster Sin Azúcar 473ml",
        "prices": {
            "DEV_CNV_001": 100,
            "DEV_CNV_002": 1890,
            "DEV_CNV_003": 1890
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.473,
                    "type": "liters"
                }
            ],
            "brand": "Monster",
            "imageUrl": "https://jumbo.vtexassets.com/arquivos/ids/410048/Bebida-energetica-absolutely-zero-473-ml.jpg?v=637469369970000000"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_035",
        "productId": "DEV_CNV_035",
        "productName": "Nescafé Mokaccino 330ml",
        "prices": {
            "DEV_CNV_005": 1200,
            "DEV_CNV_004": 1200,
            "DEV_CNV_001": 1200
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.33,
                    "type": "liters"
                }
            ],
            "brand": "Nescafé",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_035/NESCAFE_MOKACCINO.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_036",
        "productId": "DEV_CNV_036",
        "productName": "Nescafé Capuccino 330ml",
        "prices": {
            "DEV_CNV_005": 1200,
            "DEV_CNV_004": 1200,
            "DEV_CNV_001": 1200
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.33,
                    "type": "liters"
                }
            ],
            "brand": "Nescafé",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_036/NESCAFE_CAPUCCINO.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_037",
        "productId": "DEV_CNV_037",
        "productName": "Ovomaltina 35gr",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 35.0,
                    "type": "grams"
                }
            ],
            "brand": "Ovomaltina",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/OVOMALTINA_35.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_038",
        "productId": "DEV_CNV_038",
        "productName": "Pan Molde Multigrano",
        "prices": {
            "DEV_CNV_002": 990,
            "DEV_CNV_003": 990
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 380,
                    "type": "grams"
                }
            ],
            "brand": "Fuchs",
            "imageUrl": "https://cencosud.vc/wp-content/uploads/2023/06/FUCHS-oferta.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_039",
        "productId": "DEV_CNV_039",
        "productName": "Panini Carne y Pepinillos",
        "prices": {
            "DEV_CNV_005": 3700,
            "DEV_CNV_001": 100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 250.0,
                    "type": "grams"
                }
            ],
            "brand": "",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/CNV_PANINI_CP.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_040",
        "productId": "DEV_CNV_040",
        "productName": "Panini Deli Market Variedades",
        "prices": {
            "DEV_CNV_005": 3700,
            "DEV_CNV_001": 100,
            "DEV_CNV_002": 100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 200,
                    "type": "grams"
                }
            ],
            "brand": "",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/CNV_PANINI_TAM.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_041",
        "productId": "DEV_CNV_041",
        "productName": "Pasta Salad Tomate Pollo Palta Espirales",
        "prices": {
            "DEV_CNV_001": 100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 200,
                    "type": "grams"
                }
            ],
            "brand": "",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/CNV_PASTA_SALDA_TPPE.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_042",
        "productId": "DEV_CNV_042",
        "productName": "Maní Crocante Pettiz 50gr",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 50,
                    "type": "grams"
                }
            ],
            "brand": "Pettiz",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_042/MANI_CROCANTE_PETTIZ_50.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_043",
        "productId": "DEV_CNV_043",
        "productName": "Quesillo 320gr",
        "prices": {
            "DEV_CNV_002": 2590,
            "DEV_CNV_003": 2590
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 320,
                    "type": "grams"
                }
            ],
            "brand": "Colún",
            "imageUrl": "https://www.colun.cl/admin/archivos/imagenes/productos/ABqYqxru22myvzu9XGwE.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_044",
        "productId": "DEV_CNV_044",
        "productName": "Queso Mantecoso Laminado 250gr",
        "prices": {
            "DEV_CNV_002": 3690
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 250.0,
                    "type": "grams"
                }
            ],
            "brand": "Soprole",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/QUESO_QUILQUE_250.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_045",
        "productId": "DEV_CNV_045",
        "productName": "Queso Rikesa 200gr",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 200.0,
                    "type": "grams"
                }
            ],
            "brand": "Rikesa",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/QUESO_RIKESA_200.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_046",
        "productId": "DEV_CNV_046",
        "productName": "Ramitas Queso 250gr",
        "prices": {
            "DEV_CNV_001": 600,
            "DEV_CNV_002": 2500,
            "DEV_CNV_003": 2500
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 230,
                    "type": "grams"
                }
            ],
            "brand": "Evercrisp",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_046/RAMITAS_QUESO.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_047",
        "productId": "DEV_CNV_047",
        "productName": "Ramitas Queso 48gr",
        "prices": {
            "DEV_CNV_005": 600,
            "DEV_CNV_004": 600,
            "DEV_CNV_001": 600,
            "DEV_CNV_002": 700
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 48.0,
                    "type": "grams"
                }
            ],
            "brand": "Evercrisp",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_047/RAMITAS_QUESO.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_048",
        "productId": "DEV_CNV_048",
        "productName": "Redbull 250ml",
        "prices": {
            "DEV_CNV_005": 1800,
            "DEV_CNV_002": 1800,
            "DEV_CNV_003": 1800
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.25,
                    "type": "liters"
                }
            ],
            "brand": "Redbull",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/RED_BULL_250.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_049",
        "productId": "DEV_CNV_049",
        "productName": "Redbull Light 250ml",
        "prices": {
            "DEV_CNV_005": 1800,
            "DEV_CNV_002": 1800,
            "DEV_CNV_003": 1800
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.25,
                    "type": "liters"
                }
            ],
            "brand": "Redbull",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/RED_BULL_SUGAR_FREE_250.webp"
        },
        "storesIds": [
            "DEV_CNV_003",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_050",
        "productId": "DEV_CNV_050",
        "productName": "Chocolate Rolls Crocante 150gr",
        "prices": {
            "DEV_CNV_005": 1800,
            "DEV_CNV_004": 1800,
            "DEV_CNV_001": 1800,
            "DEV_CNV_002": 1800,
            "DEV_CNV_003": 1800
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 150.0,
                    "type": "grams"
                }
            ],
            "brand": "Costa",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_050/ROLLS_CHOCOLATE.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_002",
            "DEV_CNV_003",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_051",
        "productId": "DEV_CNV_051",
        "productName": "Sémola Caramelo Soprole 140gr",
        "prices": {
            "DEV_CNV_002": 100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 140.0,
                    "type": "grams"
                }
            ],
            "brand": "Soprole",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/SEMOLA_CARAMELO_SOPROLE_140.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_052",
        "productId": "DEV_CNV_052",
        "productName": "Leche Protein Chocolate 200ml",
        "prices": {
            "DEV_CNV_005": 600,
            "DEV_CNV_004": 800,
            "DEV_CNV_001": 600,
            "DEV_CNV_002": 600,
            "DEV_CNV_003": 600
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.2,
                    "type": "liters"
                }
            ],
            "brand": "Soprole",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_052/LECHE_PROTEIN_200.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_002",
            "DEV_CNV_003",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_053",
        "productId": "DEV_CNV_053",
        "productName": "Sprite Zero 1.5lt",
        "prices": {
            "DEV_CNV_002": 2190,
            "DEV_CNV_003": 2190
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1.5,
                    "type": "liters"
                }
            ],
            "brand": "Coca-Cola",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/SPRITE_ZERO_1500.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_054",
        "productId": "DEV_CNV_054",
        "productName": "Tampones Súper 8un",
        "prices": {
            "DEV_CNV_004": 2990,
            "DEV_CNV_001": 2990
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 8.0,
                    "type": "grams"
                }
            ],
            "brand": "Kotex",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_054/TAMPONES_SUPER_KOTEX.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_055",
        "productId": "DEV_CNV_055",
        "productName": "Té Líquido Lipton Durazno 310ml",
        "prices": {
            "DEV_CNV_005": 1100,
            "DEV_CNV_001": 100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.31,
                    "type": "liters"
                }
            ],
            "brand": "Lipton",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_055/TE_LIPTON_DURAZNO.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_056",
        "productId": "DEV_CNV_056",
        "productName": "Té Líquido Lipton Limón 310ml",
        "prices": {
            "DEV_CNV_005": 1100,
            "DEV_CNV_001": 100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.31,
                    "type": "liters"
                }
            ],
            "brand": "Lipton",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_056/TE_LIPTON_LIMON.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_057",
        "productId": "DEV_CNV_057",
        "productName": "Galleta Tritón Vainilla 126gr",
        "prices": {
            "DEV_CNV_005": 900,
            "DEV_CNV_004": 900,
            "DEV_CNV_001": 900,
            "DEV_CNV_002": 900,
            "DEV_CNV_003": 900
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 126.0,
                    "type": "grams"
                }
            ],
            "brand": "Mckay",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_057/TRITON_126.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_002",
            "DEV_CNV_003",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_058",
        "productId": "DEV_CNV_058",
        "productName": "Yerba Mate Orgánico Cranberry 355ml",
        "prices": {
            "DEV_CNV_001": 100,
            "DEV_CNV_002": 100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.355,
                    "type": "liters"
                }
            ],
            "brand": "Guayaki",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/YERBA_MATE_CRANBERRY_355.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CNV_059",
        "productId": "DEV_CNV_059",
        "productName": "Yogurt Protein con Frutos Secos 150gr",
        "prices": {
            "DEV_CNV_005": 850,
            "DEV_CNV_004": 850,
            "DEV_CNV_001": 850,
            "DEV_CNV_002": 700,
            "DEV_CNV_003": 850
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 150.0,
                    "type": "grams"
                }
            ],
            "brand": "Soprole",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_059/YOGHURT_PROTEIN_FRUTOS_SECOS.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CQuVvCtEUruFNaeaZlFM",
        "productId": "DEV_CQuVvCtEUruFNaeaZlFM",
        "productName": "Fruits & Nuts Variedades",
        "prices": {
            "DEV_CNV_005": 1500,
            "DEV_CNV_004": 1500,
            "DEV_CNV_001": 1500,
            "DEV_CNV_002": 1500
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 80,
                    "type": "grams"
                }
            ],
            "brand": "Marco Polo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CQuVvCtEUruFNaeaZlFM/297479a.jpg%25255D%252526sink"
        },
        "storesIds": [
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CbxFr0kYD22Yi5U5DDNV",
        "productId": "DEV_CbxFr0kYD22Yi5U5DDNV",
        "productName": "Oreo Original 108 g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 108,
                    "type": "grams"
                }
            ],
            "brand": "Oreo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CbxFr0kYD22Yi5U5DDNV/688148-1000-1000.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "CoBdtJpHdU46K6rgrW1w",
        "productId": "DEV_CoBdtJpHdU46K6rgrW1w",
        "productName": "Gatorade Zero Naranja 500ml",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.5,
                    "type": "liters"
                }
            ],
            "brand": "CCU",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CoBdtJpHdU46K6rgrW1w/gatorade-zero-naranja.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "DSe5XkFNEYUNvpVlB00h",
        "productId": "DEV_DSe5XkFNEYUNvpVlB00h",
        "productName": "Nectar sin azucar Guallarauco 300ml",
        "prices": {
            "DEV_CNV_005": 1100
        },
        "discounts": {},
        "metadata": {
            "brand": "Guallarauco",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/DSe5XkFNEYUNvpVlB00h/PNMANG15_3.jpg%2525253F1681393324"
        },
        "storesIds": [
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "F2Ukvt0NKwxX907ClYTG",
        "productId": "DEV_F2Ukvt0NKwxX907ClYTG",
        "productName": "Tuareg Coco 48gr",
        "prices": {
            "DEV_CNV_004": 400,
            "DEV_CNV_001": 400,
            "DEV_CNV_003": 400
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 48,
                    "type": "grams"
                }
            ],
            "brand": "Costa",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/F2Ukvt0NKwxX907ClYTG/cl_502481.jpg"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_003",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "FVBFzNdsHuAqJ9DVjw0X",
        "productId": "DEV_FVBFzNdsHuAqJ9DVjw0X",
        "productName": "Ramitas de Garbanzo Queso",
        "prices": {
            "DEV_CNV_005": 1000
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 35,
                    "type": "grams"
                }
            ],
            "brand": "Puri",
            "imageUrl": "https://purisnacks.cl/cdn/shop/files/Ramita-1.png?v=1643738937"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "FfTTfcHz0uEyWZfD158l",
        "productId": "DEV_FfTTfcHz0uEyWZfD158l",
        "productName": " Salsa de Tomate Natural 200 Grs",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 200,
                    "type": "grams"
                }
            ],
            "brand": "Pomarola",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/FfTTfcHz0uEyWZfD158l/7802575353054.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "HCitZ7j0O8k463PGqMgh",
        "productId": "DEV_HCitZ7j0O8k463PGqMgh",
        "productName": "Chocolate Sahne-Nuss 90gr Barra",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 90,
                    "type": "grams"
                }
            ],
            "brand": "Nestle",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/HCitZ7j0O8k463PGqMgh/X_232612.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "Hc8AfPdqnne4PXbRGq6Z",
        "productId": "DEV_Hc8AfPdqnne4PXbRGq6Z",
        "productName": "Dentastix Razas Medianas 77,1 g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 77,
                    "type": "grams"
                }
            ],
            "brand": "Pedigree",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/Hc8AfPdqnne4PXbRGq6Z/000000000000651937-UN-01.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "I2VfA73cDLb8du61Mp5J",
        "productId": "DEV_I2VfA73cDLb8du61Mp5J",
        "productName": "Fanta Zero 350cc",
        "prices": {
            "DEV_CNV_005": 1100,
            "DEV_CNV_004": 1100,
            "DEV_CNV_001": 1100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.35,
                    "type": "liters"
                }
            ],
            "brand": "Coca-Cola",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/I2VfA73cDLb8du61Mp5J/FANTA_ZERO_350.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "JL1ek2F3x3FRPf9vcrkn",
        "productId": "DEV_JL1ek2F3x3FRPf9vcrkn",
        "productName": "Chocolate Costanuss 120 g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 120,
                    "type": "grams"
                }
            ],
            "brand": "Costa",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/JL1ek2F3x3FRPf9vcrkn/453000-1000-1000.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "LAQFJalSpEXDgApMiOcu",
        "productId": "DEV_LAQFJalSpEXDgApMiOcu",
        "productName": "Gatorade Naranja 500ml",
        "prices": {
            "DEV_CNV_002": 1500
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.5,
                    "type": "liters"
                }
            ],
            "brand": "CCU",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/LAQFJalSpEXDgApMiOcu/gatorade-naranja-2.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "MAntrlnZDIcI8GPQgYpi",
        "productId": "DEV_MAntrlnZDIcI8GPQgYpi",
        "productName": "Pizza PF 465gr Variedades",
        "prices": {
            "DEV_CNV_002": 3950,
            "DEV_CNV_003": 3950
        },
        "discounts": {},
        "metadata": {
            "EAN": "7801930010861",
            "measures": [
                {
                    "value": 465,
                    "type": "grams"
                }
            ],
            "brand": "PF",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/MAntrlnZDIcI8GPQgYpi/Pizza-listo-jamon-queso-465-g.jpg%25253Fv%25253D638216757391630000"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "NBB4aybW1q0b2rbr6Za7",
        "productId": "DEV_NBB4aybW1q0b2rbr6Za7",
        "productName": "Powerade Bebidas Isotónicas Variedades 600ml",
        "prices": {
            "DEV_CNV_004": 1400,
            "DEV_CNV_001": 1400,
            "DEV_CNV_002": 1500,
            "DEV_CNV_003": 1400
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 600,
                    "type": "liters"
                }
            ],
            "brand": "Powerade",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/NBB4aybW1q0b2rbr6Za7/POWERADE_FROZEN_600.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "NBh2G4bTenCCvEgksFZT",
        "productId": "DEV_NBh2G4bTenCCvEgksFZT",
        "productName": "Cebolla Granel",
        "prices": {
            "DEV_CNV_002": 400,
            "DEV_CNV_003": 300
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1,
                    "type": "grams"
                }
            ],
            "brand": "Jumbo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/NBh2G4bTenCCvEgksFZT/412178-1000-1000.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "NgA6Sx7lxdlSOslAJvkX",
        "productId": "DEV_NgA6Sx7lxdlSOslAJvkX",
        "productName": "Gatorade Frutas Tropicales 500ml",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.5,
                    "type": "liters"
                }
            ],
            "brand": "CCU",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/NgA6Sx7lxdlSOslAJvkX/gatorade-frutas-tropicales-2.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "NoMl3MsGS40BTMmeVD2H",
        "productId": "DEV_NoMl3MsGS40BTMmeVD2H",
        "productName": "Cracker Variedades 107gr",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 107,
                    "type": "grams"
                }
            ],
            "brand": "Selz",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/NoMl3MsGS40BTMmeVD2H/cracker_variedades.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "PhGNOQeGqQEIEz8BYEEG",
        "productId": "DEV_PhGNOQeGqQEIEz8BYEEG",
        "productName": "Rapiditas Clásicas 200 g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 200,
                    "type": "grams"
                }
            ],
            "brand": "Ideal",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/PhGNOQeGqQEIEz8BYEEG/44555-Tortillas-Rapiditas-8-unidades-200g-IDEAL.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "QMLKG3uSnGCIud2KRKDh",
        "productId": "DEV_QMLKG3uSnGCIud2KRKDh",
        "productName": "Churu Tuna with Salmon Recipe",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 56,
                    "type": "grams"
                }
            ],
            "brand": "Inaba",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/QMLKG3uSnGCIud2KRKDh/churu-atun-y-salmon.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "RcHZU0wEa6OjZJuWWMjY",
        "productId": "DEV_RcHZU0wEa6OjZJuWWMjY",
        "productName": "Brownie Nutrabien",
        "prices": {
            "DEV_CNV_004": 850,
            "DEV_CNV_001": 855,
            "DEV_CNV_002": 850
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 61,
                    "type": "grams"
                }
            ],
            "brand": "Nutrabien",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/RcHZU0wEa6OjZJuWWMjY/BROWNIE.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "RyGXsCz6eGfvaP2VNOSB",
        "productId": "DEV_RyGXsCz6eGfvaP2VNOSB",
        "productName": "Crema Colun Variedades 200 ml",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.2,
                    "type": "liters"
                }
            ],
            "brand": "Colun",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/RyGXsCz6eGfvaP2VNOSB/colun_crema_variedades.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "TLfQDtUfaozMHCwtrlvF",
        "productId": "DEV_TLfQDtUfaozMHCwtrlvF",
        "productName": "Braunichoc Nutrabien",
        "prices": {
            "DEV_CNV_001": 800
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 35,
                    "type": "grams"
                }
            ],
            "brand": "Nutrabien",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/TLfQDtUfaozMHCwtrlvF/BRAUNICHOC.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "Tagdwzv20MIUpn7oJpfE",
        "productId": "DEV_Tagdwzv20MIUpn7oJpfE",
        "productName": "Malla Limon San Osvaldo",
        "prices": {
            "DEV_CNV_002": 3990,
            "DEV_CNV_003": 2990
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1000,
                    "type": "grams"
                }
            ],
            "brand": "San Osvaldo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/Tagdwzv20MIUpn7oJpfE/limones1kg.jpeg"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "TrPoTBF2zvMiGktfLJcx",
        "productId": "DEV_TrPoTBF2zvMiGktfLJcx",
        "productName": "Sachet snack Perro variedades",
        "prices": {
            "DEV_CNV_003": 800
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 100,
                    "type": "grams"
                }
            ],
            "brand": "Master Dog",
            "imageUrl": "https://cdnx.jumpseller.com/pet-bj/image/34867337/7802575531728_400x.webp?1683347861"
        },
        "storesIds": [
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "U5ozHexXHdb54urxgw6w",
        "productId": "DEV_U5ozHexXHdb54urxgw6w",
        "productName": "Yoghurt Colun Variedades 125 gr",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 125,
                    "type": "grams"
                }
            ],
            "brand": "Colun",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/U5ozHexXHdb54urxgw6w/Yoghurt-Batido-Colun-Cereza-125-g.jpg"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "UwZpLAeU1u6SAnttqfzo",
        "productId": "DEV_UwZpLAeU1u6SAnttqfzo",
        "productName": "Limón Soda 350ml",
        "prices": {
            "DEV_CNV_005": 1100,
            "DEV_CNV_002": 1050,
            "DEV_CNV_003": 1100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 350,
                    "type": "liters"
                }
            ],
            "brand": "CCU",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/UwZpLAeU1u6SAnttqfzo/LIMON_SODA_350.webp"
        },
        "storesIds": [
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "W9kjV0nNWKNMc3aEUgcq",
        "productId": "DEV_W9kjV0nNWKNMc3aEUgcq",
        "productName": "Pepsi Normal 1.5Lts",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1.5,
                    "type": "liters"
                }
            ],
            "brand": "Pepsi",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/W9kjV0nNWKNMc3aEUgcq/412100-1000-1000.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "Wsq92iLF0BlbN8gu755f",
        "productId": "DEV_Wsq92iLF0BlbN8gu755f",
        "productName": "Chorizo Parrillero 1Kg",
        "prices": {
            "DEV_CNV_002": 3990,
            "DEV_CNV_003": 4990
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1000,
                    "type": "grams"
                }
            ],
            "brand": "PF",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/Wsq92iLF0BlbN8gu755f/X_259052.png"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "WumHu2HkryWofyN3Kz37",
        "productId": "DEV_WumHu2HkryWofyN3Kz37",
        "productName": "Alfajor Nutrabien Variedades",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 45,
                    "type": "grams"
                }
            ],
            "brand": "Nutrabien",
            "imageUrl": "https://storage.googleapis.com/reite-store-products/ALFAJOR_CHILENO.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "XEy6EgoW5cNfzYcPCt9X",
        "productId": "DEV_XEy6EgoW5cNfzYcPCt9X",
        "productName": "Mani Salado Marco Polo Variedades 150g",
        "prices": {
            "DEV_CNV_002": 1800,
            "DEV_CNV_003": 1500
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 150,
                    "type": "grams"
                }
            ],
            "brand": "Marco Polo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/XEy6EgoW5cNfzYcPCt9X/000000000000153853-UN-01.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "Ya2LY8LJHNUdDWFMKXez",
        "productId": "DEV_Ya2LY8LJHNUdDWFMKXez",
        "productName": "Popcorn Oliva sal de mar 15gr",
        "prices": {
            "DEV_CNV_005": 800
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 15,
                    "type": "grams"
                }
            ],
            "brand": "Puri",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/Ya2LY8LJHNUdDWFMKXez/Puripop-OLIVA.jpg"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "Ye0DWltP83jc8dXBt0ZN",
        "productId": "DEV_Ye0DWltP83jc8dXBt0ZN",
        "productName": "Crackelet 85 g",
        "prices": {
            "DEV_CNV_002": 650,
            "DEV_CNV_003": 650
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 85,
                    "type": "grams"
                }
            ],
            "brand": "Costa",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/Ye0DWltP83jc8dXBt0ZN/605439-1000-1000.webp"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "YmNGqFEBgU6jfYPMJ4Nt",
        "productId": "DEV_YmNGqFEBgU6jfYPMJ4Nt",
        "productName": "Barra Low Carb",
        "prices": {
            "DEV_CNV_005": 1000
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 35,
                    "type": "grams"
                }
            ],
            "brand": "En línea",
            "imageUrl": "https://tienda.estasenlinea.cl/677-thickbox_default/barra-low-carb-coco.jpg"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "ZZsLzBWKrrKsnyhWlwIg",
        "productId": "DEV_ZZsLzBWKrrKsnyhWlwIg",
        "productName": "Galleta Club Social",
        "prices": {
            "DEV_CNV_005": 300,
            "DEV_CNV_004": 300,
            "DEV_CNV_001": 300,
            "DEV_CNV_003": 300
        },
        "discounts": {},
        "metadata": {
            "brand": "Nabisco",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/ZZsLzBWKrrKsnyhWlwIg/10688P-1.jpg"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_003",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "ZbTKqOfhSkKSW26VwCoe",
        "productId": "DEV_ZbTKqOfhSkKSW26VwCoe",
        "productName": "Mini Chorizo",
        "prices": {
            "DEV_CNV_005": 1400
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 60,
                    "type": "grams"
                }
            ],
            "brand": "Receta del Abuelo",
            "imageUrl": "https://jumbo.vtexassets.com/arquivos/ids/413869/Snack-mini-chorizo-receta-del-abuelo-60g.jpg?v=637473101547330000"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "bilpZG5SiM9MiqrCa7UG",
        "productId": "DEV_bilpZG5SiM9MiqrCa7UG",
        "productName": "Yoghurt 1+1 Variedades",
        "prices": {
            "DEV_CNV_004": 850,
            "DEV_CNV_001": 850,
            "DEV_CNV_002": 850,
            "DEV_CNV_003": 850
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 140,
                    "type": "grams"
                }
            ],
            "brand": "Soprole",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/bilpZG5SiM9MiqrCa7UG/Yogurt-1-1.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_002",
            "DEV_CNV_003",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "bucHY8rGpypunv93pJ6Q",
        "productId": "DEV_bucHY8rGpypunv93pJ6Q",
        "productName": "Tomate Larga Vida Granel",
        "prices": {
            "DEV_CNV_002": 400,
            "DEV_CNV_003": 300
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1,
                    "type": "grams"
                }
            ],
            "brand": "Jumbo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/bucHY8rGpypunv93pJ6Q/416124-1000-1000.png"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "dZDTZdbLmfPyoY3YkaW9",
        "productId": "DEV_dZDTZdbLmfPyoY3YkaW9",
        "productName": "Coca-Cola Original 350ml",
        "prices": {
            "DEV_CNV_005": 1100,
            "DEV_CNV_004": 1100,
            "DEV_CNV_001": 1100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.35,
                    "type": "liters"
                }
            ],
            "brand": "Coca-Cola",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/dZDTZdbLmfPyoY3YkaW9/Bebida-original-350-ml.jpg%25253Fv%25253D638194412653770000"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "dptdUIpWKBvkn5bKoSTK",
        "productId": "DEV_dptdUIpWKBvkn5bKoSTK",
        "productName": "Protein Plus Pouch 150gr",
        "prices": {
            "DEV_CNV_005": 850,
            "DEV_CNV_004": 850,
            "DEV_CNV_001": 850
        },
        "discounts": {},
        "metadata": {
            "brand": "Colun",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/dptdUIpWKBvkn5bKoSTK/Yoghurt-protein-plus-squeeze-frutilla-platano-150-g.jpg%25252525253Fv%25252525253D637469375107170000"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "fExAmiZ9vNLZBLJQUN9u",
        "productId": "DEV_fExAmiZ9vNLZBLJQUN9u",
        "productName": "Churu Chicken Recipe",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 56,
                    "type": "grams"
                }
            ],
            "brand": "Inaba",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/fExAmiZ9vNLZBLJQUN9u/churu-pollo.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "fVjV4f72ArB7kbEgZQtu",
        "productId": "DEV_fVjV4f72ArB7kbEgZQtu",
        "productName": "Caracoquesos Carozzi 296gr",
        "prices": {
            "DEV_CNV_002": 2500
        },
        "discounts": {},
        "metadata": {
            "EAN": "7802575000552",
            "measures": [
                {
                    "value": 296,
                    "type": "grams"
                }
            ],
            "brand": "Carozzi",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/fVjV4f72ArB7kbEgZQtu/000000000000006430-UN-02.jpg"
        },
        "storesIds": [
            "DEV_CNV_002"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "frqVSgX3K3nBMxtsQNC1",
        "productId": "DEV_frqVSgX3K3nBMxtsQNC1",
        "productName": "Néctar Boca Ancha Andina del Valle Variedades",
        "prices": {
            "DEV_CNV_005": 1100,
            "DEV_CNV_002": 900,
            "DEV_CNV_003": 900
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.3,
                    "type": "liters"
                }
            ],
            "brand": "Del Valle",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/frqVSgX3K3nBMxtsQNC1/62e44af5bcf1c422225350.jpeg"
        },
        "storesIds": [
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "fswrrTLzzeWcuTHcd1h0",
        "productId": "DEV_fswrrTLzzeWcuTHcd1h0",
        "productName": "Papas Fritas Crema Cebolla 37gr",
        "prices": {
            "DEV_CNV_005": 1100,
            "DEV_CNV_004": 1100,
            "DEV_CNV_001": 1100,
            "DEV_CNV_002": 1100,
            "DEV_CNV_003": 1100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 37,
                    "type": "grams"
                }
            ],
            "brand": "Kryzpo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/fswrrTLzzeWcuTHcd1h0/230915.jpg%2525253FversionId%2525253Dp45EzqF1HlvWRp0rb6I7aJw4kswzqxSr"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_003",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "g4rv7thvpYdLAlZmSaev",
        "productId": "DEV_g4rv7thvpYdLAlZmSaev",
        "productName": "Spaghetti 5 400 g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 400,
                    "type": "grams"
                }
            ],
            "brand": "Carozzi",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/g4rv7thvpYdLAlZmSaev/7802575004437-1.jpg"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "gNfXKMwp6zNULBXQ5hy9",
        "productId": "DEV_gNfXKMwp6zNULBXQ5hy9",
        "productName": "Queso Gauda Laminado 250gr",
        "prices": {
            "DEV_CNV_002": 3500,
            "DEV_CNV_003": 3500
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 250,
                    "type": "grams"
                }
            ],
            "brand": "Soprole",
            "imageUrl": "https://mercadorapid.cl/wp-content/uploads/2021/05/gauda-250-gr.png"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "gTh8NYBajBQUaz1CN52R",
        "productId": "DEV_gTh8NYBajBQUaz1CN52R",
        "productName": "Puri Popcorn Variedades 25gr",
        "prices": {
            "DEV_CNV_005": 750
        },
        "discounts": {},
        "metadata": {
            "brand": "Puri",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/gTh8NYBajBQUaz1CN52R/Popcorn-endulzadas-25-g.jpg%25253Fv%25253D637577353941170000"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "guSA793uJKES8zID61m9",
        "productId": "DEV_guSA793uJKES8zID61m9",
        "productName": "Brownie Sin Azúcar Nutrabien",
        "prices": {
            "DEV_CNV_005": 800,
            "DEV_CNV_004": 800,
            "DEV_CNV_001": 800
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 50,
                    "type": "grams"
                }
            ],
            "brand": "Nutrabien",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/guSA793uJKES8zID61m9/BROWNIE_SIN_AZUCAR.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "hWEyMaHk9Duudynqx53Q",
        "productId": "DEV_hWEyMaHk9Duudynqx53Q",
        "productName": "Aji Pebre 240 g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 240,
                    "type": "grams"
                }
            ],
            "brand": "Don Juan",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/hWEyMaHk9Duudynqx53Q/370516-1000-1000.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "hYf3irdYQnJDCHtPk2k1",
        "productId": "DEV_hYf3irdYQnJDCHtPk2k1",
        "productName": "Red Bull 250ml Variedades",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.25,
                    "type": "liters"
                }
            ],
            "brand": "Red Bull",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/hYf3irdYQnJDCHtPk2k1/red-bull-variedades%2525252520%252525281%25252529.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "ifWrUd86RukLVCYEPbgs",
        "productId": "DEV_ifWrUd86RukLVCYEPbgs",
        "productName": "Gusanos Acidos 40 g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 40,
                    "type": "grams"
                }
            ],
            "brand": "Fini",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/ifWrUd86RukLVCYEPbgs/Gomitas-pocket-gusanos-acidos-40-g.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "jQqmFzyEKwOS9ShJr7G5",
        "productId": "DEV_jQqmFzyEKwOS9ShJr7G5",
        "productName": "Huevos Grande Blanco 12 un.",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 150,
                    "type": "grams"
                }
            ],
            "brand": "CINTAZUL",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/jQqmFzyEKwOS9ShJr7G5/416171-1000-1000.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "l5WefOfJc6eln5kkli6W",
        "productId": "DEV_l5WefOfJc6eln5kkli6W",
        "productName": "Galleta Mizos Chocolate Naranja 20gr",
        "prices": {
            "DEV_CNV_004": 600,
            "DEV_CNV_001": 600
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 25,
                    "type": "grams"
                }
            ],
            "brand": "Mizos",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/l5WefOfJc6eln5kkli6W/MIZOS_CHOCOLATE_NARANJA.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "lOMT387k7vdmGkEwMSwx",
        "productId": "DEV_lOMT387k7vdmGkEwMSwx",
        "productName": "Empanadas Variedades 2un",
        "prices": {
            "DEV_CNV_002": 4990,
            "DEV_CNV_003": 4990
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 300,
                    "type": "grams"
                }
            ],
            "brand": "Emporio Satira",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/lOMT387k7vdmGkEwMSwx/empanadas_emporio_satira_variedades.png"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "leRdydVvVSEBJnQRfViH",
        "productId": "DEV_leRdydVvVSEBJnQRfViH",
        "productName": "Kem Piña 350ml",
        "prices": {
            "DEV_CNV_003": 1100
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 0.35,
                    "type": "liters"
                }
            ],
            "brand": "Kem",
            "imageUrl": "https://tofuu.getjusto.com/orioneat-prod/Jvyr5Ymmk57ggCgc4-7801620852580.jpg"
        },
        "storesIds": [
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "lmCC4FVdpXbg8x8PZ4lu",
        "productId": "DEV_lmCC4FVdpXbg8x8PZ4lu",
        "productName": "Galletas Digestive Sin Azúcar Variedades 39gr",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 39,
                    "type": "grams"
                }
            ],
            "brand": "CCU",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/lmCC4FVdpXbg8x8PZ4lu/GALLETA_DIGESTIVE.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "oSnkGmVXx4gfvOPUM8DC",
        "productId": "DEV_oSnkGmVXx4gfvOPUM8DC",
        "productName": "Flan Colun Variedades",
        "prices": {
            "DEV_CNV_004": 800,
            "DEV_CNV_001": 800,
            "DEV_CNV_002": 600,
            "DEV_CNV_003": 800
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 98,
                    "type": "grams"
                }
            ],
            "brand": "Colun",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/oSnkGmVXx4gfvOPUM8DC/FLAN_COLUN_VARIEDADES.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_002",
            "DEV_CNV_003",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "qTkzDlUEXFVEdHvdxSyh",
        "productId": "DEV_qTkzDlUEXFVEdHvdxSyh",
        "productName": "Manzana Verde Granel",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1,
                    "type": "grams"
                }
            ],
            "brand": "Jumbo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/qTkzDlUEXFVEdHvdxSyh/415971-1000-1000.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "s7AiFcoNhV30z7mxzJOK",
        "productId": "DEV_s7AiFcoNhV30z7mxzJOK",
        "productName": "Galleton Casero Variedades 40gr",
        "prices": {
            "DEV_CNV_005": 600,
            "DEV_CNV_004": 600,
            "DEV_CNV_001": 600
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 40,
                    "type": "grams"
                }
            ],
            "brand": "Quaker",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/s7AiFcoNhV30z7mxzJOK/Principal-7586.jpg%25253Fv%25253D1680492954"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004",
            "DEV_CNV_005"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "sJsZpm9bxg5T5Sr7u5hf",
        "productId": "DEV_sJsZpm9bxg5T5Sr7u5hf",
        "productName": "Kryzpo Crema Cebolla 130g",
        "prices": {
            "DEV_CNV_002": 2390,
            "DEV_CNV_003": 2390
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 130,
                    "type": "grams"
                }
            ],
            "brand": "Kryzpo",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/sJsZpm9bxg5T5Sr7u5hf/Papas-Fritas-Kryzpo-Crema-Cebolla-130-g.jpg"
        },
        "storesIds": [
            "DEV_CNV_002",
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "uiHjplM7By1xme5G6wlh",
        "productId": "DEV_uiHjplM7By1xme5G6wlh",
        "productName": "Aceite Maravilla 1 Lt",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 1,
                    "type": "liters"
                }
            ],
            "brand": "Chef",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/uiHjplM7By1xme5G6wlh/485076-1000-1000.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "vyrwilWb7IX7sKYrZUmO",
        "productId": "DEV_vyrwilWb7IX7sKYrZUmO",
        "productName": "Atún Lomitos Variedades 160 g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 160,
                    "type": "grams"
                }
            ],
            "brand": "Robinson Crusoe",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/vyrwilWb7IX7sKYrZUmO/atun_lomitos_robinson_variedades.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "w2sAZnFTqdWsDcd2pz5A",
        "productId": "DEV_w2sAZnFTqdWsDcd2pz5A",
        "productName": "Criollita 100gr",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 100,
                    "type": "grams"
                }
            ],
            "brand": "McKay",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/w2sAZnFTqdWsDcd2pz5A/criollita.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "wFGnqGPsYPb2BWr86zKw",
        "productId": "DEV_wFGnqGPsYPb2BWr86zKw",
        "productName": "Lasaña PF Refrigerada 330gr Variedades",
        "prices": {
            "DEV_CNV_002": 3500
        },
        "discounts": {},
        "metadata": {
            "EAN": "7801930019925",
            "measures": [
                {
                    "value": 330,
                    "type": "grams"
                }
            ],
            "brand": "PF",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/wFGnqGPsYPb2BWr86zKw/1068873a.jpg%255D%2526sink"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "wtB6fKdiBpq6nEdo0BlO",
        "productId": "DEV_wtB6fKdiBpq6nEdo0BlO",
        "productName": "Chocolate Trencito 150gr",
        "prices": {
            "DEV_CNV_002": 2700,
            "DEV_CNV_003": 2700
        },
        "discounts": {},
        "metadata": {
            "EAN": "7802230070029",
            "measures": [
                {
                    "value": 150,
                    "type": "grams"
                }
            ],
            "brand": "Nestle",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/wtB6fKdiBpq6nEdo0BlO/699135-750-750"
        },
        "storesIds": [
            "DEV_CNV_003"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "x4vj6Cu0Lk7iSGHRXhNC",
        "productId": "DEV_x4vj6Cu0Lk7iSGHRXhNC",
        "productName": "Chocolate Rolls Nuts 150 g",
        "prices": {
            "DEV_CNV_004": 1800,
            "DEV_CNV_001": 1800
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 150,
                    "type": "grams"
                }
            ],
            "brand": "Costa",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/x4vj6Cu0Lk7iSGHRXhNC/452755-1000-1000.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "xXeAj0w5WiwtNvvq6nQq",
        "productId": "DEV_xXeAj0w5WiwtNvvq6nQq",
        "productName": "Doguitos Tira de Asado 65g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 65,
                    "type": "grams"
                }
            ],
            "brand": "Purina",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/xXeAj0w5WiwtNvvq6nQq/480146-1000-1000.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "xZxvc4jhEmEEoGpGpd0E",
        "productId": "DEV_xZxvc4jhEmEEoGpGpd0E",
        "productName": "Hellmann's Ketchup 250 g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 250,
                    "type": "grams"
                }
            ],
            "brand": "Hellmann's",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/xZxvc4jhEmEEoGpGpd0E/7794000744257.png"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "xnEQxQAp62tjZM2GfGz9",
        "productId": "DEV_xnEQxQAp62tjZM2GfGz9",
        "productName": "Pan Blanco XL Familiar 740 g",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 740,
                    "type": "grams"
                }
            ],
            "brand": "Ideal",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/xnEQxQAp62tjZM2GfGz9/659962-1000-1000.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "y88ZbEP4duQRUTNWwcQc",
        "productId": "DEV_y88ZbEP4duQRUTNWwcQc",
        "productName": "Manjarate",
        "prices": {
            "DEV_CNV_004": 800,
            "DEV_CNV_001": 800,
            "DEV_CNV_002": 800,
            "DEV_CNV_003": 800
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 80,
                    "type": "grams"
                }
            ],
            "brand": "Soprole",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/y88ZbEP4duQRUTNWwcQc/MANJARATE.webp"
        },
        "storesIds": [
            "DEV_CNV_001",
            "DEV_CNV_002",
            "DEV_CNV_003",
            "DEV_CNV_004"
        ]
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "y9AGDmEbfXJmx84nWtnX",
        "productId": "DEV_y9AGDmEbfXJmx84nWtnX",
        "productName": "Semola con Leche Soprole Variedades 140g",
        "prices": {
            "DEV_CNV_002": 1000
        },
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 140,
                    "type": "grams"
                }
            ],
            "brand": "Soprole",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/y9AGDmEbfXJmx84nWtnX/SEMOLA.webp"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "yd4XP79JbivggxOlaXC2",
        "productId": "DEV_yd4XP79JbivggxOlaXC2",
        "productName": "Felix Classic Variedades",
        "prices": {},
        "discounts": {},
        "metadata": {
            "measures": [
                {
                    "value": 85,
                    "type": "grams"
                }
            ],
            "brand": "Purina",
            "imageUrl": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/yd4XP79JbivggxOlaXC2/pouch-purina-felix-85-gr4113.jpeg"
        },
        "storesIds": []
    },
    {
        "active": true,
        "clientId": "9mNQnyZWfDVuq4LH4lD7",
        "clientProductId": "TEST_CNV_PRODUCT_001",
        "productId": "TEST_CNV_PRODUCT_001",
        "productName": "Coca Cola 1.5L",
        "prices": {},
        "discounts": {},
        "metadata": {
            "brand": "Coca Cola",
            "imageUrl": "https://storage.googleapis.com/reite-store-logos/reite-logo-blanco.png"
        },
        "storesIds": []
    }
];

const csvFilePath = "C:\Users\Usuario\Desktop\Programación\csv-to-json";

jsonToCsv(jsonData, csvFilePath);

