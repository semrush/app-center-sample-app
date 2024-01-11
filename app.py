"""
Main file, configures app and starts web server.
"""
from typing import Callable

from aiohttp import web

import config
import handlers


@web.middleware
async def disable_cache_middleware(request: web.Request, handler: Callable):
    """
    Middleware that disables caching in browser for easier development
    """
    response = await handler(request)
    response.headers["Cache-Control"] = "no-cache"
    return response


# This is an application entrypoint
if __name__ == "__main__":
    app = web.Application(middlewares=[disable_cache_middleware])

    # Routes -> Handlers mapping.
    app.add_routes(
        [
            web.get("/", handlers.index_page),
            web.get("/s2s/issuer", handlers.get_jwt_from_issuer),
            web.get("/s2s/viewer_status", handlers.get_viewer_status),
            web.get("/s2s/subscriptions-list", handlers.subscriptions_list),
            web.get("/s2s/subscriptions-status", handlers.subscriptions_status),
            web.post("/s2s/send-notification", handlers.send_notification),
            web.get("/api/report", handlers.report),
            web.static("/static/", "./static"),
        ]
    )

    # Run server
    web.run_app(app, port=config.SERVER_PORT)
