# Run project locally with Docker Compose

## Requirements

You will need the following to start project:

* Docker (used 24.0.7 but any version should work).

## Starting the services

Put your bash into the config directory and run the following command:

```shell
docker compose up -d
```

# Run project locally with Minikube

## Requirements

You will need the following to run the project locally with Minikube :

- Minikube (used v1.32.0) ;
- Kubectl (used v1.28.4).

## Cluster setup

Firstly, start your minikube cluster with the following command :

```bash
minikube start
```

Then, you can create a namespace dedicated to the app with `kubectl` command :

```bash
kubectl create namespace app
```
## Build the Docker images and pass them inside the cluster

For the minikube cluster to start pods based on your host's Docker images, you will need to build the Docker images
first. You can use the `compose-build.yaml` file to build images :

```bash
docker compose -f compose-build.yaml build
```

Or you can build them independently with `docker build` command.

When the images are built, you will need to save them and pass them into the cluster with the following commands :

```bash
docker save poc-product:0.0.1 | (eval $(minikube docker-env) && docker load)
docker save poc-registry:0.0.1 | (eval $(minikube docker-env) && docker load)
docker save poc-gateway:0.0.1 | (eval $(minikube docker-env) && docker load)
```

Where `docker save` will create a tarball of the specified image, and `docker load`, combined with the `eval $(minikube
docker-env)`, will load the image inside minikube environment based on the tarball generated in the first part of the
command.

## Apply kubernetes configuration

Then, you will have to apply the kubernetes config files to create all the resources needed with the following command :

```bash
kubectl apply \
-f ../microservices/registry/kubernetes/deployment.yaml \
-f ../microservices/registry/kubernetes/service.yaml \
-f ../microservices/database/kubernetes/deployment.yaml \
-f ../microservices/database/kubernetes/service.yaml \
-f ../microservices/product/kubernetes/deployment.yaml \
-f ../microservices/product/kubernetes/service.yaml \
-f ../microservices/gateway/kubernetes/deployment.yaml \
-f ../microservices/gateway/kubernetes/service.yaml \
-n app
```

## Useful commands
```bash
minikube service gateway --url -n app
kubectl delete all --all -n app
```
