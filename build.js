const fs = require("fs");
const { exec } = require("child_process");

// Criar a pasta dist se não existir
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
  console.log("Pasta 'dist' criada.");
}

// Minificar HTML
exec("html-minifier --collapse-whitespace --remove-comments --minify-css true --minify-js true src/index.html -o dist/index.html", (err) => {
  if (err) console.error("Erro ao minificar HTML:", err);
  else console.log("✅ HTML minificado.");
});

// Minificar CSS
exec("cleancss -o dist/style.min.css src/style.css", (err) => {
  if (err) console.error("Erro ao minificar CSS:", err);
  else console.log("CSS minificado.");
});

// Minificar JS
exec("terser src/script.js -o dist/script.min.js", (err) => {
  if (err) console.error("Erro ao minificar JS:", err);
  else console.log("JS minificado.");
});

console.log("Build finalizado com sucesso!");