export const load = {
    fonts: () => {
        loadFont("Round", "./assets/Round9x13.ttf")
    },
    assets: () => {
        loadSprite("mainbg", "./assets/favicon.jpg")

        loadSprite("up", "./assets/Arrow_Up_Key_Dark.png")
        loadSprite("down", "./assets/Arrow_Down_Key_Dark.png")
        loadSprite("left", "./assets/Arrow_Left_Key_Dark.png")
        loadSprite("right", "./assets/Arrow_Right_Key_Dark.png")
        loadSprite("w","./assets/W_Key_Dark.png")
        loadSprite("s","./assets/S_Key_Dark.png")
        loadSprite("a","./assets/A_Key_Dark.png")
        loadSprite("d","./assets/D_Key_Dark.png")

        loadSprite("coder","./assets/coder.png")
        loadSprite("bug","./assets/bug.png")
        loadSprite("coffee","./assets/coffee.png")
    },
    sounds: () => {
        loadSound("click","./sounds/sounds_confirm-ui.wav")
        loadSound("background","./sounds/background.mp3")
        loadSound("score","./sounds/score.mp3")
        loadSound("sip","./sounds/sip.mp3")
        loadSound("gameover","./sounds/gameover.mp3")
    }
}