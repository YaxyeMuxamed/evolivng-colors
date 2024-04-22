class Plant {
    constructor(state, automata) {
        this.automata = automata;
        this.hue = state.hue;
        this.size = 10;  
        this.grid = 100; 
        this.x = state.x;
        this.y = state.y;
        this.growth = 0; 
    }

    mutate() {
        const newX = (this.x - 1 + this.randomInt(3) + this.grid) % this.grid;
        const newY = (this.y - 1 + this.randomInt(3) + this.grid) % this.grid;
        const newHue = (this.hue - 10 + this.randomInt(21) + 360) % 360;

        return { hue: newHue, x: newX, y: newY };
    }

    update(growthRate) {
        if (growthRate <= 0) return;
        const growthIncrement = growthRate * 0.5;
        if (this.growth < 80) {
            this.growth += growthIncrement;
        }
        if (this.growth >= 80) {
            this.tryReproducing();
        }
    }

    tryReproducing() {
        const offspringState = this.mutate();
        if (!this.automata.plants[offspringState.x][offspringState.y]) {
            this.automata.plants[offspringState.x][offspringState.y] = new Plant(offspringState, this.automata);
            this.growth -= 80;
        }
    }

    draw(ctx) {
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
        ctx.strokeRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }

    randomInt(max) {
        return Math.floor(Math.random() * max);
    }
}
