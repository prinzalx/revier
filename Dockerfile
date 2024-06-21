# Verwenden Sie das offizielle Node.js-Image als Basis
FROM node:14

# Arbeitsverzeichnis im Container festlegen
WORKDIR /usr/src/app

# Package.json und package-lock.json kopieren
COPY package*.json ./

# Abhängigkeiten installieren
RUN npm install

# Anwendungsquellcode kopieren
COPY . .

# Port freigeben
EXPOSE 5000

# Anwendung starten
CMD ["node", "server.js"]
