FROM python:3.7

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY ./main.py /app/main.py

CMD [ "python3", "main.py"]