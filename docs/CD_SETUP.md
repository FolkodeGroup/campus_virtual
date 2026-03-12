# Configuración de CD (GitHub Actions)

Para que el CD Pipeline funcione correctamente, debes configurar los siguientes secretos en tu repositorio de GitHub (**Settings > Secrets and variables > Actions**):

### DockerHub
- `DOCKERHUB_USERNAME`: Tu usuario de DockerHub.
- `DOCKERHUB_TOKEN`: Token de acceso de DockerHub (Personal Access Token).

### VPS (Servidor)
- `VPS_HOST`: Dirección IP o dominio de tu servidor.
- `VPS_USERNAME`: Usuario para acceder vía SSH (ej. `ubuntu`, `root`).
- `VPS_SSH_KEY`: Tu clave privada SSH (contenido de `~/.ssh/id_rsa`). Asegúrate de añadir la clave pública correspondiente a `~/.ssh/authorized_keys` en el VPS.
- `DATABASE_URL`: URL de conexión a la base de datos de producción (necesaria para el backend).

### Pasos en el VPS
1. Crea el directorio del proyecto: `mkdir -p ~/campus_virtual`.
2. Clona el archivo `docker-compose.prod.yml` en ese directorio o usa el comando `scp` en el workflow para copiarlo antes de hacer `docker-compose up`.
3. Asegúrate de tener instalado **Docker** y **Docker Compose V2**.
