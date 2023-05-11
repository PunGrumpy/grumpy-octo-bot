# GitHub Bot

> A GitHub App built with [Probot](https://github.com/probot/probot) that A GitHub bot work with Probot

## Setup

```sh
# Install dependencies
yarn install

# Run the bot
yarn start
```

## Docker

```sh
# 1. Build container
docker build -t github-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> github-bot
```

## Docker Compose (Optional)

```sh
# 1. Build container
docker compose up --build

# 2. Start container
docker compose up -d
```

## Contributing

If you have suggestions for how github-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2023 PunGrumpy
