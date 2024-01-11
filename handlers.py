"""
Handlers for app's routes.
"""
import json
import logging
import uuid
from base64 import b64encode
from datetime import datetime
from functools import wraps
from typing import Callable

import jwt
from aiohttp import ClientSession
from aiohttp import web

import config

logger = logging.getLogger(__name__)


def pretty_print_json(obj: dict) -> str:
    return json.dumps(obj, indent=4)


def validate_jwt(handler: Callable) -> Callable:
    """
    Iframe JWT validation decorator. Passes decoded jwt body
    to decorated handler in 'parsed_iframe_jwt' parameter.
    """

    @wraps(handler)
    async def handler_with_validation(request: web.Request):
        encoded_token = request.url.query.get("jwt", "")

        if not encoded_token:
            encoded_token = request.headers.get("jwt", "")

        if not encoded_token:
            raise web.HTTPForbidden(
                text="There is no 'jwt' parameter in query"
                ", make sure that you opened app within Semrush iframe"
            )

        try:
            decoded_token = jwt.decode(
                encoded_token,
                algorithms=["HS256"],
                audience=config.SEMRUSH_APP_ID,
                key=config.SEMRUSH_APP_SECRET,
            )
        except jwt.InvalidSignatureError:
            raise web.HTTPForbidden(
                text="JWT signature is invalid. Make sure that you've set"
                " SEMRUSH_APP_ID and SEMRUSH_APP_SECRET values in"
                " config.py to app id and secret of your test app."
            )
        except jwt.PyJWTError as e:
            raise web.HTTPForbidden(text=f"JWT is invalid: {e}")
        return await handler(request, parsed_iframe_jwt=decoded_token)

    return handler_with_validation


@validate_jwt
async def index_page(request: web.Request, parsed_iframe_jwt: dict) -> web.FileResponse:
    """
    Index page handler. Renders main app page. Sets up JavaScript SDK.
    See static/index.html.
    https://www.semrush.com/apps/docs/integration/development#set-up-javascript-sdk
    """
    return web.FileResponse(
        path="./static/index.html",
        headers={
            "Content-Security-Policy": f"frame-ancestors {config.CSP_FRAME_ANCESTOR};"
        },
    )


@validate_jwt
async def get_jwt_from_issuer(
    request: web.Request, parsed_iframe_jwt: dict
) -> web.Response:
    """
    Handler for "Get JWT from Issuer" button
    """
    try:
        s2s_jwt = await _get_jwt_from_issuer()
        return web.json_response(s2s_jwt, dumps=pretty_print_json)
    except Exception as e:
        return web.HTTPServerError(body=f"Python exception: {e}")


@validate_jwt
async def get_viewer_status(
    request: web.Request, parsed_iframe_jwt: dict
) -> web.Response:
    """
    Handler for "Get Viewer Status Report" button
    https://www.semrush.com/apps/docs/server-to-server-api/viewer-status
    """
    try:
        s2s_jwt = await _get_jwt_from_issuer()

        async with ClientSession() as session:
            async with session.post(
                config.S2S_VIEWER_STATUS_URL,
                headers={"Authorization": f"Bearer {s2s_jwt['jwt']}"},
                json={"user_id": parsed_iframe_jwt["viewer_id"]},
            ) as response:
                if response.status != 200:
                    raise Exception(
                        f"{response.status}\n"
                        f"Bad response from Viewer Status:\n\n"
                        f"{await response.text()}"
                    )
                return web.json_response(await response.json(), dumps=pretty_print_json)
    except Exception as e:
        return web.HTTPServerError(body=f"Python exception: {e}")


async def _get_jwt_from_issuer() -> dict:
    """
    Getting jwt token to authorize server-to-server api requests
    https://www.semrush.com/apps/docs/server-to-server-api/bearer-token
    """
    token_for_request = jwt.encode(
        algorithm="HS256",
        key=config.SEMRUSH_APP_SECRET,
        payload={
            "iss": config.SEMRUSH_APP_ID,
            "aud": "app-center",
            "iat": datetime.timestamp(datetime.now()),
        },
    )

    async with ClientSession() as session:
        async with session.post(
            config.S2S_JWT_ISSUER_URL, json={"jwt": token_for_request}
        ) as response:
            if response.status != 200:
                raise Exception(
                    f"{response.status}\n"
                    f"Bad response from JWT Issuer:\n\n"
                    f"{await response.text()}"
                )
            return await response.json()  # will return dict {"jwt": "..."}


