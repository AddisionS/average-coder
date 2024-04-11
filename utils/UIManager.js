class UIManager {
  displayBlinkingUI(content, position) {
    const message = add([
      text(content, { size: 40, font: "Round" }),
      area(),
      anchor("center"),
      pos(position),
      opacity(),
      state("flash-up", ["flash-up", "flash-down"]),
    ])

    message.onStateEnter("flash-up", async () => {
      await tween(
        message.opacity,
        0,
        0.75,
        (opacity) => (message.opacity = opacity),
        easings.linear
      )
      message.enterState("flash-down")
    })

    message.onStateEnter("flash-down", async () => {
      await tween(
        message.opacity,
        1,
        0.75,
        (opacity) => (message.opacity = opacity),
        easings.linear
      )
      message.enterState("flash-up")
    })
  }
  displayMenu() {
    add([
      sprite("mainbg"),
      scale(0.72),
      pos(280, 0),
    ])

    this.displayBlinkingUI(
      "Press \n`ENTER` \nto Start \nthe Game",
      vec2(150, center().y)
    )
    this.displayBlinkingUI(
      "Developer: \nDiscord: \n@.addision",
      vec2(1150, center().y)
    )

    onKeyPress("enter", () => {
      play("click", { speed: 1.5 })
      go("controls")
    })
  }
  displaycontrols() {
    add([
      text("Controls", { font: "Round", size: 50 }),
      area(),
      anchor("center"),
      pos(center().x, center().y - 200),
    ])

    const controlPrompts = add([pos(center().x + 325, center().y)])
    controlPrompts.add([sprite("up"), pos(0, -80)])
    controlPrompts.add([sprite("down")])
    controlPrompts.add([sprite("left"), pos(-80, 0)])
    controlPrompts.add([sprite("right"), pos(80, 0)])

    const controlPrompts2 = add([pos(center().x - 400, center().y)])
    controlPrompts2.add([sprite("w"), pos(0, -80)])
    controlPrompts2.add([sprite("s")])
    controlPrompts2.add([sprite("a"), pos(-80, 0)])
    controlPrompts2.add([sprite("d"), pos(80, 0)])

    this.displayBlinkingUI(
      "Use Arrow Keys or WASD for Movement",
      vec2(center().x, center().y + 200)
    )
    this.displayBlinkingUI(
      "Press `Enter` to Start Game",
      vec2(center().x, center().y + 250)
    )
    onKeyPress("enter", () => {
      play("click", { speed: 1.5 })
      go("game")
    })
  }
  displayGame() {
    let SPEED = 620
    let BSPEED = 1
    let SCORE = 0
    let scoreText = add([
      text("Score:" + SCORE, {font: "Round"}),
      scale(1.15),
      pos(width() - 241, 21),
      color(255, 255, 255),
    ]);
    let bg = false;
    let backgroundMusic;
    const playerSize = 0.4;

    const displayScore = () => {
      scoreText.text = "Score:" + SCORE;
    };

    const playBg = () => {
      if (bg==false) {
        backgroundMusic = play("background", { volume: 0.3, loop: true })
        bg = true;
      }
    }


    const player = add([
      sprite("coder"),
      pos(120, 80),
      area(),
      scale(playerSize),
    ])

    onKeyDown("left", () => {
      playBg()
      player.move(-SPEED, 0)
      if (player.pos.x <= 0) {
        player.pos.x = 0;
      }
    })

    onKeyDown("right", () => {
      playBg()
      player.move(SPEED, 0)
      if (player.pos.x >= 1280 - player.width * playerSize) {
        player.pos.x = 1280 - player.width * playerSize;
      }
    })

    onKeyDown("up", () => {
      playBg()
      player.move(0, -SPEED)
      if (player.pos.y <= 0) {
        player.pos.y = 0;
      }
    })

    onKeyDown("down", () => {
      playBg()
      player.move(0, SPEED)
      if (player.pos.y >= height() - player.height * playerSize) {
        player.pos.y = height() - player.height * playerSize;
      }
    })

    onKeyDown("a", () => {
      playBg()
      player.move(-SPEED, 0)
      if (player.pos.x <= 0) {
        player.pos.x = 0;
      }
    })

    onKeyDown("d", () => {
      playBg()
      player.move(SPEED, 0)
      if (player.pos.x >= 1280 - player.width * playerSize) {
        player.pos.x = 1280 - player.width * playerSize;
      }
    })

    onKeyDown("w", () => {
      playBg()
      player.move(0, -SPEED)
      if (player.pos.y <= 0) {
        player.pos.y = 0;
      }
    })

    onKeyDown("s", () => {
      playBg()
      player.move(0, SPEED)
      if (player.pos.y >= height() - player.height * playerSize) {
        player.pos.y = height() - player.height * playerSize;
      }
    })

    setInterval(() => {
      for (let i = 0; i < 4; i++) {
        let x = rand(0, 1280)
        let y = height()

        let c = add([
          sprite("bug"),
          pos(x, y),
          area(),
          scale(0.15),
          "bug"
        ])

        c.onUpdate(() => {
          c.moveTo(c.pos.x, c.pos.y - BSPEED)
        })
      }

      let x = rand(0, 1280)
      let y = height()

      let c = add([
        sprite("coffee"),
        pos(x, y),
        area(),
        scale(0.2),
        "coffee"
      ])

      c.onUpdate(() => {
        c.moveTo(c.pos.x, c.pos.y - BSPEED)
      })

    }, 4000)

    player.onCollide("bug", () => {
      backgroundMusic.volume = -2;
      play("gameover")
      destroy(player)
      BSPEED = 0;
      addKaboom(player.pos)
      wait(1, () => {
        go("gameover");
      });
    })

    player.onCollide("coffee", (coffee) => {
      backgroundMusic.volume = 0.2;
      play("sip", { volume: 2 })
      destroy(coffee)
      SCORE += 1
      displayScore()
      if (BSPEED < 12) {
        BSPEED = BSPEED + 0.25
      }
      wait(2, () => {
        backgroundMusic.volume = 0.5;
      })
    })

    displayScore()
  }
  displayGameOver() {
    add([
      text("Game Over", { font: "Round", size: 50 }),
      area(),
      anchor("center"),
      pos(center().x, center().y - 100),
    ])
    this.displayBlinkingUI(
      "Press `Enter` to Play again",
      vec2(center().x, center().y)
    )
    onKeyPress("enter", () => {
      play("click", { speed: 1.5 })
      go("game")
    })
  }
}

export const uimanager = new UIManager()