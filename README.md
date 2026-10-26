# Automação Web - Automation Exercise

Projeto de testes E2E com Cypress para a aplicação [Automation Exercise](https://automationexercise.com), implementando os casos de teste 1, 2, 3, 4, 5, 8, 9, 10, 15 e 16 da página [Test Cases](https://automationexercise.com/test_cases).

## Estrutura

```
cypress/
  e2e/automation-exercise-modules.cy.js   # testes do trabalho final
  modules/                                # ações por página (menu, login, register, products, checkout, subscription)
  support/helpers.js                      # geração de dados de teste
.github/workflows/cypress.yml             # pipeline do GitHub Actions
```

## Como executar

```bash
npm install
npm test          # execução headless da spec do trabalho
npm run cy:open   # modo interativo
```

## Relatório

O relatório HTML é gerado com `cypress-mochawesome-reporter` em `cypress/reports/index.html`.

No GitHub Actions, o relatório fica disponível como artefato (`cypress-report`) ao final de cada execução.
