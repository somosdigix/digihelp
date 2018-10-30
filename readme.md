#Se você estiver rodando Linux ou MacOS e obter o erro ENOSPC é só rodar o seguinte comando: #
    * echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p