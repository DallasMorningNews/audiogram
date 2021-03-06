FROM ubuntu:16.04

# Install dependencies
RUN apt-get update --yes && apt-get upgrade --yes
RUN apt-get install curl --yes
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install git nodejs libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev libpng-dev build-essential g++ ffmpeg redis-server --yes

# Non-privileged user
RUN useradd -m audiogram
USER audiogram
WORKDIR /home/audiogram

# Clone repo
RUN git clone https://github.com/nypublicradio/audiogram.git
WORKDIR /home/audiogram/audiogram

# Install dependencies
RUN npm install
