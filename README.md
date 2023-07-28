# List GitHub Environments Action


## Descrição

A action "List GitHub Environments" é uma action criada em JavaScript para buscar e listar as environments (ambientes) do repositório. Com esta action, você pode obter uma lista de todas as environments disponíveis em seu repositório do GitHub. Além disso, ela possui alguns parâmetros de configuração para filtrar e personalizar os resultados.

## Como Usar

Para utilizar a action em seu workflow, adicione o seguinte trecho ao seu arquivo de configuração YAML do GitHub Actions (por exemplo, `.github/workflows/main.yml`):

```yaml
- name: List environments
  id: github-environments
  uses: eteg/list-github-environments@v1
  with:
    exclude-envs: '["staging", "develop"]'
    has-protection-rule: true
    repo-token: "${{ secrets.GITHUB_TOKEN }}"
```

**Observação importante:** Não esquecer de adicionar a permission ***actions:read*** no job onde o step do **eteg/list-github-environments** atuará.

### Parâmetros

Aqui estão os parâmetros disponíveis para personalizar a action:

- **exclude-envs:** Uma lista opcional de nomes de environments que você deseja excluir da lista de resultados. Por exemplo, ["staging", "develop"].

- **has-protection-rule:** Um valor booleano opcional que permite filtrar apenas as environments que possuem regras de proteção definidas.

- **repo-token:** O token de acesso do repositório ***${{ secrets.GITHUB_TOKEN }}*** é necessário para autenticação e permissões para acessar as informações do repositório.

### Exemplo
Aqui está um exemplo de uso da action em um workflow:

```yaml
name: List Environments
on:
  push:
    branches:
      - main

jobs:
  list-environments:
    name: List GitHub Environments
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: List environments
        id: github-environments
        uses: eteg/list-github-environments@v1
        with:
          exclude-envs: '["staging", "develop"]'
          has-protection-rule: true
          repo-token: "${{ secrets.GITHUB_TOKEN }}"

      - name: Display environments
        run: |
          echo "Available Environments: ${{ steps.github-environments.outputs.environments }}"
```
  
Neste exemplo, a action será acionada em cada push para a branch main. Ela lista todas as environments do repositório, excluindo aquelas com os nomes "staging" e "develop", e exibindo apenas as que possuem regras de proteção definidas.

Licença
Este projeto está licenciado sob a **ISC** License.
