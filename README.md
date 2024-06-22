# Revier - Bilderkarte

Revier ist eine interaktive Webanwendung, die es Benutzern ermöglicht, Bilder und Notizen auf einer Satellitenkarte zu platzieren und zu verwalten.

## Funktionen

- Anzeige einer Satellitenkarte
- Hochladen und Platzieren von Bildern auf der Karte
- Hinzufügen von Notizen an beliebigen Stellen auf der Karte
- Unterschiedliche Marker für Bilder und Notizen
- Vergrößerte Darstellung von Bildern bei erneutem Antippen
- Bearbeiten und Löschen von Notizen
- Löschen von Bildern mit Bestätigung

## Installation

1. Klonen Sie das Repository:
   ```
   git clone https://github.com/yourusername/revier.git
   ```

2. Installieren Sie die Abhängigkeiten:
   ```
   cd revier
   npm install
   ```

3. Erstellen Sie eine `.env` Datei im Hauptverzeichnis und fügen Sie Ihre MongoDB-Verbindungszeichenfolge hinzu:
   ```
   MONGODB_URI=mongodb://localhost:27017/revier
   ```

4. Starten Sie den Server:
   ```
   npm start
   ```

5. Öffnen Sie die Anwendung in Ihrem Browser unter `http://localhost:5000`.

## Verwendung

- Klicken Sie auf die Karte, um ein Bild hochzuladen oder eine Notiz hinzuzufügen.
- Klicken Sie auf einen Marker, um Details anzuzeigen.
- Doppelklicken Sie auf einen Bildmarker, um das Bild vergrößert anzuzeigen.
- Verwenden Sie die Schaltflächen in den Popups, um Notizen zu bearbeiten oder Elemente zu löschen.

## Technologien

- Frontend: HTML, CSS, JavaScript, Leaflet.js
- Backend: Node.js, Express.js
- Datenbank: MongoDB

## Beitrag

Pull Requests sind willkommen. Für größere Änderungen öffnen Sie bitte zuerst ein Issue, um zu besprechen, was Sie ändern möchten.

## Lizenz

[MIT](https://choosealicense.com/licenses/mit/)
