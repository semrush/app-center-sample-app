# Sample app repository

This is a sample application to demonstrate the capabilities of the Semrush App Center API. 
It was built on Python backend and React TypeScript frontend, 
because it's the most popular stack. You can use any other technologies—for example,
vanilla JS.

# Starting the application

## Requirements

*  Node.js version `18` or higher.
*  Python version `3.11` or higher.
*  Registered **test** app in Semrush App Center.
   [Learn how to register ›](https://www.semrush.com/apps/docs/join-appcenter).

## Step 1. Create a virtual environment

```bash
python3 -m venv .venv
. .venv/bin/activate
```

## Step 2. Install Python requirements

```bash
pip install -r requirements.txt
```

## Step 3. Install frontend requirements and build the frontend

```bash
cd frontend; npm install; npm run build
```

## Step 4. Run the application

1.  Using your test application ID and secret, as a quick solution, replace the `SEMRUSH_APP_ID` and 
    `SEMRUSH_APP_SECRET` "default" field in [config.py](./config.py).
    For a more secure solution, set them as environment variables. 
    This step is necessary to make JWT validation work properly. 
    Without this step, Semrush iframe will be creating JWTs signed with your app secret, 
    and this app will try to verify them using the incorrect app secret value.
1.  Start the backend:
    ```bash
    python3 app.py
    ```

The default backend port is `8080`, defined in [config.py](./config.py).

## Step 5. Connect to your application from the Semrush iframe

1. Ask the App Center Team to change your test app iframe URL in Semrush to `http://localhost:8080`.
1. Open your application page in Semrush and see this app running in the iframe.

# Development

## Edit the frontend

When editing the frontend, rebuild it after each edit:

```bash
cd frontend; npm run build
```
