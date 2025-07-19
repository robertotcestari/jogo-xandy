# 📁 Pasta de Imagens do Jogo

## Como adicionar novas fases:

### 1. **Formato do arquivo:**

```
[numero-da-fase]-[resposta].jpg
```

### 2. **Exemplos:**

- `1-gato.jpg` → Fase 1, resposta: "gato"
- `2-cachorro.jpg` → Fase 2, resposta: "cachorro"
- `3-carro.jpg` → Fase 3, resposta: "carro"

### 3. **Para adicionar uma nova fase:**

1. Adicione a resposta na lista `gameAnswers` em `/src/data/gameData.ts`
2. Coloque a imagem nesta pasta com o nome correto
3. A fase será automaticamente adicionada ao jogo!

### 4. **Formatos suportados:**

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`

### 5. **Recomendações:**

- Tamanho ideal: 400x300 pixels
- Imagens claras e reconhecíveis
- Nomes simples e sem acentos para as respostas
