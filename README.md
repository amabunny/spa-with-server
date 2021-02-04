____
Как запустить проект
____

1. Для работы с проектом необходимы установленные:
* Node.JS
* Yarn
* NPM
* Docker
* Git

2. Склонировать репозиторий: <br>
   <code>
   git clone https://github.com/amabunny/spa-with-server
   </code>
   
3. Войти в директорию проекта: <br>
   <code>
   cd spa-with-server
   </code>
   
4. Запустить yarn для установки зависимостей проекта <br>
    <code>
   yarn
   </code>

5. Открыть отдельное окно терминала для запуска базы 
   данных через docker: <br>
   <code>
   docker-compose up
   </code>
   
6. Запустить миграции базы данных (в исходном терминале)
   <code> yarn migrate </code>

7. Запустить сиды базы данных (для базового наполнения данными) <br>
    <code> yarn seed </code>
   
8. Запустить проект:<br>
   <code> yarn dev </code>