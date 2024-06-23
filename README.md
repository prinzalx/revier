# Revier - Bilderkarte

Revier ist eine interaktive Webanwendung, die es Benutzern erm�glicht, Bilder und Notizen auf einer Karte zu platzieren und zu verwalten. Die Anwendung ist besonders n�tzlich f�r die Dokumentation von Beobachtungen oder Aktivit�ten in bestimmten geografischen Gebieten.

## Funktionen

1. **Interaktive Karte**: Basierend auf Leaflet.js mit Satellitenbildern von Esri.
2. **Bilder hinzuf�gen**: Benutzer k�nnen Bilder hochladen und sie an spezifischen Koordinaten auf der Karte platzieren.
3. **Notizen hinzuf�gen**: Textnotizen k�nnen ebenfalls an beliebigen Stellen auf der Karte hinzugef�gt werden.
4. **Bildergalerie**: Mehrere Bilder an einem Standort werden in einer durchbl�tterbaren Galerie angezeigt.
5. **Bearbeiten und L�schen**: Sowohl Bilder als auch Notizen k�nnen bearbeitet oder gel�scht werden.
6. **Vollbildanzeige**: Bilder k�nnen durch Anklicken in Vollbildgr��e angezeigt werden.
7. **GPX-Track-Anzeige**: M�glichkeit, einen GPX-Track auf der Karte anzuzeigen (z.B. f�r Reviergrenzen).

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

3. Erstellen Sie eine `.env` Datei im Wurzelverzeichnis und f�gen Sie die MongoDB-Verbindungs-URI hinzu:
   ```
   MONGODB_URI=mongodb://mongo:27017/revier
   ```

4. Bauen und starten Sie die Docker-Container:
   ```
   docker-compose up -d --build
   ```

5. Die Anwendung sollte nun unter `http://localhost:5000` erreichbar sein.

## Verwendung

- Klicken Sie auf die Karte, um ein Bild oder eine Notiz hinzuzuf�gen.
- Klicken Sie auf einen Marker, um Details anzuzeigen, zu bearbeiten oder zu l�schen.
- In der Bildansicht k�nnen Sie durch mehrere Bilder am selben Standort bl�ttern.
- Klicken Sie auf ein Bild, um es in Vollbildgr��e anzuzeigen.

## Entwicklung

- `public/`: Enth�lt alle Frontend-Dateien (HTML, CSS, JavaScript)
- `routes/`: Enth�lt die API-Routen f�r Bilder und Notizen
- `models/`: Enth�lt die Mongoose-Modelle f�r Bilder und Notizen
- `server.js`: Der Hauptserver-Einstiegspunkt

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe `LICENSE` Datei f�r Details.