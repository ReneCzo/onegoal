# one.gOal ⚽

Ein mobiler Torstand-Zähler für Tischkicker im **Race-to-21-Modus** – optimiert für den Einsatz auf dem Smartphone direkt am Tisch.

## ⚽ [Hier loslegen!](https://reneczo.github.io/onegoal/Goalcounter.html)

## Features

- **Race to 21** – Zählt Tore bis 21, aufgeteilt in 3 Paarungen (Milestone bei 7, 14 und 21 Toren)
- **Spielphase-Switch** – Vorrunde (Unentschieden bei 20:20 möglich) oder KO-Phase (mind. 21 Tore und 2 Tore Vorsprung)
- **Zwei Teams** – Heimteam (one.O) und Gastteam frei konfigurierbar
- **Timer** – Stoppuhr mit Start/Pause, startet automatisch beim ersten Tor
- **Dot-Anzeige** – Visuelle Fortschrittsanzeige der Tore als Punkte-Raster (3 × 7)
- **Tor-Protokoll** – Vollständiges Log aller Tore mit Zeitstempel und Spielstand
- **Rückgängig** – Letztes Tor kann per Knopfdruck korrigiert werden
- **Teamanpassung** – Name, Farbe und Logo (URL oder Dateiupload) für beide Teams einstellbar
- **Wake Lock** – Hält den Bildschirm während des Spiels aktiv
- **PWA-ready** – Installierbar als Web-App (inkl. Android-Vollbild via Manifest + Service Worker)

## Verwendung

Einfach `Goalcounter.html` im Browser öffnen – keine Installation, kein Build-Schritt, keine Abhängigkeiten.

Oder direkt unter [reneczo.github.com](https://reneczo.github.io/onegoal/Goalcounter.html) aufrufen.

## PWA-Hinweis (Android Vollbild)

Für die Installation und den Vollbildmodus unter Android müssen folgende Bedingungen erfüllt sein:

- Gültiges `manifest.webmanifest`
- Registrierter `service-worker.js`
- Bereitstellung über **HTTPS** (oder lokal via `localhost` / `127.0.0.1` für Entwicklung)

### Spielablauf

1. Auf den Bereich des jeweiligen Teams tippen → Tor wird gezählt
2. Timer läuft automatisch mit
3. Bei 7 und 14 Toren erscheint ein Paarungswechsel-Hinweis
4. Je nach Spielphase endet das Spiel bei 20:20 (Vorrunde) oder mit Sieger nach den KO-Regeln
5. „🔄 Neu starten" setzt alles zurück

## Vorkonfigurierte Teams

| Name               | Logo                    |
|--------------------|-------------------------|
| one.O              | one.O SVG Logo          |
| Hermes             | Hermes Logo             |
| Risk.Ident         | Risk Ident Logo         |
| OTTO               | OTTO Logo               |
| mindline           | mindline Logo           |
| Mobil Krankenkasse | Mobil Krankenkasse Logo |
| Eigenes            | URL oder Datei-Upload   |

## Tech Stack

Reines HTML + CSS + Vanilla JavaScript – eine einzige Datei, keine Abhängigkeiten.
