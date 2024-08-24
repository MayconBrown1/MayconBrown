const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware para parsing de JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para obter todas as notícias
app.get('/posts', (req, res) => {
    const postsDir = path.join(__dirname, 'noticias');
    fs.readdir(postsDir, (err, files) => {
        if (err) {
            return res.status(500).send('Erro ao ler as notícias.');
        }
        const posts = files.map(file => {
            const filePath = path.join(postsDir, file);
            const data = fs.readFileSync(filePath, 'utf8').split('\n');
            const [title, date, content, image] = data;
            return { id: file.replace('.txt', ''), title, date, content, image };
        });
        res.json(posts);
    });
});

// Rota para adicionar uma nova notícia
app.post('/add-post', (req, res) => {
    const { title, date, content, image } = req.body;
    const postId = Date.now().toString();
    const filePath = path.join(__dirname, 'noticias', `${postId}.txt`);
    const data = `${title}\n${date}\n${content}\n${image}\n`;

    fs.writeFile(filePath, data, (err) => {
        if (err) {
            return res.status(500).send('Erro ao salvar a notícia.');
        }
        res.send('Notícia adicionada com sucesso!');
    });
});

// Rota para atualizar uma notícia
app.put('/update-post/:id', (req, res) => {
    const { id } = req.params;
    const { title, date, content, image } = req.body;
    const filePath = path.join(__dirname, 'noticias', `${id}.txt`);
    const data = `${title}\n${date}\n${content}\n${image}\n`;

    fs.writeFile(filePath, data, (err) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar a notícia.');
        }
        res.send('Notícia atualizada com sucesso!');
    });
});

// Rota para excluir uma notícia
app.delete('/delete-post/:id', (req, res) => {
    const { id } = req.params;
    const filePath = path.join(__dirname, 'noticias', `${id}.txt`);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send('Erro ao excluir a notícia.');
        }
        res.send('Notícia excluída com sucesso!');
    });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
