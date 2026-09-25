# Diretrizes de Desenvolvimento do AnimeDLE

## 1. Padrão Obrigatório de Logos de Animes (`public/logo-<slug>.png`)
Sempre que o usuário enviar uma nova logo ou for adicionada a logo de um novo anime:
- **Script Oficial:** Executar `node scripts/standardize-logos.mjs <caminho_da_imagem> logo-<slug>.png`.
- **Canvas:** Tamanho padrão quadrado de **384x384** pixels com fundo transparente.
- **Recorte e Trim:** O desenho/emblema deve ser recortado em sua caixa delimitadora exata (`sharp.trim()`), removendo qualquer margem ociosa ou assimétrica.
- **Área Útil:** Enquadrado proporcionalmente na caixa de **360x360** pixels (garantindo ~3.1% de margem de respiro idêntica para todas as logos).
- **Centralização:** Perfeitamente centralizado no eixo X e Y.
- **Formato:** PNG com compressão nível 9 (~25 KB a 35 KB), garantindo carregamento instantâneo.
- **Integridade Visual:** Preservar 100% das cores, formato e estilo originais do logo sem nenhuma distorção.
- **Registro:** Adicionar o campo `logo: '/logo-<slug>.png'` no objeto do anime em `src/data/animes/config.ts`.
