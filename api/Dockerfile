#Não é necessario fazer build esse dockerfile para rodar aplicação
#No arquivo pod.yaml já está definido para pegar do dockerhub

FROM python:3.9

WORKDIR /code

COPY requirements.txt /code/

RUN pip install --no-cache-dir -r requirements.txt

COPY /api/ /code/

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh