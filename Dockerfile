# Build Stage
FROM docker.io/library/node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG REACT_APP_BACKEND_URL
RUN REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL npm run build

# Production Stage
FROM docker.io/library/nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# Copy custom nginx config to handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
