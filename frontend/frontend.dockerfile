FROM node:16

WORKDIR /frontend

COPY package*.json ./

# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

RUN npm install
RUN npm install -g @quasar/cli
RUN npm install codemirror vue-codemirror --save
# копируем исходный код
COPY ./ /frontend
# VOLUME ./ /frontend
# EXPOSE 9000

CMD [ "quasar", "dev"] 
#, "-m", "pwa"]
#RUN ls
#RUN quasar dev