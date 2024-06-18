# Map Features

## Criar secrets
Antes de rodar a aplicação é necessario criar dois secrets, para as credenciais do usuario administrador do banco e para usuario da API.

Coloque as senhas de sua escolha nos arquivos `adminSecret.yaml` e `fastApiSecret.yaml`.

Crie os secrets:

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
