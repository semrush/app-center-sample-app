"""
App's settings and constants.

You can set values as environment variables.
"""

from envparse import env


# Your app id
SEMRUSH_APP_ID = env.str(
    "SEMRUSH_APP_ID", default="00000000-0000-0000-0000-000000000000"
)
# Your app secret
SEMRUSH_APP_SECRET = env.str(
    "SEMRUSH_APP_SECRET", default="00000000-0000-0000-0000-000000000000"
)

# Port, on which the app backend runs.
SERVER_PORT = env.int("SERVER_PORT", default=8080)

# URL's for server-to-server API requests, you probably shouldn't change it
S2S_JWT_ISSUER_URL = env.str(
    "S2S_JWT_ISSUER_URL",
    default="https://api.semrush.com/app-center-api/v2/jwt-token/",
)
S2S_VIEWER_STATUS_URL = env.str(
    "S2S_VIEWER_STATUS_URL",
    default="https://api.semrush.com/apis/v4/app-center/v2/partner/viewer-status",
)
S2S_NOTIFICATION_BASE_URL = env.str(
    "S2S_NOTIFICATION_BASE_URL",
    default="https://api.semrush.com/apis/v4/hermes/v0",
)

# Allowed iframe url, used in Content-Security-Policy header, you probably shouldn't change it
CSP_FRAME_ANCESTOR = env.str("CSP_FRAME_ANCESTOR", default="https://*.semrush.com")
