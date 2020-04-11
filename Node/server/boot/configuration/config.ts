module.exports = {
    "localhost": {
        "privateKey": "myprivatekey",
        "token": "12345",
        "connection_path": "mongodb://localhost/test",
        "config_id": "development",
        "app_name": "my app",
        "app_desc": "my app desc",
        "port": 2000,
        "json_indentation": 4,
        "database": "my-app-db-dev",
        "user": {
            "email": "bear-wolf@ukr.net",
            "login": "bear-wolf@ukr.net",
            "password": "14714711",
            "firstName": "Andrew",
            "secondName": "B",
            "middleName": "M"
        }
    },
    "development": {
        "connection_path": "mongodb+srv://root:14714711@cluster0-mkg8c.mongodb.net/test?retryWrites=true&w=majority",
        "config_id": "development",
        "app_name": "my app",
        "app_desc": "my app desc",
        "port": 2000,
        "json_indentation": 4,
        "database": "my-app-db-dev"
    },
    "testing": {
        "config_id": "testing",
        "database": "my-app-db-test"
    },
    "staging": {
        "config_id": "staging",
        "port": 8080,
        "database": "my-app-db-stag"
    },
    "production": {
        "config_id": "production",
        "port": 8080,
        "database": "my-app-db-prod"
    }
}
