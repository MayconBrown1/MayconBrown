const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configura o body-parser para JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Pasta onde as publicações serão armazenadas
const postsDir = path.join(__dirname, 'noticias', 'post');
if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
}

// Rota para adicionar uma nova publicação
app.post('/add-post', (req, res) => {
    const { title, date, content, image } = req.body;
    const postId = Date.now(); // Usamos o timestamp como ID
    const postFilePath = path.join(postsDir, `${postId}.txt`);

    const postData = JSON.stringify({ title, date, content, image }, null, 2);
    fs.writeFile(postFilePath, postData, (err) => {
        if (err) {
            return res.status(500).send('Erro ao salvar a publicação.');
        }
        res.send('Publicação salva com sucesso.');
    });
});

// Rota para listar todas as publicações
app.get('/posts', (req, res) => {
    fs.readdir(postsDir, (err, files) => {
        if (err) {
            return res.status(500).send('Erro ao ler as publicações.');
        }

        const posts = files.map(file => {
            const filePath = path.join(postsDir, file);
            const data = fs.readFileSync(filePath);
            return JSON.parse(data);
        });

        res.json(posts);
    });
});

// Rota para excluir uma publicação
app.delete('/delete-post/:id', (req, res) => {
    const postId = req.params.id;
    const postFilePath = path.join(postsDir, `${postId}.txt`);

    fs.unlink(postFilePath, (err) => {
        if (err) {
            return res.status(500).send('Erro ao excluir a publicação.');
        }
        res.send('Publicação excluída com sucesso.');
    });
});

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});
