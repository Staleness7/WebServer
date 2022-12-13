#FROM node:12.9-buster
FROM node:8.15.1

COPY ../ /app
WORKDIR /app
ENV NODE_PATH=/opt/node_modules

#RUN apt-get -qq update \
#    && apt-get install -qq util-linux git zsh curl wget unzip tcpdump \
#    && chsh -s /bin/zsh \
#    && zsh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)" \
#    && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
#    && git clone https://github.com/zsh-users/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
#    && sed -i "s/plugins=(git)/plugins=(git zsh-syntax-highlighting zsh-autosuggestions docker kubectl brew golang history nmap node npm pip pipenv pyenv pylint python screen sublime)/g" ~/.zshrc
#
#RUN curl -fsSL https://code-server.dev/install.sh | sh

#RUN npm install pm2 -g
#RUN npm --registry http://registry.npmmirror.com install pm2 -g
RUN npm --registry http://registry.npmmirror.com install -d

RUN mv /app/node_modules /opt/node_modules \
  && mkdir -p /root/.config/code-server/

#CMD ["/usr/bin/code-server"]
CMD ["npm", "run", "start"]