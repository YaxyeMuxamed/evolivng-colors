class Automata {
    constructor() {
        this.length = 100;
        this.width = 100;
        this.plants = Array.from({length: this.width}, () => new Array(this.length).fill(null));
    }
    
    clearPlants() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.length; j++) {
                this.plants[i][j] = null;
            }
        }
    }

    addPlant() {
        let i = this.randomInt(this.width);
        let j = this.randomInt(this.length);
        if (!this.plants[i][j]) { // Ensure we don't overwrite an existing plant
            let color = this.randomInt(360);
            this.plants[i][j] = new Plant({hue: color, x: i, y: j}, this);
        }
    }

    update() {
        this.plants.forEach((row, x) => {
            row.forEach((plant, y) => {
                if (plant) {
                    plant.update();
                    if (Math.random() < 0.001) {
                        this.plants[x][y] = null; // Randomly clear plants with a very small probability
                    }
                }
            });
        });
    }

    draw(ctx) {
        this.plants.forEach((row, x) => {
            row.forEach((plant, y) => {
                if (plant) {
                    plant.draw(ctx);
                }
            });
        });
    }
    
    randomInt(max) {
        return Math.floor(Math.random() * max);
    }
}
