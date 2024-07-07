class Game {
    constructor(id, name, description, url_image, evaluations = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url_image = url_image;
        this.evaluations = evaluations;
    }

    // Métodos para manipulação dos dados do jogo, se necessário
    addEvaluation(evaluation) {
        this.evaluations.push(evaluation);
    }

    updateDetails(name, description, url_image) {
        this.name = name;
        this.description = description;
        this.url_image = url_image;
    }
}

module.exports = Game;
