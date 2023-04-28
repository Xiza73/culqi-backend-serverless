# Culqi Backend Serverless

## Requisitos

- [Node.js](https://nodejs.org/en/) v18.x o superior
- npm v9.x o superior
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
- [AWS CLI](https://aws.amazon.com/cli/)

## Instalación

```bash
npm install
```

## Configuración

### Configuración de AWS

En caso de no estar configurado AWS CLI en un entorno local, es necesario configurar las credenciales de AWS para poder desplegar la aplicación en AWS Lambda.

- Tener una cuenta de AWS y AWS IAM User con permisos de administrador, de este último obtener las credenciales de acceso (Access Key ID y Secret Access Key).

- Configurar las credenciales de AWS con el comando `aws configure` o creando el archivo `~/.aws/credentials` con el siguiente contenido:

```bash
aws_access_key_id = <ACCESS_KEY_ID>
aws_secret_access_key = <SECRET_ACCESS_KEY>
```

### Variables de entorno

- Crear un archivo `.env` en la raíz del proyecto con el contenido del archivo `.env.example`, y reemplazar los valores de las variables de entorno con los valores correspondientes.

## Despliegue

```bash
npm run deploy
```

## Ejecución de pruebas unitarias

```bash
npm run test
```

## Endpoints

### Generar token de tarjeta

```bash
POST - https://em2lwqwscb.execute-api.us-west-2.amazonaws.com/dev/generate-token
```

#### Request

- Headers

  ```js
  {
    'Content-Type': 'application/json',
    'connection-token': 'pk_test_0ae8dW2FpEAZlxlz'
  }
  ```

- Body

  ```json
  {
    "card_number": "string",
    "email": "string",
    "expiration_month": "string",
    "expiration_year": "string",
    "cvv": "string"
  }
  ```

#### Response

```js
{
  token: string,
}
```

### Obtener datos de tarjeta

```bash
GET - https://em2lwqwscb.execute-api.us-west-2.amazonaws.com/dev/credit-card
```

#### Request

- Headers

  ```js
  {
    'Content-Type': 'application/json',
    'connection-token': 'pk_test_0ae8dW2FpEAZlxlz',
    Authorization: 'Bearer <token>'
  }
  ```

#### Response

```js
{
  card_number: string,
  email: string,
  expiration_month: string,
  expiration_year: string,
}
```
