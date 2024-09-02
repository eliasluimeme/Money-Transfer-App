FROM python:3.11-slim

# Set environment variables
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /usr/src/server_side

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev gcc \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /usr/src/server_side/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project into the container
COPY . /usr/src/server_side/

# Collect static files
# RUN python manage.py collectstatic --noinput

# Run database migrations
# RUN python manage.py makemigrations
# RUN python manage.py migrate

# Command to run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
