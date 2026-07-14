# Planejai

Planejai é um planejador financeiro moderno com apoio de inteligência artificial, desenvolvido para ajudar usuários a organizar suas finanças, definir metas e receber insights personalizados com base em renda, despesas, dívidas e objetivos financeiros.

A aplicação combina uma experiência simples e responsiva com recursos como simulação financeira, histórico de registros, persistência no localStorage e um chat com a API do Gemini para esclarecer dúvidas sobre os insights gerados.

## Visão geral

O projeto foi pensado para oferecer uma experiência prática e acessível para pessoas que desejam entender melhor sua situação financeira e planejar o futuro com mais segurança.

Entre os principais objetivos do app estão:

- ajudar o usuário a montar uma visão clara do seu orçamento;
- calcular a economia mensal necessária para atingir uma meta;
- gerar diagnósticos financeiros personalizados com IA;
- permitir interação via chat com o Gemini;
- armazenar simulações e preferências do usuário no navegador.

## Funcionalidades principais

- Formulário de simulação financeira com dados como renda, despesas, dívidas e valor da meta;
- Cálculo automático da economia mensal necessária para alcançar o objetivo;
- Geração de insights personalizados por meio da API do Gemini;
- Histórico de conversas e simulações com persistência no localStorage;
- Suporte a tema claro/escuro com persistência de preferência;
- Interface responsiva, com abordagem mobile first e layout adaptado para desktop;
- Navegação entre páginas de formulário, resultados e histórico.

## Tecnologias utilizadas

- React.js
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Google Gemini API via @google/genai
- Lucide React
- LocalStorage para persistência de dados e tema

## Estrutura de pastas

```text
src/
  App.tsx
  main.tsx
  router.tsx
  assets/
    images/
  components/
    features/
      Insights/
      Simulation/
      SimulationHistory/
      SimulationResults/
    layout/
      RootLayout/
    shared/
      Button/
      Divider/
      Header/
      Input/
      PageHero/
  context/
    theme/
  data/
    aiPrompt.ts
    simulation.ts
  hooks/
    useChat.tsx
    useInsight.tsx
    useSimulationStorage.tsx
    useTheme.tsx
  pages/
    NotFoundPage/
    SimulationFormPage/
    SimulationHistoryPage/
    SimulationResultsPage/
  services/
    aiService.ts
  styles/
    theme.css
  utils/
    currency.ts
    simulation.ts
```

## Arquitetura e fluxo da aplicação

1. O usuário preenche um formulário com seus dados financeiros.
2. A aplicação calcula a economia mensal necessária para alcançar a meta informada.
3. Os dados são salvos em localStorage para que possam ser consultados depois.
4. Uma requisição é enviada à API do Gemini para gerar um insight financeiro personalizado.
5. O usuário pode continuar a conversa com o assistente, e o histórico é preservado junto à simulação.
6. O tema claro/escuro é aplicado e persistido no navegador.

## Requisitos

- Node.js 18+ ou superior
- pnpm

## Instalação

```bash
pnpm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
```

## Scripts disponíveis

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

## Como executar localmente

```bash
pnpm dev
```

A aplicação ficará disponível em `http://localhost:5173` por padrão.

## Destaques do projeto

- Planejamento financeiro guiado por IA;
- Experiência mobile first e responsiva;
- Persistência de dados com localStorage;
- Temas claro/escuro com suporte a preferência do sistema;
- Histórico de chat com o Gemini integrado ao fluxo da simulação.

## Contribuição

Contribuições são bem-vindas. Para isso, você pode:

- abrir issues com sugestões ou problemas;
- criar branches para novas features;
- enviar pull requests com melhorias e correções.
