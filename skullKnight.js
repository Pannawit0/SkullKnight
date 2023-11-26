/**
 * @type {Sprite}
 */
let PlayerSprite;
let PlayerIdle, PlayerRun;
/**
 * @type {Group}
 */
let Floors;
/**
 * @type {Group}
 */
let Walls;
/**
 * @type {Group}
 */
let Fireballs;
let FireballAni;
/**
 * @type {Sprite}
 */
let Skull;

let Scale = 1;
let Scale2 = 0.65;

let TimerText;   

let gPlayerSprite;
let Lasers, Ices, Bats;
let Laser;
let Torches
let StartGem, GemShines, ShineAnim, Shine1;
let GemSound;

let RoundPhrase;

let Footstep, RollSound, JumpSound, LandedSound, LaserSound, DieSound, FireballSound;

let TutorialTexts, TextCheck;

let Round1Text, Round2Text, Round3Text, Round4Text, XButton, R1Button, LAButton, R2Button, OButton, RAButton;
let Buttons, RetryButton;

//PS Button
let X_Anim, O_Anim;

let MusicIntro, MusicLoop, MusicEnd;
let MusicPlaying = false;
let MusicIntroDone = false;

// Game Config
let PlayerSpeed = 6;
let FireballSpeed = .0035;
let LaserSpeed = 14;
let IceSpeed = 3;
let BatSpeed = 1;

