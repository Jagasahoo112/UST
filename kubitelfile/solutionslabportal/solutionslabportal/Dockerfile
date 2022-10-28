
FROM python:3.6
RUN mkdir /solutionlabportal
WORKDIR /solutionlabportal
ADD . /solutionlabportal
RUN apt-get update
RUN apt-get install -y --fix-missing \
   build-essential 
RUN python -m pip install -r requirements.txt
EXPOSE 8082
CMD ["python", "/solutionlabportal/application.py"]
