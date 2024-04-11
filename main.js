import kaboom from "./libs/kaboom.mjs"
import { uimanager } from "./utils/UIManager.js"
import { load } from "./utils/loader.js"

kaboom({
    width: 1280,
    height: 720,
    letterbox: true,
    background: [13, 17, 23,],
})

load.assets()
load.fonts()
load.sounds()

const scenes = {
    menu: () => {
        uimanager.displayMenu()
    },
    controls: () => {
        uimanager.displaycontrols()
    },
    game: () => {
        uimanager.displayGame()
    },
    gameover: () => {
        uimanager.displayGameOver()
    }
}

for (const key in scenes) {
    scene(key, scenes[key])
}

go("menu")