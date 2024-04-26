# CaseAppBank
Olá! Para seguirmos com o nosso processo seletivo, precisamos que você solucione o problema de lógica abaixo:
Primeiro, faça um fork desse repositório.
Você precisa criar um aplicativo onde após logar o cliente poderá consultar seu extrato e efetuar uma transferência (conforme imagens de figma abaixo).

  Protótipo Navegação
    - https://www.figma.com/proto/ZJNnq1bz0750cRxfOYmGQ4/Ita%C3%BA---mobile-case?type=design&node-id=0-184&t=HKYLDWO7mZCuq7H5-0&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=0%3A11
  
  
  Protótipo Guides
    - https://www.figma.com/file/ZJNnq1bz0750cRxfOYmGQ4/Ita%C3%BA---mobile-case?type=design&node-id=0%3A11&mode=design&t=HKYLDWO7mZCuq7H5-1

# INSTRUCÕES:
Nesse cenário hipotético todos os métodos são do tipo GET.


------LOGIN:
  Requisitos:
    - O campo user deve aceitar e-mai
    - O campo password deve validar se a senha possui pelo menos uma letra maiúscula e um número.
    - Após validar os dados de login utilize os dados digitados em login e senha para obter apenas 1 usuário.

End-point Listar usuários:
  https://662140c23bf790e070b25a39.mockapi.io/api/v1/user
  O último usuário logado deve ser salvo de forma segura localmente, e exibido na tela de login se houver algum salvo.

  

------Tela de boas-vindas
  Nesta tela será exibido os dados formatados do retorno do login e teremos os acesso as funcionalidade de extrato e transferência


------Tela de Extrato
  Para obter os lançamentos do usuário, utilize o end-point https://662140c23bf790e070b25a39.mockapi.io/api/v1/user/{id}/account
  Os dados da conta contêm um objeto do tipo array chamado " payments " que serão os lançamentos, é preciso exibir todos os       itens como se fosse um extrato.(apenas o usuário do id 1 possui os dados de pagamento, os outros estão vazios)

  

------Tela de transferência

Requisitos:
  - Toda transferência deverá ser feita entre um emissor e um receptor;
  - Operador e receptor iniciam a operação com um saldo de R$ 0,00;
  - As transferências deverão ser executadas de acordo com o seu tipo, sendo 3 os seus tipos: PIX, TED e DOC;
  - O limite de valor máximo permitido para uma transferência via PIX é de R$ 5 mil;
  - Transferências via TED só são permitidas para valores acima de R$ 5 mil e até R$ 10 mil;
  - Transferências via DOC só são permitidas para valores acima de R$ 10 mil;
  - Não serão permitidas transferências para a mesma conta, mas um emissor pode transferir para ele mesmo se for uma conta diferente;
  - As entradas deverão estar sempre com todos os dados preenchidos.

Ao final da operação, uma mensagem deverá ser exibida:
  Se a transferência for bem-sucedida, exibir mensagem de sucesso com o saldo do emissor e do receptor após a transferência, de acordo com o modelo:
  Sua transferência foi realizada com sucesso!
      Saldo do emissor: R$ X,XX
      Saldo do receptor: R$X,XX

  Se a transferência não for completada, exibir mensagem de erro explicando o motivo, vide exemplo:
    Ex: Sua transferência não foi completada pois (escrever o motivo)

Escolha, dentre as opções de linguagens de programação abaixo, qual se sentir mais confortável em desenvolver o algoritmo e pense nos casos de teste descritos acima!
  - Java
  - Kotlin

Será observado o uso de boas práticas de programação, bem como orientaçao à objetos e se possível, aplicação de padrões de projeto.
Boa sorte!
