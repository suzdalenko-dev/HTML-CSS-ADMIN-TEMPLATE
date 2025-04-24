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

<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName localhost

    # Directorio raíz para contenido estático HTML
    DocumentRoot /var/www/html

    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>

    # Alias para servir archivos estáticos de Django si haces collectstatic
    Alias /static /var/www/backend/static
    <Directory /var/www/backend/static>
        Require all granted
    </Directory>

    # Configuración de Django con mod_wsgi
    WSGIDaemonProcess backend python-path=/var/www/backend python-home=/usr
    WSGIProcessGroup backend
    WSGIApplicationGroup %{GLOBAL}

    # Montar Django en /api
    WSGIScriptAlias /api /var/www/backend/miapp/wsgi.py

    <Directory /var/www/backend/miapp>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/django_backend_error.log
    CustomLog ${APACHE_LOG_DIR}/django_backend_access.log combined
</VirtualHost>


