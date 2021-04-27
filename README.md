# Fullstack-backend
### Projeto FullStack - Parte 1

O projeto fullstack tem duas separações conceituais interessantes, que ficarão ao seu gosto. Aqui na Labenu gostamos muito de **músicas** e de **imagens**, então vamos criar um sistema que gerencie músicas **`ou`** imagens. Ou seja, caso você goste mais de imagens, fará com imagens. Se preferir músicas, a aplicação será com músicas! 

É interessante que você siga os passos **na ordem em que estão escritos**. Além disso, o projeto seguirá por mais algumas semanas, e terá mais duas partes para quem terminar cada uma delas. Pode relaxar, pois vamos ter bastante tempo para deixar tudo bem completinho, e você não precisa terminar tudo na semana em que recebe. Abaixo há uma explicação dos fluxos necessários para o projeto:

**Autenticação**

Primeiro, precisamos ter o controle de quem consegue criar e ler os conteúdos que criamos, e para isso, faremos um sistema de autenticação simples. Quem usar a aplicação deve conseguir se cadastrar e fazer login, e apenas após fazer seu login, deve ser capaz de executar as ações criadas abaixo.

Usuários se cadastram com nome, email, nickname e senha. Aqui, a senha tem que possuir, no mínimo, 6 caracteres. Email e nickname são valores que precisam ser únicos. Ao se cadastrar o usuário deve receber um token de acesso, para que possa se logar.

O cadastro deve ser criado com um método post. Os campos devem seguir a estrutura:

```json
{
	"name": "",
	"email": "",
	"nickname": "",
	"password": ""
}
```

**Criação de música ou imagem**

Como dito anteriormente, o sistema vai gerenciar imagens ou músicas. Então, antes de mais nada, precisamos poder **criar** imagens ou músicas em nossa aplicação. Para isso, basta que as informações necessárias (explicadas um pouco mais para frente no texto) sejam preenchidas. As imagens ou músicas devem ser guardadas em um banco de dados.

Para criar uma imagem, precisaremos dos seguintes dados:

~~~typescript
	id: string,
	subtitle: string,
	author: string,
	date: Date,
	file: string,
	tags: string[],
	collection: string
~~~

**Leitura de música ou imagem**

Para gerenciar o conteúdo, precisamos acessá-lo. Para isso, haverão caminhos para a leitura destes. Será necessário ler os conteúdos das seguintes formas:

- Uma lista completa, com tudo que foi criado até aqui;
- Uma consulta de detalhe, exibindo as informações de apenas um conteúdo;
