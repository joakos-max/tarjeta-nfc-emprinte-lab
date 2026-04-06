import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

// Usage: node generar-qr.js "Nombre Apellido" "Rol" "Telefono"
// Example: node generar-qr.js "Nomet Chacin" "VENDEDORA" "04143083722


const args = process.argv.slice(2);

if (args.length < 3) {
    console.error("❌ Error: Faltan argumentos.");
    console.log("Uso correcto: node generar-qr.js \"Nombre Apellido\" \"Rol\" \"Telefono\"");
    console.log("Ejemplo: node generar-qr.js \"Joaquin Sumalla\" \"CEO\" \"04242544045\"");
    process.exit(1);
}

const [name, role, phone] = args;

// URL Base de tu aplicacion Firebase
const baseUrl = "https://emprinte-lab-nfc-8472.web.app/";

// Modo Ultra Compacto: Usamos el fragmento (#) y separadores (|) para ahorrar el máximo de bytes
// Esto nos ahorra los repetidos "n=", "r=", "p=" y "&"
const compactData = `${name.replace(/\s+/g, '+')}|${role.replace(/\s+/g, '+')}|${phone}`;
const finalUrl = `${baseUrl}#${compactData}`;

console.log(`🔗 URL Generada: ${finalUrl}`);
console.log(`📏 Longitud total: ${finalUrl.length} caracteres`);
console.log(`💡 En NFC Tools escribe: ${finalUrl.replace('https://', '')} (y selecciona https:// en el menú)`);
console.log(`📦 Bytes reales en la tarjeta: ${finalUrl.length - 7} bytes (aprox)`);

// Nombre del archivo de salida
const filename = `QR_${name.replace(/\s+/g, '_')}.png`;
const outputPath = path.join(process.cwd(), filename);

// Opciones de estilo visual para el QR (usando colores CMYK oscuro)
const options = {
    errorCorrectionLevel: 'H',
    type: 'png',
    margin: 2,
    width: 1024, // Alta resolucion para impresion
    color: {
        dark: '#231F20', // CMYK Black
        light: '#FFFFFF' // Blanco
    }
};

// Generar y guardar el archivo PNG
QRCode.toFile(outputPath, finalUrl, options, function (err) {
    if (err) throw err;
    console.log(`✅ ¡Código QR generado exitosamente para impresión!`);
    console.log(`📁 Guardado en: ${outputPath}`);
});
