# Revier - Interaktive Bilderkarte

Revier ist eine Webanwendung, die es Benutzern erm�glicht, Bilder und Notizen auf einer interaktiven Karte zu platzieren und zu verwalten.

## Funktionen

- Anzeige einer Satellitenkarte
- Hochladen und Platzieren von Bildern auf der Karte
- Hinzuf�gen von Notizen an beliebigen Stellen auf der Karte
- Bearbeiten und L�schen von Bildern und Notizen
- Anzeige von Bildern in einem Karussell
- GPX-Track-Integration f�r Reviergrenzen

## Technische Anforderungen

- Node.js (Version 14 oder h�her)
- MongoDB
- Docker und Docker Compose (optional, f�r containerisierte Bereitstellung)

## Installation

1. Klonen Sie das Repository:
   ```
   git clone https://github.com/yourusername/revier.git
   cd revier
   ```

2. Installieren Sie die Abh�ngigkeiten:
   ```
   npm install
   ```

3. Erstellen Sie eine `.env` Datei im Wurzelverzeichnis und f�gen Sie die MongoDB-Verbindungs-URI hinzu:
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

   F�r die Entwicklung k�nnen Sie auch `npm run dev` verwenden, um den Server mit Nodemon zu starten.

## Docker-Installation

1. Stellen Sie sicher, dass Docker und Docker Compose installiert sind.

2. Bauen und starten Sie die Container:
   ```
   docker-compose up -d --build
   ```

3. Die Anwendung sollte nun unter `http://localhost:5000` erreichbar sein.

## Sicherheit

Diese Anwendung implementiert verschiedene Sicherheitsma�nahmen:

- Helmet f�r HTTP-Header-Sicherheit
- XSS-Clean zur Verhinderung von Cross-Site-Scripting-Angriffen
- Express-Mongo-Sanitize zur Verhinderung von NoSQL-Injection
- Multer f�r sichere Dateiuploads mit Dateityp- und Gr��enbeschr�nkungen

## Entwicklung

- `public/`: Enth�lt alle Frontend-Dateien (HTML, CSS, JavaScript)
- `routes/`: Enth�lt die API-Routen f�r Bilder und Notizen
- `models/`: Enth�lt die Mongoose-Modelle f�r Bilder und Notizen
- `utils/`: Enth�lt Hilfsfunktionen, einschlie�lich Validierungen
- `server.js`: Der Hauptserver-Einstiegspunkt

## Lizenz

Dieses Projekt ist unter der ISC-Lizenz lizenziert.