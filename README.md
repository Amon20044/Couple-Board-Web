# CoupleBoard Microservices

A microservices-based backend for the CoupleBoard application, using NGINX for reverse proxy routing. This architecture ensures scalability, modularity, and ease of deployment across services.

## 🔍 Project Links

- **Frontend Live**: [https://couple-board-web.vercel.app](https://couple-board-web.vercel.app)
- **Backend GitHub**: [CoupleBoard Microservices](https://github.com/Amon20044/CoupleBoard-microservices)

## 🚀 Features

- **Modular Microservices**: Separate services for auth, albums, media, etc.
- **Reverse Proxy**: Centralized routing via NGINX.
- **Docker-first**: Fully containerized using Docker Compose.
- **Scalable Architecture**: Easy to add new services.

## 📂 Folder Structure

```bash
CoupleBoard-microservices/
├── src/                    # Microservices directory
│   ├── albums-service/
│   ├── auth-service/
│   ├── media-service/
│   ├── nginx-service/  # NGINX reverse proxy config
│   └──       └── nginx.conf             
├── docker-compose.yaml    # Compose setup for all services
└── README.md
```

## 🚪 Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 👤 Contributing

Pull requests and suggestions are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## 📄 License

[MIT License](LICENSE)

