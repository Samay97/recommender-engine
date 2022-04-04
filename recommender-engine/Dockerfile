FROM python:3.7

WORKDIR /app
ENV FLASK_APP=app.py

COPY requirements.txt /app/requirements.txt
RUN pip3 install -r requirements.txt

COPY . /app/

EXPOSE 5000
CMD [ "python", "app.py" ]