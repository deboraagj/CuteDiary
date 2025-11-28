// === COMMITAR === //

git add .; git commit -m "Incrementação da lógica de geração do calendário"; git push origin main

// === ATUALIZAR SERVER AUTOMATICAMENTE COM QUALQUER ALTERAÇÃO HTML/CSS/JAVASCRIPT/NODE.JS === //

1° PASSO

npm install concurrently --save
npm install wait-on --save-dev
npm install -D browser-sync nodemon


2° PASSO

Mudar script no package.json para o script abaixo, alterando o caminho onde se encontra o seu .handlebars
"dev": "concurrently \"nodemon app.js\" \"browser-sync start --proxy=http://localhost:8080 --port=3001 --files=views/**/*.handlebars public/**/*.*\""

"start": "concurrently \"nodemon app.js\" \"wait-on http-get://localhost:8080 && browser-sync start --proxy=http://localhost:8080 --port=3001 --files=views/**/*.handlebars public/**/*.* --delay 5000\""



3° PASSO 

rodar script no terminal
npm run dev
