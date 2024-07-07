const Game = require('../models/Game');
const Evaluation = require('../models/Evaluation');
//importar libs externas
const express = require('express'); //npm i express

//O router permite separar nosso servidor em rotas
const router = express.Router();

//libs para banco de dados
const fs = require('fs');
const path = require('path');

//Validação do token
const jwt = require('jsonwebtoken');

//Conexao com banco de dados
const bdPath = path.join(__dirname,'..','db','games.json');
const games = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));


//Rota para buscar as games
router.get('/games', autenticarToken,(req,res) =>{

    //Devolve as games em formato JSON
    res.status(200).json(games);

});

router.put('/update-game', autenticarToken, (req,res) => {

    const {id, name, description, url_image} = req.body;

    const newGame = {
        id,
        name,
        description,
        url_image
    }

    const acharIndex = (p) => {
        return p.id === Number(id)
    }

    const index = games.findIndex(acharIndex);

    games.splice(index,1,newGame);

    fs.writeFileSync(bdPath, JSON.stringify(games,null,2));

    res.status(200).send('Jogo Atualizado!');

});

router.post('/create-game', autenticarToken, (req,res) => {

    const {id, name, description, url_image} = req.body;

    const newGame = {
        id, 
        name,
        description,
        url_image
    }
    games.push(newGame);

    fs.writeFileSync(bdPath, JSON.stringify(games,null,2));

    res.status(200).send('Jogo Criado!');
    
});

router.delete('/remove-game/:id', autenticarToken, (req,res) => {

    const {id} = req.params;

    const acharIndex = (p) => {
        return p.id === Number(id)
    }

    const index = games.findIndex(acharIndex);

    games.splice(index,1);

    fs.writeFileSync(bdPath, JSON.stringify(games,null,2));

    res.status(200).send("Jogo Removido");

});

// Obter detalhes do jogo
// Rota para buscar um jogo pelo ID
router.get('/games/:id', autenticarToken, (req, res) => {
    const gameId = Number(req.params.id);

    // Lê o arquivo JSON de forma síncrona
    try {
        const gamesData = fs.readFileSync(bdPath, { encoding: 'utf-8' });
        const games = JSON.parse(gamesData);

        // Busca pelo jogo com o ID específico
        const game = games.find(g => g.id === gameId);

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.json(game);
    } catch (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Adicionar nova avaliação
router.post('/games/:id/evaluations', autenticarToken, (req, res) => {
    const gameId = Number(req.params.id);
    const game = games.find(g => g.id === gameId);
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    const { rate, comments } = req.body;
    const newEvaluation = { id: game.evaluations.length + 1, rate, comments };
    game.evaluations.push(newEvaluation);
    fs.writeFileSync(bdPath, JSON.stringify(games, null, 2));
    res.status(201).json(newEvaluation);
});


function autenticarToken(req,res,next){
    const authH = req.headers['authorization'];
    const token = authH && authH.split(' ')[1];
    if(token === null) return res.status(401).send('Token não encontrado');
    
    //verificando o token
    try {
        const user = jwt.verify(token, process.env.TOKEN);
        req.user = user;
        next(); //Se token é válido, avança chamando next()
    } catch (error) {
        res.status(403).send('Token inválido');
    }
   
}

module.exports = router;