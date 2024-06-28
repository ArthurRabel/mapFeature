#!/bin/sh

podman pod exists map-feature-latest > /dev/null

if [ $? -eq 0 ]; then

    bash scripts/stop.sh

    echo "Removendo o pod..."
    podman pod rm map-feature-latest

    echo "Removendo os secrets..."
    podman secret rm adminCredential
    podman secret rm apiCredential

else

    echo "Pod não existe."

fi