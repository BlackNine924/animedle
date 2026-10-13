---
trigger: always_on
description: Regras obrigatórias para criação, seleção, corte e validação de cenas do Modo Cena (Animedle)
---

# Regras Canônicas do Modo Cena (Animedle)

Sempre que criar, substituir ou validar qualquer cena (`public/scenes/<anime>/<id>.webp`) para o **Modo Cena**, tenha como **Referências Ouro absolutas** as atuais cenas do **Trafalgar Law (`public/scenes/one-piece/law-trafalgar.webp`)** e do **Kizaru / Borsalino (`public/scenes/one-piece/borsalino.webp`)**, que retratam perfeitamente como devem ser todas as cenas, e obedeça estritamente às seguintes regras:

1. **Referências Ouro (`law-trafalgar.webp` e `borsalino.webp`):**
   - Toda nova cena deve seguir o mesmo padrão visual e dinâmico das cenas de **Law** e **Kizaru**: plano aberto ou médio-aberto dinâmico, executando sua técnica/habilidade com efeitos visuais em movimento fluido, sem close estático no rosto ou partes do corpo que entreguem o personagem de cara.

2. **Exclusivamente Anime Oficial (Proibido Jogos/Fanmades):**
   - A cena DEVE vir exclusivamente de episódios oficiais do anime de TV ou filmes canônicos da obra.
   - É **terminalmente proibido** utilizar cenas de jogos (ex: *Pirate Warriors*, *Burning Blood*, *Bounty Rush*, *Ultimate Ninja Storm*, *Cursed Clash*), animações fanmade, mangá colorido estático/MMV ou live-action.

3. **Apenas 1 Personagem em Cena (100% Solo):**
   - Em **todos os frames** do recorte (do início ao fim), deve aparecer **apenas o personagem secreto**.
   - Nenhum oponente, aliado, tripulante ou figurante reconhecível pode aparecer (corte imediatamente antes ou depois de terceiros surgirem em tela).
   - Sempre extraia frames de verificação (`ffmpeg`) do início, meio e fim da cena e inspecione visualmente antes de aprová-la.

4. **Não Entregar de Cara (Evitar Close-up Estático):**
   - Evite *close-ups* frontais no rosto que entreguem imediatamente a silhueta/identidade do personagem no estágio inicial (`100% blur` + `Preto & Branco`).
   - Priorize **planos abertos ou médios dinâmicos** focados na execução da técnica, arma ou postura característica em ação (exatamente como nas cenas de **Law** e **Kizaru**).

5. **Movimento Fluido Real (Proibido Parecer Imagem Estática):**
   - A cena nunca pode parecer uma imagem parada ou ter apenas a boca mexendo (*lip flap*).
   - Deve possuir entre **18 e 48 frames animados** (`12 fps`, duração de `1.8s` a `3.8s`, resolução `480x270`) com movimentação real de corpo, câmera ou efeitos visuais.

6. **Limpeza Visual Absoluta:**
   - Zero legendas, créditos de abertura, HUDs ou marcas d'água (`@handles`).
