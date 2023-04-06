
# TFC - Trybe Futebol Clube

Nesse projeto, eu construí um back-end dockerizado utilizando modelagem de dados através do Sequelize. No desenvolvimento tive que respeitar regras de negócio providas no projeto e sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto.




## Screenshots

![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQM06njAnwvTnvpOM-Ploti6yfC1PAkSe3r1UJ74kRC0Jkhe8QzTOHaGZH4IOpcC6dWThOV5xFNDGpMrhOSI6XUSvK1KgElyrtm3_VswELv8ibZ446nhc5BfTzcQe-Nw3oRCCFdN_falPQt_0dajwtd6O2MJjXjBzs5B_JFfp81pjY6jndKRtIofTk/s1600/front-example.png)


## Descrição

O TFC é um site informativo sobre partidas e classificações de futebol. Meu objetivo foi implementar as regras de negócio necessárias para popular adequadamente a tabela disponível no front-end, que será exibida para a pessoa usuária do sistema.

Desenvolvi uma API utilizando o método TDD e integrei as aplicações através do docker-compose, para que elas funcionem consumindo um banco de dados.

Para adicionar uma partida, é necessário ter um token, o que significa que a pessoa deve estar logada para fazer as alterações. Além disso, estabeleci um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

## Stack utilizada

**Front-end:** Disponibilizado pronto pela Trybe

**Back-end:** Node, Express, Docker, Sequelize, Typescript, JWT, bcrypt

**Testes:** chai, mocha, sinon
