# Commerce Bank Project for SE 3910

## Setup
For Windows, Mac and Linux setup may be slightly different

### Setting up the MySQL db
1. Install MySQL installer: https://dev.mysql.com/downloads/installer/
2. Run through setup with option `Developer Default`, all default options are fine
3. Open MySQL workbench, and connect to the `standard` instance
4. Start the server: Administration navigation tab -> setup / Shutdown -> start server
5. Run the script `BackEnd\SqlScripts\setupDB.sql` - this will create the database and user the back end uses


### Running the back end
Run the following commands starting from the root folder of the project:
1. `cd BackEnd`
2. `.\gradlew bootrun`


### Running the front end
Run the following commands starting from the root folder of the project:
1. `cd FrontEnd`
2. `npm install` (Only needed if packages out-of-date)
3. `npm start`
4. Go to `localhost:3000` to see the webpage