@validate_jwt
async def report(request: web.Request, parsed_iframe_jwt: dict) -> web.Response:
    """
    Returns JSON with user report data
    https://www.semrush.com/apps/docs/email-reports#reference
    """
    return web.json_response(
        {
            "url": "reports-preview",  # this is url of your report page in app
            "tables": [
                {
                    "header": ["Domain", "Visibility", "Change"],
                    "body": [
                        ["some-site.com", "0.00%", "0.00%"],
                        ["other-site.com", "0.45%", "2.55%"],
                    ],
                },
                {
                    "header": ["Domain", "Traffic", "Change"],
                    "body": [
                        ["some-site.com", "0.00%", "0.00%"],
                        ["other-site.com", "0.45%", "2.55%"],
                    ],
                },
            ],
        },
        dumps=pretty_print_json,
    )


@validate_jwt
async def subscriptions_list(
    request: web.Request, parsed_iframe_jwt: dict
) -> web.Response:
    """
    Returns a list of available mailings for this application
    https://www.semrush.com/apps/docs/server-to-server-api/notifications#available-subscriptions
    """
    try:
        s2s_jwt = await _get_jwt_from_issuer()

        async with ClientSession() as session:
            async with session.get(
                f"{config.S2S_NOTIFICATION_BASE_URL}/subscriptions",
                headers={"Authorization": f"Bearer {s2s_jwt['jwt']}"},
            ) as response:
                if response.status != 200:
                    return web.HTTPServerError(body=await response.text())
                return web.json_response(await response.json(), dumps=pretty_print_json)
    except Exception as e:
        logger.error(e)
        return web.HTTPServerError(body=json.dumps({"exception": e}))


@validate_jwt
async def subscriptions_status(
    request: web.Request, parsed_iframe_jwt: dict
) -> web.Response:
    """
    Requests the user's subscription status for a specific mailing
    https://www.semrush.com/apps/docs/server-to-server-api/notifications#subscription-status
    """
    try:
        s2s_jwt = await _get_jwt_from_issuer()
        subscription_id = request.url.query["subscription_id"]
        user_id = parsed_iframe_jwt.get("viewer_id")

        async with ClientSession() as session:
            async with session.get(
                f"{config.S2S_NOTIFICATION_BASE_URL}/user/{user_id}/subscription/{subscription_id}",
                headers={"Authorization": f"Bearer {s2s_jwt['jwt']}"},
            ) as response:
                if response.status != 200:
                    return web.HTTPServerError(body=await response.text())
                return web.json_response(await response.json(), dumps=pretty_print_json)
    except Exception as e:
        logger.error(e)
        return web.HTTPServerError(body=json.dumps({"exception": e}))


@validate_jwt
async def send_notification(
    request: web.Request, parsed_iframe_jwt: dict
) -> web.Response:
    """
    Sends a mailing to a specific user
    https://www.semrush.com/apps/docs/server-to-server-api/notifications#sending-notification
    """
    try:
        s2s_jwt = await _get_jwt_from_issuer()
        user_id = parsed_iframe_jwt.get("viewer_id")
        trigger = request.url.query["trigger"]
        message_id = uuid.uuid4().hex  # store it to check message status
        data = b64encode(json.dumps({}).encode("utf-8")).decode("utf-8")

        async with ClientSession() as session:
            async with session.post(
                f"{config.S2S_NOTIFICATION_BASE_URL}/event",
                headers={"Authorization": f"Bearer {s2s_jwt['jwt']}"},
                json={
                    "type": trigger,
                    "id": message_id,
                    "userId": user_id,
                    "data": data,
                },
            ) as response:
                if response.status != 201:
                    return web.HTTPServerError(body=await response.text())
                return web.json_response(await response.json(), dumps=pretty_print_json)
    except Exception as e:
        logger.error(e)
        return web.HTTPServerError(body=json.dumps({"exception": e}))
