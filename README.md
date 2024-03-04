# ScolengoICALAPI
Une simple API qui vous permets de relier votre emploi du temps Skolengo à votre calendrier.

## Installation
### Standalone
```bash
git clone https://github.com/oriionn/ScolengoICALAPI.git
cd ScolengoICALAPI
npm install
```

### Docker
```bash
git clone 
cd ScolengoICALAPI
docker build -t scolengoicalapi .
docker run -d -e APIKEY=YOUR_API_KEY -p 3000:3000 --name scolengoicalapi -v /path/to/the/data/folder:/usr/src/app/data scolengoicalapi
```
##### Remplacez `YOUR_API_KEY` par votre clé d'API, cela vous permettra de protéger votre emploi du temps.
##### Remplacez `/path/to/the/data/folder` par le chemin absolu du dossier `data` dans lequel vous avez mis votre fichier `skolengo.json`.

## Configuration
1. Renommez le fichier `.env.example` en `.env` et modifiez les valeurs pour correspondre à votre configuration.
2. Générez un fichier pour Skolengo en utilisant [scolengo-token](https://github.com/maelgangloff/scolengo-token) et le mettre dans le dossier `data` en le nommant `skolengo.json`.

## Utilisation
### API
#### `GET /?key=YOUR_API_KEY`
Renvoie le fichier iCal de votre emploi du temps.
### Avec Google Calendar
Pour utiliser le projet avec Google Calendar, vous pouvez utiliser ce [projet](https://github.com/derekantrican/GAS-ICS-Sync) qui permets de définir une intervalle de synchronisation pour les iCal.

## License
Le projet est sous [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html).