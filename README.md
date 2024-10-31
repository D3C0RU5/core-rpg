# API de RPG Online

Esta API permite a criação e gerenciamento de um jogo de RPG online, onde os usuários podem criar personagens, iniciar jogos, gerenciar mapas e interagir com outros jogadores.

## Índice

- [Recursos](#recursos)
- [Agregações e Entidades](#agregações-e-entidades)
  - [1. Personagem Template](#1-personagem-template)
  - [2. Instância do Personagem](#2-instância-do-personagem)
  - [3. Jogo](#3-jogo)
  - [4. Mapa](#4-mapa)
  - [5. Jogador](#5-jogador)
  - [6. Efeito](#6-efeito)
  - [7. Objeto](#7-objeto)
  - [8. Sessão de Jogo](#8-sessão-de-jogo)
- [Casos de Uso](#casos-de-uso)
  - [1. Gerenciamento de Personagens](#1-gerenciamento-de-personagens)
  - [2. Criação de Jogos](#2-criação-de-jogos)
  - [3. Gerenciamento de Mapas e Células](#3-gerenciamento-de-mapas-e-células)
  - [4. Interatividade entre Jogadores](#4-interatividade-entre-jogadores)
  - [5. Efeitos Ambientais](#5-efeitos-ambientais)
  - [6. Objetos (Itens)](#6-objetos-itens)
  - [7. Gerenciamento de Sessões de Jogo](#7-gerenciamento-de-sessões-de-jogo)
- [Como Usar](#como-usar)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Recursos

- Criação e gerenciamento de personagens
- Criação e gerenciamento de jogos
- Criação e gerenciamento de mapas e células
- Interatividade entre jogadores
- Efeitos ambientais dinâmicos
- Gerenciamento de itens e objetos

## Agregações e Entidades

### 1. Personagem Template

- **Entidade Principal**: `PersonagemTemplate`
  - **Atributos**:
    - ID
    - Nome
    - Classe
    - Raça
    - Habilidades (lista de `Habilidade`)
    - Atributos Básicos (ex: Força, Agilidade)

### 2. Instância do Personagem

- **Entidade Principal**: `PersonagemInstance`
  - **Atributos**:
    - ID
    - TemplateID (referencia ao `PersonagemTemplate`)
    - JogoID (referencia ao `Jogo`)
    - Nível
    - Itens (lista de `Item`)
    - Habilidades Adicionais (lista de `Habilidade`)

### 3. Jogo

- **Entidade Principal**: `Jogo`
  - **Atributos**:
    - ID
    - Título
    - Descrição
    - Criador (referencia ao `Jogador`)
    - Participantes (lista de `Jogador`)
    - Status (ex: ativo, encerrado)
  - **Entidade Aninhada**: `Participante`
    - **Atributos**:
      - PersonagemID (referencia ao `PersonagemInstance`)
      - JogadorID (referencia ao `Jogador`)

### 4. Mapa

- **Entidade Principal**: `Mapa`
  - **Atributos**:
    - ID
    - Nome
    - Dimensões
    - Células (lista de `Célula`)
  - **Entidade Aninhada**: `Célula`
    - **Atributos**:
      - ID
      - Tipo de Terreno
      - Efeitos (lista de `Efeito`)
      - Interatividade (ex: armadilha, objeto)
      - Objetos (lista de `Item`)

### 5. Jogador

- **Entidade Principal**: `Jogador`
  - **Atributos**:
    - ID
    - Nome
    - Jogos Participantes (lista de `Jogo`)
    - PersonagensInstanciados (lista de `PersonagemInstance`)

### 6. Efeito

- **Entidade Principal**: `Efeito`
  - **Atributos**:
    - ID
    - Tipo (ex: Armadilha, Evento Climático)
    - Duração
    - Intensidade

### 7. Objeto

- **Entidade Principal**: `Objeto`
  - **Atributos**:
    - ID
    - Nome
    - Tipo (ex: Item, Equipamento)
    - Descrição
    - Propriedades (ex: Efeitos, Bonificações)

### 8. Sessão de Jogo

- **Entidade Principal**: `SessãoDeJogo`
  - **Atributos**:
    - ID
    - JogoID (referencia ao `Jogo`)
    - Status (ex: em andamento, pausado, encerrado)
    - PersonagensAtivos (lista de `PersonagemInstance`)

## Casos de Uso

### 1. Gerenciamento de Personagens

- [ ] Criar Personagem Template
- [ ] Editar Personagem Template
- [ ] Excluir Personagem Template
- [ ] Listar Personagens Templates
- [ ] Visualizar Detalhes do Personagem Template
- [ ] Criar Instância de Personagem
- [ ] Editar Instância de Personagem
- [ ] Excluir Instância de Personagem
- [ ] Listar Instâncias de Personagem

### 2. Criação de Jogos

- [ ] Criar Jogo
- [ ] Listar Jogos
- [ ] Solicitar Participação no Jogo
- [ ] Aceitar/Recusar Solicitação de Participação
- [ ] Encerrar Jogo

### 3. Gerenciamento de Mapas e Células

- [ ] Criar Mapa
- [ ] Adicionar Célula ao Mapa
- [ ] Editar Célula
- [ ] Excluir Célula
- [ ] Listar Mapas

### 4. Interatividade entre Jogadores

- [ ] Enviar Mensagem para Jogadores
- [ ] Criar Grupo de Jogadores
- [ ] Listar Jogadores Participantes

### 5. Efeitos Ambientais

- [ ] Adicionar Efeito a Célula
- [ ] Definir Horário do Dia em Célula
- [ ] Listar Efeitos de Célula

### 6. Objetos (Itens)

- [ ] Criar Objeto
- [ ] Adicionar Objeto à Célula
- [ ] Listar Objetos

### 7. Gerenciamento de Sessões de Jogo

- [ ] Iniciar Jogo
- [ ] Pausar Jogo
- [ ] Retomar Jogo

## Como Usar

1. **Configuração do Ambiente**: Siga as instruções de instalação e configuração.
2. **Endpoints da API**: Consulte a documentação para cada endpoint disponível.
3. **Exemplo de Requisições**: Verifique exemplos de como fazer requisições para a API.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para enviar um pull request ou abrir uma issue.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