function preload() {
   
    PlayerAni = loadAnimation('Images/PlayerSheet.png');

    // Level Stuff
    let BGTiles = new Group();
	BGTiles.w = 144;
	BGTiles.h = 112;
    BGTiles.collider = 'n'
    BGTiles.image = 'Images/Map/bg_tile.png'
	BGTiles.tile = '/';

	let tilesGroup2 = new Tiles(
		[
		'/////////////////',
        '/////////////////',
        '/////////////////',
        '/////////////////',
		],
		-700,
		32,
		BGTiles.w - 1,
		BGTiles.h
	);

    let Pillars = new Group();
	Pillars.w = 16;
	Pillars.h = 96;
    Pillars.collider = 'n'
    Pillars.image = 'Images/Map/pillar_tile.png'
	Pillars.tile = 'p';

	let tilesGroup4 = new Tiles(
		[
        'p........p........p........p........p........p........p........p',
        'p........p........p........p........p........p........p........p',
        'p........p........p........p........p........p........p........p',
        'p........p........p........p........p........p........p........p',
		],
		-485,
		0,
		Pillars.w,
		Pillars.h-1
	);

    let Windows = new Group();
	Windows.w = 32;
	Windows.h = 41;
    Windows.collider = 'n'
    Windows.image = 'Images/Map/window_tile.png'
	Windows.tile = 'w';
    Windows.scale = 1.25

	let tilesGroup5 = new Tiles(
		[
            'w........w........w........w'
		],
		-415,
		175,
		Windows.w,
		Windows.h
	);

    let Decors = new Group();
	Decors.w = 32;
	Decors.h = 32;
    Decors.collider = 'n'
    Decors.image = 'Images/Map/decor_tile.png'
	Decors.tile = 'd';

	let tilesGroup6 = new Tiles(
		[
            'd........d........d........d'
		],
		-270,
		175,
		Decors.w,
		Decors.h
	);

    Torches = new Group();
	Torches.w = 32;
	Torches.h = 32;
    Torches.collider = 'n'
	Torches.tile = 't';

    TorchAnim = loadAnimation('Images/Map/torchsheet.png', { frameSize: [16, 32], frames: 4 , frameDelay: 6});  

	let tilesGroup7 = new Tiles(
		[
            't........t........t........t'
		],
		-270,
		165,
		Torches.w,
		Torches.h
	);

    let EmptyTiles = new Group();
	EmptyTiles.w = 31;
	EmptyTiles.h = 31;
    EmptyTiles.collider = 'n'
    EmptyTiles.image = 'Images/Map/empty_tile.png'
	EmptyTiles.tile = ';';

	let tilesGroup = new Tiles(
		[
			';;;;.....................................;;;',
            ';;;;.....................................;;;',
            ';;;;.....................................;;;',
            ';;;;.....................................;;;',
            ';;;;.....................................;;;',
            ';;;;.....................................;;;',
            ';;;;.....................................;;;',
            ';;;;.....................................;;;',
            ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;',
            ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;',
           
		],
		-700,
		32,
		EmptyTiles.w,
		EmptyTiles.h
	);

    let Curtain1 = new Sprite(150,65, 100, 'n')
    Curtain1.image = 'Images/Map/curtain1.png'

    let Curtain1_1 = new Sprite(-400,65, 100, 'n')
    Curtain1_1.image = 'Images/Map/curtain1.png'
    Curtain1_1.scale.x = -1

    let Curtain2 = new Sprite(75,65, 100, 'n')
    Curtain2.image = 'Images/Map/curtain2.png'

    let Decor1 = new Sprite(-300,235, 100, 'n')
    Decor1.image = 'Images/Map/decor1.png'

    let Decor2_1 = new Sprite(-250,243, 100, 'n')
    Decor2_1.image = 'Images/Map/decor2.png'
    Decor2_1.scale.x = -1

    let Decor2 = new Sprite(200,243, 100, 'n')
    Decor2.image = 'Images/Map/decor2.png'

    let Decor3 = new Sprite(475,235, 100, 'n')
    Decor3.image = 'Images/Map/decor3.png'

    let Decor4 = new Sprite(425,245, 100, 'n')
    Decor4.image = 'Images/Map/decor4.png'

    let Decor5 = new Sprite(425,225, 100, 'n')
    Decor5.image = 'Images/Map/decor5.png'

    let Decor5_1 = new Sprite(160,255, 100, 'n')
    Decor5_1.image = 'Images/Map/decor5.png'
    Decor5_1.scale.x = -1

    let Decor5_2 = new Sprite(-300,255, 100, 'n')
    Decor5_2.image = 'Images/Map/decor5.png'

    let Decor6 = new Sprite(-430,230, 100, 'n')
    Decor6.image = 'Images/Map/decor6.png'

    let Decor7 = new Sprite(-395,230, 100, 'n')
    Decor7.image = 'Images/Map/decor7.png'

    let Decor8 = new Sprite(-100,38, 100, 'n')
    Decor8.image = 'Images/Map/decor8.png'

    let Decor9 = new Sprite(-545,38, 100, 'n')
    Decor9.image = 'Images/Map/decor9.png'

    Floors = new Group();
	Floors.w = 223;
	Floors.h = 31;
    Floors.collider = 's'
    //Floors.debug = true
    Floors.image = 'Images/Map/floor_tile.png'
	Floors.tile = '=';

	let tilesGroup3 = new Tiles(
		[
			'=====',
		],
		-450,
		275,
		Floors.w,
		Floors.h
	);

    let Wall_L = new Sprite(-575, 211, 32, 160, 's')
    Wall_L.image = 'Images/Map/wall_tile.png'

    let Wall_L2 = new Sprite(-575, 211-128, 32, 160, 's')
    Wall_L2.image = 'Images/Map/wall_tile2.png'

    let Wall_R = new Sprite(569, 211, 32, 160, 's')
    Wall_R.image = 'Images/Map/wall_tileflip.png'

    let Wall_R2 = new Sprite(570, 211-128, 32, 160, 's')
    Wall_R2.image = 'Images/Map/wall_tile2flip.png'

    //Player Sprite
    gPlayerSprite = new Group();
    gPlayerSprite.x = -515;
    //gPlayerSprite.debug = true
    gPlayerSprite.y = 225;
	gPlayerSprite.scale = Scale;
    gPlayerSprite.friction = 0;
    gPlayerSprite.rotationLock = true;
    gPlayerSprite.w = 120;
    gPlayerSprite.h = 80;

    PlayerSetup(true)

    // Skull 
    Skull = new Sprite(PlayerSprite.x, PlayerSprite.y, 20, 'n')
    Skull.image = 'Images/Skull.png'
    Skull.scale = Scale2
    Skull.rotationLock = true;
    //Skull.debug = true

    Skull.overlaps(PlayerSprite)

    Fireballs = new Group();
    //Fireballs.debug = true
	Fireballs.collider = 'k'
    Fireballs.diameter = 7                            
    Fireballs.scale = 1.25
    
    Fireballs.overlaps(PlayerSprite)

    FireballAni = loadAnimation(
		'Images/Fireball/1.png',
		'Images/Fireball/2.png',
		'Images/Fireball/3.png',
        'Images/Fireball/4.png',
		'Images/Fireball/5.png',
		'Images/Fireball/6.png',
        'Images/Fireball/7.png',
		'Images/Fireball/8.png',
		'Images/Fireball/9.png',
        'Images/Fireball/10.png',
		'Images/Fireball/11.png',
		'Images/Fireball/12.png',
        'Images/Fireball/13.png',
		'Images/Fireball/14.png',
		'Images/Fireball/15.png',
        'Images/Fireball/16.png',
		'Images/Fireball/17.png',
		'Images/Fireball/18.png',
        'Images/Fireball/19.png',
		'Images/Fireball/20.png',
		'Images/Fireball/21.png',
        'Images/Fireball/22.png',
		'Images/Fireball/23.png',
		'Images/Fireball/24.png',
        'Images/Fireball/25.png',
		'Images/Fireball/26.png',
		'Images/Fireball/27.png',
        'Images/Fireball/28.png',
		'Images/Fireball/29.png',
		'Images/Fireball/30.png',
	);

    FireballAni.frameDelay = 1

    // Lasers
    Lasers = new Group();
   
    LaserChargeAnim = loadAnimation('Images/Level/lasercharge.png', { frameSize: [64, 256], frames: 4 , frameDelay: LaserSpeed}); 
    LaserAnim = loadAnimation('Images/Level/lasersheet.png', { frameSize: [64, 256], frames: 7 , frameDelay: 2});   

    //Lasers.debug = true
    Lasers.y = 125
    Lasers.collider = 'n'
    Lasers.w = 3
    Lasers.h = 250
    Lasers.scale = 1.1

    // Ices
    Ices = new Group();  
    IceAnim = loadAnimation('Images/Level/icesheet.png', { frameSize: [48, 32], frames: 10 , frameDelay: 2});  
    Ices.y = 240
    Ices.x = -550
    Ices.collider = 'n'
    Ices.w = 20
    Ices.h = 5
    Ices.vel.x = IceSpeed

     // Bats
     Bats = new Group();  
     BatAnim = loadAnimation('Images/Level/batsheet.png', { frameSize: [32, 32], frames: 6 , frameDelay: 5});  
     Bats.y = 100
     Bats.x = () => random(300,450)
     Bats.collider = 'n'
     Bats.w = 12
     Bats.h = 6
     //Bats.life = 600

    TimerText = new Sprite(20,10,.1,.1, 'n');
	TimerText.text = '0.0s';
    TimerText.textSize = 10
	TimerText.textColor = 'white';

    StartGem = new Sprite(16, 235, 35,35, 'n')
    StartGem.image = 'Images/Gem/Gem.png'

    GemShines = new Group();  
    ShineAnim = loadAnimation('Images/Gem/ShineSheet.png', { frameSize: [16, 17], frames: 9 , frameDelay: 7});  
    GemShines.x = 21
    GemShines.y = 235
    GemShines.collider = 'n'

    Shine1 = new GemShines.Sprite()
    Shine1.addAnimation("ShineAnim", ShineAnim);

    //Button Prompts
    Buttons = new Group()
    Buttons.y = 190
    Buttons.collider = 'n'

    O_Anim = loadAnimation('Images/Buttons/PS/O.png', { frameSize: [16, 16], frames: 4 , frameDelay: 10});  
    X_Anim = loadAnimation('Images/Buttons/PS/X.png', { frameSize: [16, 16], frames: 4 , frameDelay: 10});  
    R1_Anim = loadAnimation('Images/Buttons/PS/R1.png', { frameSize: [16, 16], frames: 4 , frameDelay: 4});  
    R2_Anim = loadAnimation('Images/Buttons/PS/R2.png', { frameSize: [16, 16], frames: 4 , frameDelay: 4});  
    LA_Anim = loadAnimation('Images/Buttons/PS/LA.png', { frameSize: [20, 20], frames: 4 , frameDelay: 15});  
    RA_Anim = loadAnimation('Images/Buttons/PS/RA.png', { frameSize: [20, 20], frames: 8 , frameDelay: 8});  

    //Tutorial Text
    TutorialTexts = new Group()
    TutorialTexts.w = .1
    TutorialTexts.h = .1
    TutorialTexts.y = 175
    TutorialTexts.collider = 'n'
    TutorialTexts.textColor = 'white';
    TutorialTexts.textSize = 10

    TutorialSetup()

    // Music
    MusicIntro = loadSound('Sounds/MusicIntro.wav');
    MusicLoop = loadSound('Sounds/MusicLoop.wav');
    MusicEnd = loadSound('Sounds/MusicEnd.wav');

    MusicIntro.setVolume(.15)   
    MusicLoop.setVolume(.15)   
    MusicLoop.setLoop(true)
    MusicEnd.setVolume(.15)   

    // Player SFX
    Footstep = loadSound('Sounds/Footstep1.mp3');
    Footstep.setVolume(.75)

    RollSound = loadSound('Sounds/Roll.mp3');
    RollSound.setVolume(.35)

    JumpSound = loadSound('Sounds/Jump.mp3');
    JumpSound.setVolume(.35)
    
    LandedSound = loadSound('Sounds/Landed.mp3');

    LaserSound = loadSound('Sounds/Laser.mp3');
    LaserSound.setVolume(.25)

    DieSound = loadSound('Sounds/Die.wav');
    DieSound.setVolume(.75)

    FireballSound = loadSound('Sounds/Fireball.wav');
    FireballSound.setVolume(.1)

    //Gem SFX
    GemSound = loadSound('Sounds/Gem.wav');
    GemSound.setVolume(.5)

    MusicFrame = new Sprite()
    MusicFrame.collider = 'n'
    MusicFrame.visible = false

    getAudioContext().resume();
}

