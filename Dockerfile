From node

WORKDIR /app

ADD ./hosted_graphite_plugin /app
ADD ./node_modules /app
ADD ./budget.json /app
ADD ./config.json /app
ADD ./Dockerfile /app
ADD ./epicgames.txt /app
ADD ./gulpfile.js /app
ADD ./requirements.txt /app
ADD ./runSpeedTest.sh /app

EXPOSE 80
