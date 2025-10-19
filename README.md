# E2E Setup for Chrome MV3 extension (Playwright Chromium)

Arquivos gerados automaticamente a partir do repositório fornecido.

=== Conteúdo criado ===
- Dockerfile
- docker-compose.yml
- tests/e2e.spec.js  -> exemplo de teste que carrega a extensão via --load-extension
- .github/workflows/e2e.yml -> workflow para GitHub Actions que:
    * instala dependências
    * zipa a extensão (extension.zip)
    * executa `npx playwright test --project=chromium`
    * publica `playwright-report` e `extension.zip` como artefatos
- extension/ -> cópia da extensão encontrada (bootcamp2-main)
- extension.zip -> zip da extensão
- e2e-setup.zip -> arquivo final com tudo para baixar

=== Observações importantes ===
1. Playwright precisa rodar Chromium em modo não-headless para carregar extensões (usamos `launchPersistentContext`).
2. Alguns runners (ex.: GitHub Actions) exigem dependências adicionais para executar navegadores em modo headful; por isso usamos `npx playwright install --with-deps`.
3. Se a sua suíte de testes exigir um build da extensão (por ex. bundlers), adicione um passo antes de zipar para executar esse build.
4. Ajuste `tests/e2e.spec.js` para pontos de entrada e interações reais da sua extensão.
5. No Dockerfile o comando padrão roda `npx playwright test` e escreve o relatório em `playwright-report/`.

=== Como usar localmente ===
- Construir a imagem: `docker build -t extension-e2e .`
- Rodar com docker-compose: `docker-compose up --build`
- Ou rodar localmente: `npx playwright test --project=chromium --reporter=html`

