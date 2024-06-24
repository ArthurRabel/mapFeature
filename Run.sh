#!/bin/sh

## Verificando se o pod ja existe
echo "Verificando se o pod ja existe..."
printf "\n"
podman pod exists map-feature-latest > /dev/null
if [ $? -eq 0 ]; then
    echo "Pod ja existe"    
    
    echo "Iniciando Pod..."
    podman pod start map-feature-latest > /dev/null

    bash sucessoEcho.sh
else
    echo "Projeto está sendo executado pela primeira vez."
    echo "Preparando os requisitos..."

    ## Create secrets
    echo "Criando secrets..."
    podman secret create adminCredential adminSecret.yaml > /dev/null
    podman secret create apiCredential fastApiSecret.yaml > /dev/null

    ## Create build
    echo "Criando build..."
    cd frontEnd 
    npm run build > /dev/null
    cd ..

    echo "Criando pod..."
    podman kube play pod.yaml > /dev/null

    bash sucessoEcho.sh
fi