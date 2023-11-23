# birth-certificate-manager
 A birth date manager with ACL. Containing API's and UI.

# Start Application Local with Docker:
    ```
        nvm use 18 && cd node-api && npm i && cd ..

        docker-compose -f ./docker/docker-compose.dev.yml --project-directory=./ up -d

        or 

        docker-compose -f ./docker/docker-compose.dev.yml --project-directory=./ up

        npm run migration:generate && npm run migration:run 
    ```

# Connect into PgAdmin:
    ```
        docker ps
        docker inspect your_postgres_container_id_here
    ```
    In "Networks" copy value of "IPAdress", open in "localhost:5050" your PGAdmin,
    insert your credentials into login page! Click in "Add new server" and insert
    the credentials of your postgres , in host paste the value of "IPAdress"!

    Click in "save" button, you are connect in your database!
