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

    update() {
        const growthRate = parseInt(document.getElementById("plantgrowth").value);
        if (growthRate <= 0) return;  // Exits the function if no growth is to occur.
        const growthIncrement = growthRate * 0.5;  // Adjusting growth based on the slider value.
        this.growth += growthIncrement;  // Increases growth by the computed increment.
        if (this.growth >= 80) {  // Checks if growth has reached the threshold for reproduction.
            const offspringState = this.mutate();  // Creates a new plant state through mutation.
            if (!this.automata.plants[offspringState.x][offspringState.y]) {  // Ensures the cell is empty before planting new offspring.
                this.automata.plants[offspringState.x][offspringState.y] = new Plant(offspringState, this.automata);
                this.growth -= 80;  // Reduces the growth by 80 after reproduction, allowing for subsequent growth.
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);  // Draws the filled rectangle for the plant.
        ctx.strokeRect(this.x * this.size, this.y * this.size, this.size, this.size);  // Draws the border for the plant.
    }

    randomInt(max) {
        return Math.floor(Math.random() * max);  // Helper function to generate a random integer.
    }
}