function TutorialSetup(){
    let WalkText = new TutorialTexts.Sprite();
    WalkText.x = -268
    WalkText.text = 'Use left analog stick to walk around.';

    let PickUpText = new TutorialTexts.Sprite();
    PickUpText.x = 18
    PickUpText.text = 'Pick Up';

    let OButton1 = new Buttons.Sprite()
    OButton1.x = 18
    OButton1.addAnimation("OAnim", O_Anim);

    let LAButton1 = new Buttons.Sprite()
    LAButton1.x = WalkText.x
    LAButton1.addAnimation("LAAnim", LA_Anim);
}



function PlayerSetup(New){
    if (New == true){
        PlayerSprite = new gPlayerSprite.Sprite();
        PlayerSprite.spriteSheet = 'Images/PlayerSheet.png';
        PlayerSprite.addAnis({
            idle: { row: 0, frames: 10 },
            roll: { row: 1, frames: 12 , frameDelay: 2},
            death: { row: 2, frames: 10 },
            run: { row: 3, frames: 10 },
            turn: { row: 4, frames: 3 },
            jump: { row: 5, frames: 3 },
            fall: { row: 6, frames: 3 },
        });
        PlayerSprite.anis.offset.y = -19;
        PlayerSprite.anis.offset.x = 5;
        PlayerSprite.changeAni('idle');
    } else{
        Dead = false
        Busy = false
        Game_Start = false
        MusicPlaying = false
        MusicIntroDone = false
        RoundPhrase = 0
        TextCheck = 0
        RoundDelay = 1
        TimerText.text = '0.0s';
        PlayerSprite.x = gPlayerSprite.x
        PlayerSprite.y = gPlayerSprite.y
        PlayerSprite.scale = Scale
        PlayerSprite.changeAni('idle');
    }  
}

