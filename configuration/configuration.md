## Project Initialization on Minikube

You will need the following to start project:
* Docker (used 24.0.7 but any version should work).

Firstly you need to build the angular project in the frontend folder with the following command :
### Build Angular project
```bash
ng build
```

### Starting the services
Put your bash into the config directory and run the following command:
```shell
docker compose up -d
```

### Cluster setup
Firstly, start your minikube cluster with the following command :
```bash
minikube start
```
Then, you can create a namespace dedicated to the app with `kubectl` command :
```bash
kubectl create namespace app
```

### Build the Docker images and pass them inside the cluster
For the minikube cluster to start pods based on your host's Docker images, you will need to build the Docker images
first. You can use the `compose-build.yaml` file to build images :

```bash
docker compose -f compose-build.yaml build
```

When the images are built, you will need to save them and pass them into the cluster with the following commands :
```bash
docker save poc-product:0.0.1 | (eval $(minikube docker-env) && docker load)
docker save poc-registry:0.0.1 | (eval $(minikube docker-env) && docker load)
docker save poc-gateway:0.0.1 | (eval $(minikube docker-env) && docker load)
docker save poc-frontend:0.0.1 | (eval $(minikube docker-env) && docker load)
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
-f ../frontend/kubernetes/deployment.yaml \
-f ../frontend/kubernetes/service.yaml \
-f ../frontend/kubernetes/ingress.yaml \
-n app
```

### Enjoy your pods
Now you can check your pods with the following command :
```bash
minikube dashboard
```

And now you can try the project with the following command to get the URL of the ingress :

### Enable Ingress addons on minikube
```bash
minikube addons enable ingress
```
### Open a tunnel to Minikube to access the Ingress Controller.
```bash
minikube tunnel
```

### Alternatively, if it still doesn't work, modify the host file on your machine.
* Windows: C:\Windows\System32\drivers\etc\hosts
* Linux: /etc/hosts
* macOS: /private/etc/hosts

you can add : 127.0.0.1 app.local

### 🎉 Congratulation you can get the application with the following url :
```
 http://app.local/
```

## Useful commands
```bash
minikube service gateway --url -n app
kubectl delete all,ingress --all -n app
```
