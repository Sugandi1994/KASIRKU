const fs = require('fs');
const path = require('path');

// Use process.cwd() to resolve path relative to current working directory
const productsFilePath = path.join(process.cwd(), 'db', 'products.json');

function addBarcodeToProducts() {
  try {
    const data = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(data);

    // Add barcode field if missing, generate a default barcode based on product id
    const updatedProducts = products.map(product => {
      if (!product.hasOwnProperty('barcode') || product.barcode === '') {
        // Generate barcode as a string "BARCODE" + product id padded to 6 digits
        const idStr = product.id ? product.id.toString().padStart(6, '0') : '000000';
        product.barcode = `BARCODE${idStr}`;
      }
      return product;
    });

    fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
    console.log('Barcodes added to products successfully.');
  } catch (error) {
    console.error('Error updating products with barcode:', error);
  }
}

addBarcodeToProducts();