function setup() {
    new Canvas(450,300, 'pixelated');
    world.gravity.y = 40;
    world.velocityThreshold = 0.75;

    PlayerSprite.w = 20;
    PlayerSprite.h = 39;

    for (let i = 1; i <= Torches.length; i++) {
        Torches[i-1].addAnimation("TorchAnim", TorchAnim);
    }
}

function playMusic(command){
    if (command == 'Intro'){
        MusicIntro.play()
        MusicFrame.x = frameCount
        MusicPlaying = true
        MusicIntroDone = false
    } else if(command == 'Loop'){
        MusicLoop.play()
        MusicIntroDone = true
    }

}

let PlrDirection = 'Right';
let Running = false;
let Rolling = false;
let Busy = false;
let Jumping = false;
let Dead = false;

let Alt = 0;

let Game_Start = false;
let StartFrame;
let CurrentFrame;
let LaserActivate = false;

let Timer = 0
let RoundDelay = 1;
let iFrame = false;

let done = false;

function Player_Die(){
    if (iFrame != true){
        Dead = true

        TutorialTexts.removeAll()
        Buttons.removeAll()
        Bats.removeAll()
        Ices.removeAll()

        let OButton2 = new Buttons.Sprite()
        OButton2.x = -600
        OButton2.addAnimation("OAnim", O_Anim);
        OButton2.moveTo(PlayerSprite.x, OButton2.y, 15)
        OButton2.scale = 1

        let RetryText = new TutorialTexts.Sprite();
        RetryText.text = 'Press to Retry'
        RetryText.x = -600
        RetryText.moveTo(PlayerSprite.x, RetryText.y, 15)

        DieSound.play()
        MusicIntro.stop()
        MusicLoop.stop()

        PlayerSprite.vel.x = 0
        PlayerSprite.vel.y = 0
        Game_Start = false
    
        Skull.collider = 'd';
    
        PlayerSprite.changeAni('death').then(function(){
            PlayerSprite.animation.frame = 9
            PlayerSprite.animation.stop()
        })
    }
}

