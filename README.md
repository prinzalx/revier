# Revier - Interaktive Bilderkarte

Revier ist eine Webanwendung, die es Benutzern ermöglicht, Bilder und Notizen auf einer interaktiven Karte zu platzieren und zu verwalten.

## Funktionen

- Anzeige einer Satellitenkarte
- Hochladen und Platzieren von Bildern auf der Karte
- Hinzufügen von Notizen an beliebigen Stellen auf der Karte
- Bearbeiten und Löschen von Bildern und Notizen
- Anzeige von Bildern in einem Karussell
- GPX-Track-Integration für Reviergrenzen

## Technische Anforderungen

- Node.js (Version 14 oder höher)
- MongoDB
- Docker und Docker Compose (optional, für containerisierte Bereitstellung)

## Installation

1. Klonen Sie das Repository:
   ```
   git clone https://github.com/yourusername/revier.git
   cd revier
   ```

2. Installieren Sie die Abhängigkeiten:
   ```
   npm install
   ```

3. Erstellen Sie eine `.env` Datei im Wurzelverzeichnis und fügen Sie die MongoDB-Verbindungs-URI hinzu:
   ```
   MONGODB_URI=mongodb://localhost:27017/revier
   ```

4. Erstellen Sie den Uploads-Ordner und setzen Sie die Berechtigungen:
   ```
   mkdir -p public/uploads
   chmod 755 public/uploads
   ```

5. Starten Sie den Server:
   ```
   npm start
   ```

   Für die Entwicklung können Sie auch `npm run dev` verwenden, um den Server mit Nodemon zu starten.

## Docker-Installation

1. Stellen Sie sicher, dass Docker und Docker Compose installiert sind.

2. Bauen und starten Sie die Container:
   ```
   docker-compose up -d --build
   ```

3. Die Anwendung sollte nun unter `http://localhost:5000` erreichbar sein.

## Sicherheit

Diese Anwendung implementiert verschiedene Sicherheitsmaßnahmen:

- Helmet für HTTP-Header-Sicherheit
- XSS-Clean zur Verhinderung von Cross-Site-Scripting-Angriffen
- Express-Mongo-Sanitize zur Verhinderung von NoSQL-Injection
- Multer für sichere Dateiuploads mit Dateityp- und Größenbeschränkungen

## Entwicklung

- `public/`: Enthält alle Frontend-Dateien (HTML, CSS, JavaScript)
- `routes/`: Enthält die API-Routen für Bilder und Notizen
- `models/`: Enthält die Mongoose-Modelle für Bilder und Notizen
- `utils/`: Enthält Hilfsfunktionen, einschließlich Validierungen
- `server.js`: Der Hauptserver-Einstiegspunkt

## Lizenz

Dieses Projekt ist unter der ISC-Lizenz lizenziert.