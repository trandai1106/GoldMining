var TIME_INTERVAL = 16,
    WIDTH_CANVAS = 750,
    HEIGHT_CANVAS = 570,
    HEIGHT_PLAYAREA = 450,
    COLOR_CANVAS = "#663300",
    COLOR_PLAYER_STANDING = "#336633",
    RADIUS_PLAYER_STANDING = 100,
    COLOR_NOTI = "#ffcc66",
    SIZE_WORD_NOTI = "30px",
    SIZE_WORD_PRICE = "26px",
    SIZE_WORD_PLUS_MONEY = "22px",
    SIZE_WORD_SUPER_POWER = "50px";
    COLOR_WORD = "#40e05e",
    SIZE_WORD = "60px",
    FONT_WORD = "Comic Sans MS",
    FONT_WORD_PRICE = "Monospace",
    FONT_WORD_SUPERPOWER = "Comic Sans MS",
    COLOR_POINT = "black",
    COLOR_LINE = "red",
    COLOR_RECTANGLE = "green",
    COLOR_CIRCLE = "blue";
var SRC_MAP = "sprite/map_2.jpg",
    SRC_ATLAS = "sprite/atlas.png",
    SRC_BG_TRANS_SCENE = "sprite/bg_1.png",
    SRC_BG_END_GAME = "sprite/bg_2.jpg";
var SRC_SOUND_START_SCENE = "sound/start-scene.mp3",
    SRC_SOUND_PLAY_SCENE = "sound/play-scene.mp3",
    SRC_SOUND_SHOP_SCENE = "sound/shop-scene.mp3",
    SRC_SOUND_BUY_ITEM = "sound/buy-item.wav",
    SRC_SOUND_DRAG_HOOK = "sound/drag-hook.wav",
    SRC_SOUND_ENDGAME_LOSE = "sound/endgame-lose.wav",
    SRC_SOUND_ENDGAME_WIN = "sound/endgame-win.wav",
    SRC_SOUND_EXPLOSION = "sound/explosion.wav",
    SRC_SOUND_MISSION_PASSED = "sound/mission-passed.wav",
    SRC_SOUND_NEW_LEVEL = "sound/new-level.wav",
    SRC_SOUND_PLUS_MONEY = "sound/plus-money.wav",
    SRC_SOUND_PULL_HOOK = "sound/pull-hook.wav",
    SRC_SOUND_SUPER_POWER = "sound/super-power.wav";


var GRAVITY = 2,
    FRICTION_HOOK_DROP = 1.8;
var MAX_ANGLE = 60, 
    FRICTION_HOOK_ROTATE = 2.5;
var RADIUS_BIG_BANG = 40;
var pigVelocityX = 1,
    pigVelocityY = 1;

var keyScene; // state of game, represent for which scene is render: Start, Play, Shopping or Trans scene
var ifMouseOnPlayButton;
var isCountDowning;
var stateDragging;
var mousePosition;
var hookPosition;
var playerPosition;
var timeLeft;
var level;
var money;
var targetMoney;
var num_mine = 1;
var isPower = 0;
var isSuperPower = 0;
var isLucky = 0;
var isRockCollect = 0;
var isDiamondBuff = 0;
var key;
var gold_big, gold_middle, gold_small,
        rock_big, rock_small,
        diamond,
        tnt,
        pig,
        pig_diamond,
        gift,
        bone,
        head_bone;
var angle, ifDirectHook_LtR = 1;
var lengthRope, MAX_LENGTH_ROPE = 630, ifMaxLengthRope = 0;
var img_map, img_atlas, img_bg;
var vectorDrop;
var vectorPull;
var vectorDropLength;
var vectorPullLength;
var img_properties;
var radiusHookAndThing;
var valueThing;
var moneyPlus;
var weightThing;
var sizeThing;
var countTransSceneShopToPlay = 0,
    countTransScenePlayToShop = 0;
var sound_start_scene,
    sound_play_scene,
    sound_shop_scene,
    sound_buy_item,
    sound_drag_hook,
    sound_endgame_lose,
    sound_endgame_win,
    sound_explosion,
    sound_mission_passed,
    sound_new_level,
    sound_pull_hook,
    sound_shop_scene,
    sound_super_power;
var anim_seller = [{x: 868, y: 267}, 
                {x: 868, y: 267}, 
                {x: 842, y: 450}, 
                {x: 842, y: 450}, 
                {x: 835, y: 614}, 
                {x: 835, y: 614}, 
                {x: 842, y: 450}, 
                {x: 842, y: 450}, 
                {x: 868, y: 267}, 
                {x: 868, y: 267}];
var anim_old_man_drop_hook = [{x: 810, y: 1258, w: 63, h: 62}, 
                            {x: 528, y: 1220, w: 62, h: 61}, 
                            {x: 333, y: 1132, w: 63, h: 60}, 
                            {x: 463, y: 1173, w: 63, h: 61}];
var anim_old_man_pull_hook = [{x: 615, y: 1213, w: 63, h: 64}, {x: 615, y: 1213, w: 63, h: 64}, 
                        {x: 615, y: 1213, w: 63, h: 64}, {x: 615, y: 1213, w: 63, h: 64}, 
                        {x: 825, y: 1193, w: 63, h: 63}, {x: 825, y: 1193, w: 63, h: 63},
                        {x: 745, y: 1250, w: 63, h: 63}, {x: 745, y: 1250, w: 63, h: 63},
                        {x: 931, y: 1259, w: 63, h: 61}, {x: 931, y: 1259, w: 63, h: 61}, 
                        {x: 931, y: 1322, w: 63, h: 61}, {x: 931, y: 1322, w: 63, h: 61}, 
                        {x: 203, y: 1107, w: 63, h: 61}, {x: 203, y: 1107, w: 63, h: 61},
                        {x: 268, y: 1107, w: 63, h: 61}, {x: 268, y: 1107, w: 63, h: 61}, 
                        {x: 934, y: 1194, w: 63, h: 63}, {x: 934, y: 1194, w: 63, h: 63},
                        {x: 934, y: 1194, w: 63, h: 63}, {x: 934, y: 1194, w: 63, h: 63}, 
                        {x: 615, y: 1213, w: 63, h: 64}, {x: 615, y: 1213, w: 63, h: 64},
                        {x: 615, y: 1213, w: 63, h: 64}, {x: 615, y: 1213, w: 63, h: 64},   
                        {x: 695, y: 1178, w: 63, h: 64}, {x: 695, y: 1178, w: 63, h: 64}, 
                        {x: 695, y: 1178, w: 63, h: 64}, {x: 695, y: 1178, w: 63, h: 64}, 
                        {x: 760, y: 1184, w: 63, h: 64}, {x: 760, y: 1184, w: 63, h: 64}, 
                        {x: 680, y: 1244, w: 63, h: 64}, {x: 680, y: 1244, w: 63, h: 64}, 
                        {x: 760, y: 1184, w: 63, h: 64}, {x: 760, y: 1184, w: 63, h: 64}];
var anim_old_man_throw_mine = [{x: 952, y: 942, w: 70, h: 70}, {x: 952, y: 942, w: 70, h: 70}, {x: 952, y: 942, w: 70, h: 70}, {x: 952, y: 942, w: 70, h: 70}, {x: 952, y: 942, w: 70, h: 70}, 
                            {x: 961, y: 2, w: 59, h: 69}, {x: 961, y: 2, w: 59, h: 69}, {x: 961, y: 2, w: 59, h: 69}, {x: 961, y: 2, w: 59, h: 69}, {x: 961, y: 2, w: 59, h: 69}, 
                            {x: 961, y: 139, w: 59, h: 62}, {x: 961, y: 139, w: 59, h: 62}, {x: 961, y: 139, w: 59, h: 62}, {x: 961, y: 139, w: 59, h: 62}, {x: 961, y: 139, w: 59, h: 62}, 
                            {x: 961, y: 203, w: 59, h: 62}, {x: 961, y: 203, w: 59, h: 62}, {x: 961, y: 203, w: 59, h: 62}, {x: 961, y: 203, w: 59, h: 62}, 
                            {x: 961, y: 73, w: 59, h: 64}, {x: 961, y: 73, w: 59, h: 64}, {x: 961, y: 73, w: 59, h: 64}, {x: 961, y: 73, w: 59, h: 64}, {x: 961, y: 73, w: 59, h: 64}, {x: 961, y: 73, w: 59, h: 64}];