function Player_Retry(){
    PlayerSprite.animation.frame = 0
    PlayerSprite.animation.play()
    PlayerSetup(false)
    TutorialTexts.removeAll()
    Buttons.removeAll()

    Skull.collider = 'n'
    Skull.rotationSpeed = 0;
    Skull.rotation = 0;
    TutorialSetup()
    StartGem.visible = true
    Shine1.visible = true
}

function draw() {
    background('gray');

    camera.on();

    // Camera
    let Limit = 400

    if (PlayerSprite.x > -Limit && PlayerSprite.x < Limit){
        camera.x = PlayerSprite.x;
    } else if (PlayerSprite.x <= -Limit){
        camera.x = -Limit
    } else if (PlayerSprite.x >= Limit){
        camera.x = Limit
    }

    camera.y = 175;

    //Tutorial Text Update
    if (RoundPhrase == 1){
        if (TextCheck != RoundPhrase){
            TextCheck = RoundPhrase
            Round1Text = new TutorialTexts.Sprite();
            Round1Text.x = 18
            Round1Text.text = 'Avoid the Lasers';       

            LAButton = new Buttons.Sprite()
            LAButton.x = 18
            LAButton.addAnimation("LAAnim", LA_Anim);
        } else{
            Round1Text.moveTowards(PlayerSprite.x, Round1Text.y, .2)
            LAButton.moveTowards(PlayerSprite.x, LAButton.y, .2)
        }
    } else if(RoundPhrase == 2){
        if (TextCheck != RoundPhrase){
            TutorialTexts.removeAll()
            Buttons.removeAll()
            TextCheck = RoundPhrase
            
            Round2Text = new TutorialTexts.Sprite();
            Round2Text.x = 18
            Round2Text.text = 'Jump!';    
    
            XButton = new Buttons.Sprite()
            XButton.x = 18
            XButton.addAnimation("XAnim", X_Anim);
        } else{
            Round2Text.moveTowards(PlayerSprite.x, Round2Text.y, .2)
            XButton.moveTowards(PlayerSprite.x, XButton.y, .2)
        }
    } else if(RoundPhrase == 3 ){
        if (TextCheck != RoundPhrase){
            TutorialTexts.removeAll()
            Buttons.removeAll()
            TextCheck = RoundPhrase
           
            Round3Text = new TutorialTexts.Sprite();
            Round3Text.x = 18
            Round3Text.text = 'Shoot!';    
    
            R1Button = new Buttons.Sprite()
            R1Button.x = 18
            R1Button.addAnimation("R1Anim", R1_Anim);

            RAButton = new Buttons.Sprite()
            RAButton.x = 18
            RAButton.addAnimation("RAAnim", RA_Anim);
        } else{
            Round3Text.moveTowards(PlayerSprite.x, Round3Text.y, .2)
            R1Button.moveTowards(PlayerSprite.x + 10, R1Button.y, .2)
            RAButton.moveTowards(PlayerSprite.x - 10, R1Button.y, .2)
        }
    } else if(RoundPhrase == 4 || RoundPhrase == 5){
        if (TextCheck != RoundPhrase){
            TutorialTexts.removeAll()
            Buttons.removeAll()
            TextCheck = RoundPhrase
           
            Round4Text = new TutorialTexts.Sprite();
            Round4Text.x = 18
            Round4Text.text = 'Roll!';               

            R2Button = new Buttons.Sprite()
            R2Button.x = 18
            R2Button.addAnimation("R2Anim", R2_Anim);
        } else{
            Round4Text.moveTowards(PlayerSprite.x, Round4Text.y, .2)
            R2Button.moveTowards(PlayerSprite.x, R2Button.y, .2)
        }
    } else if(RoundPhrase == 6 && TextCheck != RoundPhrase){
        TextCheck = RoundPhrase
        Round4Text.remove()
        R2Button.remove()
    }


    if (Game_Start == true){
        TimerText.text = round((frameCount - StartFrame.x)/60, 1)+'s'
    }

    // Skull Movement
    if (Dead == false){
        Skull.moveTowards(PlayerSprite.x - 20, PlayerSprite.y - 25, .2)
    }

    // Player Movement
    if (Busy == false && Dead == false){
        if (-1 <= contro.leftStick.x && contro.leftStick.x <= -0.2) {
            PlayerSprite.anis.scale.x = -Scale;
            Skull.scale.x = -Scale2;
            PlayerSprite.changeAni('run');
    
            Running = true;
            PlrDirection = 'Left';
    
            PlayerSprite.vel.x = -PlayerSpeed * -contro.leftStick.x; 
         } else if (0.2 <= contro.leftStick.x && contro.leftStick.x <= 1) { 
            PlayerSprite.anis.scale.x = Scale;
            Skull.scale.x = Scale2;
            PlayerSprite.changeAni('run');
           
            Running = true;
            PlrDirection = 'Right';
            
            PlayerSprite.vel.x = PlayerSpeed * contro.leftStick.x;      
         } else {
              Running = false;
               PlayerSprite.vel.x = 0;
            PlayerSprite.changeAni('idle');
        }
   
    } else if (Jumping == true && Dead == false) {
        if (-1 <= contro.leftStick.x && contro.leftStick.x <= -0.2) {

            PlayerSprite.anis.scale.x = -Scale;
            Skull.scale.x = -Scale2;
            PlrDirection = 'Left';
    
            PlayerSprite.vel.x = -(PlayerSpeed- 1); 
        } else if (0.2 <= contro.leftStick.x && contro.leftStick.x <= 1 && Dead == false) {
                
                PlayerSprite.anis.scale.x = Scale;
                Skull.scale.x = Scale2;

                PlrDirection = 'Right';
                
                PlayerSprite.vel.x = PlayerSpeed - 1; 
        } else {
            PlayerSprite.vel.x = 0;
        }
    }
    
    // Roll
    if (contro.presses('rt') && Busy == false && Dead == false){
        Busy = true
        PlayerSprite.direction = PlrDirection;
        PlayerSprite.speed = 9;
        iFrame = true
        RollSound.play()
        PlayerSprite.changeAni('roll').then(function(){
            Busy = false
            iFrame = false
        })
    }

    // Jump
    if (contro.presses('a') && Busy == false && Dead == false){
        Busy = true
        PlayerSprite.vel.y = -10;
        JumpSound.play()

        PlayerSprite.changeAni('jump').then(function(){
            if (Dead == false){
                Jumping = true 
                PlayerSprite.changeAni('fall')
            }
        })
    }

    // Landed
    if (PlayerSprite.collides(Floors) && Jumping == true && Dead == false) {
        Busy = false
        Jumping = false
        LandedSound.play()
    }

    // Shoot
    if (contro.presses('r') && Dead == false){    
        if (contro.rightStick.x > 0.2 || contro.rightStick.y > 0.2 || contro.rightStick.x < -0.2 || contro.rightStick.y < -0.2){
            let Aim = new Sprite(PlayerSprite.x + contro.rightStick.x * 1000, PlayerSprite.y + contro.rightStick.y * 1000, 25, 'n');
            Aim.visible = false

            FireballSound.play()

            let Fireball = new Fireballs.Sprite();
            Fireball.addAnimation("Fireball", FireballAni);
            Fireball.animation.play();
    
            Fireball.pos = Skull.pos

            Fireball.moveTowards(Aim.x, Aim.y, FireballSpeed)
            Fireball.rotateTo(Aim, 100, 0)
        }
    }

    // Game Start
    if (contro.presses('b') && Game_Start == false && PlayerSprite.overlapping(StartGem) && Dead == false){
        Game_Start = true
        TutorialTexts.removeAll()
        Buttons.removeAll()
        StartGem.visible = false
        Shine1.visible = false

        GemSound.play()
        playMusic('Intro')

        // Store start frame
        StartFrame = new Sprite()
        StartFrame.x = frameCount
        StartFrame.collider = 'n'
        StartFrame.visible = false
    }

        // Retry Button
        if (Dead == true && contro.presses('b')){
            Player_Retry()
        } 

    // Round Loops
    if (Game_Start == true) {    
        if ((frameCount - StartFrame.x) % RoundDelay == 0 && (frameCount - StartFrame.x) < 240){ // Tutorial Laser
            RoundPhrase = 1
            RoundDelay = 80
            doLasers(5, PlayerSprite.x)       
        } else if ((frameCount - StartFrame.x) % RoundDelay == 0 && (frameCount - StartFrame.x) < 480){ // Tutorial Ice
            RoundPhrase = 2
            RoundDelay = 120                     
            doIce()       
        } else if ((frameCount - StartFrame.x) % RoundDelay == 0 && (frameCount - StartFrame.x) < 960){ // Tutorial Bat
            RoundPhrase = 3
            RoundDelay = 200  
            doBatR()     
      
        } else if ((frameCount - StartFrame.x) % RoundDelay == 0 && (frameCount - StartFrame.x) < 1200){ // Tutorial Roll
            RoundPhrase = 4
            RoundDelay = 1  

        } else if ((frameCount - StartFrame.x) % RoundDelay == 0 && (frameCount - StartFrame.x) < 1440){ // Roll Test
            RoundPhrase = 5
            doLasers(6) 
            RoundDelay = 120  
          
        } else if ((frameCount - StartFrame.x) % RoundDelay == 0 && (frameCount - StartFrame.x) < 2700){ // Real Round
            RoundPhrase = 6
            RoundDelay = 200
            doBatL()
            doBatR()

            if (round(random(1,2)) == 1){
                doLasers(round(random(1,5)), PlayerSprite.x)        
            }
                
            doIce()
        } else if ((frameCount - StartFrame.x) % RoundDelay == 0 && (frameCount - StartFrame.x) < 3300){ // Super Laser Round
            RoundDelay = 120
            doLasers(6) 
        } else if ((frameCount - StartFrame.x) % RoundDelay == 0){ // Intense Round
            RoundDelay = 120
            doBatL()
            doBatR()

            if (round(random(1,2)) == 1){
                doLasers(round(random(1,5)), PlayerSprite.x)            
            }
                
            doIce()
        }
    }

    // Laser Overlap Detection
    if (PlayerSprite.overlapping(Lasers) && LaserActivate == true & Dead == false) {
        Player_Die()
    }

    // Ices Overlap Detection
    if (PlayerSprite.overlapping(Ices) & Dead == false) {
        PlayerSprite.anis.scale.x = -Scale
        Player_Die()
    }

    // Bats Overlap Detection
    if (PlayerSprite.overlapping(Bats) & Dead == false) {
        Player_Die()
    }

    // Fireballs Overlap Detection
    for (let i = 1; i <= Bats.length; i++) {

        Bats[i-1].moveTo(PlayerSprite.x, PlayerSprite.y - 10, BatSpeed)

        if (Bats[i-1].x - PlayerSprite.x < 0){             
            Bats[i-1].scale.x = -1;                      
        } else {
            Bats[i-1].scale.x = 1;       
        }

        if (Fireballs.overlaps(Bats[i-1])){
            Bats[i-1].remove()
        }                  
    }

    if (frameCount % 20 == 0 && Running == true && Busy == false && Dead == false){
        Footstep.play()
    }

    if (MusicPlaying == true && Dead == false){
        if (MusicIntroDone == false && frameCount == MusicFrame.x + 261){
            playMusic('Loop')
        }
    }

    // Skip drawing UI text by making it not visible here
    TimerText.visible = false;
    allSprites.draw();

    // draw ui text
    camera.off();
    TimerText.draw();
}

