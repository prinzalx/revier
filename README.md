# Revier - Bilderkarte

Revier ist eine interaktive Webanwendung, die es Benutzern ermöglicht, Bilder und Notizen auf einer Karte zu platzieren und zu verwalten. Die Anwendung ist besonders nützlich für die Dokumentation von Beobachtungen oder Aktivitäten in bestimmten geografischen Gebieten.

## Funktionen

1. **Interaktive Karte**: Basierend auf Leaflet.js mit Satellitenbildern von Esri.
2. **Bilder hinzufügen**: Benutzer können Bilder hochladen und sie an spezifischen Koordinaten auf der Karte platzieren.
3. **Notizen hinzufügen**: Textnotizen können ebenfalls an beliebigen Stellen auf der Karte hinzugefügt werden.
4. **Bildergalerie**: Mehrere Bilder an einem Standort werden in einer durchblätterbaren Galerie angezeigt.
5. **Bearbeiten und Löschen**: Sowohl Bilder als auch Notizen können bearbeitet oder gelöscht werden.
6. **Vollbildanzeige**: Bilder können durch Anklicken in Vollbildgröße angezeigt werden.
7. **GPX-Track-Anzeige**: Möglichkeit, einen GPX-Track auf der Karte anzuzeigen (z.B. für Reviergrenzen).

## Technische Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Kartenbibliothek**: Leaflet.js
- **Backend**: Node.js mit Express.js
- **Datenbank**: MongoDB
- **Container**: Docker

## Installation und Setup

1. Klonen Sie das Repository:
   ```
   git clone https://github.com/yourusername/revier.git
   ```

2. Navigieren Sie in das Projektverzeichnis:
   ```
   cd revier
   ```

3. Erstellen Sie eine `.env` Datei im Wurzelverzeichnis und fügen Sie die MongoDB-Verbindungs-URI hinzu:
   ```
   MONGODB_URI=mongodb://mongo:27017/revier
   ```

4. Bauen und starten Sie die Docker-Container:
   ```
   docker-compose up -d --build
   ```

5. Die Anwendung sollte nun unter `http://localhost:5000` erreichbar sein.

## Verwendung

- Klicken Sie auf die Karte, um ein Bild oder eine Notiz hinzuzufügen.
- Klicken Sie auf einen Marker, um Details anzuzeigen, zu bearbeiten oder zu löschen.
- In der Bildansicht können Sie durch mehrere Bilder am selben Standort blättern.
- Klicken Sie auf ein Bild, um es in Vollbildgröße anzuzeigen.

## Entwicklung

- `public/`: Enthält alle Frontend-Dateien (HTML, CSS, JavaScript)
- `routes/`: Enthält die API-Routen für Bilder und Notizen
- `models/`: Enthält die Mongoose-Modelle für Bilder und Notizen
- `server.js`: Der Hauptserver-Einstiegspunkt

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe `LICENSE` Datei für Details.