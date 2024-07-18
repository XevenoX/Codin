# Containerized React, NodeJS, Express and MongoDB Application

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:
    git clone <repository-url>
    cd <repository-directory>

2. Build and start the containers:
    ```sh
    docker-compose up --build
    ```

3. Access the application:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:5050](http://localhost:5050)

4. To stop the containers, run:
    docker-compose down

5. Clean up unused Docker resources (optional):    
    docker system prune -a

## Additional Information

### Checking Logs
If you encounter any issues, you can check the logs of the running containers:
    docker-compose logs