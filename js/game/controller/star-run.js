app.controller('star-run', GameController);

function GameController($scope){
  
  init();

  var game;
  var platforms;
  var player, stars;
  var cursors;
  var score, scoreText;
  var lives, livesText;
  var starInterval, ledgeInterval;
  var startButton;
  var comment_ready;
  var audio_star, audio_jump, audio_lives;

  var flag = false;
  var ready = true;
  function init(){
    game = new Phaser.Game(800, 500, Phaser.AUTO, 'game-area-star-run',{
      preload: preload,
      create: create,
      update: update
    });

    score =0;
    lives =3;
  }

  function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.load.image('comment_ready', 'images/game/star-run/comment_ready.png');
    game.load.image('button', 'images/game/star-run/startbutton.png');
    game.load.image('sky', 'images/game/star-run/sky.png');
    game.load.image('ground', 'images/game/star-run/platform.png');
    game.load.image('star', 'images/game/star-run/star.png');
    game.load.spritesheet('dude', 'images/game/star-run/dude.png', 32, 48);

    game.load.audio('star', 'audio/game/star-run/star.mp3');
    game.load.audio('jump', 'audio/game/star-run/jump.mp3');
    game.load.audio('lives', 'audio/game/star-run/lives.mp3');
    cursors = game.input.keyboard.createCursorKeys();
  }

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height -64, 'ground');
    ground.scale.setTo(2, 2);
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge.body.gravity.y = 6;
    ledge.body.bounce.y = 0.7+Math.random()*0.2;
    var ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
    ledge.body.gravity.y = 6;
    ledge.body.bounce.y = 0.7+Math.random()*0.2;
    var ledge = platforms.create(400, 100, 'ground');
    ledge.body.immovable = true;
    ledge.body.gravity.y = 6;
    ledge.body.bounce.y = 0.7+Math.random()*0.2;
    var ledge = platforms.create(-150, 50, 'ground');
    ledge.body.immovable = true;
    ledge.body.gravity.y = 6;
    ledge.body.bounce.y = 0.7+Math.random()*0.2;


    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    stars = game.add.group();
    stars.enableBody = true;

    updateStar();
    var text_info = { fontSize: '32px', fill: '#000' };
    scoreText = game.add.text(16, 16, '스타 : 0', text_info);
    livesText = game.add.text(game.world.width-120, 16, '생명 : '+lives, text_info);

    starInterval = setInterval(updateStar, 10000);
    ledgeInterval = setInterval(updateLedge, 1500);

    startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'button', startGame, this, 1, 0, 2);
    startButton.anchor.set(0.5);
    comment_ready = game.add.sprite(56, game.world.height-210, 'comment_ready');

    audio_star = game.add.audio('star');
    audio_jump = game.add.audio('jump');
    audio_lives = game.add.audio('lives');

  }

  function startGame() {
    startButton.destroy();
    comment_ready.destroy();
    ready = false;
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;

  }

  function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    player.body.velocity.x = 0;

    if(!ready){
      if(cursors.left.isDown){
          player.body.velocity.x = -150;
          player.animations.play('left');
      }else if (cursors.right.isDown){
          player.body.velocity.x = 150;
          player.animations.play('right');
      }else{
          player.animations.stop();
          player.frame = 4;
      }

      if (cursors.up.isDown && player.body.touching.down && hitPlatform){
        player.body.velocity.y = -350;
        audio_jump.play();
      }
      
      if(player.body.position.y > game.world.height){
        if(lives !=0){
          player.body.velocity.y = -500;
          lives--;
          livesText.text = '생명 : ' + lives;
          audio_lives.play();
        }else{
          livesText.position.x = livesText.position.x-1;
          livesText.text = '하늘나라로 떠나셨습니다 또르르';
          if(player.body.position.y > game.world.height*3){
            player.body.velocity.y = -100;
            player.body.position.y=game.world.height/2;
            lives = 3;
            score = 0;
            scoreText.text = '스타 : ' + score;
            livesText.text = '생명 : ' + lives;
          }
        }
      }
    }else player.frame = 4;
  }

  function collectStar (player, star) {
    star.kill();
    score += 1;
    scoreText.text = '스타 : ' + score;
    audio_star.play();
  }

  function updateLedge(){
    var type;

    flag = !flag;
    if(flag) type = 400;
    else type = 0;
    var ledge = platforms.create(type+Math.random()*300, -50, 'ground');
    ledge.body.immovable = true;
    ledge.body.gravity.y = 6;
    ledge.body.bounce.y = 0.7+Math.random()*0.2;
    ledge.scale.setTo(0.1, 0.3);
  }

  function updateStar(){
    for(var i=0; i< Math.random() *12; i++){
      var star = stars.create(Math.random() * game.world.width, 0, 'star');
      star.body.gravity.y = 6;
      star.body.bounce.y = 0.7+Math.random()*0.2;
    }  
  }
}