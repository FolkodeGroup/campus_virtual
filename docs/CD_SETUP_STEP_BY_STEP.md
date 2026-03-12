# Paso a paso para configurar el CD Pipeline (GitHub Actions)

## 1. Prepara tu cuenta de DockerHub
- Crea una cuenta en https://hub.docker.com si no tienes una.
- Ve a tu perfil > Security > New Access Token y genera un token (Personal Access Token).

## 2. Prepara tu VPS
- Asegúrate de tener Docker y Docker Compose V2 instalados:
  - `sudo apt update && sudo apt install docker.io docker-compose-plugin`
- Crea el directorio del proyecto: `mkdir -p ~/campus_virtual`
- Añade tu clave pública SSH a `~/.ssh/authorized_keys` en el VPS.

## 3. Obtén tu clave privada SSH
- En tu máquina local, ejecuta:
  - Si no tienes una clave SSH, créala:
    ```bash
    ssh-keygen -t rsa -b 4096 -C "tu_email@dominio.com"
    ```
    (Deja la ubicación por defecto: `~/.ssh/id_rsa` y la passphrase vacía para uso automatizado)
  - Para obtener el contenido de la clave privada:
    ```bash
    cat ~/.ssh/id_rsa
    ```
  - Para obtener la clave pública (para el VPS):
    ```bash
    cat ~/.ssh/id_rsa.pub
    ```
- Copia la clave pública al VPS:
  ```bash
  ssh-copy-id -i ~/.ssh/id_rsa.pub usuario@VPS_HOST
  ```
- Copia el contenido de la clave privada para usarlo como secreto en GitHub.

## 4. Configura los secretos en GitHub
- Ve a tu repositorio en GitHub > Settings > Secrets and variables > Actions.
- Añade los siguientes secretos:
  - `DOCKERHUB_USERNAME`: Tu usuario de DockerHub.
  - `DOCKERHUB_TOKEN`: El token generado en DockerHub.
  - `VPS_HOST`: IP o dominio del VPS.
  - `VPS_USERNAME`: Usuario SSH del VPS (ej. `ubuntu`, `root`).
  - `VPS_SSH_KEY`: Tu clave privada SSH (sin saltos de línea extra, formato PEM).
  - `DATABASE_URL`: URL de conexión a la base de datos de producción.
    - Si aún no tienes una base, puedes usar un placeholder temporal:
      ```
      postgresql://usuario:contraseña@localhost:5432/campus_virtual
      ```
    - Cuando tengas la base real, actualiza este secreto con la cadena de conexión correcta.

## 5. Verifica el archivo docker-compose.prod.yml
- Asegúrate de que esté en el directorio raíz del VPS (`~/campus_virtual`).
- Si necesitas copiarlo manualmente, usa:
  - `scp docker-compose.prod.yml usuario@VPS_HOST:~/campus_virtual/`

## 6. Prueba el pipeline
- Haz un push a la rama `main`.
- Revisa la pestaña **Actions** en GitHub para ver el progreso.
- El pipeline debe:
  - Construir y subir imágenes Docker a DockerHub.
  - Conectarse al VPS vía SSH y actualizar los contenedores.

## 7. Troubleshooting
- Si falla el deploy, revisa los logs en GitHub Actions.
- Verifica que los secretos estén correctamente configurados y que el usuario SSH tenga permisos para ejecutar Docker.

---

**¡Listo! Tu despliegue continuo está configurado.**
