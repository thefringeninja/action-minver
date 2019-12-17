FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine

RUN apk add --no-cache \
    yarn \
    git

WORKDIR /build

COPY package.json yarn.lock ./

RUN yarn

COPY ./ ./

RUN yarn tsc

RUN git init .

ENTRYPOINT ["yarn", "jest"]
