<img  src="https://suzdalenko-dev.github.io/HTML-CSS-ADMIN-TEMPLATE/assets/img/0.png" alt="HTML admin demplate beatiful white" width="100%" heigth="333px" />
<img  src="https://suzdalenko-dev.github.io/HTML-CSS-ADMIN-TEMPLATE/assets/img/1.png" alt="HTML admin demplate beatiful white"  width="100%" heigth="333px" />


LoadFile "C:/Python312/python312.dll"
LoadModule wsgi_module "C:/Python312/Lib/site-packages/mod_wsgi/server/mod_wsgi.cp312-win_amd64.pyd"
WSGIPythonHome "C:/Python312"

<VirtualHost *:80>
    ServerName desarrollo.local

    # Directorio raíz para peticiones que no van a Django
    DocumentRoot "C:/Apache24/htdocs"

    # Django servirá solo lo que va a /api
    WSGIScriptAlias /api "C:/suzdalenko/miapp/miapp/wsgi.py"
    WSGIApplicationGroup %{GLOBAL}

    <Directory "C:/Apache24/htdocs">
        Require all granted
    </Directory>

    <Directory "C:/suzdalenko/miapp/miapp">
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>

    ErrorLog logs/django_error.log
    CustomLog logs/django_access.log combined
</VirtualHost>

which python3
### para ubuntu

<img  src="https://suzdalenko-dev.github.io/HTML-CSS-ADMIN-TEMPLATE/assets/img/3.png" alt="HTML admin demplate beatiful white"  width="100%" heigth="333px" />

sudo apt update
sudo apt install apache2 libapache2-mod-wsgi-py3 python3 -y
/etc/apache2/sites-available/django.conf

<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName localhost

    # Archivos estáticos (sitio clásico)
    DocumentRoot /var/www/html
    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>

    # Archivos estáticos de Django (si usas collectstatic)
    Alias /static /var/www/backend/static
    <Directory /var/www/backend/static>
        Require all granted
    </Directory>

    # Django a través de mod_wsgi
    WSGIDaemonProcess backend python-path=/var/www/backend
    WSGIProcessGroup backend
    WSGIApplicationGroup %{GLOBAL}
    WSGIScriptAlias /api /var/www/backend/backend/wsgi.py

    <Directory /var/www/backend/backend>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/django_backend_error.log
    CustomLog ${APACHE_LOG_DIR}/django_backend_access.log combined
</VirtualHost>

sudo a2ensite django.conf
sudo systemctl reload apache2

sudo chown -R www-data:www-data /var/www/backend
sudo chmod -R 775 /var/www/backend

sudo tail -f /var/log/apache2/error.log

### postrgreSQL

sudo apt update

sudo apt install postgresql postgresql-contrib -y

sudo -i -u postgres
psql

-- Crear usuario 'alexey' con contraseña

CREATE USER alexey WITH PASSWORD 'froxa2030';

-- Crear una base de datos (ejemplo: miappdb)

CREATE DATABASE miappdb WITH OWNER alexey;

-- Darle privilegios completos sobre esa base de datos

GRANT ALL PRIVILEGES ON DATABASE miappdb TO alexey;

\q   -- Para salir

sudo systemctl restart postgresql

sudo apt install python3-psycopg2

DATABASES = {

    'default': {

        'ENGINE': 'django.db.backends.postgresql',

        'NAME': 'miappdb',

        'USER': 'alexey',

        'PASSWORD': 'froxa2030',

        'HOST': 'localhost',
        
        'PORT': '5432',
    }
}
