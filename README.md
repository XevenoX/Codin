# Containerized React, NodeJS, Express and MongoDB Application

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Build and start the containers:
    ```sh
    docker-compose up --build
    ```

3. Access the application:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:5050](http://localhost:5050)

4. Stop and remove the containers:
    To stop the containers, run:
    ```sh
    docker-compose down
    ```

5. Clean up unused Docker resources (optional):
    To free up disk space, you can remove unused Docker images, containers, networks, and volumes:
    ```sh
    docker system prune -a
    ```

## Additional Information

### Checking Logs

If you encounter any issues, you can check the logs of the running containers:

```sh
docker-compose logs