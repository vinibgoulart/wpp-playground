# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.3.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3 chromium chromium-sandbox

# Copy application code
COPY --link . .

# Install dependencies including dev dependencies
RUN yarn install --frozen-lockfile

# Build application
RUN yarn run build

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y chromium chromium-sandbox && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3001
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"
CMD [ "yarn", "run", "start" ]
