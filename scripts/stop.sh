#!/bin/sh

podmanversion="$(podman pod inspect map-feature-latest | grep "State" | head -n 1 | awk '{print $2}')"

if [ "${podmanversion:1:-2}" = "Running" ]; then
    echo "Parando pod..."
    podman pod stop map-feature-latest
    echo "Pod parado com sucesso!"
else
    echo "O pod não está em execução!"
fi