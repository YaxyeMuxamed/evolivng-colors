const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const dimension = 100;

ASSET_MANAGER.downloadAll(() => {
    // Setup canvas and game engine context
    const gameCanvas = document.getElementById("gameWorld");
    const gameContext = gameCanvas.getContext("2d");
    gameEngine.entities = [];
    
    // Initialize automata within the game engine
    let ecosystemAutomata = new Automata();
    gameEngine.addEntity(ecosystemAutomata);

    // Setup interaction handlers for adding entities and clearing the game area
    setupEventListeners(ecosystemAutomata);

    // Initialize and start the game engine
    gameEngine.init(gameContext);
    gameEngine.start();
});

function setupEventListeners(automata) {
    document.getElementById("plant").addEventListener("click", () => {
        automata.addPlant();
    });

    document.getElementById("animat").addEventListener("click", () => {
        addRandomAnimat(automata);
    });

    document.getElementById("clear").addEventListener("click", () => {
        gameEngine.clearAnimats();
        automata.clearPlants();
    });
}

function addRandomAnimat(automata) {
    const randomX = randomInt(dimension);
    const randomY = randomInt(dimension);
    const randomHue = randomInt(360);
    gameEngine.addEntity(new Animat({x: randomX, y: randomY, hue: randomHue}, automata));
}

