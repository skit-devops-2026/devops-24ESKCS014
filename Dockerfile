# Use Nginx Alpine image for high performance static file serving
FROM nginx:alpine

# Copy custom Nginx configuration for API proxying and SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend static assets to default Nginx HTML root directory
COPY index.html script.js style.css /usr/share/nginx/html/
COPY images /usr/share/nginx/html/images/
COPY job /usr/share/nginx/html/job/

# Expose web server port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