function doLasers(preset, pos){
    let OriginPos = -600;
    let PosVar = 100;
    let Amount = 11;

   if (preset == 2){
    OriginPos = -600;
    PosVar = 70
    Amount = 15
   } else if (preset == 3){
    OriginPos = -560;
    PosVar = 50
    Amount = 6
   } else if (preset == 4){
    OriginPos = 225;
    PosVar = 50
    Amount = 6
    } else if (preset == 6){
        OriginPos = -560;
        PosVar = 25
        Amount = 44

        Bats.removeAll()
        Ices.removeAll()
    }  else if (preset == 5){
        OriginPos = pos-50;
        PosVar = 20
        Amount = 4
    }

   LaserActivate = false;
    let SoundPlayed = false

   for (let i = 0; i < Amount; i++) {
    let Laser = new Lasers.Sprite()
    Laser.addAnimation("LaserCharge", LaserChargeAnim);
    Laser.x = OriginPos + (i+1)*PosVar
    
    Laser.animation.play().then(function(){                
        Laser.addAnimation("LaserAnim", LaserAnim);
        LaserActivate = true;

        Laser.animation.play().then(function(){
            Laser.remove()
            LaserActivate = false;

            if (SoundPlayed == false){
                LaserSound.play()
                SoundPlayed = true
            }

        })
    })
    }     
}

function doIce(){
    let Ice = new Ices.Sprite()
    Ice.addAnimation("IceAnim", IceAnim);
    Ice.animation.play()
}

function doBatL(){
    for (let i = 1; i <= 3; i++) {
        let Bat = new Bats.Sprite()
        Bat.addAnimation("BatAnim", BatAnim);
        Bat.animation.play()
    }
}

function doBatR(){
    for (let i = 1; i <= 3; i++) {
        let Bat = new Bats.Sprite()
        Bat.addAnimation("BatAnim", BatAnim);
        Bat.x = random(-500,-300)
        Bat.animation.play()
    }
}