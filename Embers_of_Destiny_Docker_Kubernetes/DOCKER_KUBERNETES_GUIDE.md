# Embers of Destiny — Docker & Kubernetes Deployment

This guide containerizes the existing React + TypeScript + TanStack Start website. It runs the production Node.js server inside Docker; it is not served as a plain static HTML file.

## Requirements

Install Docker Desktop, kubectl, and Minikube. Start Docker Desktop before running the commands below.

## 1. Build and test with Docker

Run these commands from the project root (the folder containing `Dockerfile`):

```bash
docker build -t embers-of-destiny:v1 .
docker run --rm -d --name embers-demo -p 3000:3000 embers-of-destiny:v1
```

Open http://localhost:3000. Inspect the running container and logs:

```bash
docker ps
docker logs embers-demo
docker stop embers-demo
```

## 2. Start Kubernetes locally

```bash
minikube start
kubectl get nodes
```

Build the image into Minikube's image store so the local cluster can use it without a registry:

```bash
minikube image build -t embers-of-destiny:v1 .
```

Deploy the website and service:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl rollout status deployment/embers-of-destiny
kubectl get deployments
kubectl get pods -o wide
kubectl get services
```

Open the application:

```bash
minikube service embers-of-destiny-service --url
```

Open the URL printed by Minikube. If the URL is not reachable in your terminal environment, use port forwarding instead:

```bash
kubectl port-forward service/embers-of-destiny-service 8080:80
```

Then open http://localhost:8080.

## 3. Demonstrate management

Scale from three to five replicas:

```bash
kubectl scale deployment embers-of-destiny --replicas=5
kubectl get pods
```

View deployment details and logs:

```bash
kubectl describe deployment embers-of-destiny
kubectl logs deployment/embers-of-destiny
```

Demonstrate self-healing by listing Pods, deleting one using its actual name, and watching Kubernetes replace it:

```bash
kubectl get pods
kubectl delete pod <ACTUAL_POD_NAME>
kubectl get pods -w
```

Stop watching with Ctrl+C.

## 4. Demonstrate a new version / rolling update

After changing the website, build a new image tag:

```bash
minikube image build -t embers-of-destiny:v2 .
```

Change `image: embers-of-destiny:v1` to `image: embers-of-destiny:v2` in `k8s/deployment.yaml`, then apply and verify:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl rollout status deployment/embers-of-destiny
kubectl rollout history deployment/embers-of-destiny
```

## 5. Cleanup

```bash
kubectl delete -f k8s/deployment.yaml
minikube stop
```

## Assignment summary

**Aim:** To deploy the Embers of Destiny interactive story website using Docker and Kubernetes.

**Tools:** React, TypeScript, TanStack Start, Vite, Node.js, Docker, Minikube, and kubectl.

**Demonstration:** Docker image/container creation, Kubernetes Deployment and Service, three replicas, access through NodePort/service forwarding, scaling, Pod replacement, logs, and rolling updates.

**Conclusion:** The existing web application is packaged as a Docker image and managed by Kubernetes. Replicas provide multiple application instances, the Service routes traffic to healthy Pods, and the Deployment controller maintains the desired replica count and supports rolling updates.

**Note:** This is a local Kubernetes deployment on your computer, not a public cloud deployment. Run and verify the commands on your own system; the project archive has been prepared with the configuration files but was not built or run in a live Docker/Kubernetes environment here.