var anim_old_man_super_power = [{x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, 
    {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, 
    {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, 
    {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, 
    {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, 
    {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, 
    {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, {x: 398, y: 1151, w: 63, h: 60}, 
    {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}, {x: 592, y: 1279, w: 59, h: 60}];

var anim_big_bang = [{x: 995, y: 533, w: 26, h: 23}, {x: 995, y: 533, w: 26, h: 23}, {x: 995, y: 533, w: 26, h: 23},
                    {x: 399, y: 658, w: 30, h: 26}, {x: 399, y: 658, w: 30, h: 26}, {x: 399, y: 658, w: 30, h: 26}, 
                    {x: 399, y: 564, w: 32, h: 29}, {x: 399, y: 564, w: 32, h: 29}, {x: 399, y: 564, w: 32, h: 29}, 
                    {x: 399, y: 447, w: 36, h: 37}, {x: 399, y: 447, w: 36, h: 37}, {x: 399, y: 447, w: 36, h: 37}, 
                    {x: 399, y: 340, w: 39, h: 39}, {x: 399, y: 340, w: 39, h: 39}, {x: 399, y: 340, w: 39, h: 39}, 
                    {x: 356, y: 1050, w: 42, h: 41}, {x: 356, y: 1050, w: 42, h: 41}, {x: 356, y: 1050, w: 42, h: 41}, 
                    {x: 356, y: 1004, w: 45, h: 44}, {x: 356, y: 1004, w: 45, h: 44}, {x: 356, y: 1004, w: 45, h: 44}, 
                    {x: 110, y: 1148, w: 48, h: 46}, {x: 110, y: 1148, w: 48, h: 46}, {x: 110, y: 1148, w: 48, h: 46}, 
                    {x: 57, y: 1148, w: 51, h: 45}, {x: 57, y: 1148, w: 51, h: 45}, {x: 57, y: 1148, w: 51, h: 45}, 
                    {x: 2, y: 1148, w: 53, h: 48}, {x: 2, y: 1148, w: 53, h: 48}, {x: 2, y: 1148, w: 53, h: 48}];

var anim_gold_big = [{x: 442, y: 141, w: 199, h: 206}, {x: 442, y: 141, w: 199, h: 206}, {x: 442, y: 141, w: 199, h: 206}, {x: 442, y: 141, w: 199, h: 206},
    {x: 440, y: 349, w: 199, h: 206}, {x: 440, y: 349, w: 199, h: 206}, {x: 440, y: 349, w: 199, h: 206}, {x: 440, y: 349, w: 199, h: 206}, 
    {x: 641, y: 371, w: 199, h: 206}, {x: 641, y: 371, w: 199, h: 206}, {x: 641, y: 371, w: 199, h: 206}, {x: 641, y: 371, w: 199, h: 206}, 
    {x: 433, y: 557, w: 199, h: 206}, {x: 433, y: 557, w: 199, h: 206}, {x: 433, y: 557, w: 199, h: 206}, {x: 433, y: 557, w: 199, h: 206}, 
    {x: 634, y: 579, w: 199, h: 206}, {x: 634, y: 579, w: 199, h: 206}, {x: 634, y: 579, w: 199, h: 206}, {x: 634, y: 579, w: 199, h: 206}, 
    {x: 2, y: 732, w: 199, h: 206}, {x: 2, y: 732, w: 199, h: 206}, {x: 2, y: 732, w: 199, h: 206}, {x: 2, y: 732, w: 199, h: 206}, 
    {x: 203, y: 740, w: 199, h: 206}, {x: 203, y: 740, w: 199, h: 206}, {x: 203, y: 740, w: 199, h: 206}, {x: 203, y: 740, w: 199, h: 206}, 
    {x: 2, y: 940, w: 199, h: 206}, {x: 2, y: 940, w: 199, h: 206}, {x: 2, y: 940, w: 199, h: 206}, {x: 2, y: 940, w: 199, h: 206}, 
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206},
    {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}, {x: 404, y: 765, w: 199, h: 206}];
var xxxx = 0;
var anim_seller_requestId;
var anim_plus_money_requestId;
var anim_old_man_drop_hook_requestId;
var anim_old_man_pull_hook_requestId;
var anim_old_man_throw_mine_requestId;
var anim_old_man_super_power_requestId;
var anim_big_bang_requestId;
var anim_gold_big_requestId;

var count_anim_seller_eye = 0;
var count_anim_plus_money = 0;

var i_anim_old_man_pull_hook = 0;
var i_anim_old_man_throw_mine = 0;
var i_anim_old_man_drop_hook = 0;
var i_anim_old_man_super_power = 0;
var i_anim_seller = 0;
var i_anim_big_bang = 0;
var i_anim_gold_big = 0;

var direct_anim_seller = 1;
var key_anim_seller = 0;
var key_anim_old_man_drop_hook = 0;
var key_anim_old_man_pull_hook = 0;
var key_anim_old_man_throw_mine = 0;
var key_anim_old_man_super_power = 0;
var key_anim_rope = 0;
var key_anim_big_bang = 0;
var key_anim_gold_big = 0;

var key_even_listener_button_down_play_scene = 0;
var even_listener_button_down_play_scene_ID;

var ifMouseOnItemButton = [0, 0, 0, 0, 0];
var ifMouseOnOutShopButton = 0;
var item = [{sx: 995, sy: 558, sw: 25, sh: 50, x: 40, y: 300, w: 45, h: 90,
                        text1: "Mìn: Khi kéo phải vật không mong muốn,",
                        text2: "nhấn phím lên để nổ.",
                        price_min: 10, price_max: 100, price: 0, isSold: 0, x_text: 0}, 
                        {sx: 799, sy: 1119, sw: 67, sh: 63, x: 120, y: 300, w: 90, h: 90,
                        text1: "Bộ sưu tập đá: Tăng giá trị của đá.", text2: "",
                        price_min: 5, price_max: 70, price: 0, isSold: 0, x_text: 20},
                        {sx: 868, sy: 1119, sw: 66, sh: 72, x: 245, y: 300, w: 90, h: 90,
                        text1: "Nước tăng lực: Giúp bạn kéo nhanh hơn.", text2: "",
                        price_min: 100, price_max: 500, isSold: 0, x_text: 10},
                        {sx: 356, sy: 948, sw: 46, sh: 54, x: 360, y: 300, w: 70, price: 0, h: 90,
                        text1: "Thuốc đánh bóng kim cương: Tăng giá trị", text2: "kim cương.",
                        price_min: 150, price_max: 700, price: 0, isSold: 0, x_text: 4},
                        {sx: 399, sy: 381, sw: 37, sh: 64, x: 455, y: 300, w: 56, h: 90,
                        text1: "Cỏ bốn lá: Tăng giá trị túi quà.", text2: "", 
                        price_min: 500, price_max: 200, price: 0, isSold: 0, x_text: 0}];
var id_item_bought;
var giftMine = 0, giftSuperPower = 0;
var keyStartSceneStart = 0;
var keyPlaySceneStart = 0;
var keyShoppingSceneStart = 0;
var keyPigRandomVelocity = 0;
var sceneProperty = [ // // level 1:
                                            {gold_big_scene: [{x: 410, y: 420, r: 50}, 
                                                                            {x: 210, y: 320, r: 50}],
                                            gold_middle_scene: [{x: 130, y: 230, r: 20}, 
                                                                                    {x: 540, y: 220, r: 20}, 
                                                                                    {x: 320, y: 380, r: 20}, 
                                                                                    {x: 580, y: 420, r: 20}],
                                            gold_small_scene: [{x: 100, y: 380, r: 12}, 
                                                                            {x: 510, y: 180, r: 12}, 
                                                                            {x: 610, y: 380, r: 12}],
                                            rock_big_scene: [{x: 310, y: 220, r: 30}, 
                                                                            {x: 610, y: 320, r: 30}],
                                            rock_small_scene: [{x: 160, y: 420, r: 20}, 
                                                                                {x: 410, y: 220, r: 20}, 
                                                                                {x: 410, y: 320, r: 20}],
                                            diamond_scene: [],
                                            tnt_scene: [],
                                            pig_diamond_scene: [],
                                            pig_scene: [],
                                            gift_scene: [{x: 520, y: 300, r: 26},
                                                                    {x: 270, y: 420, r: 26}],
                                            bone_scene: [],
                                            head_bone_scene: []},
                                                            
                                            // // level 2:									 
                                            {gold_big_scene: [{x: 580, y: 400, r: 50}, 
                                                                            {x: 210, y: 340, r: 50}],
                                            gold_middle_scene: [{x: 360, y: 220, r: 20}, 
                                                                                    {x: 510, y: 220, r: 20},
                                                                                    {x: 410, y: 290, r: 20}, 
                                                                                    {x: 360, y: 420, r: 20}],
                                            gold_small_scene: [{x: 300, y: 280, r: 12}, 
                                                                            {x: 510, y: 280, r: 12}, 
                                                                            {x: 310, y: 380, r: 12}],
                                            rock_big_scene: [{x: 150, y: 250, r: 30}, 
                                                                            {x: 290, y: 250, r: 30},
                                                                            {x: 430, y: 250, r: 30},
                                                                            {x: 570, y: 250, r: 30}],
                                            rock_small_scene: [{x: 360, y: 300, r: 20}, 
                                                                                {x: 430, y: 360, r: 20}],
                                            diamond_scene: [{x: 110, y: 280, r: 14}, 
                                                                            {x: 610, y: 270, r: 14},
                                                                        {x: 470, y: 220, r: 14}],
                                            tnt_scene: [],
                                            pig_diamond_scene: [],
                                            pig_scene: [],
                                            gift_scene: [],
                                            bone_scene: [],
                                            head_bone_scene: []},	
                                            
                                            // // level 3:
                                            {gold_big_scene: [{x: 200, y: 430, r: 50}, 
                                                                            {x: 470, y: 430, r: 50},
                                                                                {x: 600, y: 320, r: 50}],
                                            gold_middle_scene: [{x: 250, y: 270, r: 20}, 
                                                                                    {x: 450, y: 220, r: 20}],
                                            gold_small_scene: [{x: 350, y: 220, r: 12}],
                                            rock_big_scene: [{x: 330, y: 300, r: 30}, 
                                                                            {x: 150, y: 230, r: 30}],
                                            rock_small_scene: [{x: 480, y: 350, r: 20},
                                                                                {x: 510, y: 220, r: 20}],
                                            diamond_scene: [{x: 120, y: 320, r: 14},
                                                                        {x: 400, y: 280, r: 14},],
                                            tnt_scene: [],
                                            pig_diamond_scene: [],
                                            pig_scene: [{x: 200, y: 340, r: 36}],
                                            gift_scene: [],
                                            bone_scene: [{x: 180, y: 280, r: 24}],
                                            head_bone_scene: [{x: 360, y: 400, r: 38}]},	
                                            
                                            // // level 4:								
                                            {gold_big_scene: [{x: 150, y: 450, r: 50}, 
                                                                            {x: 570, y: 450, r: 50}],
                                            gold_middle_scene: [],
                                            gold_small_scene: [],
                                            rock_big_scene: [{x: 350, y: 430, r: 30}, 
                                                            {x: 460, y: 430, r: 30},
                                                            {x: 240, y: 430, r: 30}],
                                            rock_small_scene: [{x: 110, y: 240, r: 20}, 
                                                                {x: 210, y: 240, r: 20},
                                                                {x: 310, y: 240, r: 20},
                                                                {x: 410, y: 240, r: 20},
                                                                {x: 510, y: 240, r: 20},
                                                                {x: 610, y: 240, r: 20}],
                                            diamond_scene: [{x: 110, y: 320, r: 14}, 
                                                            {x: 210, y: 320, r: 14},
                                                            {x: 310, y: 320, r: 14},
                                                            {x: 410, y: 320, r: 14},
                                                            {x: 510, y: 320, r: 14},
                                                            {x: 610, y: 320, r: 14}],
                                            tnt_scene: [{x: 160, y: 360, r: 26}, 
                                                        {x: 370, y: 360, r: 26}, 
                                                        {x: 570, y: 360, r: 26}],
                                            pig_diamond_scene: [],
                                            pig_scene: [],
                                            gift_scene: [],
                                            bone_scene: [],
                                            head_bone_scene: []},
                                            
                                            // // level 5:
                                            {gold_big_scene: [{x: 200, y: 430, r: 50},
                                                                                {x: 620, y: 330, r: 50}],
                                            gold_middle_scene: [{x: 520, y: 430, r: 20}, 
                                                                                    {x: 380, y: 470, r: 20}],
                                            gold_small_scene: [{x: 370, y: 220, r: 12}],
                                            rock_big_scene: [{x: 330, y: 270, r: 30}, 
                                                                            {x: 450, y: 230, r: 30}],
                                            rock_small_scene: [{x: 530, y: 220, r: 20},],
                                            diamond_scene: [{x: 120, y: 280, r: 14},
                                                                        {x: 520, y: 320, r: 14},],
                                            tnt_scene: [{x: 480, y: 350, r: 26},
                                                                    {x: 250, y: 270, r: 26}],
                                            pig_diamond_scene: [],
                                            pig_scene: [{x: 200, y: 340, r: 36}],
                                            gift_scene: [{x: 180, y: 220, r: 24},
                                                                    {x: 320, y: 420, r: 24}],
                                            bone_scene: [],
                                            head_bone_scene: [{x: 400, y: 400, r: 38}]},	
                                            
                                            // // level 6:
                                            {gold_big_scene: [{x: 130, y: 450, r: 50}],
                                            gold_middle_scene: [{x: 130, y: 350, r: 20}, 
                                                                                    {x: 160, y: 280, r: 20}, 
                                                                                    {x: 230, y: 420, r: 20}, 
                                                                                    {x: 260, y: 350, r: 20}, 
                                                                                    {x: 350, y: 350, r: 20}],
                                            gold_small_scene: [{x: 430, y: 220, r: 12}],
                                            rock_big_scene: [{x: 520, y: 400, r: 30}, 
                                                                            {x: 470, y: 320, r: 30}, 
                                                                            {x: 650, y: 360, r: 30}, 
                                                                            {x: 600, y: 280, r: 30}],
                                            rock_small_scene: [{x: 260, y: 220, r: 20}],
                                            diamond_scene: [{x: 630, y: 450, r: 14}],
                                            tnt_scene: [{x: 420, y: 450, r: 26}],
                                            pig_diamond_scene: [],
                                            pig_scene: [{x: 240, y: 260, r: 36}],
                                            gift_scene: [{x: 320, y: 450, r: 24}],
                                            bone_scene: [],
                                            head_bone_scene: [{x: 400, y: 400, r: 38}]},	
                                            
                                            // // level 7:
                                            {gold_big_scene: [{x: 100, y: 300, r: 50},
                                                                                {x: 580, y: 500, r: 50}],
                                            gold_middle_scene: [{x: 100, y: 420, r: 20},
                                                                                    {x: 260, y: 300, r: 20},
                                                                                    {x: 460, y: 300, r: 20},
                                                                                    {x: 400, y: 400, r: 20}],
                                            gold_small_scene: [{x: 360, y: 210, r: 12}],
                                            rock_big_scene: [{x: 200, y: 420, r: 30},
                                                                            {x: 490, y: 420, r: 30}],
                                            rock_small_scene: [{x: 560, y: 300, r: 20}],
                                            diamond_scene: [{x: 150, y: 450, r: 14}],
                                            tnt_scene: [{x: 360, y: 500, r: 26}],
                                            pig_diamond_scene: [{x: 180, y: 350, r: 36},
                                                                                    {x: 380, y: 350, r: 36}],
                                            pig_scene: [{x: 200, y: 250, r: 36},
                                                                    {x: 400, y: 250, r: 36}],
                                            gift_scene: [{x: 300, y: 450, r: 24},
                                                                    {x: 630, y: 320, r: 24}],
                                            bone_scene: [],
                                            head_bone_scene: []},	
                                            
                                            // // level 8:
                                            {gold_big_scene: [{x: 150, y: 380, r: 50},
                                                                                {x: 580, y: 400, r: 50}],
                                            gold_middle_scene: [{x: 100, y: 290, r: 20},
                                                                                    {x: 260, y: 300, r: 20},
                                                                                    {x: 460, y: 300, r: 20},
                                                                                    {x: 350, y: 360, r: 20}],
                                            gold_small_scene: [{x: 360, y: 210, r: 12}],
                                            rock_big_scene: [{x: 200, y: 260, r: 30},
                                                                            {x: 560, y: 300, r: 30}],
                                            rock_small_scene: [{x: 260, y: 390, r: 20}],
                                            diamond_scene: [],
                                            tnt_scene: [],
                                            pig_diamond_scene: [],
                                            pig_scene: [{x: 200, y: 250, r: 36},
                                                                    {x: 400, y: 250, r: 36}],
                                            gift_scene: [{x: 300, y: 450, r: 24},
                                                                    {x: 460, y: 400, r: 26}],
                                            bone_scene: [{x: 380, y: 480, r: 24}],
                                            head_bone_scene: []},	
                                            ];
var myGameArea = {
// create the canvas
canvas : document.createElement("canvas"),
// specify the canvas
start : function () {
    this.canvas.id = "canvas";
    this.canvas.width = WIDTH_CANVAS;
    this.canvas.height = HEIGHT_CANVAS;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, TIME_INTERVAL);
    window.addEventListener('keydown', function (e) {
            key[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {
    key[e.keyCode] = false;
    })			
},
// clear the canvas
clear : function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //console.log("clearCanvas()");
} 
}
function setValues() {
    img_map = new Image();
    img_map.src = SRC_MAP;
    img_atlas = new Image();
    img_atlas.src = SRC_ATLAS;	
    img_bg = new Image();
    img_bg.src = SRC_BG_END_GAME;

    mousePosition = new Point_Type(0, 0);
    hookPosition = new Point_Type(362, 90);
    playerPosition = new Point_Type(362, 90);
    ifMouseOnPlayButton = 0;
    isCountDowning = 0;
    key = [];
    keyScene = 0;
    timeLeft = 60;
    level = 0;
    money = 0;
    targetMoney = [0, 850, 2500, 4000, 8000, 11000, 13500, 16000, 20000];
    gold_big = [];
    gold_middle = [];
    gold_small = [];
    rock_big = [];
    rock_small = [];
    diamond = [];
    tnt = [];
    pig = [];
    pig_diamond = [];
    gift = [];
    bone = [];
    head_bone = [];
    angle = 0;
    stateDragging = 0;
    lengthRope = 0;
    vectorDrop = new Point_Type(0, 0);
    vectorPull = new Point_Type(0, 0);
    img_properties = {a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0};
    radiusHookAndThing = 0;
    valueThing = 0;
}

function random(min, max) {
return min + (Math.random() * (max - min));
}
function randomInt(min, max) {
return min + Math.floor(Math.random() * (max - min + 1));
}
function distancePP(p1, p2) {
return Math.sqrt((p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y)*(p1.y - p2.y));
}
function distancePL(p, l) {
return Math.abs((p.x - l.p1.x) * (p.y - l.p2.y) - (p.x - l.p2.x) * (p.y - l.p1.y))/distancePP(l.p1, l.p2);
}
function isInAreaOfLine(p, l, r) {
if (distancePL(p, l) > r) return 0;
if (((l.x1-l.x2)*(p.x-l.x2)+(l.y1-l.y2)*(p.y-l.y2))*((l.x2-l.x1)*(p.x-l.x1)+(l.y2-l.y1)*(p.y-l.y1)) < 0) return 0;
return 1;
}
function intersectOfLines(l1, l2) {
    var p = new Point_Type();
    var x1 = l1.p1.x, y1 = l1.p1.y,
    x2 = l1.p2.x, y2 = l1.p2.y,
    x3 = l2.p1.x, y3 = l2.p1.y,
    x4 = l2.p2.x, y4 = l2.p2.y,
    a1 = l1.m0X,
    b1 = l1.m0Y,
    a2 = l2.m0X,
    b2 = l2.m0Y;
    if (a1*b2 - a2*b1 == 0) {
        //console.log("error: No intersect");
        return 0;
    }
    p.y = (a1*a2*(x1 - x3) + a2*b1*y1 - a1*b2*y3)/(a2*b1 - a1*b2);
    if (a1 != 0) p.x = x1 + b1*(y1-p.y)/a1;
    else p.x = x3 + b2*(y3-p.y)/a2;
        return p;
}
function intersectOfSegments(l1, l2) {
    var p = new Point_Type();
    var x1 = l1.p1.x, y1 = l1.p1.y,
    x2 = l1.p2.x, y2 = l1.p2.y,
    x3 = l2.p1.x, y3 = l2.p1.y,
    x4 = l2.p2.x, y4 = l2.p2.y,
    a1 = l1.m0X,
    b1 = l1.m0Y,
    a2 = l2.m0X,
    b2 = l2.m0Y;
    if (a1*b2 - a2*b1 == 0) {
        //console.log("error: No intersect");
        // return 0;
        return 0;
    }
    p.y = (a1*a2*(x1 - x3) + a2*b1*y1 - a1*b2*y3)/(a2*b1 - a1*b2);
    if (a1 != 0) p.x = x1 + b1*(y1-p.y)/a1;
    else p.x = x3 + b2*(y3-p.y)/a2;
    // console.log("p1: " + x1 + " " + y1);
    // console.log("p2: " + x2 + " " + y2);
    // console.log("p3: " + x3 + " " + y3);
    // console.log("p4: " + x4 + " " + y4);
    // console.log("p: " + p);
    // console.log("p vs p1, p2: " + (p.x-x1)*(p.x-x2) +" "+ (p.y-y1)*(p.y-y2));
    // console.log("p vs p3, p4: " + (p.x-x3)*(p.x-x4) +" "+ (p.y-y3)*(p.y-y4));
    if ((p.x-x1)*(p.x-x2) <= 0.01 && (p.y-y1)*(p.y-y2) <= 0.01)
        if ((p.x-x3)*(p.x-x4) <= 0.01 && (p.y-y3)*(p.y-y4) <= 0.01) {
            // console.log("intersect INSIDE: " + p.x +" "+ p.y);
            // return 1;
            return p;
        }
    // console.log("intersect OUTSIDE: " + p.x +" "+ p.y);
    return 0;
}
function isInAreaOfAngle(p, a, r) {
    if (isInAreaOfLine(p, a.l1, r) == 1 || isInAreaOfLine(p, a.l2, r)) return 1;
    else if (distancePP(p, a.p) < r) return 1;
    return 0;
}
function isInRectangle(p, rect) {
    return ((p.x - rect.x)*(p.x - rect.x - rect.w) <= 0) && ((p.y - rect.y)*(p.y - rect.y - rect.h) <= 0);
}

class Point_Type {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    draw() {
        var ctx = myGameArea.context;
        ctx.beginPath();
        ctx.fillStyle = COLOR_POINT;
    ctx.fillRect(this.x, this.y, 5, 5);
    }
}
class Line_Type { 
    constructor(_p1, _p2) {
        this.p1 = _p1;
        this.p2 = _p2;
        var uX = _p2.x - _p1.x,
        uY = _p2.y - _p1.y,
        u = Math.sqrt(uX*uX + uY*uY);
        this.directX = uX/u;
        this.directY = uY/u;
        this.normalX = this.directY;
        this.normalY = -this.directX;
    }
draw() {
        var ctx = myGameArea.context;
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.strokeStyle = COLOR_LINE;
        ctx.stroke();
}
}
class Rectangle_Type {
    constructor(p, w, h) {
        this.x = p.x;
        this.y = p.y;
        this.w = w;
        this.h = h;
    }
draw() {
    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.fillStyle = COLOR_RECTANGLE;
    ctx.fillRect(this.x, this.y, this.w, this.h);
}
}
class Circle_Type {
    constructor(p, r) {
        this.p = p;
        this.x = p.x;
        this.y = p.y;
        this.r = r;
    }
draw() {
    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.fillStyle = COLOR_CIRCLE;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    //console.log("hi ae");
}
}
class Sound_Type {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play(vol) {
        this.sound.volume = vol;
        this.sound.play();
    }
    stop() {
        this.sound.pause();
        this.sound.load();
    }    
}

class Gold_Big extends Circle_Type {
    constructor(p, r) {
        super(p, r);
        this.state = 0;
        this.value = 500;
        this.weight = 8 * GRAVITY;
    }
    beDragged() {
        if (this.state == 0) this.state = 1;
    }
    beDestroyed() {
        this.state = -1;
    }
    drawSprite() {
        if (this.state == 3 || this.state == -1) {
            return; 
        }
        var ctx = myGameArea.context;
        if (this.state == 0) ctx.drawImage(img_atlas, 0, 732, 200, 206, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
        if (this.state == 1) { // dragged
            img_properties = {a: 727, b: 1043, c: 71, d: 67, e: - this.r, f: 0, g: this.r * 2, h: this.r * 2};
            radiusHookAndThing = this.r;
            this.state = 3;
        }
    }
}
class Gold_Middle extends Circle_Type {
    constructor(p, r) {
        super(p, r);
        this.state = 0;
        this.value = 200;
        this.weight = 5 * GRAVITY;
    }
    beDragged() {
        if (this.state == 0) this.state = 1;
    }
    beDestroyed() {
        this.state = -1;
    }
    drawSprite() {
        if (this.state == 3 || this.state == -1) {
            return; 
        }
        var ctx = myGameArea.context;
        if (this.state == 0) ctx.drawImage(img_atlas, 479, 1043, 71, 64, this.x - this.r, this.y - this.r, this.r * 2, this.r * 1.8);
        if (this.state == 1) { // dragged
            img_properties = {a: 399, b: 686, c: 29, d: 30, e: - this.r, f: 0, g: this.r * 2, h: this.r * 2};
            radiusHookAndThing = this.r;
            this.state = 3;
        }
    }
    
}
class Gold_Small extends Circle_Type {
    constructor(p, r) {
        super(p, r);
        this.state = 0;
        this.value = 50;
        this.weight = 2 * GRAVITY;
    }
    beDragged() {
        if (this.state == 0) this.state = 1;
    }
    beDestroyed() {
        this.state = -1;
    }
    drawSprite() {
        if (this.state == 3 || this.state == -1) {
            return; 
        }
        var ctx = myGameArea.context;
        if (this.state == 0) ctx.drawImage(img_atlas, 988, 637, 28, 26, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
        if (this.state == 1) { // dragged
            img_properties = {a: 988, b: 873, c: 16, d: 20, e: - this.r, f: 0, g: this.r * 2.4, h: this.r * 2.4};
            radiusHookAndThing = this.r;
            this.state = 3;
        }
    }
}
class Rock_Big extends Circle_Type {
    constructor(p, r) {
        super(p, r);
        this.state = 0;
        this.value = 20;
        this.weight = 10 * GRAVITY;
    }
    beDragged() {
        if (this.state == 0) this.state = 1;
    }
    beDestroyed() {
        this.state = -1;
    }
    drawSprite() {
        if (this.state == 3 || this.state == -1) {
            return; 
        }
        var ctx = myGameArea.context;
        if (this.state == 0) ctx.drawImage(img_atlas, 356, 1093, 42, 37, this.x - this.r, this.y - this.r, this.r * 2, this.r * 1.5);
        if (this.state == 1) { // dragged
            img_properties = {a: 399, b: 209, c: 47, d: 41, e: - this.r, f: 0, g: this.r * 2, h: this.r * 1.6};
            radiusHookAndThing = this.r;
            this.state = 3;
        }
    }
}
class Rock_Small extends Circle_Type {
    constructor(p, r) {
        super(p, r);
        this.state = 0;
        this.value = 10;
        this.weight = 5 * GRAVITY;
    }
    beDragged() {
        if (this.state == 0) this.state = 1;
    }
    beDestroyed() {
        this.state = -1;
    }
    drawSprite() {
        if (this.state == 3 || this.state == -1) {
            return; 
        }
        var ctx = myGameArea.context;
        if (this.state == 0) ctx.drawImage(img_atlas, 398, 304, 42, 34, this.x - this.r, this.y - this.r, this.r * 2, this.r * 1.5);
        if (this.state == 1) { // dragged
            img_properties = {a: 902, b: 231, c: 30, d: 32, e: - this.r, f: 0, g: this.r * 2, h: this.r * 2};
            radiusHookAndThing = this.r;
            this.state = 3;
        }
    }
}
class Diamond extends Circle_Type {
    constructor(p, r) {
        super(p, r);
        this.state = 0;
        this.value = 600;
        this.weight = 2 * GRAVITY;
    }
    beDragged() {
        if (this.state == 0) this.state = 1;
    }
    beDestroyed() {
        this.state = -1;
    }
    drawSprite() {
        if (this.state == 3 || this.state == -1) {
            return; 
        }
        var ctx = myGameArea.context;
        if (this.state == 0) ctx.drawImage(img_atlas, 1006, 889, 16, 13, this.x - this.r, this.y - this.r, this.r * 2, this.r * 1.4);
        if (this.state == 1) { // dragged
            img_properties = {a: 988, b: 851, c: 16, d: 20, e: - this.r, f: 0, g: this.r * 2, h: this.r * 2};
            radiusHookAndThing = this.r;
            this.state = 3;
        }
    }
}
class Tnt extends Circle_Type {
    constructor(p, r) {
        super(p, r);
        this.state = 0;
        this.value = 1;
        this.weight = 1 * GRAVITY;
    }
    beDragged() {
        if (this.state == 0) this.state = 1;
    }
    beDestroyed() {
        this.state = -1;
    }
    drawSprite() {
        if (this.state == 3 || this.state == -1) {
            return; 
        }
        var ctx = myGameArea.context;
        if (this.state == 0){
            ctx.drawImage(img_atlas, 399, 252, 40, 50, this.x - this.r, this.y - this.r, this.r * 1.8, this.r * 2.1);
            // ctx.beginPath();
            // ctx.save();
            // ctx.globalAlpha = 0.5;
            // ctx.arc(this.x, 
            // 		this.y, RADIUS_BIG_BANG, 0, 2 * Math.PI);
            // ctx.fillStyle = "#3336dd";
            // ctx.fill();
            // ctx.restore();
        } 
        if (this.state == 1) { // dragged
            img_properties = {a: 988, b: 776, c: 20, d: 36, e: - this.r*0.7, f: 0, g: this.r*1.4, h: this.r*1.4};
            radiusHookAndThing = this.r;
            this.state = 3;
        }
    }
}
class Pig extends Circle_Type {
    constructor(p, r) {
        super(p, r);
        this.state = 0;
        this.value = 2;
        this.weight = 2 * GRAVITY;
        this.directRtL = 0;
        this.velocityX = 2;
        this.velocityY = 0;
    }
    beDragged() {
        if (this.state == 0) this.state = 1;
    }
    beDestroyed() {
        this.state = -1;
    }
    drawSprite() {
        if (this.state == 3 || this.state == -1) {
            return; 
        }
        var ctx = myGameArea.context;
        if (this.state == 0) {
            if (this.directRtL) {
                ctx.drawImage(img_atlas, 988, 690, 28, 20, this.x - this.r * 0.7, this.y - this.r/2, this.r * 1.4, this.r);
            }
            else {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(img_atlas, 988, 690, 28, 20, (-this.x + this.r * 0.7), this.y - this.r/2, - this.r * 1.4, this.r);			
                ctx.restore();
            }
        }
        if (this.state == 1) { // dragged
            img_properties = {a: 984, b: 665, c: 31, d: 23, e: - this.r*0.725, f: 0, g: this.r*1.45, h: this.r};
            radiusHookAndThing = this.r;
            this.state = 3;
        }
    }
}
class Pig_Diamond extends Circle_Type {
    constructor(p, r) {
        super(p, r);
        this.state = 0;
        this.value = 602;
        this.weight = 2 * GRAVITY;
        this.directRtL = 0;
        this.velocityX = 2;
        this.velocityY = 0;
    }
    beDragged() {
        if (this.state == 0) this.state = 1;
    }
    beDestroyed() {
        this.state = -1;
    }
    drawSprite() {
        if (this.state == 3 || this.state == -1) {
            return; 
        }
        var ctx = myGameArea.context;
        if (this.state == 0) {
            if (this.directRtL) {
                ctx.drawImage(img_atlas, 399, 718, 29, 20, this.x - this.r * 0.7, this.y - this.r/2, this.r * 1.4, this.r);
            }
            else {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(img_atlas, 399, 718, 29, 20, (-this.x + this.r * 0.7), this.y - this.r/2, - this.r * 1.4, this.r);			
                ctx.restore();
            }
        }
        if (this.state == 1) { // dragged
            img_properties = {a: 399, b: 595, c: 31, d: 24, e: - this.r*0.725, f: 0, g: this.r*1.45, h: this.r};
            radiusHookAndThing = this.r;
            this.state = 3;
        }
    }
}
class Gift extends Circle_Type {
    constructor(p, r) {
        super(p, r);
        this.state = 0;
        this.value = randomInt(-200, 1200);
        this.weight = randomInt(1, 10) * GRAVITY;
    }
    beDragged() {
        if (this.state == 0) this.state = 1;
    }
    beDestroyed() {
        this.state = -1;
    }
    drawSprite() {
        if (this.state == 3 || this.state == -1) {
            return; 
        }
        var ctx = myGameArea.context;
        if (this.state == 0) ctx.drawImage(img_atlas, 399, 524, 32, 38, this.x - this.r * 0.9, this.y - this.r * 1.05, this.r * 1.8, this.r * 2.1);
        if (this.state == 1) { // dragged
            img_properties = {a: 399, b: 489, c: 32, d: 33, e: - this.r * 0.9, f: 0, g: this.r * 1.8, h: this.r * 1.8};
            radiusHookAndThing = this.r;
            this.state = 3;
        }
    }
}
class Bone extends Circle_Type {
    constructor(p, r) {
        super(p, r);
        this.state = 0;
        this.value = 20;
        this.weight = 2 * GRAVITY;
    }
    beDragged() {
        if (this.state == 0) this.state = 1;
    }
    beDestroyed() {
        this.state = -1;
    }
    drawSprite() {
        if (this.state == 3 || this.state == -1) {
            return; 
        }
        var ctx = myGameArea.context;
        if (this.state == 0) ctx.drawImage(img_atlas, 988, 712, 28, 20, this.x - this.r * 0.75, this.y - this.r * 0.5, this.r * 1.5, this.r);
        if (this.state == 1) { // dragged
            img_properties = {a: 995, b: 610, c: 25, d: 25, e: - this.r * 0.7, f: 0, g: this.r * 1.4, h: this.r * 1.4};
            radiusHookAndThing = this.r;
            this.state = 3;
        }
    }
}
class HeadBone extends Circle_Type {
    constructor(p, r) {
        super(p, r);
        this.state = 0;
        this.value = 60;
        this.weight = 2 * GRAVITY;
    }
    beDragged() {
        if (this.state == 0) this.state = 1;
    }
    beDestroyed() {
        this.state = -1;
    }
    drawSprite() {
        if (this.state == 3 || this.state == -1) {
            return; 
        }
        var ctx = myGameArea.context;
        if (this.state == 0) ctx.drawImage(img_atlas, 988, 734, 25, 24, this.x - this.r * 0.5, this.y - this.r * 0.5, this.r, this.r);
        if (this.state == 1) { // dragged
            img_properties = {a: 932, b: 231, c: 27, d: 27, e: - this.r * 0.5, f: 0, g: this.r, h: this.r};
            radiusHookAndThing = this.r;
            this.state = 3;
        }
    }
}

function createElements() {
    createSound();
    createGold();
    createRock();
    createDiamond();
    createTnt();
    createPig();
    createPigDiamond();
    createGift();
    createBone();
    createHeadBone();
}
function createSound() {    
    sound_start_scene = new Sound_Type(SRC_SOUND_START_SCENE);
    sound_play_scene = new Sound_Type(SRC_SOUND_PLAY_SCENE);
    sound_shop_scene = new Sound_Type(SRC_SOUND_SHOP_SCENE);
    sound_buy_item = new Sound_Type(SRC_SOUND_BUY_ITEM);
    sound_drag_hook = new Sound_Type(SRC_SOUND_DRAG_HOOK);
    sound_endgame_lose = new Sound_Type(SRC_SOUND_ENDGAME_LOSE);
    sound_endgame_win = new Sound_Type(SRC_SOUND_ENDGAME_WIN);
    sound_explosion = new Sound_Type(SRC_SOUND_EXPLOSION);
    sound_mission_passed = new Sound_Type(SRC_SOUND_MISSION_PASSED);
    sound_new_level = new Sound_Type(SRC_SOUND_NEW_LEVEL);
    sound_pull_hook = new Sound_Type(SRC_SOUND_PULL_HOOK);
    sound_plus_money = new Sound_Type(SRC_SOUND_PLUS_MONEY);
    sound_super_power = new Sound_Type(SRC_SOUND_SUPER_POWER);

}
function createPoint() {
}
function createGold() {
    if (!sceneProperty[level-1]) return;
    var scene_property = sceneProperty[level-1];
    gold_big = [];
    var gold_scene_property = scene_property.gold_big_scene;
    for (var i = 0; i < gold_scene_property.length; i++) {
        gold_big[i] = new Gold_Big(new Point_Type(gold_scene_property[i].x, gold_scene_property[i].y), gold_scene_property[i].r);
    }
    gold_middle = [];
    gold_scene_property = scene_property.gold_middle_scene;
    for (var i = 0; i < gold_scene_property.length; i++) {
        gold_middle[i] = new Gold_Middle(new Point_Type(gold_scene_property[i].x, gold_scene_property[i].y), gold_scene_property[i].r);
    }
    gold_small = [];
    gold_scene_property = scene_property.gold_small_scene;
    for (var i = 0; i < gold_scene_property.length; i++) {
        gold_small[i] = new Gold_Small(new Point_Type(gold_scene_property[i].x, gold_scene_property[i].y), gold_scene_property[i].r);
    }
}
function createRock() {
    if (!sceneProperty[level-1]) return;
    var scene_property = sceneProperty[level-1];
    rock_big = [];
    var rock_scene_property = scene_property.rock_big_scene;
    for (var i = 0; i < rock_scene_property.length; i++) {
        rock_big[i] = new Rock_Big(new Point_Type(rock_scene_property[i].x, rock_scene_property[i].y), rock_scene_property[i].r);
    }
    rock_small = [];
    var rock_scene_property = scene_property.rock_small_scene;
    for (var i = 0; i < rock_scene_property.length; i++) {
        rock_small[i] = new Rock_Small(new Point_Type(rock_scene_property[i].x, rock_scene_property[i].y), rock_scene_property[i].r);
    }
}
function createDiamond() {
    if (!sceneProperty[level-1]) return;
    var scene_property = sceneProperty[level-1];
    diamond = [];
    var diamond_scene_property = scene_property.diamond_scene;
    for (var i = 0; i < diamond_scene_property.length; i++) {
        diamond[i] = new Diamond(new Point_Type(diamond_scene_property[i].x, diamond_scene_property[i].y), diamond_scene_property[i].r);
    }
}
function createTnt() {
    if (!sceneProperty[level-1]) return;
    var scene_property = sceneProperty[level-1];
    tnt = [];
    var tnt_scene_property = scene_property.tnt_scene;
    for (var i = 0; i < tnt_scene_property.length; i++) {
        tnt[i] = new Tnt(new Point_Type(tnt_scene_property[i].x, tnt_scene_property[i].y), tnt_scene_property[i].r);
    }
}
function createPig() {
    if (!sceneProperty[level-1]) return;
    var scene_property = sceneProperty[level-1];
    pig = [];
    var pig_scene_property = scene_property.pig_scene;
    for (var i = 0; i < pig_scene_property.length; i++) {
        pig[i] = new Pig(new Point_Type(pig_scene_property[i].x, pig_scene_property[i].y), pig_scene_property[i].r);
    }
}
function createPigDiamond() {
    if (!sceneProperty[level-1]) return;
    var scene_property = sceneProperty[level-1];
    pig_diamond = [];
    var pig_diamond_scene_property = scene_property.pig_diamond_scene;
    for (var i = 0; i < pig_diamond_scene_property.length; i++) {
        pig_diamond[i] = new Pig_Diamond(new Point_Type(pig_diamond_scene_property[i].x, pig_diamond_scene_property[i].y), pig_diamond_scene_property[i].r);
    }
}
function createGift() {
    if (!sceneProperty[level-1]) return;
    var scene_property = sceneProperty[level-1];
    gift = [];
    var gift_scene_property = scene_property.gift_scene;
    for (var i = 0; i < gift_scene_property.length; i++) {
        gift[i] = new Gift(new Point_Type(gift_scene_property[i].x, gift_scene_property[i].y), gift_scene_property[i].r);
    }
}
function createBone() {
    if (!sceneProperty[level-1]) return;
    var scene_property = sceneProperty[level-1];
    bone = [];
    var bone_scene_property = scene_property.bone_scene;
    for (var i = 0; i < bone_scene_property.length; i++) {
        bone[i] = new Bone(new Point_Type(bone_scene_property[i].x, bone_scene_property[i].y), bone_scene_property[i].r);
    }
}
function createHeadBone() {
    if (!sceneProperty[level-1]) return;
    var scene_property = sceneProperty[level-1];
    head_bone = [];
    var head_bone_scene_property = scene_property.head_bone_scene;
    for (var i = 0; i < head_bone_scene_property.length; i++) {
        head_bone[i] = new HeadBone(new Point_Type(head_bone_scene_property[i].x, head_bone_scene_property[i].y), head_bone_scene_property[i].r);
    }
}

function getMousePosition(mouseEvent) {
var obj = document.getElementById("canvas");
var obj_left = 0;
var obj_top = 0;
var pos = new Point_Type(0, 0);
while (obj.offsetParent)
{
    obj_left += obj.offsetLeft;
    obj_top += obj.offsetTop;
    obj = obj.offsetParent;
} 
pos.x = mouseEvent.pageX;
pos.y = mouseEvent.pageY;
pos.x -= obj_left;
pos.y -= obj_top;
    mousePosition = pos;
    // console.log(pos);
}

function drawStartScene() {
    var ctx = myGameArea.context;
    if (ifMouseOnPlayButton) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(210, 230, 180, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img_atlas, 643, 147, 223, 222, 30, 46, 360, 360); // hào quang quanh gold
        ctx.restore();
    }
    ctx.drawImage(img_atlas, 2, 732, 199, 206, 110, 120, 200, 206); // gold	
    ctx.drawImage(img_atlas, 0, 212, 398, 418, 280, 120, 398, 418); // old man
    ctx.drawImage(img_atlas, 745, 878, 74, 32, 170, 210, 74, 32); // "Chơi"
    //console.log("drawStartScene");
}
function checkMouseOnPlayButton() {
    if (distancePP(mousePosition, new Point_Type(210, 230)) < 70) {
        ifMouseOnPlayButton = 1;
        document.getElementById("canvas").addEventListener("mousedown", clickPlayButton);
        
    }
    if (distancePP(mousePosition, new Point_Type(210, 230)) >= 70) {
        ifMouseOnPlayButton = 0;
        document.getElementById("canvas").removeEventListener("mousedown", clickPlayButton);
    }
    // console.log("checkMouseOnPlayButton()");
}
function clickPlayButton() {
    document.getElementById("canvas").removeEventListener("mousemove", getMousePosition);
    document.getElementById("canvas").removeEventListener("mousedown", clickPlayButton);
    sound_start_scene.stop();
    keyScene = 3;
    // console.log("clickPlayButton()");
}

function playSceneStart() {
    
}
function anim_plus_money() {
    count_anim_plus_money++;
    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.font = SIZE_WORD_PLUS_MONEY + " " + FONT_WORD_PRICE;
    ctx.fillText("+" + moneyPlus + "$", 362, 150);
    if (count_anim_plus_money < 90) {
        anim_plus_money_requestId = window.requestAnimationFrame(anim_plus_money);
    }
    else {
        window.cancelAnimationFrame(anim_plus_money_requestId);
        count_anim_plus_money = 0;
    }
}
function animationOldManDropHook() {
    //console.log("ae");
    var ctx = myGameArea.context;
    ctx.drawImage(img_atlas,
                    anim_old_man_drop_hook[i_anim_old_man_drop_hook].x,
                    anim_old_man_drop_hook[i_anim_old_man_drop_hook].y,
                    anim_old_man_drop_hook[i_anim_old_man_drop_hook].w,
                    anim_old_man_drop_hook[i_anim_old_man_drop_hook].h,
                    342, 32, 80, 80);
    //console.log(Date.now());
    //ctx.drawImage(img_atlas, 810, 1258, 63, 62, 342, 32, 80, 80); 
    //console.log(i_anim_old_man_drop_hook);
    if (i_anim_old_man_drop_hook < anim_old_man_drop_hook.length - 1) {
        i_anim_old_man_drop_hook++;
        anim_old_man_drop_hook_requestId = window.requestAnimationFrame(animationOldManDropHook);
        //console.log("hi");
    }
    else {
        //console.log("fu");
        i_anim_old_man_drop_hook = anim_old_man_drop_hook.length - 1;	
        // window.cancelAnimationFrame(anim_old_man_drop_hook_requestId);
        anim_old_man_drop_hook_requestId = window.requestAnimationFrame(animationOldManDropHook);
    }
    //anim_old_man_drop_hook_requestId = window.requestAnimationFrame(animationOldManDropHook);
}

function animationOldManPullHook() {
    if (stateDragging != 3 && stateDragging != 2) { 
        // window.cancelAnimationFrame(anim_old_man_pull_hook_requestId);
        return;
    }
    var ctx = myGameArea.context;
    ctx.drawImage(img_atlas,
                    anim_old_man_pull_hook[i_anim_old_man_pull_hook].x,
                    anim_old_man_pull_hook[i_anim_old_man_pull_hook].y,
                    anim_old_man_pull_hook[i_anim_old_man_pull_hook].w,
                    anim_old_man_pull_hook[i_anim_old_man_pull_hook].h,
                    342, 32, 80, 80);
    //console.log(Date.now());
    //console.log(i_anim_old_man_pull_hook);
    if (i_anim_old_man_pull_hook < anim_old_man_pull_hook.length - 1) {
        i_anim_old_man_pull_hook++;
        anim_old_man_pull_hook_requestId = window.requestAnimationFrame(animationOldManPullHook);
    }
    else {
        //console.log("animationOldManPullHook");
        key_anim_old_man_pull_hook = 0;
        i_anim_old_man_pull_hook = 0;
        //window.cancelAnimationFrame(anim_old_man_pull_hook_requestId);
    }
}

function animationOldManThrowMine() {
    
    var ctx = myGameArea.context;
    ctx.drawImage(img_atlas,
                    anim_old_man_throw_mine[i_anim_old_man_throw_mine].x,
                    anim_old_man_throw_mine[i_anim_old_man_throw_mine].y,
                    anim_old_man_throw_mine[i_anim_old_man_throw_mine].w,
                    anim_old_man_throw_mine[i_anim_old_man_throw_mine].h,
                    342, 32, 80, 80);
    //console.log(i_anim_old_man_throw_mine);
    if (i_anim_old_man_throw_mine < anim_old_man_throw_mine.length - 1) {
        i_anim_old_man_throw_mine++;
        anim_old_man_throw_mine_requestId = window.requestAnimationFrame(animationOldManThrowMine);
    }
    else {
        
        key_anim_old_man_throw_mine = 0;
        i_anim_old_man_throw_mine = 0;

        key_anim_old_man_pull_hook = 1;
        anim_old_man_pull_hook_requestId = window.requestAnimationFrame(animationOldManPullHook);
        stateDragging = 2;
        window.cancelAnimationFrame(anim_old_man_throw_mine_requestId);
        //window.cancelAnimationFrame(anim_old_man_pull_hook_requestId);
    }
}

function animationOldManSuperPower() {

    // text "Strength"
    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.font = SIZE_WORD_SUPER_POWER + " " + FONT_WORD_SUPERPOWER;
    ctx.fillText("STRENGTH", 262, 150);
    
    // old man
    ctx.drawImage(img_atlas,
                    anim_old_man_super_power[i_anim_old_man_super_power].x,
                    anim_old_man_super_power[i_anim_old_man_super_power].y,
                    anim_old_man_super_power[i_anim_old_man_super_power].w,
                    anim_old_man_super_power[i_anim_old_man_super_power].h,
                    342, 32, 80, 80);
    //console.log(i_anim_old_man_super_power);
    if (i_anim_old_man_super_power < anim_old_man_super_power.length - 1) {
        i_anim_old_man_super_power++;
        anim_old_man_super_power_requestId = window.requestAnimationFrame(animationOldManSuperPower);
    }
    else {		
        key_anim_old_man_super_power = 0;
        i_anim_old_man_super_power = 0;
        window.cancelAnimationFrame(anim_old_man_super_power_requestId);
        stateDragging = 0;		
    }
}

function animationBigBang() {
    var ctx = myGameArea.context;	
    // ctx.fillStyle = "#FF0000";ctx.fillRect(hookPosition.x, hookPosition.y, 150, 75);
    ctx.drawImage(img_atlas,
                    anim_big_bang[i_anim_big_bang].x,
                    anim_big_bang[i_anim_big_bang].y,
                    anim_big_bang[i_anim_big_bang].w,
                    anim_big_bang[i_anim_big_bang].h,
                    hookPosition.x - sizeThing*vectorPull.x/vectorPullLength - anim_big_bang[i_anim_big_bang].w, 
                    hookPosition.y - sizeThing*vectorPull.y/vectorPullLength - anim_big_bang[i_anim_big_bang].h, 
                    anim_big_bang[i_anim_big_bang].w*2, 
                    anim_big_bang[i_anim_big_bang].h*2
                );
        bigBang(new Point_Type(hookPosition.x - sizeThing*vectorPull.x/vectorPullLength, 
        hookPosition.y - sizeThing*vectorPull.y/vectorPullLength));
        
        // var ctx = myGameArea.context;
        // ctx.beginPath();
        // ctx.save();
        // ctx.globalAlpha = 0.5;
        // ctx.arc(hookPosition.x - sizeThing*vectorPull.x/vectorPullLength, 
        // 		hookPosition.y - sizeThing*vectorPull.y/vectorPullLength, RADIUS_BIG_BANG, 0, 2 * Math.PI);
        // ctx.fillStyle = "#3336dd";
        // ctx.fill();
        // ctx.restore();
    if (i_anim_big_bang < anim_big_bang.length - 1) {
        i_anim_big_bang++;
        anim_big_bang_requestId = window.requestAnimationFrame(animationBigBang);
    }
    else {
        key_anim_big_bang = 0;
        i_anim_big_bang = 0;
    }
}

function drawPlayScene() {
    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.fillStyle = COLOR_CANVAS;
    ctx.fillRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
    
    ctx.beginPath();
    ctx.fillStyle = COLOR_NOTI;
    ctx.fillRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS - HEIGHT_PLAYAREA - 10);
    
    ctx.beginPath();
    ctx.arc(WIDTH_CANVAS/2, HEIGHT_CANVAS - HEIGHT_PLAYAREA - 10, RADIUS_PLAYER_STANDING + 10, Math.PI, 0);
    ctx.fillStyle = COLOR_CANVAS;
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(WIDTH_CANVAS/2, HEIGHT_CANVAS - HEIGHT_PLAYAREA - 10, RADIUS_PLAYER_STANDING, Math.PI, 0);
    ctx.fillStyle = COLOR_PLAYER_STANDING;
    ctx.fill();

    ctx.beginPath();
    ctx.font = SIZE_WORD_NOTI + " " + FONT_WORD;
    ctx.fillText("Money: " + money + "$", 40, HEIGHT_CANVAS - HEIGHT_PLAYAREA - 76);
    ctx.fillText("Target: " + targetMoney[level] + "$", 40, HEIGHT_CANVAS - HEIGHT_PLAYAREA - 30);
    ctx.fillText("Lv: " + level, 520, HEIGHT_CANVAS - HEIGHT_PLAYAREA - 30);
    if (timeLeft < 10) ctx.fillStyle = "red";
    ctx.fillText("Time left: " + timeLeft + "s", 520, HEIGHT_CANVAS - HEIGHT_PLAYAREA - 76);
    ctx.drawImage(img_map, 0, HEIGHT_CANVAS - HEIGHT_PLAYAREA, WIDTH_CANVAS, HEIGHT_PLAYAREA);
    var img2 = new Image();
    img2.src = SRC_ATLAS;

    // old man
    if (stateDragging == 0) {	// idle
        window.cancelAnimationFrame(anim_old_man_pull_hook_requestId);
        ctx.drawImage(img2, 810, 1258, 63, 62, 342, 32, 80, 80);
        //console.log(Date.now());
        //key_anim_old_man_pull_hook = 0; 
    }
    else if (stateDragging == 1) {// dropping hook
        if (!key_anim_old_man_drop_hook) {
            //console.log("trigger");
            key_anim_old_man_drop_hook = 1;
            key_anim_old_man_pull_hook = 0;
            anim_old_man_drop_hook_requestId = window.requestAnimationFrame(animationOldManDropHook);
        }
    }
    else if (stateDragging == 2 || stateDragging == 3){// stateDragging == 2 drop max but get nothing || stateDragging == 3 get something and pull hook
        window.cancelAnimationFrame(anim_old_man_drop_hook_requestId);
        key_anim_old_man_drop_hook = 0;
        if (!key_anim_old_man_pull_hook) {
            //console.log("hi");
            anim_old_man_pull_hook_requestId = window.requestAnimationFrame(animationOldManPullHook);
            key_anim_old_man_pull_hook = 1;
        }
    }	
    else if (stateDragging == 4){ // throw mine
        if (!key_anim_old_man_throw_mine) {
            window.cancelAnimationFrame(anim_old_man_pull_hook_requestId);			
            anim_old_man_throw_mine_requestId = window.requestAnimationFrame(animationOldManThrowMine);
            key_anim_old_man_throw_mine = 1;
        }
    }	
    else if (stateDragging == 5)// super power
    {
        if (!key_anim_old_man_super_power) {
            window.cancelAnimationFrame(anim_old_man_pull_hook_requestId);			
            anim_old_man_super_power_requestId = window.requestAnimationFrame(animationOldManSuperPower);
            key_anim_old_man_super_power = 1;
        }		
    }

    // draw num of mine 
    if (num_mine > 0) {
        ctx.drawImage(img2, 995, 558, 25, 50, 430, 80, 15, 30);
        ctx.beginPath();
        ctx.font = "20px " + FONT_WORD;
        ctx.fillStyle = "orange";
        ctx.fillText("x" + num_mine, 440, 110);
    }
    
    drawElements();
}
function drawElements() {
    drawGolds();
    drawRocks();
    drawDiamonds();
    drawTnts();
    drawHook();
    drawRope();
    drawPigs();
    drawPigDiamonds();
    drawGifts();
    drawBones();
    drawHeadBones();
}
function drawHook() {
    if (stateDragging == 3) {
        drawHookAndThing();
        return;
    }
    var ctx = myGameArea.context;
    ctx.save();
    ctx.translate(hookPosition.x, hookPosition.y);
    ctx.beginPath();
    ctx.rotate(angle * Math.PI/180);
    ctx.drawImage(img_atlas, 988, 760, 25, 14, -14, 0, 30, 20);
    ctx.restore();
}
function drawRope() {
    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.moveTo(playerPosition.x, playerPosition.y);
    ctx.lineTo(hookPosition.x, hookPosition.y);
    //console.log("Line to " + hookPosition.x +" "+ hookPosition.y);
    ctx.stroke();
}

function drawHookAndThing() {
    var ctx = myGameArea.context;
    ctx.save();
    ctx.translate(hookPosition.x, hookPosition.y);
    ctx.beginPath();
    ctx.rotate(angle * Math.PI/180);
    ctx.drawImage(img_atlas, img_properties.a, img_properties.b, img_properties.c, img_properties.d, img_properties.e, img_properties.f, img_properties.g, img_properties.h);
    ctx.restore();
}

function animationGoldBig() {
    var ctx = myGameArea.context;
    for (var i = 0; i < gold_big.length; i++) {
        if (gold_big[i].state == 0) {
        ctx.drawImage(img_atlas,
            anim_gold_big[i_anim_gold_big].x,
            anim_gold_big[i_anim_gold_big].y,
            anim_gold_big[i_anim_gold_big].w,
            anim_gold_big[i_anim_gold_big].h,
            gold_big[i].x - gold_big[i].r, 
            gold_big[i].y - gold_big[i].r, 
            gold_big[i].r * 2, 
            gold_big[i].r * 2);
        }
        else gold_big[i].drawSprite();
    }
    
    if (i_anim_gold_big < anim_gold_big.length - 1) {
        i_anim_gold_big++;
        if (!key_anim_gold_big) 
        {
            anim_gold_big_requestId = window.requestAnimationFrame(animationGoldBig);
            key_anim_gold_big = 1;
        }
    }
    else {
        //key_anim_gold_big = 0;
        i_anim_gold_big = 0;
        anim_gold_big_requestId = window.requestAnimationFrame(animationGoldBig);
    }
}
function drawGolds() {
    // for (var i = 0; i < gold_big.length; i++) {
    // 	gold_big[i].drawSprite();
    // }
    animationGoldBig();
    for (var i = 0; i < gold_middle.length; i++) {
        gold_middle[i].drawSprite();
    }
    for (var i = 0; i < gold_small.length; i++) {
        gold_small[i].drawSprite();
    }
}
function drawRocks() {
    for (var i = 0; i < rock_big.length; i++) {
        rock_big[i].drawSprite();
    }
    for (var i = 0; i < rock_small.length; i++) {
        rock_small[i].drawSprite();
    }
}
function drawDiamonds() {
    for (var i = 0; i < diamond.length; i++) {
        diamond[i].drawSprite();
    }
}
function drawTnts() {
    for (var i = 0; i < tnt.length; i++) {
        tnt[i].drawSprite();
    }
}
function drawPigs() {
    for (var i = 0; i < pig.length; i++) {
        pig[i].drawSprite();
    }
}
function drawPigDiamonds() {
    for (var i = 0; i < pig_diamond.length; i++) {
        pig_diamond[i].drawSprite();
    }
}
function drawGifts() {
    for (var i = 0; i < gift.length; i++) {
        gift[i].drawSprite();
    }
}
function drawBones() {
    for (var i = 0; i < bone.length; i++) {
        bone[i].drawSprite();
    }
}
function drawHeadBones() {
    for (var i = 0; i < head_bone.length; i++) {
        head_bone[i].drawSprite();
    }
}

function newStatusPlaying() { 
    if (!isCountDowning) {
        countdown();
        isCountDowning = 1;
    }
    if (timeLeft <= 0) {
        endMatch();
        document.getElementById("canvas").removeEventListener("mousedown", pressButtonDown);
        //console.log("end");
        return;
        
    }

    pigMoving();

    if (stateDragging == 0) { // idle
        spinHook();
        if (key[40]) { // press arrow-down button
            pressButtonDown();
        }
        if (!key_even_listener_button_down_play_scene) {
            
            if (stateDragging == 0) {
                document.getElementById("canvas").addEventListener("mousedown", pressButtonDown);
            }
                //console.log("start");
            key_even_listener_button_down_play_scene = 1;
        }
    } 
    else {
        if (key_even_listener_button_down_play_scene) {
            document.getElementById("canvas").removeEventListener("mousedown", pressButtonDown);
            //console.log("end");
            key_even_listener_button_down_play_scene = 0;
        }		
    }

    if (stateDragging == 1) { // dropping hook
        dropHook();
        lengthRope += vectorDropLength;
        if (lengthRope >= MAX_LENGTH_ROPE) {
            stateDragging = 2;
            lengthRope = MAX_LENGTH_ROPE;
        }
        else if (checkCollision()) { // get gold, rock, diamond, v.v..
            if(!isSuperPower && isPower) {
                vectorPull.x = vectorPull.x * 1.8 / weightThing;
                vectorPull.y = vectorPull.y * 1.8 / weightThing;
            }
            else if (!isSuperPower && !isPower) {
                vectorPull.x = vectorPull.x / weightThing;
                vectorPull.y = vectorPull.y / weightThing;
            }
            vectorPullLength = 1.2 * Math.sqrt(vectorPull.x * vectorPull.x + vectorPull.y * vectorPull.y);
            stateDragging = 3;
        }
    }

    else if (stateDragging == 2) { // drop max but get nothing
        //console.log(hookPosition.x + " " + hookPosition.y);
        //var ctx = myGameArea.context;ctx.fillStyle = "#FF0000";ctx.fillRect(hookPosition.x, hookPosition.y, 150, 75);
        pullHook();
        lengthRope -= vectorPullLength; //console.log(lengthRope);
        if (lengthRope <= 0) {
            hookPosition.x = playerPosition.x;
            hookPosition.y = playerPosition.y;
            stateDragging = 0;
            lengthRope = 0;
        }
    }

    else if (stateDragging == 3) { // get something and pull hook
        // var ctx = myGameArea.context;
        // ctx.beginPath();
        // ctx.save();
        // ctx.globalAlpha = 0.5;
        // ctx.arc(hookPosition.x - sizeThing*vectorPull.x/vectorPullLength, 
        // 		hookPosition.y - sizeThing*vectorPull.y/vectorPullLength, RADIUS_BIG_BANG, 0, 2 * Math.PI);
        // ctx.fillStyle = "#3336dd";
        // ctx.fill();
        // ctx.restore();

        pullHook();
        lengthRope -= vectorPullLength;
        if (key[38] && num_mine > 0) {
            //console.log("bummm");
            
            stateDragging = 4;
            num_mine -= 1;

            vectorPull.x = 18 * Math.sin(angle*Math.PI/180)/GRAVITY;
            vectorPull.y = - 18 * Math.cos(angle*Math.PI/180)/GRAVITY;
            vectorPullLength = 1.2 * Math.sqrt(vectorPull.x * vectorPull.x + vectorPull.y * vectorPull.y);

            bigBang(new Point_Type(hookPosition.x - sizeThing*vectorPull.x/vectorPullLength, 
                                    hookPosition.y - sizeThing*vectorPull.y/vectorPullLength));
            animationBigBang();
        }
        if (lengthRope <= 0) {
            hookPosition.x = playerPosition.x;
            hookPosition.y = playerPosition.y;
            lengthRope = 0;
            if (valueThing == -1) {
                sound_plus_money.play(1);
                stateDragging = 0;
                num_mine++;
                //console.log("wanna bum something??");				
            }
            else if (valueThing == -2) {
                sound_super_power.play(1);
                stateDragging = 5;
                isSuperPower = 1;
                //console.log("hayaaaaa");
            }
            else {
                sound_plus_money.play(1);
                stateDragging = 0;
                moneyPlus = valueThing;
                anim_plus_money();
                money += valueThing;
                valueThing = 0;
            }
            //console.log("rope is in hand");
            //console.log(Date.now());
        }
    }
}
function pressButtonDown() {
    sound_drag_hook.play(1);
    //console.log("button down");
    stateDragging = 1; // hook is dropped
    vectorDrop.x = - 6 * Math.sin(angle*Math.PI/180)/FRICTION_HOOK_DROP;
    vectorDrop.y = 6 * Math.cos(angle*Math.PI/180)/FRICTION_HOOK_DROP;
    vectorPull.x = 18 * Math.sin(angle*Math.PI/180)/GRAVITY;
    vectorPull.y = - 18 * Math.cos(angle*Math.PI/180)/GRAVITY;
    vectorDropLength = 1.2 * Math.sqrt(vectorDrop.x * vectorDrop.x + vectorDrop.y * vectorDrop.y);
    vectorPullLength = 1.2 * Math.sqrt(vectorPull.x * vectorPull.x + vectorPull.y * vectorPull.y);
}
function dropHook() {
    // console.log("dropHook()");
    hookPosition.x += vectorDrop.x;
    hookPosition.y += vectorDrop.y;
}
function pullHook() {
    if (sound_pull_hook.sound.paused) sound_pull_hook.play(1);
    // console.log("pullHook()");
    hookPosition.x += vectorPull.x;
    hookPosition.y += vectorPull.y;
}
function spinHook() {
    if (angle > MAX_ANGLE && ifDirectHook_LtR) ifDirectHook_LtR = 0;
    else if (angle < - MAX_ANGLE && !ifDirectHook_LtR) ifDirectHook_LtR = 1;
    if (ifDirectHook_LtR) angle += 2/FRICTION_HOOK_ROTATE; 
    else angle -= 2/FRICTION_HOOK_ROTATE;
    
}
function countdown() {
    var x = setInterval(function() {
        timeLeft -= 1;
        if (timeLeft <= 0) {
            clearInterval(x);
        }
    }, 1000);
}

function bigBang(center) {
    sound_explosion.play(1);
    // when throw mine or get TNT
    checkItemInBang(center);
}

function pigMoving() {
    if (!keyPigRandomVelocity) {
        setInterval(function() {
            for (var i = 0; i < pig.length; i++) {
                if (pig[i].state != 0) continue;
                pig[i].velocityX = random(-3, 3);
                pig[i].velocityY = random(-3, 3);
            }
            for (var i = 0; i < pig_diamond.length; i++) {
                if (pig_diamond[i].state != 0) continue;
                pig_diamond[i].velocityX = random(-3, 3);
                pig_diamond[i].velocityY = random(-3, 3);
            }
        }, 1200);
        keyPigRandomVelocity = 1;
    }
    for (var i = 0; i < pig.length; i++) {
        if (pig[i].state == 0) {
            if (pig[i].velocityX >= 0) pig[i].directRtL = 0;
            else pig[i].directRtL = 1;
            pig[i].p.x += pig[i].velocityX;
            pig[i].x += pig[i].velocityX;				
            pig[i].p.y += pig[i].velocityY;
            pig[i].y += pig[i].velocityY;
            if (pig[i].x <= 0) pig[i].x = pig[i].p.x = 0;
            if (pig[i].x >= WIDTH_CANVAS) pig[i].x = pig[i].p.x = WIDTH_CANVAS;
            if (pig[i].y <= HEIGHT_CANVAS - HEIGHT_PLAYAREA) pig[i].y = pig[i].p.y = HEIGHT_CANVAS - HEIGHT_PLAYAREA;
            if (pig[i].y >= HEIGHT_CANVAS) pig[i].y = pig[i].p.y = HEIGHT_CANVAS;
        }
    }
    for (var i = 0; i < pig_diamond.length; i++) {
        if (pig_diamond[i].state == 0) {
            if (pig_diamond[i].velocityX >= 0) pig_diamond[i].directRtL = 0;
            else pig_diamond[i].directRtL = 1;
            pig_diamond[i].p.x += pig_diamond[i].velocityX;
            pig_diamond[i].x += pig_diamond[i].velocityX;				
            pig_diamond[i].p.y += pig_diamond[i].velocityY;
            pig_diamond[i].y += pig_diamond[i].velocityY;
            if (pig_diamond[i].x <= 0) pig_diamond[i].x = pig_diamond[i].p.x = 0;
            if (pig_diamond[i].x >= WIDTH_CANVAS) pig_diamond[i].x = pig_diamond[i].p.x = WIDTH_CANVAS;
            if (pig_diamond[i].y <= HEIGHT_CANVAS - HEIGHT_PLAYAREA) pig_diamond[i].y = pig_diamond[i].p.y = HEIGHT_CANVAS - HEIGHT_PLAYAREA;
            if (pig_diamond[i].y >= HEIGHT_CANVAS) pig_diamond[i].y = pig_diamond[i].p.y = HEIGHT_CANVAS;
        }
    }
}

function checkItemInBang(center) {
    checkTntInBang(center);
    checkGoldBigInBang(center);
    checkGoldMiddleInBang(center);
    checkGoldSmallInBang(center);
    checkRockBigInBang(center);
    checkRockSmallInBang(center);
    checkDiamondInBang(center);
    checkPigInBang(center);
    checkPigDiamondInBang(center);
    checkGiftInBang(center);
    checkBoneInBang(center);
    checkHeadBoneInBang(center);
}
function checkTntInBang(center) {
    for (var i = 0; i < tnt.length; i++) {
        if (tnt[i].state == 0) {
            if (distancePP(center, tnt[i].p) <= tnt[i].r + RADIUS_BIG_BANG) {
                tnt[i].beDestroyed();
                bigBang(new Point_Type(tnt[i].x, tnt[i].y));
            }
        }
    }
}
function checkGoldBigInBang(center) {
    for (var i = 0; i < gold_big.length; i++) {
        if (gold_big[i].state == 0) {
            if (distancePP(center, gold_big[i].p) <= gold_big[i].r + RADIUS_BIG_BANG) {
                gold_big[i].beDestroyed();
            }
        }
    }
}
function checkGoldMiddleInBang(center) {
    for (var i = 0; i < gold_middle.length; i++) {
        if (gold_middle[i].state == 0) {
            if (distancePP(center, gold_middle[i].p) <= gold_middle[i].r + RADIUS_BIG_BANG) {
                gold_middle[i].beDestroyed();
            }
        }
    }
}
function checkGoldSmallInBang(center) {
    for (var i = 0; i < gold_small.length; i++) {
        if (gold_small[i].state == 0) {
            if (distancePP(center, gold_small[i].p) <= gold_small[i].r + RADIUS_BIG_BANG) {
                gold_small[i].beDestroyed();
            }
        }
    }
}
function checkRockBigInBang(center) {
    for (var i = 0; i < rock_big.length; i++) {
        if (rock_big[i].state == 0) {
            if (distancePP(center, rock_big[i].p) <= rock_big[i].r + RADIUS_BIG_BANG) {
                rock_big[i].beDestroyed();
            }
        }
    }
}
function checkRockSmallInBang(center) {
    for (var i = 0; i < rock_small.length; i++) {
        if (rock_small[i].state == 0) {
            if (distancePP(center, rock_small[i].p) <= rock_small[i].r + RADIUS_BIG_BANG) {
                rock_small[i].beDestroyed();
            }
        }
    }
}
function checkDiamondInBang(center) {
    for (var i = 0; i < diamond.length; i++) {
        if (diamond[i].state == 0) {
            if (distancePP(center, diamond[i].p) <= diamond[i].r + RADIUS_BIG_BANG) {
                diamond[i].beDestroyed();
            }
        }
    }
}
function checkPigInBang(center) {
    for (var i = 0; i < pig.length; i++) {
        if (pig[i].state == 0) {
            if (distancePP(center, pig[i].p) <= pig[i].r + RADIUS_BIG_BANG) {
                pig[i].beDestroyed();
            }
        }
    }
}
function checkPigDiamondInBang(center) {
    for (var i = 0; i < pig_diamond.length; i++) {
        if (pig_diamond[i].state == 0) {
            if (distancePP(center, pig_diamond[i].p) <= pig_diamond[i].r + RADIUS_BIG_BANG) {
                pig_diamond[i].beDestroyed();
            }
        }
    }
}
function checkGiftInBang(center) {
    for (var i = 0; i < gift.length; i++) {
        if (gift[i].state == 0) {
            if (distancePP(center, gift[i].p) <= gift[i].r + RADIUS_BIG_BANG) {
                gift[i].beDestroyed();
            }
        }
    }
}
function checkBoneInBang(center) {
    for (var i = 0; i < bone.length; i++) {
        if (bone[i].state == 0) {
            if (distancePP(center, bone[i].p) <= bone[i].r + RADIUS_BIG_BANG) {
                bone[i].beDestroyed();
            }
        }
    }
}
function checkHeadBoneInBang(center) {
    for (var i = 0; i < head_bone.length; i++) {
        if (head_bone[i].state == 0) {
            if (distancePP(center, head_bone[i].p) <= head_bone[i].r + RADIUS_BIG_BANG) {
                head_bone[i].beDestroyed();
            }
        }
    }
}

function checkCollision() {
    if (checkCollisionTnt()) return true;
    if (checkCollisionGoldBig()) return true;
    if (checkCollisionGoldMiddle()) return true;
    if (checkCollisionGoldSmall()) return true;
    if (checkCollisionRockBig()) return true;
    if (checkCollisionRockSmall()) return true;
    if (checkCollisionDiamond()) return true;
    if (checkCollisionPig()) return true;
    if (checkCollisionPigDiamond()) return true;
    if (checkCollisionGift()) return true;
    if (checkCollisionBone()) return true;
    if (checkCollisionHeadBone()) return true;
    
    return false;
}
function checkCollisionTnt() {
    for (var i = 0; i < tnt.length; i++) {
        if (tnt[i].state == 0) {
            if (distancePP(hookPosition, tnt[i].p) <= tnt[i].r + 13) {
                valueThing = tnt[i].value;
                weightThing = tnt[i].weight;
                tnt[i].beDragged();
                tnt[i].drawSprite();
                sizeThing = tnt[i].r;
                animationBigBang();
                return true;
            }
        }
    }
}
function checkCollisionGoldBig() {
    for (var i = 0; i < gold_big.length; i++) {
        if (gold_big[i].state == 0) {
            if (distancePP(hookPosition, gold_big[i].p) <= gold_big[i].r + 10) {
                valueThing = gold_big[i].value;
                weightThing = gold_big[i].weight;
                sizeThing = gold_big[i].r;
                gold_big[i].beDragged();
                gold_big[i].drawSprite();
                return true;
            }
        }
    }
}
function checkCollisionGoldMiddle() {
    for (var i = 0; i < gold_middle.length; i++) {
        if (gold_middle[i].state == 0) {
            if (distancePP(hookPosition, gold_middle[i].p) <= gold_middle[i].r + 10) {
                valueThing = gold_middle[i].value;
                weightThing = gold_middle[i].weight;
                sizeThing = gold_middle[i].r;
                gold_middle[i].beDragged();
                gold_middle[i].drawSprite();
                return true;
            }
        }
    }
}
function checkCollisionGoldSmall() {
    for (var i = 0; i < gold_small.length; i++) {
        if (gold_small[i].state == 0) {
            if (distancePP(hookPosition, gold_small[i].p) <= gold_small[i].r + 10) {
                valueThing = gold_small[i].value;
                weightThing = gold_small[i].weight;
                sizeThing = gold_small[i].r;
                gold_small[i].beDragged();
                gold_small[i].drawSprite();
                return true;
            }
        }
    }
}
function checkCollisionRockBig() {
    for (var i = 0; i < rock_big.length; i++) {
        if (rock_big[i].state == 0) {
            if (distancePP(hookPosition, rock_big[i].p) <= rock_big[i].r + 10) {
                valueThing = rock_big[i].value;
                if (isRockCollect) valueThing *= 5;
                weightThing = rock_big[i].weight;
                sizeThing = rock_big[i].r;
                rock_big[i].beDragged();
                rock_big[i].drawSprite();
                return true;
            }
        }
    }
}
function checkCollisionRockSmall() {
    for (var i = 0; i < rock_small.length; i++) {
        if (rock_small[i].state == 0) {
            if (distancePP(hookPosition, rock_small[i].p) <= rock_small[i].r + 10) {
                valueThing = rock_small[i].value;
                if (isRockCollect) valueThing *= 5;
                weightThing = rock_small[i].weight;
                sizeThing = rock_small[i].r;
                rock_small[i].beDragged();
                rock_small[i].drawSprite();
                return true;
            }
        }
    }
}
function checkCollisionDiamond() {
    for (var i = 0; i < diamond.length; i++) {
        if (diamond[i].state == 0) {
            if (distancePP(hookPosition, diamond[i].p) <= diamond[i].r + 10) {
                valueThing = diamond[i].value;
                if (isDiamondBuff) valueThing = 900;
                weightThing = diamond[i].weight;
                sizeThing = diamond[i].r;
                diamond[i].beDragged();
                diamond[i].drawSprite();
                return true;
            }
        }
    }
}
function checkCollisionPig() {
    for (var i = 0; i < pig.length; i++) {
        if (pig[i].state == 0) {
            if (distancePP(hookPosition, pig[i].p) <= pig[i].r + 8) {
                valueThing = pig[i].value;
                weightThing = pig[i].weight;
                sizeThing = pig[i].r;
                pig[i].beDragged();
                pig[i].drawSprite();
                return true;
            }
        }
    }
}
function checkCollisionPigDiamond() {
    for (var i = 0; i < pig_diamond.length; i++) {
        if (pig_diamond[i].state == 0) {
            if (distancePP(hookPosition, pig_diamond[i].p) <= pig_diamond[i].r + 8) {
                valueThing = pig_diamond[i].value;
                if (isDiamondBuff) valueThing = 902;
                weightThing = pig_diamond[i].weight;
                sizeThing = pig[i].r;
                pig_diamond[i].beDragged();
                pig_diamond[i].drawSprite();
                return true;
            }
        }
    }
}
function checkCollisionGift() {
    for (var i = 0; i < gift.length; i++) {
        if (gift[i].state == 0) {
            if (distancePP(hookPosition, gift[i].p) <= gift[i].r + 13) {
                if (gift[i].value < 200) {
                    valueThing = - 1; // mine
                }
                else if (gift[i].value > 800) {
                    valueThing = -2; // super power
                }
                else {
                    if (isLucky) valueThing = 800;
                    else valueThing = gift[i].value;
                }
                weightThing = gift[i].weight;
                sizeThing = gift[i].r;
                gift[i].beDragged();
                gift[i].drawSprite();
                return true;
            }
        }
    }
}
function checkCollisionBone() {
    for (var i = 0; i < bone.length; i++) {
        if (bone[i].state == 0) {
            if (distancePP(hookPosition, bone[i].p) <= bone[i].r + 10) {
                valueThing = bone[i].value;
                weightThing = bone[i].weight;
                sizeThing = bone[i].r;
                bone[i].beDragged();
                bone[i].drawSprite();
                return true;
            }
        }
    }
}
function checkCollisionHeadBone() {
    for (var i = 0; i < head_bone.length; i++) {
        if (head_bone[i].state == 0) {
            if (distancePP(hookPosition, head_bone[i].p) <= head_bone[i].r + 10) {
                valueThing = head_bone[i].value;
                weightThing = head_bone[i].weight;
                sizeThing = head_bone[i].r;
                head_bone[i].beDragged();
                head_bone[i].drawSprite();
                return true;
            }
        }
    }
}

function refreshResource() {
    
}

function cancelAnimations() {
    window.cancelAnimationFrame(anim_gold_big);
    window.cancelAnimationFrame(anim_plus_money_requestId);
    window.cancelAnimationFrame(anim_old_man_drop_hook_requestId);
    window.cancelAnimationFrame(anim_old_man_pull_hook_requestId);
    window.cancelAnimationFrame(anim_old_man_throw_mine_requestId);
    window.cancelAnimationFrame(anim_big_bang_requestId);
    window.cancelAnimationFrame(anim_old_man_throw_mine_requestId);
}

function refreshAnimationKeys() {
    i_anim_old_man_pull_hook = 0;
    i_anim_old_man_throw_mine = 0;
    i_anim_old_man_drop_hook = 0;
    i_anim_seller = 0;
    i_anim_big_bang = 0;
    i_anim_gold_big = 0;
    
    direct_anim_seller = 1;
    key_anim_seller = 0;
    key_anim_old_man_drop_hook = 0;
    key_anim_old_man_pull_hook = 0;
    key_anim_rope = 0;
    key_anim_big_bang = 0;
    key_anim_gold_big = 0;
    key_anim_old_man_throw_mine = 0;
}

function endMatch() {
    cancelAnimations();
    sound_play_scene.stop();
    if (level == 8) {
        gameOver(1);
    }
    else if (money < targetMoney[level]) {	
        gameOver(0);
    }
    else {
        hookPosition.x = playerPosition.x;
        hookPosition.y = playerPosition.y;
        stateDragging = 0;
        lengthRope = 0;
        refreshResource();
        
        isRockCollect = 0;
        isPower = 0;
        isSuperPower = 0;
        isDiamondBuff = 0;
        isLucky = 0;
        keyScene = 4;
        keyPlaySceneStart = 0;
        document.getElementById("canvas").removeEventListener("mousemove", getMousePosition);
    }
}

function shoppingSceneStart() {
    for (var i = 0; i < item.length; i++) {
        item[i].isSold = 0;
    }
    var count = 0;
    while (count < 3) {
        for (var i = 0; i < item.length; i++) {
            if (!item[i].isSold) {
                item[i].isSold = randomInt(0, 1);
                if (item[i].isSold) {
                    count++;
                }
            }
        }
    }
    for (var i = 0; i < item.length; i++) {
        if (item[i].isSold) {
            item[i].price = randomInt(item[i].price_min, item[i].price_max);
        }
    }
}
function drawShopScene() {
    var ctx = myGameArea.context;
    ctx.fillStyle = "#663300";
    ctx.fillRect(0, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*2, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*4, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*6, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*8, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*10, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*12, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*14, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillStyle = "#552200";
    ctx.fillRect(WIDTH_CANVAS/16, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*3, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*5, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*7, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*9, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*11, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*13, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.fillRect(WIDTH_CANVAS/16*15, 0, WIDTH_CANVAS/16, HEIGHT_CANVAS);
    ctx.beginPath();
    ctx.fillStyle = "#dd8867";
    ctx.font = SIZE_WORD_NOTI + " " + FONT_WORD;
    ctx.fillText("Money: " + money + "$", 40, HEIGHT_CANVAS - HEIGHT_PLAYAREA - 60);
    ctx.drawImage(img_atlas, anim_seller[i_anim_seller].x, anim_seller[i_anim_seller].y, 151, 162, 530, 210, 200, 210);
    if (!key_anim_seller) {
        key_anim_seller = 1;
        window.requestAnimationFrame(animationSeller);
    }	
    ctx.drawImage(img_atlas, 2, 2, 640, 137, 0, 400, 750, 200);
    if (isInRectangle(new Point_Type(mousePosition.x, mousePosition.y), 
                                        new Rectangle_Type(new Point_Type(600, 50), 100, 70))) {
        ctx.drawImage(img_atlas, 714, 1315, 57, 42, 600, 50, 100, 70);
        document.getElementById("canvas").addEventListener("mousedown", clickOutShop);
    }
    else {
        ctx.drawImage(img_atlas, 654, 1310, 57, 42, 600, 50, 100, 70);
        document.getElementById("canvas").removeEventListener("mousedown", clickOutShop);
    }
    for (var i = 0; i < item.length; i++) {
        if (!item[i].isSold) continue;
        drawItem(item[i]);
        drawItemPrice(item[i]);
    }
}
function clickOutShop() {
    document.getElementById("canvas").removeEventListener("mousedown", clickOutShop);
    sound_shop_scene.stop();
    keyScene = 3;
}
function drawItem(item) {
    var ctx = myGameArea.context;
    ctx.drawImage(img_atlas, item.sx, item.sy, item.sw, item.sh,
                                                    item.x, item.y, item.w, item.h);
}
function drawItemPrice(item) {
    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.fillStyle = "#223300";
    ctx.font = SIZE_WORD_PRICE + " " + FONT_WORD;
    ctx.fillText(item.price + "$", item.x + item.x_text, HEIGHT_CANVAS - HEIGHT_PLAYAREA + 310);
}
function drawItemText(item) {
    var ctx = myGameArea.context;
    ctx.beginPath();
ctx.fillStyle = COLOR_CANVAS;
    ctx.font = SIZE_WORD_NOTI + " " + FONT_WORD_PRICE;
    ctx.fillText(item.text1, 70, 490);
    ctx.fillText(item.text2, 70, 520);
}

function drawTransSceneShopToPlay() {
    if (countTransSceneShopToPlay >= 2000) {
        keyScene = 1; // trans to play scene
        newTurnPlaying();
        key_even_listener_button_down_play_scene = 0;
        countTransSceneShopToPlay = 0;
        return;
    }
    if (sound_new_level.sound.paused) sound_new_level.play(0.2);

    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.drawImage(img_bg, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    ctx.drawImage(img_atlas, 644, 2, 315, 143, 115, 195, 520, 180);

    ctx.font = SIZE_WORD + " " + FONT_WORD;
    ctx.fillStyle = COLOR_WORD;

    ctx.fillText("Target: " + targetMoney[level + 1] + "$", 170, 305);

    countTransSceneShopToPlay += TIME_INTERVAL;
}

function drawTransScenePlayToShop() {
    if (countTransScenePlayToShop >= 2000) {
        sound_shop_scene.play(0.3);
        keyScene = 2; // trans to play scene
        countTransScenePlayToShop = 0;
    }
    if (sound_mission_passed.sound.paused) sound_mission_passed.play(0.7);

    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.drawImage(img_bg, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    ctx.drawImage(img_atlas, 644, 2, 315, 143, 115, 195, 520, 180);

    ctx.font = SIZE_WORD + " " + FONT_WORD;
    ctx.fillStyle = COLOR_WORD;

    ctx.fillText("Mission passed", 165, 305);

    countTransScenePlayToShop += TIME_INTERVAL;
}

function animationSeller() {
    count_anim_seller_eye++;
    i_anim_seller++;
    if (count_anim_seller_eye < anim_seller.length - 1) {
        anim_seller_requestId = window.requestAnimationFrame(animationSeller);
    }
    else {
        count_anim_seller_eye = 0;
        i_anim_seller = 0;
        window.cancelAnimationFrame(anim_seller_requestId);
        setTimeout(function() {
                                key_anim_seller = 0;
                            }, 3500);
    }
}
function newStatusShopping() {
    document.getElementById("canvas").addEventListener("mousemove", getMousePosition);
    checkMouseOnItemButton();
}
function checkMouseOnItemButton() {
    for (var i = 0; i < item.length; i++) {
        if (!item[i].isSold) continue;
        if (isInRectangle(new Point_Type(mousePosition.x, mousePosition.y), 
                        new Rectangle_Type(new Point_Type(item[i].x, item[i].y), item[i].w, item[i].h))) {
            drawItemText(item[i]);
            if (!ifMouseOnItemButton[i]) {
                ifMouseOnItemButton[i] = 1;
                id_item_bought = i;
                document.getElementById("canvas").addEventListener("mousedown", clickItemButton);
                // console.log(i + " " + ifMouseOnItemButton[i]);
            }
        }
        if (ifMouseOnItemButton[i] && 
                !isInRectangle(new Point_Type(mousePosition.x, mousePosition.y), 
                                            new Rectangle_Type(new Point_Type(item[i].x, item[i].y), item[i].w, item[i].h))) {
            ifMouseOnItemButton[i] = 0;
            document.getElementById("canvas").removeEventListener("mousedown", clickItemButton);
        }
    }
    // console.log("checkMouseOnPlayButton()");
}
function clickItemButton() {
    sound_buy_item.play(1);
    if (money < item[id_item_bought].price) return;
    document.getElementById("canvas").removeEventListener("mousedown", clickItemButton);
    money -= item[id_item_bought].price;
    item[id_item_bought].isSold = 0;
    // console.log(item[id_item_bought].price);
    switch(id_item_bought) {
        case 0:
            num_mine++;
            break;
        case 1:
            isRockCollect = 1;
            break;
        case 2:
            isPower = 1;
            break;
        case 3:
            isDiamondBuff = 1;
            break;
        case 4:
            isLucky = 1;
            break;
    }
}
function newTurnPlaying() {
    isCountDowning = 0;
    timeLeft = 60;
    level++;
    keyShoppingSceneStart = 0;
    keyPigRandomVelocity;
    createElements();
    refreshAnimationKeys();
    sound_play_scene.play(0.1);
}
function startGame() {
    // console.log("startGame(): start");
    setValues();
    myGameArea.start();
    createElements();
    sound_start_scene.play(0.6);
}
function gameOver(num) {
    clearInterval(myGameArea.interval); // delete statement setInterval 
    //myGameArea.clear();
    // print on the screen the result
    var ctxEndGame = myGameArea.context;

    ctxEndGame.beginPath();
    ctxEndGame.drawImage(img_bg, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    ctxEndGame.drawImage(img_atlas, 644, 2, 315, 143, 115, 195, 520, 180);

    ctxEndGame.font = SIZE_WORD + " " + FONT_WORD;
    ctxEndGame.fillStyle = COLOR_WORD;

    if (num == 1) {
        sound_endgame_win.play(1);
        ctxEndGame.fillText("You win", 270, 305);
    }

    else if (num == 0) {
        sound_endgame_lose.play(1);
        ctxEndGame.fillText("You lose", 265, 305);
    }
    // console.log("gameOver (" + num + ")");
}
function updateGameArea() { 
    myGameArea.clear();
    if (keyScene == 0) { // start scene
        if (!keyStartSceneStart) {
            document.getElementById("canvas").addEventListener("mousemove", getMousePosition);
            keyStartSceneStart = 1;
        }
        drawStartScene();
        checkMouseOnPlayButton();
        //console.log("Start Scene");
    }
    else if (keyScene == 1) { // play scene
        if (!keyPlaySceneStart) {
            playSceneStart();
            keyPlaySceneStart = 1;
        }
        drawPlayScene();
        newStatusPlaying();
    }
    else if (keyScene == 2) { // shopping scene
        if (!keyShoppingSceneStart) {
            shoppingSceneStart();
            keyShoppingSceneStart = 1;
            // console.log("Shopping Time!!");
        }
        drawShopScene();
        newStatusShopping();
    }
    else if (keyScene == 3) { // scene transition (from shop scene -> play scene)
        drawTransSceneShopToPlay();
    }
    else if (keyScene == 4) { // scene transition (from play scene -> shop scene)
        drawTransScenePlayToShop();
    }
}
