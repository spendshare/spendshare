FROM openjdk:14-jdk-alpine3.10

ENV GUROBI_INSTALL /opt/gurobi
ENV GUROBI_HOME $GUROBI_INSTALL/linux64
ENV PATH $PATH:$GUROBI_HOME/bin
ENV LD_LIBRARY_PATH ${GUROBI_HOME}/lib

ARG user=gurobi
ARG group=gurobi
ARG uid=1000
ARG gid=1000

RUN apk upgrade --update && \
  apk add --update --no-cache \
  bash \
  ca-certificates \
  gzip \
  curl \
  libc6-compat \
  wget && \
  ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2 && \
  # Add user
  addgroup -g ${gid} ${group} && \
  adduser -h /home/gurobi -u ${uid} -G ${group} -s /bin/bash -D ${user} && \
  # Install gurobi
  mkdir -p ${GUROBI_INSTALL} && \
  wget -P /home/gurobi/ http://packages.gurobi.com/8.1/gurobi8.1.1_linux64.tar.gz && \
  tar xvfz /home/gurobi/gurobi8.1.1_linux64.tar.gz  && \
  mv /gurobi811/linux64/ ${GUROBI_INSTALL} && \
  mkdir ${GUROBI_INSTALL}/linux64/scripts

USER gurobi

WORKDIR /usr/spendshare
COPY gurobi.lic /home/gurobi
COPY build/libs/gurobi-solver.jar /usr/spendshare
CMD java -jar gurobi-solver.jar
EXPOSE 4000
