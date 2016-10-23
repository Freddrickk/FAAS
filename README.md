# Fuzzing as a service (FAAS)

Fuzzing as a service is a fuzzing service for non-tech-savies who want to perform
security testing on their applications using a user-friendly web ui.


# Start the project

Build the images and start the project.

```
$ docker-compose build
```

Initialise the database

```
$ docker-compose run python manage.py
```

Start the stack

```
$ docker-compose up
```

Webpack-dev-server now listens on port 8080

```
localhost:8080
```

Django now listens on port 8000 or on the /api url

```
localhost:8080/api
```
or
```
localhost:8000
```

# Run command inside container

```
$ docker-compose run [container_name] [shell_command]

# Example
$ docker-compose run python manage.py
```




