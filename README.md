# Map Features

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
