#!/bin/sh

podman pod stop map-feature-latest
podman pod rm map-feature-latest
podman secret rm adminCredential
podman secret rm apiCredential