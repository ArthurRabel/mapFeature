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

## Start 

## Criar secrets
Antes de rodar a aplicação é necessario criar a build e os dois secrets, para as credenciais do usuario administrador do banco e para usuario da API.

Vá para pasta `frontEnd` e digite o seguinte comando:

```bash
npm run build
```

Coloque as senhas de sua escolha nos arquivos `adminSecret.yaml` e `fastApiSecret.yaml`.

Na raiz do projeto, crie os secrets:

```bash
podman secret create adminCredential adminSecret.yaml
```

```bash
podman secret create apiCredential fastApiSecret.yaml
```

## Rodar aplicação
```bash
podman kube play pod.yaml
```

## Acessar

Você pode acessar o software pelo localhost na porta 8000.

http://localhost:8000/
