#!/bin/sh

podmanversion="$(podman --version)"

if (( $(echo "${podmanversion:15:3} < 4.9" | bc -l) )); then
    echo -e "Vixe! A versão do podman está desatualizado! \nAcesse a documentação do podman para baixar uma versão superior a 4.9"
    exit 1 
fi

## Verificando se o pod ja existe
echo -e "Inicializando o projeto...\n"

podman pod exists map-feature-latest > /dev/null
if [ $? -eq 0 ]; then
    echo "Pod ja existe"    
    
    echo "Iniciando Pod..."
    podman pod start map-feature-latest > /dev/null

    bash scripts/sucessoEcho.sh
else
    echo "Projeto está sendo executado pela primeira vez."
    echo -e "Preparando o necessario para rodar... \n"

    ## Create build
    echo "Criando build..."
    cd frontEnd 
    npm run build > /dev/null
    cd ..

    echo "Criando pod..."
    podman kube play pod.yaml > /dev/null

    bash sucessoEcho.sh
fi