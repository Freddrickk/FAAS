# Fuzzing as a service (FAAS)

Fuzzing as a service is a fuzzing service for non-tech-savies who want to perform
security testing on their applications using a user-friendly web ui.


# Start the project

Build the images and start the project.

```
$ docker-compose build --no-cache
```

Initialise the database

```
$ docker-compose run backend python manage.py migrate
$ docker-compose run backend python manage.py createsuperuser
```

Start the stack

```
$ docker-compose up
```

Please note for the next instructions that if you run docker on another os than Linux, use the VM IP address instead of localhost.

The web app now run on
```
localhost:8080/
```

Django now listens on port 8000 or on the /api url

```
localhost:8080/api
```
or
```
localhost:8000
```

# Consult the API documentation
```
localhost:8080/api/docs/
```

# Run command inside container

```
$ docker-compose run [container_name] [shell_command]

# Example
$ docker-compose run python manage.py
```




