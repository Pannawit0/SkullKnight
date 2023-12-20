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
let Paused = false;
let PauseButton;

let gPlayerSprite;
let Lasers, Ices, Bats;
let Laser;
let Torches;
let StartGem, GemShines, ShineAnim, Shine1, Gems;
let GemSound;

let RoundPhrase;

let Footstep, RollSound, JumpSound, LandedSound, LaserSound, DieSound, FireballSound;

let TutorialTexts, TextCheck;

let Round1Text, Round2Text, Round3Text, Round4Text, XButton, R1Button, LAButton, R2Button, OButton, RAButton;
let Buttons, RetryButton;

let PauseOverlay, PauseFrameStart, PauseFrameEnd, PauseFrameCount, PauseButtonText, PauseText, PauseText2;

let Arrows, ArrowL, ArrowR;
let GemDirection = 1

let ScoreText, ScoreText2;
let Score = 0;
let GemCount = 0;
let FrameSinceStart;

let scene = 0;

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

let bitPotionFont;
let onMac = false;

function preload() {

    onMac = p5play.os.platform == 'macOS';
   
    PlayerAni = loadAnimation('Images/PlayerSheet.png');

    bitPotionFont = loadFont('BitPotionExt.ttf')
    // Level Stuff
    let Sky = new Sprite(15, 150, 426, 384, 'n');
    Sky.image = 'Images/Map/sky_tile.png'

    let Mountain1 = new Sprite(15, 200, 426, 384, 'n');
    Mountain1.image = 'Images/Map/mountain1.png'

    let Mountain2 = new Sprite(15, 175, 426, 384, 'n');
    Mountain2.image = 'Images/Map/mountain2.png'

    let RailingTiles = new Group();
	RailingTiles.w = 80;
	RailingTiles.h = 51;
    RailingTiles.collider = 'n'
    RailingTiles.image = 'Images/Map/railing_tile.png'
	RailingTiles.tile = 'r';

	let tilesGroup8 = new Tiles(
		[
            'rrrrrrrr',           
		],
		-210,
		234,
		RailingTiles.w - 1,
		RailingTiles.h
	);

    let BGTiles = new Group();
	BGTiles.w = 144;
	BGTiles.h = 112;
    BGTiles.collider = 'n'
    BGTiles.image = 'Images/Map/bg_tile.png'
	BGTiles.tile = '/';

	let tilesGroup2 = new Tiles(
		[
		'////...///',
        '////...///',
        '////...///',
        '////...///',
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
        'p........p........p..........................p........p........p',
        'p........p........p..........................p........p........p',
        'p........p........p..........................p........p........p',
        'p........p........p..........................p........p........p',
		],
		-485,
		0,
		Pillars.w,
		Pillars.h-1
	);

    let Pillar2Tiles = new Group();
	Pillar2Tiles.w = 32;
	Pillar2Tiles.h = 313;
    Pillar2Tiles.collider = 'n'
    Pillar2Tiles.scale = 0.8
    Pillar2Tiles.image = 'Images/Map/pillar2_tile.png'
	Pillar2Tiles.tile = 'h';

	let tilesGroup9 = new Tiles(
		[
            'h...h.....h...h',           
		],
		-200,
		135,
		Pillar2Tiles.w - 1,
		Pillar2Tiles.h
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
            'w..........................w'
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
            'd.................d'
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
            't.................t'
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

    let Curtain1 = new Sprite(85,42 , 100, 'n')
    Curtain1.image = 'Images/Map/curtain1.png'

    let Curtain1_1 = new Sprite(-35,42, 100, 'n')
    Curtain1_1.image = 'Images/Map/curtain1.png'
    Curtain1_1.scale.x = -1

    let Curtain1_2 = new Sprite(175,25, 100, 'n')
    Curtain1_2.image = 'Images/Map/curtain1.png'
    Curtain1_2.scale.x = -1

    let Curtain1_3 = new Sprite(-165,64, 100, 'n')
    Curtain1_3.image = 'Images/Map/curtain1.png'
    Curtain1_3.scale.x = -1

    let Curtain2 = new Sprite(-95,32, 100, 'n')
    Curtain2.image = 'Images/Map/curtain2.png'

    let Curtain2_1 = new Sprite(225,64, 100, 'n')
    Curtain2_1.image = 'Images/Map/curtain2.png'

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

    let Decor8 = new Sprite(25,38, 100, 'n')
    Decor8.image = 'Images/Map/decor8.png'

    let Decor9 = new Sprite(-545,38, 100, 'n')
    Decor9.image = 'Images/Map/decor9.png'

    let Decor9_1 = new Sprite(-175,38, 100, 'n')
    Decor9_1.image = 'Images/Map/decor9.png'

    let Decor9_2 = new Sprite(190,38, 100, 'n')
    Decor9_2.image = 'Images/Map/decor9.png'
    Decor9_2.scale.x = -1

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

    TimerText = new Sprite(25,285,.1,.1, 'n');
	TimerText.text = '0.0s';
    if (!onMac) TimerText.textSize = 9
	TimerText.textColor = 'grey';

    ScoreText = new Sprite(27,10,.1,.1, 'n');
	ScoreText.text = 'Score:';
    if (!onMac) ScoreText.textSize = 9
	ScoreText.textColor = 'white';

    ScoreText2 = new Sprite(50,10,.1,.1, 'n');
	ScoreText2.text = 0;
    if (!onMac) ScoreText2.textSize = 9
	ScoreText2.textColor = 'white';

    GemText = new Sprite(25,23,.1,.1, 'n');
	GemText.image = 'Images/Gem/Gem.png'

    GemText2 = new Sprite(50,25,.1,.1, 'n');
	GemText2.text = 0;
    if (!onMac) GemText2.textSize = 9
	GemText2.textColor = 'white';

    Gems = new Group()
    Gems.y = 235
    Gems.w = 35
    Gems.h = 35
    Gems.collider = 'n'
    Gems.image = 'Images/Gem/Gem.png'

    StartGem = new Gems.Sprite()
    StartGem.x = 16
    StartGem.image = 'Images/Gem/Gem.png'

    GemShines = new Group();  
    ShineAnim = loadAnimation('Images/Gem/ShineSheet.png', { frameSize: [16, 17], frames: 9 , frameDelay: 7});  
    GemShines.x = 21
    GemShines.y = 235
    GemShines.collider = 'n'

    Shine1 = new GemShines.Sprite()
    Shine1.addAnimation("ShineAnim", ShineAnim);

    // Arrow Indicator 
    Arrows = new Group(); 
    Arrows.image = 'Images/Menu/arrow.png' 
    Arrows.y = 210
    Arrows.collider = 'n'

    ArrowL = new Arrows.Sprite()
    ArrowL.scale.x = -1
    ArrowL.x = 25

    ArrowR = new Arrows.Sprite()
    ArrowR.x = 425

    //Button Prompts
    Buttons = new Group()
    Buttons.y = 190
    Buttons.collider = 'n'

    O_Anim = loadAnimation('Images/Buttons/PS/O.png', { frameSize: [16, 16], frames: 4 , frameDelay: 10});  
    X_Anim = loadAnimation('Images/Buttons/PS/X.png', { frameSize: [16, 16], frames: 4 , frameDelay: 10});  
    R1_Anim = loadAnimation('Images/Buttons/PS/R1.png', { frameSize: [16, 16], frames: 4 , frameDelay: 4});  
    R2_Anim = loadAnimation('Images/Buttons/PS/R2.png', { frameSize: [16, 16], frames: 4 , frameDelay: 4});  
    LA_Anim = loadAnimation('Images/Buttons/PS/LA.png', { frameSize: [20, 20], frames: 4 , frameDelay: 15});  
    RA_Anim = loadAnimation('Images/Buttons/PS/RA.png', { frameSize: [20, 22], frames: 8 , frameDelay: 8});  

    //Tutorial Text
    TutorialTexts = new Group()
    TutorialTexts.w = .1
    TutorialTexts.h = .1
    TutorialTexts.y = 175
    TutorialTexts.collider = 'n'
    TutorialTexts.textColor = 'white';
    if (!onMac) TutorialTexts.textSize = 10

    TutorialSetup()

    // Pause Menu Preload
    PauseOverlay = new Sprite(225, 150, 1, 'n')
    PauseOverlay.image = 'Images/Menu/pauseoverlay.png'
    PauseOverlay.debug = true

    // Start/Pause frame storing
    PauseFrameStart = new Sprite()
    PauseFrameStart.x = 0
    PauseFrameStart.collider = 'n'
    PauseFrameStart.visible = false

    PauseFrameEnd = new Sprite()
    PauseFrameEnd.x = 0
    PauseFrameEnd.collider = 'n'
    PauseFrameEnd.visible = false

    PauseFrameCount = new Sprite()
    PauseFrameCount.x = 0
    PauseFrameCount.collider = 'n'
    PauseFrameCount.visible = false

    StartFrame = new Sprite()
    StartFrame.x = 0
    StartFrame.collider = 'n'
    StartFrame.visible = false

    //Pause button
    PauseButton = new Sprite(405,283,.1,.1, 'n');
	PauseButton.image = 'Images/Menu/pausebutton.png';
    //PauseButton.scale = 2;

    PauseButtonText = new Sprite(427,286,.1,.1, 'n');
	PauseButtonText.text = 'Pause';
    if (!onMac) PauseButtonText.textSize = 9
	PauseButtonText.textColor = 'grey';

    PauseText = new Sprite(225,80,.1,.1, 'n');
	PauseText.text = "- Paused -";
    if (onMac) PauseText.textSize = 32
    else PauseText.textSize = 15
	PauseText.textColor = 'white';

    PauseText2 = new Sprite(225,100,.1,.1, 'n');
	PauseText2.text = "Press Start to Resume";
    if (!onMac) PauseText2.textSize = 12
	PauseText2.textColor = 'grey';

    //Title Screen
    TitleBG = new Sprite(0,0, 1000, 1000, 'n')
    TitleBG.color = 'black'

    Logo = new Sprite(225,125, 100, 100, 'n')
    Logo.image = 'Images/TitleScreen/Logo.png'
    Logo.scale = 0.1

    TitleText1 = new Sprite(225, 215, 0.1,0.1, 'n')
    TitleText1.text = '[ PRESS START ]'
    TitleText1.textSize = 10
    TitleText1.textColor = 'grey'

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

    //Pause SFX
    PausedSound = loadSound('Sounds/Paused.wav');
    PausedSound.setVolume(.5)

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
    PickUpText.x = 16
    PickUpText.text = 'Collect to Start';

    let OButton1 = new Buttons.Sprite()
    OButton1.x = 16
    OButton1.addAnimation("OAnim", O_Anim);

    let LAButton1 = new Buttons.Sprite()
    LAButton1.x = WalkText.x
    LAButton1.addAnimation("LAAnim", LA_Anim);
}

function spawnGem(){
    let Gem = new Gems.Sprite()
    Gem.image = 'Images/Gem/Gem.png'

    if (GemDirection == 1){
        Gem.x = round(random(100,400))
        GemDirection = -1
    } else{
        Gem.x = round(random(-400,-100))
        GemDirection = 1
    }

    let Shine = new GemShines.Sprite()
    Shine.addAnimation("ShineAnim", ShineAnim);
    Shine.x = Gem.x + 5
}

function collectGem(){
    GemSound.play()
    Score = Score + 100
    GemCount = GemCount + 1
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
        FrameSinceStart = 0
        PauseFrameCount.x = 0
        StartFrame.x = frameCount
        TextCheck = 0
        RoundDelay = 1
        Score = 0;
        GemCount = 0;
        TimerText.text = '0.0s';
        PlayerSprite.x = gPlayerSprite.x
        PlayerSprite.y = gPlayerSprite.y
        PlayerSprite.scale = Scale
        PlayerSprite.changeAni('idle');

        for (let i = 0; i < Gems.length; i++) {
            if (Gems[i] != StartGem){
                Gems[i].remove()
                GemShines[i].remove()
            }
        }
    }  
}

