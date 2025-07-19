# 🎯 Sistema Simplificado de Imagens

## ✅ **O que mudou:**

Agora é **super fácil** adicionar novas fases ao jogo!

### 📋 **Como adicionar uma nova fase:**

1. **Escolha a resposta** (ex: "pizza")
2. **Adicione na lista** em `/src/data/gameData.ts`:
   ```typescript
   const gameAnswers = [
     'gato',
     'cachorro',
     'carro',
     'montanha',
     'pizza', // ← Nova fase aqui!
   ];
   ```
3. **Adicione a imagem** em `/public/images/` com o nome:
   ```
   5-pizza.jpg
   ```
4. **Pronto!** A fase aparece automaticamente no jogo

### 📁 **Estrutura de arquivos:**

```
public/images/
├── 1-gato.jpg
├── 2-cachorro.jpg
├── 3-carro.jpg
├── 4-montanha.jpg
└── 5-pizza.jpg
```

### 🔧 **Formato do nome:**

```
[número]-[resposta].[extensão]
```

**Exemplos:**

- `1-gato.jpg` → Fase 1, resposta "gato"
- `2-cachorro.png` → Fase 2, resposta "cachorro"
- `10-bicicleta.webp` → Fase 10, resposta "bicicleta"

### 💡 **Vantagens:**

- ✅ Não precisa mais editar URLs
- ✅ Imagens locais (mais rápido)
- ✅ Fácil de organizar
- ✅ Nome do arquivo = resposta automática
- ✅ Suporta jpg, png, webp

### 🎮 **Para testar:**

1. Adicione suas imagens na pasta `/public/images/`
2. Atualize a lista `gameAnswers`
3. Recarregue o jogo
4. Sua nova fase aparece automaticamente!
