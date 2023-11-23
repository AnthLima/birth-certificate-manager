# Iniciando aplicação com Docker:
    ```
        nvm use 18 && cd node-api && npm i && cd ..

        docker-compose -f ./docker/docker-compose.dev.yml --project-directory=./ up -d

        or 

        docker-compose -f ./docker/docker-compose.dev.yml --project-directory=./ up
    ```

## Conectando no PGAdmin:
    ```
        docker ps
        docker inspect your_postgres_container_id_here
    ```

    Em "NetWorks" copie o valor de "IPAddress", abra em "localhost:5050" seu PGAdmin e insira suas credenciais de login definidas no seu "docker.compose".Após isto clique em “Add server” e insira as credenciais do seu postgres, no host cole o valor de "IPAddress"!

    Clique no botão "salvar" e você estará conectado ao seu banco de dados!
