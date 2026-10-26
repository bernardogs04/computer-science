Para rodar e testar:

No VS Code, abra o terminal e entre na pasta principal do projeto:
cd "C:\Users\emili\Downloads\TI-Sprints\plu-cc-2026-2-ti2-4354100-plu-cc-2026-2-ti2-4354100-group-4"

Inicie a API:
npm.cmd start

Deixe esse terminal aberto.

Abra index.html no VS Code e escolha Open with Live Server. Se não aparecer, instale a extensão Live Server.

Na página aberta, pressione F12, vá ao Console e execute para testar com o usuário ID 1:
sessionStorage.setItem("usuarioCorrente", JSON.stringify({ id: 1 }));
Se quiser testar com o usuário ID 100, substitua `1` por `100`. Atualize a página com Ctrl+F5 e clique no ícone de sino no canto superior direito.
