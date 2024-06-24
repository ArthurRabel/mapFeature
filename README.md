# Map Feature

Este projeto é uma aplicação web full stack, que possui funcionalidades para criar e remover feições em um mapa, utilizando a biblioteca OpenLayers. O front-end é servido por um servidor e reverse proxy NGINX, enquanto o back-end é construído com FastAPI. O sistema utiliza PostgreSQL como banco de dados.

Na raiz do projeto, o arquivo `pod.yaml` configura um pod, com um container para Front-End, dois para Api e um para o banco de dados. Os dois containers API dividem as requisições por Round-robin.

## Tecnologias utilizadas:
- Python
- FastApi
- JavaScript
- React
- Redux
- OpenLayers
- PostgreSql
- PostGis
- Podman
- Nginx

## Comandos utéis

Os comandos a seguir devem ser executados no terminal na raiz do projeto.

> [!WARNING]
> Necessário que o podman esteja instalado na versão mais recente.

### Run

Cria os secrets, build e o pod caso seja a primeira vez sendo executado, se o pod já existir ele apenas inicializará.
```bash 
bash Run.sh
```

### Stop

Para a execução do pod:
```bash
bash Stop.sh
```

### Remove

Remove o pod e o secrets:

```bash 
bash Remove.sh
```

## Acessar

Você pode acessar o software pelo localhost na porta 8000.

http://localhost:8000/