function setup() {
    new Canvas(450,300, 'pixelated');
    world.gravity.y = 40;
    world.velocityThreshold = 0.75;

    if (onMac) {
        textFont(bitPotionFont);
        allSprites.textSize = 16;
    }

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
    switch (scene) {
        case 0:
          background(255);

          if (contro.presses('start')){
            scene = 1;
            TitleBG.visible = false;
            Logo.visible = false;
            TitleText1.visible = false;
          }

          break;
        case 1:
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
        
            // Score Text Update
            ScoreText2.text = Score
            GemText2.text = GemCount
        
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
        
            // Skull Movement
            if (Dead == false){
                Skull.moveTowards(PlayerSprite.x - 20, PlayerSprite.y - 25, .2)
            }
        
            if (!Paused){
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
            
                    playMusic('Intro')
            
                    collectGem()
                    // Store start frame
                    PauseFrameCount.x = 0
                    StartFrame.x = frameCount
                }
        
                // Gem Collect Detection
                if (contro.presses('b') && PlayerSprite.overlapping(Gems) && Dead == false && !Paused){          
                    for (let i = 0; i < Gems.length; i++) {
                        if (PlayerSprite.overlapping(Gems[i]) && Gems[i] != StartGem){
                            Gems[i].remove()
                            GemShines[i].remove()
                            collectGem()
                        }
                    }
                }
        
                // Retry Button
                if (Dead == true && contro.presses('b')){
                    Player_Retry()
                } 
            }
        
            // Frame Since Start Update
            FrameSinceStart = frameCount - StartFrame.x - PauseFrameCount.x
        
            if (Game_Start == true && !Paused){
                TimerText.text = round(FrameSinceStart/60, 1)+'s'
            }
        
            // Pause input detect
            if (contro.presses('start')) {
                if (Paused == false){
                    world.autoStep = Paused;
                    allSprites.autoUpdate = Paused;
                    Paused = !Paused;
                    PauseFrameStart.x = frameCount
                    MusicIntro.setVolume(.02)
                    MusicLoop.setVolume(.02)
                    PausedSound.play()
                } else{
                    world.autoStep = Paused;
                    allSprites.autoUpdate = Paused;
                    Paused = !Paused;
                    PauseFrameEnd.x = frameCount
                    MusicIntro.setVolume(.15)
                    MusicLoop.setVolume(.15)
        
                    PauseFrameCount.x = PauseFrameCount.x + abs(PauseFrameStart.x - PauseFrameEnd.x)
                    PauseFrameStart.x = 0
                    PauseFrameEnd.x = 0
                }
            }
        
            // Gem Spawning
            if (Game_Start == true && Gems.length == 1 && RoundPhrase >= 6) {  
                spawnGem()  
            }
        
            // Round Loops
            if (Game_Start == true && !Paused) {    
                if (FrameSinceStart % RoundDelay == 0 && FrameSinceStart < 240){ // Tutorial Laser
                    RoundPhrase = 1
                    RoundDelay = 80
                    doLasers(5, PlayerSprite.x)       
                } else if (FrameSinceStart % RoundDelay == 0 && FrameSinceStart < 480 && FrameSinceStart >= 240){ // Tutorial Ice
                    RoundPhrase = 2
                    RoundDelay = 120                     
                    doIce()       
                } else if (FrameSinceStart % RoundDelay == 0 && FrameSinceStart < 960 && FrameSinceStart >= 480){ // Tutorial Bat
                    RoundPhrase = 3
                    RoundDelay = 240  
                    doBatR()     
              
                } else if (FrameSinceStart % RoundDelay == 0 && FrameSinceStart < 1200 && FrameSinceStart >= 960){ // Tutorial Roll
                    RoundPhrase = 4
                    RoundDelay = 1  
        
                } else if (FrameSinceStart % RoundDelay == 0 && FrameSinceStart < 1440 && FrameSinceStart >= 1200){ // Roll Test
                    RoundPhrase = 5
                    doLasers(6) 
                    RoundDelay = 120  
                  
                } else if (FrameSinceStart % RoundDelay == 0 && FrameSinceStart < 2700 && FrameSinceStart >= 1440){ // Real Round
                    RoundPhrase = 6
                    RoundDelay = 200
                    doBatL()
                    doBatR()
        
                    if (round(random(1,2)) == 1){
                        doLasers(round(random(1,5)), PlayerSprite.x)        
                    }
                        
                    doIce()
                } else if (FrameSinceStart % RoundDelay == 0 && FrameSinceStart < 3000 && FrameSinceStart >= 2700){ // Break
                    RoundDelay = 120
                } else if (FrameSinceStart % RoundDelay == 0 && FrameSinceStart < 3300 && FrameSinceStart >= 3000){ // Super Laser Round
                    RoundDelay = 120
                    doLasers(6) 
                } else if (FrameSinceStart % RoundDelay == 0){ // Intense Round
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
        
                for (let i = 0; i < Lasers.length; i++) {
                    if (PlayerSprite.overlapping(Lasers[i]) && Dead == false){
                        if (Lasers[i].ani.frame >= 1 && Lasers[i].ani.frame <= 4){
                            Player_Die()
                        }                
                    }
                }
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
            for (let i = 0; i < Bats.length; i++) {
        
                Bats[i].moveTo(PlayerSprite.x, PlayerSprite.y - 10, BatSpeed)
        
                if (Bats[i].x - PlayerSprite.x < 0){             
                    Bats[i].scale.x = -1;                      
                } else {
                    Bats[i].scale.x = 1;       
                }
        
                if (Fireballs.overlaps(Bats[i])){
                    Bats[i].remove()
                    Score = Score + 5
                }                  
            }
        
            //Walk SFX
            if (frameCount % 20 == 0 && Running == true && Busy == false && Dead == false && !Paused){
                Footstep.play()
            }
        
            //Music
            if (MusicPlaying == true && Dead == false){
                if (MusicIntroDone == false && frameCount == MusicFrame.x + 261){
                    playMusic('Loop')
                }
            }
        
            // Skip drawing UI text by making it not visible here
            TimerText.visible = false;
            PauseOverlay.visible = false;
            PauseButton.visible = false;
            PauseButtonText.visible = false;
            PauseText.visible = false;
            PauseText2.visible = false;
            ScoreText.visible = false;
            ScoreText2.visible = false;
            GemText.visible = false;
            GemText2.visible = false;
            ArrowL.visible = false;
            ArrowR.visible = false;
            allSprites.draw();
        
            // draw ui text
            camera.off();
            TimerText.draw();
            PauseButton.draw();
            PauseButtonText.draw();
            ScoreText.draw();
            ScoreText2.draw();
            GemText.draw();
            GemText2.draw();
        
            if (Paused){
                PauseOverlay.draw();
                PauseOverlay.draw();
                PauseText.draw();
                PauseText2.draw();
            }
        
            // Arrow Indicator Update
            if (Game_Start == true && Gems.length > 1 && RoundPhrase >= 6) {  
                if ((Gems[1].x - PlayerSprite.x) < 0){
                    ArrowL.draw()
                } else{
                    ArrowR.draw()
                }
            }
          break;
      }
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
        //Laser.ani.frameDelay = 2;
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
    for (let i = 1; i <= 2; i++) {
        let Bat = new Bats.Sprite()
        Bat.addAnimation("BatAnim", BatAnim);
        Bat.animation.play()
    }
}

function doBatR(){
    for (let i = 1; i <= 2; i++) {
        let Bat = new Bats.Sprite()
        Bat.addAnimation("BatAnim", BatAnim);
        Bat.x = random(-500,-300)
        Bat.animation.play()
    }
}