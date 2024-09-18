# Using baseimage as alpine linux
FROM alpine:3.18.4

# Installing tools
RUN apk add --no-cache bash nodejs npm coreutils

# Creating a user - joshtalks with the specified GID and UID
RUN addgroup -g 1000 joshtalks && \
    adduser -D -H -G joshtalks -u 1000 joshtalks

# Changing directory to /home/joshtalks
WORKDIR /home/joshtalks/server

# Copying entrypoint script to /home/joshtalks
COPY . .

# Making script executable
RUN  npm install

# Entry Point
ENTRYPOINT [ "node", "src/server.js" ]