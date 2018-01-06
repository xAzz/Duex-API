var hatgratis = "escroto";//xdd
var isfreehat = new Image();
isfreehat.src = "assets/img/Hat_Fire.png"; //"http://i.imgur.com/BE9TvCx.png";
window.nameCache = {};
var backoff = 500;
window.selectedCurrentHat = null;
var tagColors;
var duexObj = {
    emoticons: {
        ":smile": "assets/img/emojis/smile.png",
        ":wink": "assets/img/emojis/wink.png",
        ":smirk": "assets/img/emojis/smirk.png",
        ":xgrin": "assets/img/emojis/x-grin.png",
        ":think": "assets/img/emojis/think.png",
        ":joy": "assets/img/emojis/joy.png",
        ":sad": "assets/img/emojis/sad.png",
        ":cry": "assets/img/emojis/cry.png",
        ":tongue": "assets/img/emojis/tongue.png",
        ":kiss": "assets/img/emojis/kiss.png",
        ":cute": "assets/img/emojis/cute.png",
        ":inlove": "assets/img/emojis/inlove.png",
        ":intolove": "assets/img/emojis/inthelove.png",
        ":heart": "assets/img/emojis/heart.png",
        ":cool": "assets/img/emojis/cool.png",
        ":amazed": "assets/img/emojis/amazed.png",
        ":sweat": "assets/img/emojis/sweat.png",
        ":neutral": "assets/img/emojis/neutral.png",
        ":unamused": "assets/img/emojis/unamused.png",
        ":angry": "assets/img/emojis/angry.png",
        ":sleep": "assets/img/emojis/sleep.png",
        ":expressionless": "assets/img/emojis/expressionless.png",
        ":money": "assets/img/emojis/money.png",
        ":angel": "assets/img/emojis/angel.png",
        ":devil": "assets/img/emojis/devil.png",
        ":poop": "assets/img/emojis/poo.png",
        ":finger": "assets/img/emojis/finger.png",
        ":clap": "assets/img/emojis/clap.png",
        ":ok": "assets/img/emojis/ok.png",
        ":promise": "assets/img/emojis/promise.png",
        ":victory": "assets/img/emojis/victory.png",
        ":fist": "assets/img/emojis/fist.png",
        ":strong": "assets/img/emojis/strong.png",
        ":point": "assets/img/emojis/point.png",
        ":nails": "assets/img/emojis/nail-polish.png",
        ":thumb": "assets/img/emojis/thumb.png",
        ":thumbd": "assets/img/emojis/thumb-down.png",
        ":v": "assets/img/emojis/pacman.png",
        ":fire": "assets/img/emojis/flame.png",
        ":licking": "assets/img/emojis/licking.gif",
        ":pepe": "assets/img/emojis/pepe.png",
        ":earth": "assets/img/emojis/earth.png",
    },
    chat: {
        isOwner: "https://i.imgur.com/0Dy1ad3.png",
        isDev: "https://i.imgur.com/76pr6yT.png",
        isHelper: "https://i.imgur.com/9JH83bv.png",
        isPartner: "https://i.imgur.com/Z9pO6Fu.png",
        isYoutuber: "https://i.imgur.com/tusOaRH.png",
        isVIP: "https://i.imgur.com/XnYa5dp.png",
        isLogged: "https://i.imgur.com/c55Mqps.png",
        isQuest: "https://i.imgur.com/tDrc89G.png",
    },
    coinStrokeColor: "rgba(0, 0, 0, 0)",
    cursorLineTransparencia: 0.8,
    anchoCursorLine: 3,
    anchoSectores: 100,
    tamanoFuenteSector: 0.4,
    gActiveTurnPlayerId: 0
};
window.cache_img = {};
window.cache_img.coin = new Image();
window.cache_img.coin.src = "assets/img/coin.png";
window.cache_skin = {};

function MyApp() {
    function enter() {
        CustomNodes.push({
            nick: myApp.getName(),
            me: true
        });
        return $("#nick").val(myApp.getName()), nodeList[0][1] == myApp.getName() ? false : (nodeList[0][1] = myApp.getName(), setLocalStorage("nick", $("#nick").val()), player_profile[selected_profile].name = myApp.getName(), data(), true);
    }

    function fillHSBFields() {
        var v = myApp.getTeamName();
        return $("#team_name").val(v), tmpTeamname == v ? false : (setLocalStorage("opt_teamname", v), player_profile[selected_profile].team = v, data(), true);
    }

    function change() {
        setLocalStorage("selected_profile", selected_profile);
        tmpTeamname = myApp.getTeamName();
        $("#nick").val(player_profile[selected_profile].name);
        $("#team_name").val(player_profile[selected_profile].team);
        $("#skin_url").val(player_profile[selected_profile].skinurl).trigger("change");
        if (fillHSBFields()) {
            nodeList[0][1] = myApp.getName();
            setLocalStorage("nick", myApp.getName());
        } else {
            enter();
        }
    }

    function data() {
        setLocalStorage("player_profile", player_profile);
    }
    this.version = "v3.0.0";
    var v = 0.88;
    var animationDelay = 140;
    var namemasssize = 0.2;
    this.getZoomSpeed = function() {
        return v;
    };
    this.getZoomLimit = function() {
        return 0.05;
    };
    this.getNickMassSize = function() {
        return namemasssize;
    };
    this.animationDelay = function() {
        return animationDelay;
    };
    $.getJSON("leaderboard/colors.json?version=" + (new Date()).getSeconds(), function(a) {
        tagColors = a.tagcolors;
    });

    this.enableHats = true;

    this.halloween = { // faber
        virus: {
            enabled: false,
            img: "",
            loadImage: function() {
                this.img = new Image();
                this.img.src = "assets/img/HalloweenVirus.png";
            }
        }
    };
    this.halloween.virus.loadImage();
    this.isEnableHideFood = this.isEnableGridline = this.isEnableBorder = this.isEnableMapGrid = this.isEnableCursorLine = this.isEnableZoom = this.isStopMovement = this.isShowBallTotal = this.isShowSTE = this.isShowScroll = this.isSimpleMass = this.isEnabledAutoPlay = this.isEnableSimpleDrawing = this.isEnableMouseW = this.isEnableCustomSkin = this.isEnableAttackRange = this.isEnableTeammateIndicator = this.isEnableChatpopup = this.doubleSpace = this.quickSpace = this.autoW = this.isSpecTeammate = this.isOptimizedFood = this.isSpectating = this.isEnableSplitInd = this.isShowTextStrokeLine = this.isAutoHideName = this.isAutoHideMass = this.isShowFPS = this.isTransparentCell = this.isShowPacketIO = this.isEnableShareFb = this.isEnableSound = this.isHideSelfName = false;
    this.testing = false;
    this.isEnableShowAllMass = this.isEnableAutoStart = this.isEnableLockZoom = true;
    this.attackRangeRadius = 655;

/**/
    this.isDualMode = false;
    this.showActiveTurnMarker = false;
/**/

    this.cellColor = "";
    this.cellColorAry = "red #76FF03 blue yellow #8207ff #2196F3 ".split(" ");
    this.doubleSpaceCount = this.quickSpaceCount = 0;
    this.lockZoomG;
    this.teammateIndicatorPosition = 40;
    this.teammateIndicatorSize = 10;
    this.teammateIndicatorShowSize = 120;
    this.teammateIndicator;
    this.specTeammate;
    this.isSameColorFood = this.isEnableOtherSkinSupport = true;
    this.isFPSx2 = false;
    this.hats = {};
    this.hatsImageURL = {};
    this.canvasLoaded = {};
    this.drawHatsCache = function() {
        var _this = this;
/*        _this.canvasLoaded['hat_1'] = new Image();
        _this.canvasLoaded['hat_1'].src = 'http://i.imgur.com/7PCey2A.png';
        _this.canvasLoaded['hat_2'] = new Image();
        _this.canvasLoaded['hat_2'].src = 'http://i.imgur.com/bwApVUX.png';
        _this.canvasLoaded['hat_3'] = new Image();
        _this.canvasLoaded['hat_3'].src = 'http://i.imgur.com/kN9po6E.png';
        _this.canvasLoaded['hat_4'] = new Image();
        //_this.canvasLoaded['hat_4'].src = 'http://i.imgur.com/ADozPZ6.png';
        _this.canvasLoaded['hat_4'].src = 'http://i.imgur.com/bsfUJkG.png';
        _this.canvasLoaded['hat_5'] = new Image();
        _this.canvasLoaded['hat_5'].src = 'http://i.imgur.com/kfyPVAM.png';
        _this.canvasLoaded['hat_6'] = new Image();
        _this.canvasLoaded['hat_6'].src = 'http://i.imgur.com/c1S7dFq.png';
        _this.canvasLoaded['hat_7'] = new Image();
        _this.canvasLoaded['hat_7'].src = 'http://i.imgur.com/XuitCcp.png';
        _this.canvasLoaded['hat_8'] = new Image();
        _this.canvasLoaded['hat_8'].src = 'http://i.imgur.com/bsfUJkG.png';
        _this.canvasLoaded['hat_9'] = new Image();
        _this.canvasLoaded['hat_9'].src = 'http://i.imgur.com/v2Vdufh.png'; // balloons
        _this.canvasLoaded['hat_10'] = new Image();
        _this.canvasLoaded['hat_10'].src = 'http://i.imgur.com/9wijzVB.png'; // Angel cat
        _this.canvasLoaded['hat_11'] = new Image();
        _this.canvasLoaded['hat_11'].src = 'http://i.imgur.com/ddv9YZa.png'; // Exotic
        _this.canvasLoaded['hat_12'] = new Image();
        _this.canvasLoaded['hat_12'].src = 'http://i.imgur.com/LcGOmFW.png'; // Poop
        _this.canvasLoaded['hat_13'] = new Image();
        _this.canvasLoaded['hat_13'].src = 'http://i.imgur.com/amXoqS9.png'; // umbrella
        _this.canvasLoaded['hat_14'] = new Image();
        _this.canvasLoaded['hat_14'].src = 'http://i.imgur.com/wBGchAV.png'; // glasses
        _this.canvasLoaded['hat_15'] = new Image();
        _this.canvasLoaded['hat_15'].src = 'http://i.imgur.com/HhIrhID.png'; // crown
        _this.canvasLoaded['hat_16'] = new Image();
        _this.canvasLoaded['hat_16'].src = 'http://i.imgur.com/hhdHjvi.png'; // Frankenstein
        _this.canvasLoaded['hat_17'] = new Image();
        _this.canvasLoaded['hat_17'].src = 'http://i.imgur.com/htGCAUX.png'; // Ken
        _this.canvasLoaded['hat_18'] = new Image();
        _this.canvasLoaded['hat_18'].src = 'http://i.imgur.com/AggdZQu.png'; // Pharaoh
        _this.canvasLoaded['hat_19'] = new Image();
        _this.canvasLoaded['hat_19'].src = 'http://i.imgur.com/42Uv317.png'; // PharaohElmo
        _this.canvasLoaded['hat_20'] = new Image();
        _this.canvasLoaded['hat_20'].src = 'http://i.imgur.com/l5059rC.png'; // ghost
        _this.canvasLoaded['hat_21'] = new Image();
        _this.canvasLoaded['hat_21'].src = 'http://i.imgur.com/zly3yUe.png'; // Climb
        _this.canvasLoaded['hat_22'] = new Image();
        _this.canvasLoaded['hat_22'].src = 'http://i.imgur.com/nifYyCZ.png'; // Vegetta
        _this.canvasLoaded['hat_23'] = new Image();
        _this.canvasLoaded['hat_23'].src = 'http://i.imgur.com/0wDIt79.png'; // MonkeyBot*/
        $.getJSON("./hats.json?version=" + (new Date()).getSeconds(), function(hats) {
            //console.log("Hats ->" + hats);
            _this.hatsImageURL = hats.hatLinks;
            //console.log(_this.hatsImageURL);
            for (var property in _this.hatsImageURL) {
                _this.canvasLoaded[property] = new Image();
                _this.canvasLoaded[property].src = _this.hatsImageURL[property][0];
            }
        });
    };
    this.getRankFromObject = function (object) {
        var url = "";
        if (!object || typeof object != 'object') {
            url = "";
        } else if (object.isOwner) {
            url = duexObj.chat.isOwner;
        } else if (object.isDev) {
            url = duexObj.chat.isDev;
        } else if (object.isHelper) {
            url = duexObj.chat.isHelper;
        } else if (object.isPartner) {
            url = duexObj.chat.isPartner;
        } else if (object.isYoutuber) {
            url = duexObj.chat.isYoutuber;
        } else if (object.isVIP) {
            url = duexObj.chat.isVIP;
        }
        return url;
    }
    this.getCurrentMass = function() {
        if (window.pick) {
            var total = window.pick().toString();
            return total.substr(0, total.length - 2)
        }
    };

    this.init = function() {
        $("body").append("<canvas id='canvas'></canvas>");
        $("#bestPlayer").hide();
        var c = document.getElementById("canvas");
        c.getContext("2d");
        c.mozOpaque = true;
        window.setLocalStorage = function(key, value) {
            if ("string" == typeof value) {
                localStorage.setItem(key, value);
            } else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        };
        window.getLocalStorage = function(storageKey) {
            return localStorage.getItem(storageKey);
        };
        if (getLocalStorage("selected_profile")) {
            selected_profile = getLocalStorage("selected_profile");
        }
        if (getLocalStorage("player_profile")) {
            player_profile = JSON.parse(getLocalStorage("player_profile"));
        } else {
            if (getLocalStorage("nick")) {
                player_profile[selected_profile].name = getLocalStorage("nick");
            }
            if (getLocalStorage("opt_teamname")) {
                player_profile[selected_profile].team = getLocalStorage("opt_teamname");
            }
            if (getLocalStorage("skin_url")) {
                player_profile[selected_profile].skinurl = getLocalStorage("skin_url");
            }
        }
        c = 0;
        for (; c < player_profile.length; c++) {
            window.postMessage({
                action: Action.IMAGE,
                data: player_profile[c].skinurl
            }, "*");
        }
        $("body").attr("oncontextmenu", "return false;");
        $("#overlays2").append("<div id='teammate_menu'></div>");
        $("#teammate_menu").hide();
        $("#teammate_menu").click(function(event) {
            event.stopPropagation();
        });
        $("#overlays2").click(function() {
            $("#teammate_menu").hide();
        });
        nodeList[0] = ["me", getLocalStorage("nick"), null, null, "yellow", null, null, null, null, null, myApp.getCurrentMass(), 1441141414];
        nodeList[1] = ["top1", "", null, null, "white"];
        nodeList[0][8] = Date.now();
        nodeList[1][8] = Date.now();
        chatRoom = new ChatRoom;
        chatRoom.setContainer("#overlays2");
        chatRoom.createChatBox();
        chatRoom.createEmoticonsBox();
        minimap = new Minimap;
        minimap.createMap(200);
        c = document.createElement("canvas");
        var context = c.getContext("2d");
        context.beginPath();
        context.lineWidth = 10;
        context.moveTo(0, 0);
        context.lineTo(100, 0);
        context.lineTo(50, 50);
        context.closePath();
        context.strokeStyle = "white";
        context.fillStyle = "white";
        context.stroke();
        context.fill();
        this.teammateIndicator = c;
        conn = new Connection;
        conn.connect();
        this.drawHatsCache();
        //this.setTargeting();
        //this.getConnectedList();
    };
/*
    this.getConnectedList = function() {
        setInterval(function() {
            if (window.webSocket) window.webSocket.send(new Uint8Array([111])); // requesting server info
        }, 3e3);
    };

    this.setNormalCursor = function() {
        $("body").css("cursor", "default");
        localStorage.setItem("currentCursor", "");
    }

    this.enableTop5 = function(arg) {
        arg ? $("#top5").show() : $("#top5").hide();
    }

    this.enableTargeting = function(arg) {
        for (var i in cells) if (!cells[i].extras.isMinion && cells[i].extras.isPlayer) console.log(cells[i].name + " | " + cells[i].name)
        for (var i in cells) { 
            var totalmass = "";
            if (!cells[i].extras.isMinion && cells[i].extras.isPlayer && cells[i].extras) {
                if (cells[i].extras.id === cells[i].extras.id) totalmass += ~~((cells[i].size * cells[i].size) / 100)
                console.log(cells[i].name + " | " + totalmass)
            }
        }
        arg ? $("#targeting").show() : $("#targeting").hide();
    };

    this.setTargeting = function() {
        function getTotalMass(cells, target) {
            //if (!cells) return "";
            var total = "";
            if (cells.id === target.extras.id) {
                total += cells.size
            }
            return ~~((total * total) / 100);
        }
        
        var target_interval;
        window.onclick = function() {
            clearInterval(target_interval);
            window.cells = window.queue;
            for (var i in window.cells) {
                var cell = window.cells[i];
                if (cell && cell.extras.id) {
                    var x = mouseX - cell.x;
                    var y = mouseY - cell.y;
                    var distance = Math.sqrt(x * x + y * y);
                    if (distance < cell.size) {
                        if (cell.extras.id) {
                            window.playerID = cell.extras.id;
                            window.selectedPlayer = cell;
                            target_interval = setInterval(function() {
                                $("#target_nick").text("Targeting: " + selectedPlayer.name);
                                //$("#target_mass").text("Mass: " + getTotalMass(window.cells[i].extras, selectedPlayer));
                            }, 2e2);
                        }
                    } else {}
                }
            }
        };
    };*/
    this.newGame = function() {      
        isJoinedGame = true;
        myApp.isStopMovement = false;
        myApp.isSpectating = false;
        myApp.cellColor = "";
        myApp.newGameImpl();
        spectateMode = false;
        nodeList[1][2] = null;
        nodeList[1][3] = null;
    };
    this.afterGameLogicLoaded = function() {
        myApp.setupOption();
        myApp.setupHotKey();
        myApp.restoreSetting();
        myApp.setUpHotKeyConfigPage();
        myApp.downloadSkin();
        $("#nick").change(function() {
            enter();
        });
        $("#team_name").change(function() {
            fillHSBFields();
        }).focus(function() {
            tmpTeamname = myApp.getTeamName();
        });
        $("#skin_url").change(function() {
            var nv = getLocalStorage("skin_url");
            var v = myApp.getCustomSkinUrl();
            $("#skin_url").val(v);
            if (nv != v) {
                nv = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
                if ("DEFAULT" == v || nv.test(v)) {
                    setLocalStorage("skin_url", v);
                    nodeList[0][5] = v;
                    player_profile[selected_profile].skinurl = myApp.getCustomSkinUrl();
                    data();
                    myApp.changePreviewImage(player_profile[selected_profile].skinurl);
                    if (customSkin[v]) {
                        myApp.changePreviewImage(customSkin[v].src);
                    } else {
                        skinDownloadQueue.push(v);
                    }
                } else {
                    console.log("Not valid URL");
                    $("#skin_url").val("");
                }
            }
        });
        $(".nav2.arrow-left").click(function() {
            selected_profile = (player_profile.length + selected_profile - 1) % player_profile.length;
            change();
            $("#skin_url").change();
            $("#skins a").removeClass("selected");
            $("#skins a[data-profile='" + selected_profile + "']").addClass("selected");
        });
        $(".nav2.arrow-right").click(function() {
            selected_profile = (selected_profile + 1) % player_profile.length;
            change();
            $("#skin_url").change();
            $("#skins a").removeClass("selected");
            $("#skins a[data-profile='" + selected_profile + "']").addClass("selected");
        });
        data();
    };
    this.spectate = function(buffer2) {
        conn.joinRoom(myApp.getRoom());
        if (!(buffer2 && 0 != buffer2.length)) {
            myApp.isSpectating = true;
        }
    };
    this.newGameImpl = function() {
        var e = true;
        var sectors = getCell();
        if (!(sectors && 0 != sectors.length)) {
            e = false;
        }
        if (e) {
            nodeList[0][6] = sectors[0].color;
            conn.joinRoom(myApp.getRoom());
        } else {
            setTimeout(myApp.newGameImpl, 100);
        }
    };
    this.onDead = function() {
        window.onbeforeunload = function() {
            return "You are leaving Duex.io.";
        };
        updatePlayerDetails();
        isJoinedGame = false;
        conn.leaveRoom(myApp.getRoom());
        if (myApp.isEnabledAutoPlay) {
            setTimeout(function() {
                $('.btn-play').click();
            }, 250);
        }
    };
    this.afterGameLoaded = function() {
        myApp.isSpectating = false;
        updateLBCount = -1;
        moveTo(null, null);
        myApp.specTeammate = null;
        myApp.isStopMovement = false;
        minimap.setDeadPosition(null);
        conn.joinRoom(myApp.getRoom());
    };
    this.getRoom = function() {
/*        return "N/A" == myApp.getCurrentPartyCode() ? myApp.getTeamName() + myApp.getCurrentIP() : myApp.getTeamName() + myApp.getCurrentPartyCode();*/
        return myApp.getCurrentPartyCode() + "#" + myApp.getTeamName();
    };
    this.restoreSetting = function() {
        if (getLocalStorage("opt_teamname")) {
            $("#team_name").val(getLocalStorage("opt_teamname"));
        }
        if (getLocalStorage("nick") && "" != getLocalStorage("nick").trim()) {
            $("#nick").val(getLocalStorage("nick", myApp.getName()));
        } else {
            $("#nick").val(myApp.getName());
            setLocalStorage("nick", myApp.getName());
        }
        nodeList[0][1] = myApp.getName();
        if (getLocalStorage("opt_zoom_speed")) {
            v = getLocalStorage("opt_zoom_speed");
            $("#opt_zoom_speed").val(v);
            $("#txt_zoom_speed").text(v);
        }
        if (getLocalStorage("opt_nick_mass_size")) {
            namemasssize = getLocalStorage("opt_nick_mass_size");
            $("#opt_nick_mass_size").val(namemasssize);
            $("#txt_nick_mass_size").text(namemasssize);
        }
        if (getLocalStorage("opt_smooth_animation")) {
            animationDelay = getLocalStorage("opt_smooth_animation");
            $("#opt_smooth_animation").val(animationDelay);
            $("#txt_smooth_animation").text(animationDelay);
        }
        var n = getLocalStorage("skin_url");
        if (n && "" != n || (setLocalStorage("skin_url", defaultSkin), n = defaultSkin), n && ("" != n && ($("#skin_url").val(getLocalStorage("skin_url")), nodeList[0][5] = n, customSkin[n] ? myApp.changePreviewImage(customSkin[n].src) : skinDownloadQueue.push(getLocalStorage("skin_url")))), getLocalStorage("hotkeyMapping")) {
            hotkeyMapping = JSON.parse(getLocalStorage("hotkeyMapping"));
        } else {
            var unlock;
            for (unlock in hotkeyConfig) {
                if (hotkeyConfig[unlock].defaultHotkey) {
                    if ("" != hotkeyConfig[unlock].defaultHotkey) {
                        hotkeyMapping[hotkeyConfig[unlock].defaultHotkey] = unlock;
                    }
                }
            }
            setLocalStorage("hotkeyMapping", hotkeyMapping);
        }
        if (getLocalStorage("chatCommand")) {
            chatCommand = JSON.parse(getLocalStorage("chatCommand"));
        } else {
            chatCommand = defaultHotkeyMessageSend;
            setLocalStorage("chatCommand", chatCommand);
        }
    };
    this.setupOption = function() {
        var options = {
            opt_self_name: {
                text: "Hide my name",
                "default": true,
                handler: function(token) {
                    myApp.isHideSelfName = token;
                }
            },
            opt_name: {
                text: "Hide Names",
                handler: function(token) {
                    setNames(!token);
                }
            },
            opt_mass: {
                text: "Show mass",
                "default": false,
                handler: function(token) {
                    setShowMass(token);
                }
            },
            opt_simple_mass: {
                "default": true,
                text: "Short Mass",
                handler: function(token) {
                    myApp.isSimpleMass = token;
                }
            },
            opt_auto_hide_mass: {
                text: "Auto Hide Mass",
                "default": true,
                handler: function(token) {
                    myApp.isAutoHideMass = token;
                }
            },
            opt_auto_hide_name: {
                text: "Auto Hide Names",
                "default": true,
                handler: function(token) {
                    myApp.isAutoHideName = token;
                }
            },
            opt_show_text_stroke_line: {
                text: "Text Shadows",
                handler: function(token) {
                    myApp.isShowTextStrokeLine = token;
                }
            },
            opt_mapgrid: {
                text: "Map Sectors",
                "default": true,
                handler: function(token) {
                    myApp.isEnableMapGrid = token;
                }
            },
            opt_gridline: {
                text: "Gridlines",
                handler: function(token) {
                    myApp.isEnableGridline = token;
                }
            },
            opt_food: {
                text: "Hide Food",
                handler: function(token) {
                    myApp.isEnableHideFood = token;
                }
            },
            opt_optimized_food: {
                text: "Optimized Food",
                handler: function(token) {
                    myApp.isOptimizedFood = token;
                }
            },
            opt_same_food_color: {
                text: "Rainbow Food",
                "default": true,
                handler: function(token) {
                    myApp.isSameColorFood = !token;
                }
            },
            opt_simple_drawing: {
                text: "No Animations",
                "default": true,
                handler: function(token) {
                    myApp.isEnableSimpleDrawing = token;
                }
            },
            opt_color: {
                text: "Hide cells colors",
                handler: function(token) {
                    setColors(token);
                }
            },
            opt_transparent_cell: {
                text: "Transparent Cells",
                handler: function(token) {
                    myApp.isTransparentCell = token;
                }
            },
            opt_packetIO: {
                text: "Packets I/O",
                disabled: true,
                handler: function(token) {
                    myApp.isShowPacketIO = token;
                }
            },
            opt_stats: {
                text: "Skip stats",
                disabled: true,
                "default": true,
                handler: function(token) {
                    setSkipStats(token);
                }
            },
            opt_custom_skin: {
                text: "Custom Skins",
                "default": true,
                handler: function(token) {
                    myApp.isEnableCustomSkin = token;
                }
            },/*
            opt_hide_hats: {
                text: "Hats",
                "default": true,
                handler: function(token) {
                    myApp.isHats = token;
                }
            },
            opt_testing: {
                text: "Dual Camera",
                "default": false,
                handler: function(token) {
                    myApp.testing = token;
                }
            },*/
            opt_other_skin: {
                text: "Yin Skins",
                disabled: true,
                handler: function(token) {
                    myApp.isEnableOtherSkinSupport = token;
                }
            },
            opt_teammate_indicator: {
                text: "Team Indicator",
                "default": false,
                handler: function(token) {
                    myApp.isEnableTeammateIndicator = token;
                }
            },
            opt_mousew: {
                text: "Mouse Feed",
                handler: function(token) {
                    myApp.isEnableMouseW = token;
                }
            },
            opt_cursorline: {
                text: "Cursor Line",
                "default": false,
                handler: function(token) {
                    myApp.isEnableCursorLine = token;
                }
            },
            opt_split_ind: {
                text: "Split Indicators",
                handler: function(token) {
                    myApp.isEnableSplitInd = token;
                }
            },
            opt_minimap: {
                text: "Minimap",
                "default": true,
                handler: function(token) {
                    if (token) {
                        minimap.show();
                    } else {
                        minimap.hide();
                    }
                }
            },
            opt_auto_play: {
                text: "Autoplay",
                "default": false,
                handler: function(token) {
                    myApp.isEnabledAutoPlay = token;
                }
            },
            opt_zoom: {
                text: "Zoom",
                "default": true,
                handler: function(token) {
                    myApp.isEnableZoom = token;
                }
            },
            opt_lock_zoom: {
                text: "Auto Zoom",
                handler: function(token) {
                    myApp.isEnableLockZoom = !token;
                }
            },
            opt_fps: {
                text: "FPS",
                "default": true,
                handler: function(token) {
                    myApp.isShowFPS = token;
                }
            },
            opt_fpsx2: {
                text: "FPS x2",
                "default": false,
                handler: function(token) {
                    myApp.isFPSx2 = token;
                }
            },
            opt_score: {
                text: "Score",
                "default": true,
                handler: function(token) {
                    myApp.isShowScroll = token;
                }
            },
            opt_ste: {
                text: "STE",
                "default": false,
                handler: function(token) {
                    myApp.isShowSTE = token;
                }
            },
            opt_ball_total: {
                text: "[n/16]",
                "default": false,
                handler: function(token) {
                    myApp.isShowBallTotal = token;
                }
            },
            opt_chatbox: {
                text: "Chatbox",
                disabled: false,
                "default": false,
                handler: function(token) {
                    if (token) {
                        chatRoom.show();
                    } else {
                        chatRoom.hide();
                    }
                }
            },
            opt_chatpopup: {
                text: "Chat Popup",
                disabled: false,
                "default": true,
                handler: function(token) {
                    myApp.isEnableChatpopup = token;
                }
            },
            opt_halloween_vir: {
                text: "Pumpkin Virus",
                disabled: true,
                "default": false,
                handler: function(token) {
                    myApp.halloween.virus.enabled = token;
                }
            },
            opt_active_turnMarker: {
                text: "Active Turn Marker",
                "default": false, // only works in dualmode
                handler: function(token) {
                    myApp.showActiveTurnMarker = token;
                }
            },            
            opt_enable_hats: {
                text: "Hats",
                disabled: false,
                "default": true,
                handler: function(token) {
                    myApp.enableHats = token;
                }
            },/*
            opt_enable_targeting: {
                text: "Targeting (BETA)",
                disabled: false,
                "default": false,
                handler: function(token) {
                    myApp.enableTargeting(token);
                }
            },
            opt_enable_top5: {
                text: "Team Top 5",
                disabled: false,
                "default": false,
                handler: function(token) {
                    myApp.enableTop5(token);
                }
            },
            opt_normal_cursor: {
                text: "Set normal cursor",
                disabled: false,
                "default": false,
                handler: function() {
                    myApp.setNormalCursor();
                }
            }*/
        };
        window.setYinSkinSupport = function(firstRestricted) {
            options.opt_other_skin.handler(firstRestricted);
            setLocalStorage("opt_other_skin", firstRestricted);
        };
        var i;
        var row = [];
        for (i in options) {
            if (!options[i].disabled) {
                row.push('<div id="option-box"><input id="' + i + '" type="checkbox"><label id="option-text">' + options[i].text + "</label></div>");
            }
        }
        var d = row.splice(0, 13);
        var j = 0;
        for (; j < d.length; j++) {
            $(".firstSettings").append(d[j]);
        }
        j = 0;
        for (; j < row.length; j++) {
            $(".secondSettings").append(row[j]);
        }
        $("input:checkbox").change(function() {
            var firstRestricted = $(this).prop("checked");
            var type = $(this).prop("id");
            setLocalStorage(type, firstRestricted);
            if (options[type]) {
                options[type].handler(firstRestricted);
            }
        });
        for (i in options) {
            if (getLocalStorage(i)) {
                if ("true" == getLocalStorage(i)) {
                    if ("opt_other_skin" == i) {
                        setYinSkinSupport(true);
                    } else {
                        $("#" + i).click();
                    }
                }
            } else {
                if (options[i]["default"]) {
                    $("#" + i).click();
                }
            }
        }
        $(".zoomSpeed").append('Zoom Speed: <span id="txt_zoom_speed">0.88</span></div><input oninput="$(\'#txt_zoom_speed\').text(this.value);" class="range-slider__range" style="width:100%;" type="range" id="opt_zoom_speed" name="opt_zoom_speed" min="0.88" max="0.99" step="0.01" value="0.88">');
        $("#opt_zoom_speed").change(function() {
            v = $("#opt_zoom_speed").val();
            setLocalStorage("opt_zoom_speed", v);
        });
        $(".nickmasssizecontrol").append('Nick / Mass Size: <span id="txt_nick_mass_size">1.2</span></div><input oninput="$(\'#txt_nick_mass_size\').text(this.value);" class="range-slider__range" style="width:100%;" type="range" id="opt_nick_mass_size" name="opt_nick_mass_size" min="0.1" max="1" step="0.1" value="0.2">');
        $("#opt_nick_mass_size").change(function() {
            namemasssize = $("#opt_nick_mass_size").val();
            setLocalStorage("opt_nick_mass_size", namemasssize);
        });
        $(".animationcontrol").append('Animation Delay: <span id="txt_smooth_animation">100</span></div><input oninput="$(\'#txt_smooth_animation\').text(this.value);" class="range-slider__range" style="width:100%;" type="range" id="opt_smooth_animation" name="opt_smooth_animation" min="50" max="400" step="10" value="140">');
        $("#opt_smooth_animation").change(function() {
            animationDelay = $("#opt_smooth_animation").val();
            setLocalStorage("opt_smooth_animation", animationDelay);
        });
    };
    this.scoreInfo = function(millis) {
        if (!millis || !millis.length) {
            return "";
        }
        var optsData = "";
        return myApp.isShowSTE && (optsData += "   STE: " + this.getSTE(millis)), myApp.isShowBallTotal && (optsData += "   [" + millis.length + "/" + playerMaxCells + "]"), optsData;
    };
    this.scoreTxt = function(dataAndEvents) {
        return myApp.isShowScroll ? dataAndEvents : "";
    };
    this.isShowScoreInfo = function() {
        return myApp.isShowScroll || (myApp.isShowSTE || myApp.isShowBallTotal);
    };
    this.showSystemMessage = function() {
        return false;
    };
    this.getSTE = function(codeSegments) {
        var w = 0;
        var i = 0;
        for (; i < codeSegments.length; i++) {
            if (codeSegments[i]) {
                if (codeSegments[i].I) {
                    if (codeSegments[i].I.w) {
                        if (codeSegments[i].I.w > w) {
                            w = codeSegments[i].I.w;
                        }
                    }
                }
            }
        }
        return ~~(0.375 * w);
    };
    this.updateLBInfo = function() {
        var escaped = "";
        var codeSegments = myApp.getLeaderBoard();
        if (codeSegments) {
            var i = 0;
            for (; i < codeSegments.length; i++) {
                escaped += "<div>" + (i + 1) + ".  " + escapeHtml(codeSegments[i]) + "</div>";
            }
        }
        $("#lb_info").html(escaped);
    };
    this.isPrivateServer = function() {
        return PRIVATE_SERVER_IP == currentIP;
    };
    this.getCurrentIP = function() {
        return this.isPrivateServer() ? "----------" : currentIP.substring(5, currentIP.length);
    };
    this.getRegion = function() {
        return $("#region option:selected").text().split(" ")[0];
    };
    this.getGameMode = function() {
        return this.isPrivateServer() ? "----------" : $("#gamemode option:selected").text();
    };
    this.getTeamName = function() {
        return ("" == $("#team_name").val() ? "" : $("#team_name").val()).trim();
    };
    this.getCustomSkinUrl = function() {
        var ret = ($("#skin_url").val() + "").trim();
        return "" == ret ? "" : ret;
    };
    this.getCurrentPartyCode = function() {
        var party = $(".partyToken").val();
        return party.replace(party.slice(party.indexOf('/?token=')), '');
    };
    this.showMessage = function(message, options) {
        if (0 == $("#message_dialog").length) {
            myApp.createMessageDialog();
        }
        $("#message_dialog_title").text(message);
        $("#message_dialog_content").html(options);
        $("#message_dialog").modal({
            show: "true"
        });
    };
    this.getName = function() {
        var val = $("#nick").val().trim();
        return -1 != val.indexOf("\u200b") && (val = ""), "" == val ? "" : val;
    };
    this.getLeaderBoard = function() {
        var listenersArr = [];
        var codeSegments = getLB();
        if (codeSegments) {
            var i = 0;
            for (; i < codeSegments.length; i++) {
                listenersArr[listenersArr.length] = "" == codeSegments[i].name ? "Unnamed" : escapeHtml(codeSegments[i].name);
            }
        }
        return listenersArr;
    };
    this.setupHotKey = function() {
        hotkeyConfig = {
            hk_bot_control: { 
                defaultHotkey: "TAB",
                name: "Dual Agar Bot Control",
                keyDown: function() {
                    if (!chatRoom.isFocus()) {
                        getControlBot();
                    }
                },
                type: "NORMAL"
            },            
            hk_start_new_game: {
                defaultHotkey: "N",
                name: "Start new game",
                keyDown: function() {
                    $(".btn-respawn").click();
                },
                type: "NORMAL"
            },
            hk_cheatw: {
                defaultHotkey: "E",
                name: "Macro W",
                keyDown: function() {
                    myApp.autoW = true;
                    handleQuickW();
                },
                keyUp: function() {
                    myApp.autoW = false;
                },
                type: "NORMAL"
            },
            hk_quick_space: {
                defaultHotkey: "T",
                name: "Quick space",
                keyDown: function() {
                    if (!myApp.quickSpace) {
                        myApp.quickSpace = true;
                        quickSpace();
                    }
                },
                keyUp: function() {
                    myApp.quickSpace = false;
                },
                type: "NORMAL"
            },
            hk_double_space: {
                defaultHotkey: "G",
                name: "Double space",
                keyDown: function() {
                    if (!myApp.doubleSpace) {
                        myApp.doubleSpace = true;
                        doubleSpace();
                    }
                },
                keyUp: function() {
                    myApp.doubleSpace = false;
                },
                type: "NORMAL"
            },
            hk_stop_movement_toggle: {
                defaultHotkey: "",
                name: "Stop movement",
                keyDown: function() {
                    myApp.isStopMovement = !myApp.isStopMovement;
                    myApp.specTeammate = null;
                    $("#stopMovement").toggle();
                },
                type: "NORMAL"
            },
            hk_stop_movement: {
                defaultHotkey: "",
                name: "Stop movement for short moment",
                keyDown: function() {
                    myApp.isStopMovement = true;
                    myApp.specTeammate = null;
                    moveTo(null, null);
                },
                keyUp: function() {
                    myApp.isStopMovement = false;
                },
                type: "NORMAL"
            },
            hk_split_ind: {
                defaultHotkey: "I",
                name: "On/ off split indicator",
                keyDown: function() {
                    $("#opt_split_ind").click();
                },
                type: "NORMAL"
            },
            hk_lock_zoom: {
                defaultHotkey: "L",
                name: "On/ off auto zoom",
                keyDown: function() {
                    $("#opt_lock_zoom").click();
                },
                type: "NORMAL"
            },
            hk_attack_range: {
                defaultHotkey: "A",
                name: "Show attack range (Temporary)",
                keyDown: function() {
                    myApp.isEnableAttackRange = true;
                },
                keyUp: function() {
                    myApp.isEnableAttackRange = false;
                },
                type: "NORMAL"
            },
            hk_attack_range_toggle: {
                defaultHotkey: "ALT_A",
                name: "Show attack range (Toggle)",
                keyDown: function() {
                    myApp.isEnableAttackRange = !myApp.isEnableAttackRange;
                },
                type: "NORMAL"
            },
            hk_custom_skin: {
                defaultHotkey: "",
                name: "On/ off Custom skin",
                keyDown: function() {
                    $("#opt_custom_skin").click();
                },
                type: "NORMAL"
            },
            hk_same_food_color: {
                defaultHotkey: "",
                name: "On/ off Rainbow Food",
                keyDown: function() {
                    $("#opt_same_food_color").click();
                },
                type: "NORMAL"
            },
            hk_transparent_cell: {
                defaultHotkey: "",
                name: "On/ off transparent cell",
                keyDown: function() {
                    $("#opt_transparent_cell").click();
                },
                type: "NORMAL"
            },
            hk_fps: {
                defaultHotkey: "",
                name: "Show/ Hide FPS",
                keyDown: function() {
                    $("#opt_fps").click();
                },
                type: "NORMAL"
            },
            hk_name: {
                defaultHotkey: "ALT_N",
                name: "Show/ hide names",
                keyDown: function() {
                    $("#opt_name").click();
                },
                type: "NORMAL"
            },
            hk_self_name: {
                defaultHotkey: "",
                name: "Show/ hide own name",
                keyDown: function() {
                    $("#opt_self_name").click();
                },
                type: "NORMAL"
            },
            hk_color: {
                defaultHotkey: "",
                name: "Show/ hide colors",
                keyDown: function() {
                    $("#opt_color").click();
                },
                type: "NORMAL"
            },
            hk_mass: {
                defaultHotkey: "",
                name: "Show/ hide mass",
                keyDown: function() {
                    $("#opt_mass").click();
                },
                type: "NORMAL"
            },
            hk_stat: {
                defaultHotkey: "",
                name: "On/ off Skip stats",
                keyDown: function() {
                    $("#opt_stats").click();
                },
                type: "NORMAL"
            },
            hk_zoom: {
                defaultHotkey: "ALT_Z",
                name: "On/ off Zoom",
                keyDown: function() {
                    $("#opt_zoom").click();
                },
                type: "NORMAL"
            },
            hk_food: {
                defaultHotkey: "F",
                name: "Show/ hide Pellets",
                keyDown: function() {
                    $("#opt_food").click();
                },
                type: "NORMAL"
            },
            hk_gridline: {
                defaultHotkey: "ALT_G",
                name: "Show/ hide Gridline",
                keyDown: function() {
                    $("#opt_gridline").click();
                },
                type: "NORMAL"
            },
            hk_border: {
                defaultHotkey: "B",
                name: "Map Sectors",
                keyDown: function() {
                    $("#opt_mapgrid").click();
                },
                type: "NORMAL"
            },
            hk_simple_draw: {
                defaultHotkey: "",
                name: "On/ off Simple draw",
                keyDown: function() {
                    $("#opt_simple_drawing").click();
                },
                type: "NORMAL"
            },
            hk_score: {
                defaultHotkey: "",
                name: "Show/ hide Score",
                keyDown: function() {
                    $("#opt_score").click();
                },
                type: "NORMAL"
            },
            hk_ste: {
                defaultHotkey: "",
                name: "Show/ hide STE",
                keyDown: function() {
                    $("#opt_ste").click();
                },
                type: "NORMAL"
            },
            hk_n16: {
                defaultHotkey: "",
                name: "Show/ hide [n/16]",
                keyDown: function() {
                    $("#opt_ball_total").click();
                },
                type: "NORMAL"
            },
            hk_auto_hide_mass: {
                defaultHotkey: "",
                name: "On/ off Auto hide mass",
                keyDown: function() {
                    $("#opt_auto_hide_mass").click();
                },
                type: "NORMAL"
            },
            hk_auto_hide_name: {
                defaultHotkey: "",
                name: "On/ off Auto hide name",
                keyDown: function() {
                    $("#opt_auto_hide_name").click();
                },
                type: "NORMAL"
            },
            hk_show_text_stroke_line: {
                defaultHotkey: "",
                name: "Show/ hide Text shadow",
                keyDown: function() {
                    $("#opt_show_text_stroke_line").click();
                },
                type: "NORMAL"
            },
            hk_minimap: {
                defaultHotkey: "ALT_M",
                name: "Show/ hide Minimap",
                keyDown: function() {
                    $("#opt_minimap").click();
                },
                type: "NORMAL"
            },
            hk_mousew: {
                defaultHotkey: "",
                name: "On/ off Mouse W",
                keyDown: function() {
                    $("#opt_mousew").click();
                },
                type: "NORMAL"
            },
            hk_zoom_a: {
                defaultHotkey: "1",
                name: "Zoom level 1",
                keyDown: function() {
                    if (!myApp.isEnableLockZoom) {
                        hotkeyConfig.hk_lock_zoom.keyDown();
                    }
                    setZoomLevel(0.75);
                },
                type: "NORMAL"
            },
            hk_zoom_b: {
                defaultHotkey: "2",
                name: "Zoom level 2",
                keyDown: function() {
                    if (!myApp.isEnableLockZoom) {
                        hotkeyConfig.hk_lock_zoom.keyDown();
                    }
                    setZoomLevel(0.3);
                },
                type: "NORMAL"
            },
            hk_zoom_c: {
                defaultHotkey: "3",
                name: "Zoom level 3",
                keyDown: function() {
                    if (!myApp.isEnableLockZoom) {
                        hotkeyConfig.hk_lock_zoom.keyDown();
                    }
                    setZoomLevel(0.15);
                },
                type: "NORMAL"
            },
            hk_zoom_d: {
                defaultHotkey: "4",
                name: "Zoom level 4",
                keyDown: function() {
                    if (!myApp.isEnableLockZoom) {
                        hotkeyConfig.hk_lock_zoom.keyDown();
                    }
                    setZoomLevel(0.08);
                },
                type: "NORMAL"
            },
            hk_zoom_e: {
                defaultHotkey: "5",
                name: "Zoom level 5",
                keyDown: function() {
                    if (!myApp.isEnableLockZoom) {
                        hotkeyConfig.hk_lock_zoom.keyDown();
                    }
                    setZoomLevel(0.05);
                },
                type: "NORMAL"
            },
            hk_send_msg: {
                defaultHotkey: "ENTER",
                name: "Send Message",
                keyDown: function() {
                    chatRoom.enter();
                },
                type: "NORMAL"
            },
            hk_send_msg1: {
                defaultHotkey: "ALT_1",
                name: "Message 1",
                keyDown: function() {
                    console.log("CHAT MESSAGE");
                    chatRoom.sendMessage(chatCommand.input_hk_send_msg1);
                },
                type: "TEXT"
            },
            hk_send_msg2: {
                defaultHotkey: "ALT_2",
                name: "Message 2",
                keyDown: function() {
                    chatRoom.sendMessage(chatCommand.input_hk_send_msg2);
                },
                type: "TEXT"
            },
            hk_send_msg3: {
                defaultHotkey: "ALT_3",
                name: "Message 3",
                keyDown: function() {
                    chatRoom.sendMessage(chatCommand.input_hk_send_msg3);
                },
                type: "TEXT"
            },
            hk_send_msg4: {
                defaultHotkey: "ALT_4",
                name: "Message 4",
                keyDown: function() {
                    chatRoom.sendMessage(chatCommand.input_hk_send_msg4);
                },
                type: "TEXT"
            },
            hk_send_msg5: {
                defaultHotkey: "ALT_5",
                name: "Message 5",
                keyDown: function() {
                    chatRoom.sendMessage(chatCommand.input_hk_send_msg5);
                },
                type: "TEXT"
            },
            hk_send_msg6: {
                defaultHotkey: "ALT_6",
                name: "Message 6",
                keyDown: function() {
                    chatRoom.sendMessage(chatCommand.input_hk_send_msg6);
                },
                type: "TEXT"
            },
            hk_send_msg7: {
                defaultHotkey: "ALT_7",
                name: "Message 7",
                keyDown: function() {
                    chatRoom.sendMessage(chatCommand.input_hk_send_msg7);
                },
                type: "TEXT"
            },
            hk_send_msg8: {
                defaultHotkey: "ALT_8",
                name: "Message 8",
                keyDown: function() {
                    chatRoom.sendMessage(chatCommand.input_hk_send_msg8);
                },
                type: "TEXT"
            },
            hk_send_msg9: {
                defaultHotkey: "ALT_9",
                name: "Message 9",
                keyDown: function() {
                    chatRoom.sendMessage(chatCommand.input_hk_send_msg9);
                },
                type: "TEXT"
            },
            hk_send_msg10: {
                defaultHotkey: "ALT_0",
                name: "Message 10",
                keyDown: function() {
                    chatRoom.sendMessage(chatCommand.input_hk_send_msg10);
                },
                type: "TEXT"
            }
        };
    };
    this.createMessageDialog = function() {
        var $message;
        var $text;
        $text = $("<div class='modal-footer'>");
        $text.append("<button type='button' class='btn btn-default' data-dismiss='modal'>OK</button>");
        $message = $("<div class='modal-content'/>");
        $message.append($("<div class='modal-header'/>").append("<button type='button' class='close' data-dismiss='modal'>&times;</button><h4 id='message_dialog_title' class='modal-title'></h4>"));
        $message.append($("<div id='message_dialog_content' class='modal-body'>"));
        $message.append($text);
        $message = $("<div id='message_dialog' class='modal fade' role='dialog'/>").append("<div class='modal-dialog'/>").append($message);
        $("body").append($message);
        $("#message_dialog").modal({
            backdrop: "static",
            keyboard: false
        });
        $(document).on("shown.bs.modal", "#message_dialog", function() {
            var a = $("#message_dialog>.modal-content").outerHeight();
            var b = $(document).outerHeight();
            if (a > b) {
                $("#message_dialog").css("overflow", "auto");
            } else {
                $("#message_dialog").css("margin-top", b / 2 - a / 2 - 40);
            }
        });
        $(document).on("hide.bs.modal", "#message_dialog", function() {});
    };
    this.setUpHotKeyConfigPage = function() {
        var body;
        var $rootElement;
        $rootElement = $('<div class="modal-footer" style="background: #222;">');
        $rootElement.append("<button onclick='resetDefaultHotkey();' type='button' class='btn btn-resetkey'>Reset to Default</button>");
        $rootElement.append("<button type='button' class='btn btn-cancelhotkey' data-dismiss='modal'>Cancel</button>");
        $rootElement.append("<button id='btn_save_hotkey' onclick='saveHotkeys();' type='button' class='btn btn-savehotkey' data-dismiss='modal'>Save</button>");
        body = $("<div class='modal-content' style='background: #222;'/>");
        body.append($("<div class='modal-header'/>").append("<button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>Hotkey Setup</h4>"));
        body.append($("<div id='hotkey_modal_body' class='modal-body'>").append(myApp.getHotkeyDivHtml()));
        body.append($rootElement);
        body = $("<div id='hotkeys_setting' class='modal fade' role='dialog'/>").append("<div class='modal-dialog'/>").append(body);
        $("body").append(body);
        $(document).on("hide.bs.modal", "#hotkeys_setting", function() {
            if (selectedHotkeyRow) {
                selectedHotkeyRow.removeClass("table-row-selected");
            }
            selectedHotkeyRow = null;
            myApp.refreshHotkeySettingPage();
        });
        $("#hotkey_table .row").not(".header").click(function() {
            if (selectedHotkeyRow) {
                selectedHotkeyRow.removeClass("table-row-selected");
            }
            selectedHotkeyRow = $(this);
            selectedHotkeyRow.addClass("table-row-selected");
        });
    };
    window.saveHotkeys = function() {
        var codeSegments = $(".hotkey");
        hotkeyMapping = {};
        var i = 0;
        for (; i < codeSegments.length; i++) {
            hotkeyMapping[$(codeSegments[i]).text()] = $(codeSegments[i]).attr("data-hotkeyid");
        }
        setLocalStorage("hotkeyMapping", hotkeyMapping);
        var guid;
        for (guid in chatCommand) {
            chatCommand[guid] = $("#" + guid).val();
        }
        setLocalStorage("chatCommand", chatCommand);
    };
    this.copyGameInfo = function() {
        var failuresLink;
        failuresLink = "Current IP = " + myApp.getCurrentIP();
        failuresLink += "\nRegion : " + $("#region option:selected").text().split(" ")[0];
        failuresLink += "\nGame mode : " + $("#gamemode option:selected").text();
        failuresLink += "\nParty Code : " + myApp.getCurrentPartyCode();
        var codeSegments = myApp.getLeaderBoard();
        if (codeSegments && 0 != codeSegments.length) {
            var i = 0;
            for (; i < codeSegments.length; i++) {
                failuresLink += "\n" + (i + 1) + ".  " + codeSegments[i];
            }
        }
        copyToClipboard(failuresLink);
    };
    window.resetDefaultHotkey = function() {
        var e;
        e = hotkeyMapping;
        defaultHotkeyMapping = {};
        var unlock;
        for (unlock in hotkeyConfig) {
            if (hotkeyConfig[unlock].defaultHotkey) {
                if ("" != hotkeyConfig[unlock].defaultHotkey) {
                    defaultHotkeyMapping[hotkeyConfig[unlock].defaultHotkey] = unlock;
                }
            }
        }
        hotkeyMapping = defaultHotkeyMapping;
        myApp.refreshHotkeySettingPage();
        hotkeyMapping = e;
        defaultHotkeyMapping = null;
        var val;
        for (val in defaultHotkeyMessageSend) {
            $("#" + val).val(defaultHotkeyMessageSend[val]);
        }
    };
    this.refreshHotkeySettingPage = function() {
        var codeSegments = $(".hotkey");
        var i = 0;
        for (; i < codeSegments.length; i++) {
            $(codeSegments[i]).text(" ");
        }
        var version;
        for (version in hotkeyMapping) {
            $("[data-hotkeyid=" + hotkeyMapping[version] + "]").text(version);
        }
        var val;
        for (val in chatCommand) {
            $("#" + val).val(chatCommand[val]);
        }
    };
    this.getHotkeyDivHtml = function() {
        var html = "";
        var fragment = $("<div id='hotkey_setting'></div>");
        var rendered = $("<div id='hotkey_table' class='table'></div>");
        var $message = $("<div class='row header'></div>");
        $message.append($("<div class='cell' style='width:30%;'>Hotkey</div>"));
        $message.append($("<div class='cell' style='width:33%;'>Function</div>"));
        $message.append($("<div class='cell' style='widht:40%;'>Message</div>"));
        rendered.append($message);
        $message = null;
        var type;
        for (type in hotkeyConfig) {
            $message = $("<div class='row'></div>");
            $message.append($("<div data-hotkeyId='" + type + "' class='cell hotkey'>" + getHotkeyById(type) + "</div>"));
            $message.append($("<div class='cell'>" + hotkeyConfig[type].name + "</div>"));
            if ("TEXT" == hotkeyConfig[type].type) {
                $message.append($("<div class='cell'><input class='duex-input' id='input_" + type + "' maxlength='200' style='width:100%;' type='text' value='" + chatCommand["input_" + type] + "'></input></div>"));
            } else {
                $message.append($("<div class='cell'> / </div>"));
            }
            rendered.append($message);
        }
        return fragment.append(rendered), html += $("<p>Step 1: Click on the function item</p>")[0].outerHTML, html += $("<p>Step 2: Press wanted hotkey to modify</p>")[0].outerHTML, html += $("<p>Press [DEL] key to remove selected hotkey</p>")[0].outerHTML, html += $("<p>Allowed hotkey combinations: [CTRL] + [ALT] + 0-9, a-z, [TAB], [ENTER]</p>")[0].outerHTML, html += $("<br></br>")[0].outerHTML, html += fragment[0].outerHTML, $("<div/>").append(html).html();
    };
    this.setupHintsImpl = function(node, newValue) {
        node.addClass("hint--bottom hint--rounded");
        node.attr("data-hint", newValue);
    };
    this.ajax = function(url, options, callback, uri) {
        uri = null;
        var request;
        try {
            request = new XMLHttpRequest;
        } catch (a) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (s) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (l) {
                    return alert("Your browser does not support Ajax."), false;
                }
            }
        }
        return request.onreadystatechange = function() {
            if (4 == request.readyState) {
                callback(request);
            }
        }, request.open(options, url, true), request.send(uri), request;
    };
    this.getSkinImage = function(t) {
        return t && "" != t ? customSkin[t] ? customSkin[t] : (-1 == skinDownloadQueue.indexOf(t) && skinDownloadQueue.push(t), null) : null;
    };
    this.downloadSkin = function() {
        if (0 != skinDownloadQueue.length) {
            var task = skinDownloadQueue.shift();
            if (!customSkin[task]) {
                if (skinDownloadFail[task] && 5 < skinDownloadFail[task]) {
                    myApp.getCustomSkinUrl();
                } else {
                    window.postMessage({
                        action: Action.IMAGE,
                        data: task
                    }, "*");
                }
            }
        }
        setTimeout(myApp.downloadSkin, 2E3);
    };
    this.changePreviewImage = function(url) {};
}
window.exec = function(command) {
    chatRoom.sendMessageToServer(command);
}

function ChatRoom() {
    this.container = "";
    this.isShow = true;
    this.lastMsg = "";
    this.width = 340;
    this.height = 350;
    var _this = this;
    var t = 0;
    this.sendMessageToServer = function(message) {
        message = message.trim();
        if ((message.length < 200) && (message.length > 0)) {
            if (message.charAt(0) == "/") {
                var view = new DataView(new ArrayBuffer(2 + 2 * message.length));
                var offset = 0;
                view.setUint8(offset++, 99);
                view.setUint8(offset++, 0);
                for (var i = 0; i < message.length; ++i) {
                    view.setUint16(offset, message.charCodeAt(i), true);
                    offset += 2
                };
                window.webSocket.send(view)
            }
        }
    };
    this.createEmoticonsBox = function() {
        $("#overlays2").append('<div id="emoticons-box"></div>');
        for (var emoticon in duexObj.emoticons) {
            $("#emoticons-box").append('<button class="emo" value="' + emoticon + '"><img src="' + duexObj.emoticons[emoticon] + '" /></button>');
        }
        $(".emo").each(function() {
            $(this).on("click", function() {
                var value = $(this).attr("value");
                var chatInput = $("#input_box2");
                var message = chatInput.val();
                chatInput.val(message + " " + value + " ");
                chatInput.focus();
            });
        });
    };
    this.createChatBox = function() {
        $(this.container).append("<div id='chatroom'></div>");
        $("#overlays2").append("<div id='chatboxArea2'><input id='input_box2' type='text' placeholder='Type your message'></input></div>");
        this.hide();
        $("#chatboxArea2").fadeOut();
        $("#chatroom").mouseup(function() {
            _this.resize();
        });
    };
    _this.resize = function() {
        if ($("#chatroom").width() != this.width || $("#chatroom").height() != this.height) {
            if ($("#chatroom").perfectScrollbar) {
                $("#chatroom").perfectScrollbar("update");
            }
        }
    };
    this.setContainer = function(container) {
        this.container = container;
    };
    this.sendMessage = function(msg) {
        if (msg.charAt(0) == '/') {
            window.exec(msg);
        } else if (msg = msg.trim()) {
            if (!(2E3 > Date.now() - t && 50 > msg.length)) {
                conn.sendMessage({
                    sender: myApp.getName(),
                    msg: msg,
                    id: FB.getUserID(),
                    tag: myApp.getTeamName()
                });
                mensaje = msg;
                if ((mensaje.length < 400) && (mensaje.length > 0) && window.webSocket) {
                    var buf = new DataView(new ArrayBuffer(2 + 2 * mensaje.length));
                    var offset = 0;
                    buf.setUint8(offset++, 99);
                    buf.setUint8(offset++, 0);
                    for (var words = 0; words < mensaje.length; ++words) {
                        buf.setUint16(offset, mensaje.charCodeAt(words), true);
                        offset += 2
                    };
                    window.webSocket.send(buf)
                }
                this.lastMsg = msg;
                t = Date.now();
            }
        }
    };
    this.enter = function() {
        if (this.isFocus()) {
            this.sendMessage($("#input_box2").val());
            $("#input_box2").val("");
            $("#input_box2").blur();
            $("#chatboxArea2").fadeOut();
            $("#emoticons-box").fadeOut();
        } else {
            this.focus();
            $("#emoticons-box").fadeIn();
        }
    };
    this.popup = function(callback) {
        if (myApp.isEnableChatpopup) {
            if (!this.isShow) {
                if ($.toast) {
                    $.toast(callback);
                } else {
                    toastQueue.push(callback);
                }
            }
        }
    };
    this.popupInfo = function(text) {
        this.popup({
            text: escapeHtml(text),
            showHideTransition: "slide",
            icon: "info",
            bgColor: "rgba(10, 10, 10, 0.8)",
            allowToastClose: false,
            hideAfter: 15E3,
            stack: 10
        });
    };
    this.popupWarning = function(text) {
        this.popup({
            text: escapeHtml(text),
            showHideTransition: "slide",
            icon: "warning",
            bgColor: "rgba(10, 10, 10, 0.8)",
            allowToastClose: false,
            hideAfter: 15E3,
            stack: 10
        });
    };
    this.popupChat = function(data, msg, color, extra) {
        var html = escapeHtml(data);
        var replaceHKGIcon = this.replaceHKGIcon(escapeHtml(msg));
        var chageColorToast = $("#toastbackground").minicolors("value");
        var nick = html;
        this.popup({
//            heading: '<span class="toast_sender" style="color:' + color + '">' + nick + ': </span>',
            heading: '<span class="toast_sender" >' + extra + '</span>',// k pdo y el style color? :´v?
            text: '<span class="toast_chatmsg">' + replaceHKGIcon + "</span>",
            showHideTransition: "fade",
            bgColor: chageColorToast,
            allowToastClose: false,
            hideAfter: 15E3,
            stack: 10
        });
    };
    this.showSystemMessage = function(m1) {
        this.showSystemMessageImpl(m1);
        this.popupInfo(m1);
    };
    this.showSystemWarning = function(m1) {
        this.showSystemMessageImpl(m1);
        this.popupWarning(m1);
    };
    this.showSystemMessageImpl = function(num) {
        if (myApp.showSystemMessage()) {
            $("#chatroom").append($("<div/>").append($("<span class='system'/>").text(this.getTimeStr() + num)));
            this.scrollDown();
        }
    };
    this.getTimeStr = function() {
        var now = new Date;
        var index = now.getMinutes();
        return index = 10 > index ? "0" + index : index, now.getHours() + ":" + index + " ";
    };

    this.receiveWebSocketMessage = function(nick, message, color, extras) {
        if (extras.team === $("#team_name").val() || extras.isSystem) {
            function getCorrectColor(lvl) {
                if (lvl >= 0 && 9 <= lvl) {
                    return "#ff3a83";
                } else if (lvl >= 10 && 19 <= lvl) {
                    return "#3a92ff";
                } else if (lvl >= 20 && 29 <= lvl) {
                    return "#3affdb";
                } else if (lvl >= 30 && 39 <= lvl) {
                    return "#3aff52";
                } else if (lvl >= 40 && 49 <= lvl) {
                    return "#ff3af9";
                } else if (lvl >= 50 && 59 <= lvl) {
                    return "#ffe73a";
                } else if (lvl >= 60 && 69 <= lvl) {
                    return "#ff553a";
                } else if (lvl >= 70 && 79 <= lvl) {
                    return "#6a3aff";
                } else if (lvl >= 80 && 89 <= lvl) {
                    return "#7d788d";
                } else if (lvl >= 90 && 99 <= lvl) {
                    return "#fac2f3";
                } else if (lvl >= 100 && 109 <= lvl) {
                    return "#637634";
                } else if (lvl >= 110) {
                    return "#a7643d";
                }
            }
            var tabContent = $("<div/>");
            var size;
            if (nick == '') nick = "Unnamed";
            if(!extras.isSystem) {
                colorStyle = style="style='color: " + color + ";'";
                if(extras.rainbow)
                    colorStyle =  "class='rainbowColor'";
                if(extras.log) {
                    var img = myApp.getRankFromObject(extras.rc);
                    if (img !== "") {
                        size = $("<img style='width: 16px;margin-right: 5px;' src='"+img+"'><span class='levelx' style='color: " + getCorrectColor(extras.level) + ";'>[Lvl. " + extras.level + "] </span><span " + colorStyle + ">" + nick + ": </span>");
                        size2 = "<img style='width: 16px;margin-right: 5px;' src='"+img+"'><span class='levelx' style='color: " + getCorrectColor(extras.level) + ";'>[Lvl. " + extras.level + "] </span><span " + colorStyle + ">" + nick + ": </span>";
                    } else {
                        size = $("<img style='width: 16px;margin-right: 5px;' src='"+duexObj.chat.isLogged+"'><span class='levelx' style='color: " + getCorrectColor(extras.level) + ";'>[Lvl. " + extras.level + "] </span><span " + colorStyle + ">" + nick + ": </span>");
                        size2 = "<img style='width: 16px;margin-right: 5px;' src='"+duexObj.chat.isLogged+"'><span class='levelx' style='color: " + getCorrectColor(extras.level) + ";'>[Lvl. " + extras.level + "] </span><span " + colorStyle + ">" + nick + ": </span>";
                    }
                } else {
                    size = $("<img style='width: 16px;margin-right: 5px;' src='"+duexObj.chat.isQuest+"'><span class='levelx' style='color: " + getCorrectColor(extras.level) + ";'>[GUEST] </span><span " + colorStyle + ">" + nick + ": </span>");
                    size2 = "<img style='width: 16px;margin-right: 5px;' src='"+duexObj.chat.isQuest+"'><span class='levelx' style='color: " + getCorrectColor(extras.level) + ";'>[GUEST] </span><span " + colorStyle + ">" + nick + ": </span>";
                }
            } else {
                size = $("<span class='servermsg' style='color: " + color + ";'></span>").text("[SERVER]: ");
                size2 = "<span class='servermsg' style='color: " + color + ";'>[SERVER]: </span>";
            }
            tabContent.append(size);
            errors = $("<span class='msg'>").text(message);
            errors.html(this.replaceHKGIcon(errors.html()));
            tabContent.append(errors);
            $("#chatroom").append(tabContent);
            this.scrollDown();
            this.popupChat(nick, message, color, size2);
        }
    };

    this.receiveMessage = function(data) { // :v
        function getCorrectColor(lvl) {
            if (lvl >= 0 && 9 <= lvl) {
                return "#ff3a83";
            } else if (lvl >= 10 && 19 <= lvl) {
                return "#3a92ff";
            } else if (lvl >= 20 && 29 <= lvl) {
                return "#3affdb";
            } else if (lvl >= 30 && 39 <= lvl) {
                return "#3aff52";
            } else if (lvl >= 40 && 49 <= lvl) {
                return "#ff3af9";
            } else if (lvl >= 50 && 59 <= lvl) {
                return "#ffe73a";
            } else if (lvl >= 60 && 69 <= lvl) {
                return "#ff553a";
            } else if (lvl >= 70 && 79 <= lvl) {
                return "#6a3aff";
            } else if (lvl >= 80 && 89 <= lvl) {
                return "#7d788d";
            } else if (lvl >= 90 && 99 <= lvl) {
                return "#fac2f3";
            } else if (lvl >= 100 && 109 <= lvl) {
                return "#637634";
            } else if (lvl >= 110) {
                return "#a7643d";
            }
        }

        if (data.tag === $("#team_name").val()) {
            var color;
            var tabContent = $("<div/>");
            var size;
            if (data.rank === "owner") {
                color = "red";
                size = $("<img style='width: 16px;margin-right: 5px;' src='https://i.imgur.com/0Dy1ad3.png'><span class='levelx' style='color: " + getCorrectColor(data.lvl) + ";'>[Lvl. " + data.lvl + "] </span><span style='color: " + color + ";'>" + data.sender + ": </span>");
            } else if (data.rank === "developer") {
                color = "purple";
                size = $("<img style='width: 16px;margin-right: 5px;' src='https://i.imgur.com/76pr6yT.png'><span class='levelx' style='color: " + getCorrectColor(data.lvl) + ";'>[Lvl. " + data.lvl + "] </span><span style='color: " + color + ";'>" + data.sender + ": </span>");
            } else {
                color = "white";
                size = $("<span class='levelx' style='color: " + getCorrectColor(data.lvl) + ";'></span>").text("[Lvl. " + data.lvl + "] " + data.sender + ": ");
            }
            if (data.sender == '') data.sender = "Unnamed";
            tabContent.append(size);
            errors = $("<span class='msg'>").text(data.msg);
            errors.html(this.replaceHKGIcon(errors.html()));
            tabContent.append(errors);
            $("#chatroom").append(tabContent);
            this.scrollDown();
            this.popupChat(data.sender, data.msg, color);
        }
    };
    this.replaceHKGIcon = function(xhtml) {
        for (var emoticon in duexObj.emoticons) {
            var rg = new RegExp(emoticon, "g");
            xhtml = xhtml.replace(rg, '<img class="chat-emoticon" src="' + duexObj.emoticons[emoticon] + '" />');
        }
        return xhtml;
    };
    this.scrollDown = function() {
        if ($("#chatroom").perfectScrollbar) {
            $("#chatroom").scrollTop($("#chatroom").prop("scrollHeight"));
            $("#chatroom").perfectScrollbar("update");
        }
    };
    this.show = function() {
        $("#chatroom").show();
        this.isShow = true;
        this.scrollDown();
    };
    this.hide = function() {
        $("#chatroom").hide();
        this.isShow = false;
    };
    this.isFocus = function() {
        return $("#input_box2").is(":focus");
    };
    this.focus = function() {
        $("#chatboxArea2").fadeIn();
        $("#input_box2").focus();
    };
    this.createScrollBar = function() {
        $("#chatroom").perfectScrollbar({
            minScrollbarLength: 50,
            suppressScrollX: false
        });
    };
}

function Minimap() {
    var canvas;
    var ctx;
    var options;
    var context;
    var w = 200;
    var h = 200;
    var s = false;
    var v = {};
    this.createMap = function(s) {
        if (s) {
            w = h = s;
        }
        $("body").append("<canvas id='minimapNode'>");
        $("body").append("<canvas id='minimap' >");
        canvas = document.getElementById("minimap");
        ctx = canvas.getContext("2d");
        canvas.width = w;
        canvas.height = h;
        ctx.scale(1, 1);
        ctx.strokeStyle = "#333";
        ctx.fillStyle = "#000000";
        ctx.globalAlpha = 0;
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = 0.2;
        ctx.font = "11px Verdana";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("A1", w / 5 / 2, h / 5 / 2);
        ctx.fillText("A2", w / 5 / 2 * 3, h / 5 / 2);
        ctx.fillText("A3", w / 5 / 2 * 5, h / 5 / 2);
        ctx.fillText("A4", w / 5 / 2 * 7, h / 5 / 2);
        ctx.fillText("A5", w / 5 / 2 * 9, h / 5 / 2);
        ctx.fillText("B1", w / 5 / 2, h / 5 / 2 * 3);
        ctx.fillText("B2", w / 5 / 2 * 3, h / 5 / 2 * 3);
        ctx.fillText("B3", w / 5 / 2 * 5, h / 5 / 2 * 3);
        ctx.fillText("B4", w / 5 / 2 * 7, h / 5 / 2 * 3);
        ctx.fillText("B5", w / 5 / 2 * 9, h / 5 / 2 * 3);
        ctx.fillText("C1", w / 5 / 2, h / 5 / 2 * 5);
        ctx.fillText("C2", w / 5 / 2 * 3, h / 5 / 2 * 5);
        ctx.fillText("C3", w / 5 / 2 * 5, h / 5 / 2 * 5);
        ctx.fillText("C4", w / 5 / 2 * 7, h / 5 / 2 * 5);
        ctx.fillText("C5", w / 5 / 2 * 9, h / 5 / 2 * 5);
        ctx.fillText("D1", w / 5 / 2, h / 5 / 2 * 7);
        ctx.fillText("D2", w / 5 / 2 * 3, h / 5 / 2 * 7);
        ctx.fillText("D3", w / 5 / 2 * 5, h / 5 / 2 * 7);
        ctx.fillText("D4", w / 5 / 2 * 7, h / 5 / 2 * 7);
        ctx.fillText("D5", w / 5 / 2 * 9, h / 5 / 2 * 7);
        ctx.fillText("E1", w / 5 / 2, h / 5 / 2 * 9);
        ctx.fillText("E2", w / 5 / 2 * 3, h / 5 / 2 * 9);
        ctx.fillText("E3", w / 5 / 2 * 5, h / 5 / 2 * 9);
        ctx.fillText("E4", w / 5 / 2 * 7, h / 5 / 2 * 9);
        ctx.fillText("E5", w / 5 / 2 * 9, h / 5 / 2 * 9);
        options = document.getElementById("minimapNode");
        context = options.getContext("2d");
        options.width = s;
        options.height = s;
        context.globalAlpha = 1;
        context.scale(1, 1);
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "10px Ubuntu";
        this.hide();
        setInterval(function() {
            minimap.drawNodes();
        }, 1E3 / 30);
    };
    //this.teamList = function(/*url, name*/) {
        //var countTeamList = 0;
        //if(socket.on("playerEntered", function(data) {
            //$("#top5").append('<span id="xplayer">' + countTeamList + '. <img class="team-skin" src="' + data.url + '"> [' + data.mass + '] ' + data.displayName + '</span>');            
        //}));
    //};
    this.uploadSelfPosition = function() {
        if (getCurrentX() && getCurrentY()) {
            s = true;
            conn.uploadCoords({
                x: getCurrentX(),
                y: getCurrentY()
            });
        } else {
            if (s) {
                conn.uploadCoords({
                    x: getCurrentX(),
                    y: getCurrentY()
                });
                s = false;
            }
        }
    };
    this.isExists = function(dataAndEvents) {
        var i = 0;
        for (; i < nodeList.length; i++) {
            if (dataAndEvents == nodeList[i][0]) {
                return i;
            }
        }
        return null;
    };
    this.updateNode = function(obj) {
        var i;
        var node = obj.id;
        var l = obj.x;
        var lat = obj.y;
        var entityName = obj.name;
        if (i = this.isExists(node)) {
            CustomNodes.push({nick: entityName, mass: obj.mass, me: false});
            nodeList[i][14] = obj.mass;
            nodeList[i][1] = entityName;
            nodeList[i][2] = l;
            nodeList[i][3] = lat;
            nodeList[i][7] = true;
            nodeList[i][4] = $("#minimapTeamColor").minicolors("value");
            nodeList[i][8] = Date.now();
            if (!(nodeList[i][12] && nodeList[i][13])) {
                nodeList[i][12] = l;
                nodeList[i][13] = lat;
            }
        } else {
            CustomNodes = [];
            nodeList[nodeList.length] = [node, entityName, null, null, $("#minimapTeamColor").minicolors("value"), null, null];
        }
    };
    this.addNode = function(mode) {
        nodeList[nodeList.length] = [mode.id, mode.name, null, null, nodeColor, mode.skinurl, mode.cellColor];
    };
    this.deleteNode = function(el) {};
    this.drawNodes = function() {
        var max = getLengthX();
        var s = getLengthY();
        context.clearRect(0, 0, options.width, options.height);
        var a = getCurrentX();
        var b = getCurrentY();
        if (a) {
            if (b) {
                v.x = nodeList[0][2];
                v.y = nodeList[0][3];
            }
        }
        nodeList[0][10] = myApp.getCurrentMass();
        nodeList[0][2] = a;
        nodeList[0][3] = b;
        nodeList[0][12] = a;
        nodeList[0][13] = b;
        if (myApp.isSpectating) {
            nodeList[1][2] = getTop1X();
            nodeList[1][3] = getTop1Y();
            nodeList[1][12] = getTop1X();
            nodeList[1][13] = getTop1Y();
        }
        var i = 0;
        for (; i < nodeList.length; i++) {
            if (nodeList[i][2] && (nodeList[i][3] && (nodeList[i][12] && (nodeList[i][13] && "del" != nodeList[i][0])))) {
                var x;
                var y;
                var radius;
                radius = 1 == i ? 7 : 5;
                nodeList[i][2] = ~~nodeList[i][2];
                nodeList[i][3] = ~~nodeList[i][3];
                nodeList[i][12] = ~~nodeList[i][12];
                nodeList[i][13] = ~~nodeList[i][13];
                nodeList[i][12] += (max / 2 + nodeList[i][2] - (max / 2 + nodeList[i][12])) / 30;
                nodeList[i][13] += (s / 2 + nodeList[i][3] - (s / 2 + nodeList[i][13])) / 30;
                x = (max / 2 + nodeList[i][12]) / max * w;
                y = (s / 2 + nodeList[i][13]) / s * h;
                context.beginPath();
                context.arc(x, y, radius, 0, 2 * Math.PI, false);
                // Pinta la célula en el minimapa
                context.fillStyle = 1 > i ? $("#minimapOwnCell").minicolors("value") : nodeList[i][4];
                context.strokeStyle = "rgba(0, 0, 0, 0)";
                context.lineWidth = 1;
                context.fill();
                context.stroke();
                if (i > 1) {
                    context.fillStyle = $("#minimapNames").minicolors("value");
                    context.fillText(nodeList[i][1], x, y - 10);
                    //this.teamList();
                }
            }
        }
        if (v.x) {
            if (v.y) {
                if (!(a && b)) {
                    x = (max / 2 + v.x) / max * w;
                    y = (s / 2 + v.y) / s * h;
                    context.beginPath();
                    context.moveTo(x - 3, y - 3);
                    context.lineTo(x + 3, y + 3);
                    context.moveTo(x + 3, y - 3);
                    context.lineTo(x - 3, y + 3);
                    context.stroke();
                    context.lineWidth = 1;
                    context.strokeStyle = $("#minimapLastDeath").minicolors("value");
                    context.stroke();
                }
            }
        }
    };
    this.hide = function() {
        $("#minimap").hide();
        $("#minimapNode").hide();
    };
    this.show = function() {
        $("#minimap").show();
        $("#minimapNode").show();
    };
    this.setDeadPosition = function(r) {
        v = r ? r : {};
    };
}

function Connection() {
    var msg;
    var self = this;
    self.connect = function() {
        socket = io("na.duex.sly.io:8081", {
            transports: ["websocket"]
        });
        socket.on("updateCoords", function(walkers) {
            minimap.updateNode(walkers);
        });
    };
    self.emit = function(name, data) {
        socket.emit(name, data);
    };
    self.joinRoom = function(value) {
        if (msg) {
            self.leaveRoom(msg);
        }
        if ("" != $(".partyToken").val()) {
            self.emit("joinRoom", {
                p: value,
                a: 1
            });
            msg = value;
        }
    };
    self.leaveRoom = function(er) {
        self.emit("leaveRoom", er);
    };
    self.uploadCoords = function(data) {
        data.name = myApp.getName();
        data.mass = myApp.getCurrentMass();
        data.serverAddress = myApp.getCurrentPartyCode();
        data.timeStamp = Date.now();
        data.socketRoom = msg;
        self.emit("coords", data);
    };
    self.sendMessage = function(message) {
        message.socketRoom = msg;
        if ("" != $(".partyToken").val()) {
            self.emit("sendMessage", message);
        }
    };
}

function isValidHotKey(e) {
    return 48 <= e.keyCode && 57 >= e.keyCode || (65 <= e.keyCode && 90 >= e.keyCode || (9 == e.keyCode || 13 == e.keyCode || e.keyCode == 192)) ? true : false;
}

function getPressedKey(e) {
    var optsData = "";
    return e.ctrlKey && (optsData += "CTRL_"), e.altKey && (optsData += "ALT_"), optsData = 9 == e.keyCode ? optsData + "TAB" : 13 == e.keyCode ? optsData + "ENTER" : 192 == e.keyCode ? optsData + "~" : optsData + String.fromCharCode(e.keyCode);
}

function getHotkeyById(keepData) {
    var unlock;
    for (unlock in hotkeyMapping) {
        if (hotkeyMapping[unlock] == keepData) {
            return unlock;
        }
    }
    return "";
}

function copyToClipboard(el) {
    window.postMessage({
        action: Action.COPY,
        data: el
    }, "*");
}

function escapeRegex(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "$&");
}

function drawMinimapNodes() {
    minimap.uploadSelfPosition();
    setTimeout(drawMinimapNodes, 1E3);
}

function updateGameInfoDiv() {
    if ($("#overlays").is(":visible")) {
        myApp.updateLBInfo();
    }
    setTimeout(updateGameInfoDiv, 1E3);
}

function clearOldNodesData() {
    var i = 1;
    for (; i < nodeList.length; i++) {
        var t = nodeList[i][8];
        if (t) {
            if (5E3 < Date.now() - t) {
                if (2 > i) {
                    nodeList[i][2] = null;
                    nodeList[i][3] = null;
                } else {
                    CustomNodes = [];
                    nodeList[i][0] = "del";
                }
            }
        }
    }
    setTimeout(clearOldNodesData, 5E3);
}
function getRandomRGBColor() {
    var colors = ["red", "orange", "yellow", "lime", "green", "aquamarine", "cyan", "cornflowerblue", "blue", "blueviolet", "magenta", "fuchsia"];
    var color = colors[Math.floor(Math.random() * colors.length)];
    return color;
}
function updateLbDiv() {
    if ($("#div_lb").is(":visible")) {
        var apps = getLB();
        var codeSegments = getSelfIDs();
        var str = "";
        if (apps) {
            var a = 0;
            for (; a < apps.length; a++) {
                var left = false;
                i = apps[a].name ? escapeHtml(apps[a].name) : "Unnamed";
                var color = '#ffffff';
                var extra = "<img style='width: 16px;margin-right: 5px;' src='"+myApp.getRankFromObject(apps[a].rc)+"'>";
                if (apps[a].color && apps[a].color != "#ffffff") {
                    color = apps[a].color;
                }
                if(apps[a].rainbow) str = str + '<div style=\'color:' + getRandomRGBColor() + '\'>';
                else str = str + '<div style=\'color:' + color + '\'>';
                str = left ? str + "<div class='self'>" : str + "<div>";
                str += extra + (a+1) + ". " + i + "</div>";
            }
        }
        document.getElementById("lb_detail").innerHTML = str;
    }
    setTimeout(updateLbDiv, 1E3);
}

function updateScoreDiv() {
    var message = getHighestScore();
    var json = getCell();
    var string = [];
    if (0 != message) {
        if (myApp.isShowScroll) {
            string.push("Score: " + ~~(message / 100));
        }
        if (json) {
            if (0 < json.length) {
                if (myApp.isShowSTE) {
                    message = myApp.getSTE(json);
                    string.push("STE: " + message);
                }
                if (myApp.isShowBallTotal) {
                    string.push("[" + json.length + "/" + playerMaxCells + "]");
                }
            }
        }
    }
    if (myApp.isShowFPS) {
        json = getFPS();
        if (myApp.isFPSx2) {
            if (100 >= json) {
                json += 16;
            } else {
                if (90 >= json) {
                    json += 20;
                } else {
                    if (80 >= json) {
                        json += 30;
                    }
                }
            }
        } else {
            if (50 >= json) {
                json += 8;
            } else {
                if (45 >= json) {
                    json += 10;
                } else {
                    if (40 >= json) {
                        json += 15;
                    }
                }
            }
        }
        string.push("FPS: " + json);
    }
    if (isFreeSpec()) {
        if (myApp.specTeammate) {
            if (myApp.isStopMovement) {
                if (nodeList[myApp.specTeammate]) {
                    string.push("SPEC: " + nodeList[myApp.specTeammate][1]);
                }
            }
        }
    }
    if (0 < string.length) {
        if (!$("#div_score").is(":visible")) {
            $("#div_score").show();
        }
        document.getElementById("div_score").innerHTML = string.join("&nbsp;&nbsp;&nbsp;").trim();
    } else {
        $("#div_score").hide();
    }
    setTimeout(updateScoreDiv, 500);
}
var testingVal = 29;//29 antes de antes era 6 xd
var testingCount = 0;
var testingInd = false;
var spectateMode;
var myApp;
var nodeList = [];
var CustomNodes = [];
var chatRoom = null;
var minimap = null;
var socket = null;
var currentIP = "";
var teamname = "HKG";
var defaultTeamname = "HKG";
var socketRetryInterval;
var isSocketReady = false;
var isChangeName = false;
var conn = null;
var reconnectCount = 0;
var updateLBCount = 0;
var tmpTeamname = "";
var defaultImage = new Image;
defaultImage.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4yLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTI1Niw0OEMxNDEuMSw0OCw0OCwxNDEuMSw0OCwyNTZzOTMuMSwyMDgsMjA4LDIwOGMxMTQuOSwwLDIwOC05My4xLDIwOC0yMDhTMzcwLjksNDgsMjU2LDQ4eiBNMjU2LDQ0Ni43DQoJCQljLTEwNS4xLDAtMTkwLjctODUuNS0xOTAuNy0xOTAuN2MwLTEwNS4xLDg1LjUtMTkwLjcsMTkwLjctMTkwLjdjMTA1LjEsMCwxOTAuNyw4NS41LDE5MC43LDE5MC43DQoJCQlDNDQ2LjcsMzYxLjEsMzYxLjEsNDQ2LjcsMjU2LDQ0Ni43eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjU2LDk2Yy04OC40LDAtMTYwLDcxLjYtMTYwLDE2MGMwLDg4LjQsNzEuNiwxNjAsMTYwLDE2MGM4OC40LDAsMTYwLTcxLjYsMTYwLTE2MEM0MTYsMTY3LjYsMzQ0LjQsOTYsMjU2LDk2eiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K";
var customSkin = {
    "http://www.as.com/skins/585cusc.png": defaultImage
};
var announcementTxt = "";
var Action = {
    COPY: "",
    IMAGE: "",
    FINISH: ""
};
var isJoinedGame = false;
var hotkeyConfig = {};
var hotkeyMapping = {};
var teammateIdt = {};
var defaultHotkeyMapping = {};
var selectedHotkeyRow;
var chatCommand = {};
var isWindowFocus = true;
var skinDownloadQueue = [];
var skinDownloadFail = {};
var toastQueue = [];
var defaultSkin = "http://i.imgur.com/O9Y7BQC.png";
var defaultSkin2 = "http://i.imgur.com/pQxVRBk.png";
var gm;
var defaultHotkeyMessageSend = {
    input_hk_send_msg1: "Need backup!",
    input_hk_send_msg2: "Need a teammate!",
    input_hk_send_msg3: "Pop him!",
    input_hk_send_msg4: "We need to run!",
    input_hk_send_msg5: "Tricksplit!",
    input_hk_send_msg6: "Lets bait! ",
    input_hk_send_msg7: "Split into me!",
    input_hk_send_msg8: "Feed me!",
    input_hk_send_msg9: "Tank the virus!",
    input_hk_send_msg10: "Roger that!"
};
var hkgIcon = {};
var selected_profile = 0;
var player_profile = [{
    name: "Profile 1",
    team: "Team1",
    skinurl: defaultSkin
}, {
    name: "Profile 2",
    team: "Team2",
    skinurl: defaultSkin2
}, {
    name: "Profile 3",
    team: "Team3",
    skinurl: "http://i.imgur.com/ywvPnss.png"
}, {
    name: "Profile 4",
    team: "Team4",
    skinurl: "http://i.imgur.com/dSUxr1W.png"
}, {
    name: "Profile 5",
    team: "Team5",
    skinurl: "http://i.imgur.com/mrm2RN6.png"
}];
myApp = new MyApp, myApp.init();
var playerDetailsByIdentifier = {};
var playerDetailsByNick = {};
var announcementSent = false;
! function(self, jQuery) {
    function init() {
        Ze = true;
        cnv = cv = document.getElementById("canvas");
        document.getElementById("overlays2").onmousemove = function(e) {
            x = e.clientX;
            y = e.clientY;
            paint();
        };
        context = cnv.getContext("2d");
        if (/firefox/i.test(navigator.userAgent)) {
            document.addEventListener("DOMMouseScroll", onDocumentMouseScroll, false);
        } else {
            document.body.onmousewheel = onDocumentMouseScroll;
        }
        var ne = false;
        var n = false;
        var elm = false;
        self.onkeydown = function(event) {
            if (32 == event.keyCode) {
                if (!chatRoom.isFocus()) {
                    if (!ne) {
                        reset();
                        emit(17);
                        ne = true;
                    }
                }
            }
            if (9 == event.keyCode) { // antes 81 era la Q ahora reemplazado por el TAB
                event.preventDefault();
                if (!n) {
                    emit(18);
                    n = true;
                }
            }
            if (87 == event.keyCode) {
                if (!chatRoom.isFocus()) {
                    if (!elm) {
                        reset();
                        emit(21);
                        elm = true;
                    }
                }
            }
            if (isJoinedGame && !$("#overlays").is(":visible") || spectateMode) {
                if (27 == event.keyCode) {
                    event.preventDefault();
                    focus(300);
                }
            } else {
                if (27 == event.keyCode) {
                    event.preventDefault();
                    $(".cp-color-picker").hide();
                    $(".btn-play").trigger("click");
                }
            }
        };
        self.onkeyup = function(event) {
            if (32 == event.keyCode) {
                ne = false;
            }
            if (87 == event.keyCode) {
                elm = false;
            }
            if (9 == event.keyCode) {
                event.preventDefault();
                if (n) {
                    emit(19);
                    n = false;
                }
            }
        };
        self.onblur = function() {
            emit(19);
            elm = n = ne = false;
        };
        self.onresize = update;
        self.requestAnimationFrame(which);
        setInterval(reset, 42);
        focus(0);
        update();
        if (self.location.hash) {
            if (6 <= self.location.hash.length) {
                success(self.location.hash);
            }
        }
    }

    function onDocumentMouseScroll(event) {
        if (myApp.isEnableZoom) {
            text *= Math.pow(myApp.getZoomSpeed(), event.wheelDelta / -120 || (event.detail || 0));
            if (myApp.getZoomLimit() > text) {
                text = myApp.getZoomLimit();
            }
            if (text > 1 / scale) {
                text = 1 / scale;
            }
        }
    }
    window.bind = function(type) {
        var p = null;
        if (0 < simpleExpected.playerCells().length) {
            p = simpleExpected.playerCells()[0];
            p = p.name + p.color;
        }
        var xs = jQuery("#skin_url").val();
        if (-1 != xs.indexOf("!!")) {
            try {
                atob(xs.slice(2));
            } catch (i) {}
        }
        return {
            displayName: jQuery("#nick").val(),
            action: type,
            socketRoom: myApp.getRoom(),
            identifier: p,
            url: myApp.getCustomSkinUrl(),
            nick: jQuery("#nick").val(),
            team: jQuery("#team_name").val(),
            token: myApp.getCurrentPartyCode(),
            mass: myApp.getCurrentMass()
        };
    }

    function resolve() {
        if (!announcementSent) {
            if (0 < simpleExpected.playerCells().length) {
                announcementSent = true;
                var data = bind("join");
                playerDetailsByIdentifier[data.identifier] = data;
                playerDetailsByNick[data.nick] = data;
                conn.emit("playerEntered", data);
            } else {
                setTimeout(resolve, 100);
            }
        }
    }

    function paint() {
        if (myApp.isStopMovement) {
            minX = chunk;
            t = loc;
        } else {
            minX = (x - width / 2) / scale + centerX;
            t = (y - height / 2) / scale + centerY;
        }
    }

    function _init() {
        jQuery("#overlays").fadeOut("fast");
        jQuery("#stats").hide();
        from = to = false;
    }

    function focus(outstandingDataSize) {
        if (!to) {
            if (!from) {
                b = null;
                if (1E3 > outstandingDataSize) {
                    newEnd = 1;
                }
                to = true;
                jQuery("#mainPanel").show();
                jQuery("#overlays").fadeIn("fast");
            }
        }
    }
    function open(url, a) {
        //if (-1 !== url.indexOf(".duex.io:") || -1 !== url.indexOf("127.0.0.1:") || -1 !== url.indexOf(".duex.sly.io:")) {
            if (currentIP = url, ws) {
                ws.onopen = null;
                ws.onmessage = null;
                ws.onclose = null;
                try {
                    ws.close();
                } catch (o) {}
                ws = null;
            }
            result = [];
            data = [];
            window.queue = {};
            list = [];
            siblings = [];
            users = [];
            img = angles = null;
            closingAnimationTime = 0;
            matchEnd = false;
            window.nameCache[this.w] = {};
            ws = new WebSocket(url);
            window.webSocket = ws;
            window.urlSocket = url;
            ws.binaryType = "arraybuffer";
            ws.onopen = function() {
                var buf;
                buf = encode(5);
                buf.setUint8(0, 254);
                buf.setUint32(1, 5, true);
                cb(buf);
                buf = encode(5);
                buf.setUint8(0, 255);
                buf.setUint32(1, 154669603, true);
                cb(buf);
                buf.setUint8(0, 80);
                var i = 0;
            };
            ws.onmessage = onmessage;
            ws.onclose = listener;
            ws.onerror = function() {};
        //} else {
            //console.log("protocol error.");
        //}
    }

    function encode(expectedNumberOfNonCommentArgs) {
        return new DataView(new ArrayBuffer(expectedNumberOfNonCommentArgs));
    }

    function cb(s) {
        fx++;
        ws.send(s.buffer);
    }

    function listener(a) {
        if (matchEnd) {
            backoff = 500;
        }
        // Server is full
        var reason = `${a.reason}`;
        console.log("Connecting error with reason:");
        console.log(reason);
        alertify.error("Connection Error " + reason);
        if (reason == 'Server Full') {
            //ConnectionErrorServerFull();
            //alertify.error("Connection Error: Server Full!");
        }
        setTimeout(function () {
            if (reason !== 'Server Full') {
                //ConnectionErrorServerRestart();
                //alertify.success("Connection Error: Server Restart!");
            }
            setTimeout(function () {
                if (!handler()) {
                    Conectar($("#privateForm").val());
                }
            }, backoff * 2);
        }, backoff);
        backoff *= 2;
    }

    function onmessage(a) {//cambios
        var now = +new Date();
        window.lastPacketTime = now;
        parse(new DataView(a.data));
    }

    function parse(view) {
        function encode() {
            var str = "";
            for (;;) {
                var b = view.getUint16(offset, true);
                if (offset += 2, 0 == b) {
                    break;
                }
                str += String.fromCharCode(b);
            }
            return str;
        }
        clockseq++;
        var offset = 0;
        switch (240 == view.getUint8(offset) && (offset += 5), view.getUint8(offset++)) {
/**/
            case 15: // dualagar
                duexObj.gActiveTurnPlayerId = view.getUint16(offset, true); // dualagar: pID activo
                offset += 2;
                //console.log("duexObj.gActiveTurnPlayerId: " + duexObj.gActiveTurnPlayerId);
                break;
/**/            
            case 16:
                fn(view, offset);
                break;
            case 17:
                chunk = view.getFloat32(offset, true);
                offset += 4;
                loc = view.getFloat32(offset, true);
                offset += 4;
                var col = view.getFloat32(offset, true);
                column = col;
                if (!myApp.isEnableLockZoom) {
                    crashed = col;
                }
                offset += 4;
                break;
            case 18:
                result = [];
                data = [];
                window.queue = {};
                list = [];
                break;
            case 20:
                data = [];
                result = [];
                break;
            case 21:
                fragment = view.getInt16(offset, true);
                offset += 2;
                m = view.getInt16(offset, true);
                offset += 2;
                if (!Xe) {
                    Xe = true;
                    node = fragment;
                    n = m;
                }
                break;
            case 32:
                result.push(view.getUint32(offset, true));
                offset += 4;
                break;
            case 49:
                if (null != angles) {
                    break;
                }
                col = view.getUint32(offset, true);
                offset += 4;
                users = [];
                var arg = 0;
                for (; col > arg; ++arg) {
                    var matches = view.getUint32(offset, true);
                    offset += 4;
                    var objeto = {
                        id: matches
                    };
                    var nombre = encode();
                    try {
                        var extrabytes = JSON.parse(nombre);
                        objeto.name = extrabytes.name;
                        var extrabytesR = extrabytes.color.r;
                        var extrabytesG = extrabytes.color.g;
                        var extrabytesB = extrabytes.color.b;
                        extrabytesC = (extrabytesR << 16 | extrabytesG << 8 | extrabytesB).toString(16);
                        while (extrabytesC.length < 6) {
                            extrabytesC = "0" + extrabytesC;
                        };
                        objeto.color = "#" + extrabytesC;
                        objeto.rainbow = extrabytes.rainbow;
                        objeto.rc = extrabytes.rc
                    } catch (e) {
                        objeto.name = nombre;
                    };
                    users.push(objeto);
                }
                break;
            case 50:
                angles = [];
                col = view.getUint32(offset, true);
                offset += 4;
                arg = 0;
                for (; col > arg; ++arg) {
                    angles.push(view.getFloat32(offset, true));
                    offset += 4;
                }
                create();
                break;
            case 64:
                col = view.getFloat64(offset, true);
                offset += 8;
                arg = view.getFloat64(offset, true);
                offset += 8;
                matches = view.getFloat64(offset, true);
                offset += 8;
                var current = view.getFloat64(offset, true);
                offset += 8;
                if (inArray(matches - col, current - arg)) {
                    right = col;
                    top = arg;
                    left = matches;
                    computed = current;
                } else {
                    if (inArray(col, layers)) {
                        if (matches - stack > 0.01 || -0.01 > matches - stack) {
                            right = col;
                            left = col + 14142.135623730952;
                        }
                    }
                    if (col - layers > 0.01 || -0.01 > col - layers) {
                        if (inArray(matches, stack)) {
                            left = matches;
                            right = matches - 14142.135623730952;
                        }
                    }
                    if (arg - dependencies > 0.01 || -0.01 > arg - dependencies) {
                        if (inArray(current, before)) {
                            computed = current;
                            top = current - 14142.135623730952;
                        }
                    }
                    if (inArray(arg, dependencies)) {
                        if (current - before > 0.01 || -0.01 > current - before) {
                            top = arg;
                            computed = arg + 14142.135623730952;
                        }
                    }
                    if (right > col) {
                        right = col;
                        left = col + 14142.135623730952;
                    }
                    if (matches > left) {
                        left = matches;
                        right = matches - 14142.135623730952;
                    }
                    if (top > arg) {
                        top = arg;
                        computed = arg + 14142.135623730952;
                    }
                    if (current > computed) {
                        computed = current;
                        top = current - 14142.135623730952;
                    }
                    layers = col;
                    dependencies = arg;
                    before = current;
                    stack = matches;
                }
                myApp.afterGameLoaded();
                break;
            case 81:
                var length = view.getUint32(offset, true);
                offset += 4;
                var bytes = view.getUint32(offset, true);
                offset += 4;
                var index = view.getUint32(offset, true);
                offset += 4;/*
                setTimeout(function() {
                    start({
                        d: length,
                        e: bytes,
                        c: index
                    });
                }, 1200);*/
                break;
            case 98: // best player info
                var bestPlayerInfo = encode();
                addBestPlayerInfo(bestPlayerInfo);
                break;
            case 99:
                function readFile() {
                    var str = '',
                        b;
                    while ((b = view.getUint16(offset, true)) != 0) {
                        offset += 2;
                        str += String.fromCharCode(b)
                    };
                    offset += 2;
                    return str
                }
                var durex = false;
                var durex2 = false;
                var durex3 = '';
                var durex4 = '#000000';
                var durex5 = view.getUint8(offset++);
                if (durex5 & 2) {
                    offset += 4
                };
                if (durex5 & 4) {
                    offset += 8
                };
                if (durex5 & 8) {
                    offset += 16
                };
                if (durex5 & 0x40) {
                    durex2 = true;
                    durex3 = '[ADMIN]';
                    durex4 = '#ff2222'
                };
                var durex6 = 0;
                if (durex5 & 0x20) {
                    durex6 = 1
                };
                if (durex5 & 0x10) {
                    durex = true;
                    durex3 = '[MOD]';
                    durex4 = '#00a0ff'
                };
                if (!durex2 || !durex) {
                    var durex7 = view.getUint8(offset++);
                    var durex8 = view.getUint8(offset++);
                    var durex9 = view.getUint8(offset++)
                };
                color = (durex7 << 16 | durex8 << 8 | durex9).toString(16);
                while (color.length < 6) {
                    color = '0' + color
                };
                color = '#' + color;
                var nick = readFile(); // userrole
                var message = readFile(); // message
                var parsedExtras = {};
                if (durex6) {
                    extraBytes = readFile();
                    try {
                        parsedExtras = JSON.parse(extraBytes)
                    } catch (e) {}
                };
                chatRoom.receiveWebSocketMessage(nick, message, color, parsedExtras);
                break;
        }
    }

    function fn(view, offset) {
        function readFile() {
            var str = "";
            for (;;) {
                var b = view.getUint16(offset, true);
                if (offset += 2, 0 == b) {
                    break;
                }
                str += String.fromCharCode(b);
            }
            return str;
        }

        function getString() {
            var str = "";
            for (;;) {
                var b = view.getUint8(offset++);
                if (0 == b) {
                    break;
                }
                str += String.fromCharCode(b);
            }
            return str;
        }
        min = max = Date.now();
        if (!matchEnd) {
            matchEnd = true;
            stop();
        }
        Ee = false;
        var id = view.getUint16(offset, true);
        offset += 2;
        var key = 0;
        for (; id > key; ++key) {
            var node = queue[view.getUint32(offset, true)];
            var obj = queue[view.getUint32(offset + 4, true)];
            offset += 8;
            if (node) {
                if (obj) {
                    obj.R();
                    obj.o = obj.x;
                    obj.p = obj.y;
                    obj.n = obj.size;
                    obj.C = node.x;
                    obj.D = node.y;
                    obj.m = obj.size;
                    obj.K = max;
                    setData(node, obj);
                }
            }
        }
        key = 0;
        for (; id = view.getUint32(offset, true), offset += 4, 0 != id;) {
            ++key;
            var m;
            node = view.getInt32(offset, true);
            offset += 4;
            obj = view.getInt32(offset, true);
            offset += 4;
            m = view.getInt16(offset, true);
            offset += 2;
            var item = view.getUint8(offset++);
            var value = view.getUint8(offset++);
            var T = view.getUint8(offset++);
            value = flush(item << 16 | value << 8 | T);
            T = view.getUint8(offset++);
            var el = !!(1 & T);
            var j = !!(16 & T);
            var comment = null;
            var extras = {};
            if (2 & T) {
                offset += 4 + view.getUint32(offset, true);
            }
            if (4 & T) {
                var s = getString();
                extras = JSON.parse(s);
/*                if (extras.isCoin) {
                    j = true;
                    el = true;
                }*/
            }
            var input = readFile(); // nick
            item = null;
            if (queue.hasOwnProperty(id)) {
                item = queue[id];
                item.J();
                item.o = item.x;
                item.p = item.y;
                item.n = item.size;
                item.color = value;
            } else {
                item = new set(id, node, obj, m, value, input, extras);
                list.push(item);
                queue[id] = item;
                item.ia = node;
                item.ja = obj;
            }
            item.f = el;
            item.j = j;
            item.isVirus = el;
            item.C = node;
            item.D = obj;
            item.m = m;
            item.K = max;
            item.T = T;
            if (comment) {
                item.V = comment;
            }
            if (input) {
                item.t(input);
            }
            if (-1 != result.indexOf(id)) {
                if (-1 == data.indexOf(item)) {
                    data.push(item);
                    if (1 == data.length) {
                        centerX = item.x;
                        centerY = item.y;
                        document.getElementById("overlays").style.display = "none";
                        a = [];
                        pauseText = 0;
                        col = data[0].color;
                        Bt = true;
                        near = Date.now();
                        count = path = name = 0;
                    }
                }
            }
        }
        node = view.getUint32(offset, true);
        offset += 4;
        key = 0;
        for (; node > key; key++) {
            id = view.getUint32(offset, true);
            offset += 4;
            item = queue[id];
            if (null != item) {
                item.R();
            }
        }
        if (Ee) {
            if (0 == data.length) {
                myApp.onDead();
                far = Date.now();
                Bt = false;
                if (!to) {
                    if (!from) {
                        if (connected) {
                            from = true;
                            jQuery("#overlays").fadeIn("fast");
                        } else {
                            focus(1500);
                        }
                    }
                }
            }
        }
    }

    function stop() {
        c = "";
        writeUTFBytes();
        if (save) {
            save();
            save = null;
        }
        if (null != tref) {
            clearTimeout(tref);
        }
        tref = setTimeout(function() {
            if (self.ga) {
                ++millis;
                self.ga("set", "dimension2", millis);
            }
        }, 1E4);
    }
    function reset() {
        if (!myApp.isStopMovement && handler()) {
            var x0 = x - width / 2;
            var x1 = y - height / 2;
            window.mouseX = minX;
            window.mouseY = t;
            if (!(64 > x0 * x0 + x1 * x1)) {
                if (!(0.01 > Math.abs(maxX - minX) && 0.01 > Math.abs(t1 - t))) {
                    maxX = minX;
                    t1 = t;
                    x0 = encode(13);
                    x0.setUint8(0, 16);
                    x0.setInt32(1, minX, true);
                    x0.setInt32(5, t, true);
                    x0.setUint32(9, 0, true);
                    cb(x0);
                }
            }
        }
    }

    function inArray(arr, array) {
        return 0.01 > arr - array && arr - array > -0.01;
    }

    function writeUTFBytes() {
        if (handler() && (matchEnd && null != b)) {
            var buf = encode(1 + 2 * b.length);
            buf.setUint8(0, 0);
            var bi = 0;
            for (; bi < b.length; ++bi) {
                buf.setUint16(1 + 2 * bi, b.charCodeAt(bi), true);
            }
            cb(buf);
            b = null;
        }
    }

    function handler() {
        return null != ws && ws.readyState == ws.OPEN;
    }

    function emit(expectedNumberOfNonCommentArgs) {
        if (handler()) {
            var buf = encode(1);
            buf.setUint8(0, expectedNumberOfNonCommentArgs);
            cb(buf);
        }
    }

    function oncomplete() {
        if (handler() && null != window.userToken) {
            var buf = encode(2 + userToken.length);
            buf.setUint8(0, 82);
            buf.setUint8(1, 1);
            var i = 0;
            for (; i < window.userToken.length; ++i) {
                buf.setUint8(i + 2, window.userToken.charCodeAt(i));
            }
            cb(buf);
        }
    }

    function update() {
        width = 1 * self.innerWidth;
        height = 1 * self.innerHeight;
        cv.width = cnv.width = width;
        cv.height = cnv.height = height;
        var child = jQuery("#helloContainer");
        child.css("transform", "none");
        var b = child.height();
        var a = self.innerHeight;
        if (b > a / 1.1) {
            child.css("transform", "translate(-50%, -50%) scale(" + a / b / 1.1 + ")");
        } else {
            child.css("transform", "translate(-50%, -50%)");
        }
        render();
    }

    function requestAnimationFrame() {
        return 1 * Math.max(height / 1080, width / 1920) * text;
    }

    function frame() {
        if (0 != data.length) {
            if (myApp.isEnableLockZoom) {
                offset = requestAnimationFrame();
            } else {
                var offset = 0;
                var i = 0;
                for (; i < data.length; i++) {
                    offset += data[i].size;
                }
                offset = Math.pow(Math.min(64 / offset, 1), 0.4) * requestAnimationFrame();
            }
            scale = (9 * scale + offset) / 10;
        }
    }

    function render() {
        var j;
        var diff = Date.now();
        if (++target, max = diff, 0 < data.length) {
            frame();
            var pos = j = 0;
            var c = 0;
            for (; c < data.length; c++) {
                data[c].J();
                j += data[c].x / data.length;
                pos += data[c].y / data.length;
            }
            chunk = j;
            loc = pos;
            crashed = scale;
            if (myApp.testing) {
                //centerX = ((myApp.getcamera() - 1) * centerX + chunk) / myApp.getcamera();
                centerX = (testingVal * centerX + chunk) / (testingVal + 1);
                //centerY = ((myApp.getcamera() - 1) * centerY + loc) / myApp.getcamera();
                centerY = (testingVal * centerY + loc) / (testingVal + 1);
                //console.log(testingVal + 1);
            } else {
                centerX = (centerX + j) / 2;
                centerY = (centerY + pos) / 2;
            }
        } else {
            centerX = (29 * centerX + chunk) / 30;
            //centerX = ((myApp.getcamera() - 1) * centerX + chunk) / myApp.getcamera();
            centerY = (29 * centerY + loc) / 30;
            //centerY = ((myApp.getcamera() - 1) * centerY + loc) / myApp.getcamera();
            scale = (9 * scale + crashed * requestAnimationFrame()) / 10;
            //scale = (9 * scale + crashed * requestAnimationFrame()) / 10;
        }
        _root = null;
        paint();
        if (!dest) {
            context.clearRect(0, 0, width, height);
        }
        if (dest) {
            context.fillStyle = color ? "#111111" : "#F2FBFF";
            context.globalAlpha = 0.05;
            context.fillRect(0, 0, width, height);
            context.globalAlpha = 1;
        } else {
            redraw();
        }
        list.sort(function(a, b) {
            return a.size == b.size ? a.id - b.id : a.size - b.size;
        });
        context.save();
        context.translate(width / 2, height / 2);
        context.scale(scale, scale);
        context.translate(-centerX, -centerY);
        j = [right, top, left, computed];
        drawText(j, context);
        if (myApp.isEnableMapGrid) {
            draw(j, context);
        }
        c = 0;
        for (; c < siblings.length; c++) {
            siblings[c].s(context);
            //renderCells++;//cambios
            //console.log(siblings[c]);
        }
        c = 0;
        for (; c < list.length; c++) {
            list[c].s(context);
        }
        if (0 < positions.length) {
            context.fillStyle = $("#pelletColor").minicolors("value");
            context.beginPath();
            j = 0;
            if (myApp.isOptimizedFood) {
                for (; j < positions.length; j++) {
                    pos = positions[j];
                    context.moveTo(pos.x, pos.y);
                    context.fillRect(pos.x - pos.size, pos.y - pos.size, pos.size * 2 + 20, pos.size * 2 + 20);
                }
            } else {
                for (; j < positions.length; j++) {
                    pos = positions[j];
                    context.moveTo(pos.x, pos.y);
                    context.arc(pos.x, pos.y, pos.size + 5, 0, PIx2, false);
                }
            }
            context.fill();
            positions = [];
        }
        /********** Other **********************/
        var celulasImportantes = [];
        for (var i = 0; i < arr2.length; i++) {
            celulasImportantes.push({
                x: arr2[i].x,
                y: arr2[i].y,
                size: arr2[i].size,
                name: arr2[i].name
            });
        }
        arr2 = [];
        // Aros al rededor del jugador
        if (data.length && myApp.isEnableSplitInd) {
            context.globalAlpha = 0.7;
            pos = ~~Math.min(5 / scale, 50);
            context.lineWidth = pos;
            c = [];
            j = 0;
            for (; j < data.length; j++) {
                c.push({
                    x: data[j].x,
                    y: data[j].y,
                    size: data[j].size
                });
            }
            c.sort(function(a, b) {
                return a.size - b.size;
            });
            j = 0;
            for (; j < arr.length; j++) {
                var radius = arr[j].size * arr[j].size;
                var i = 0;
                for (; i < c.length; i++) {
                    var r = c[i].size * c[i].size;
                    var g = Math.sqrt(Math.pow(c[i].x - arr[j].x, 2) + Math.pow(c[i].y - arr[j].y, 2));
                    var ml = c[i].size + 655;
                    var b = arr[j].size + 655;
                    if (4 >= c.length && (0.375 * r * 0.37 > radius && 2 * ml - 10 > g)) {
                        arr[j].type = 4;
                        break;
                    }
                    if (8 >= c.length && (0.37 * r > radius && ml > g)) {
                        arr[j].type = 2;
                        break;
                    }
                    if (0.73 * r > radius && ml > g) {
                        arr[j].type = 1;
                        break;
                    }
                    if (0.37 * radius > r && b > g) {
                        arr[j].type = -2;
                        break;
                    }
                    if (0.73 * radius > r && b > g) {
                        arr[j].type = -1;
                        break;
                    }
                }
            }
            c = 0;
            for (; c < items.length; c++) {
                context.strokeStyle = items[c].color;
                context.beginPath();
                j = 0;
                for (; j < arr.length; j++) {
                    if (arr[j].type) {
                        if (arr[j].type == items[c].type) {
                            radius = arr[j].size + pos + 8 + 2 / scale;
                            context.moveTo(arr[j].x + radius, arr[j].y);
                            context.arc(arr[j].x, arr[j].y, radius, 0, PIx2, false);
                        }
                    }
                }
                context.stroke();
            }
        }
        if (arr = [], Xe) {
            node = (3 * node + fragment) / 4;
            n = (3 * n + m) / 4;
            context.save();
            context.strokeStyle = "#FFAAAA";
            context.lineWidth = 10;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.globalAlpha = 0.5;
            context.beginPath();
            c = 0;
            for (; c < data.length; c++) {
                context.moveTo(data[c].x, data[c].y);
                context.lineTo(node, n);
            }
            context.stroke();
            context.restore();
        }
        context.restore();
        if (":teams" == index) {
            if (img) {
                if (img.width) {
                    context.drawImage(img, width - img.width - 10, 10);
                }
            }
        }
        closingAnimationTime = Math.max(closingAnimationTime, pick());
        diff = Date.now() - diff;
        if (diff > 1E3 / 60) {
            resolutionScale -= 0.01;
        } else {
            if (1E3 / 65 > diff) {
                resolutionScale += 0.01;
            }
        }
        if (0.4 > resolutionScale) {
            resolutionScale = 0.4;
        }
        if (resolutionScale > 1) {
            resolutionScale = 1;
        }
        diff = max - aux;
        if (!handler() || (to || from)) {
            newEnd += diff / 2E3;
            if (newEnd > 1) {
                newEnd = 1;
            }
        } else {
            newEnd -= diff / 300;
            if (0 > newEnd) {
                newEnd = 0;
            }
        }
        aux = max;
    }
    // Pinta las gridline
    function redraw() {
        if (myApp.isEnableGridline) {
            context.save();
            context.strokeStyle = "#1A1A1A";
            context.globalAlpha = 0.2 * scale;
            context.beginPath();
            var x = width / scale;
            var y = height / scale;
            var bounds = (-centerX + x / 2) % 50;
            for (; x > bounds; bounds += 50) { // Pinta las líneas verticales
                context.moveTo(bounds * scale - 0.5, 0);
                context.lineTo(bounds * scale - 0.5, y * scale);
            }
            bounds = (-centerY + y / 2) % 50;
            for (; y > bounds; bounds += 50) { // Pinta las líneas horizontales
                context.moveTo(0, bounds * scale - 0.5);
                context.lineTo(x * scale, bounds * scale - 0.5);
            }
            context.stroke();
            context.restore();
        }
    }

    window.pick = function() {
        var result = 0;
        var i = 0;
        for (; i < data.length; i++) {
            result += data[i].m * data[i].m;
        }
        return result;
    }

    function Player(opt_vars, x, y, opt_size, b) {
        this.P = opt_vars;
        this.x = x;
        this.y = y;
        this.g = opt_size;
        this.b = b;
    }

    function set(value, x, y, size, color, ms, extras) {
        this.id = value;
        this.o = this.x = x;
        this.p = this.y = y;
        this.n = this.size = size;
        this.color = color;
        this.extras = extras;
        this.a = [];
        this.Q();
        this.t(ms);
    }

    function flush(count) {
        count = count.toString(16);
        for (; 6 > count.length;) {
            count = "0" + count;
        }
        return "#" + count;
    }

    function module(moduleNames, moduleDefinition, name, radius) {
        if (moduleNames) {
            this.q = moduleNames;
        }
        if (moduleDefinition) {
            this.M = moduleDefinition;
        }
        this.O = !!name;
        if (radius) {
            this.r = radius;
        }
    }

    function shuffle(arr) {
        var tmp1;
        var rnd;
        var total = arr.length;
        for (; total > 0;) {
            rnd = Math.floor(Math.random() * total);
            total--;
            tmp1 = arr[total];
            arr[total] = arr[rnd];
            arr[rnd] = tmp1;
        }
    }

    function drawText(g, ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = $("#borderColor").minicolors("value");
        var bw = ctx.lineWidth = 40;
        ctx.strokeRect(g[0] - bw / 2, g[1] - bw / 2, g[2] - g[0] + bw, g[3] - g[1] + bw);
        ctx.restore();
    }

    function draw(t, ctx) {
        var x = Math.round(t[0]) + 40;
        var y = Math.round(t[1]) + 40;
        var second = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        var barWidth = (Math.round(t[2]) - 40 - x) / 5;
        var h = (Math.round(t[3]) - 40 - y) / 5;
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 20;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = duexObj.tamanoFuenteSector * barWidth + "px Oswald";
        ctx.fillStyle = $("#locationColor").minicolors("value");
        var j = 0;
        for (; 5 > j; j++) {
            var i = 0;
            for (; 5 > i; i++) {
                //if (myApp.halloween.sectors.enabled) {
                    //ctx.drawImage(myApp.halloween.sectors.img, x + barWidth * i + barWidth / 2 - 760, y + h * j + h / 2 - 700, 1500, 1500);
                //} else {
                    ctx.fillText(second[j] + (i + 1), x + barWidth * i + barWidth / 2, y + h * j + h / 2);
                //}
            }
        }
        ctx.lineWidth = duexObj.anchoSectores;
        ctx.strokeStyle = $("#gridColor").minicolors("value");
        j = 0;
        for (; 5 > j; j++) {
            i = 0;
            for (; 5 > i; i++) {
                ctx.strokeRect(x + barWidth * i, y + h * j, barWidth, h);
            }
        }
        ctx.stroke();
        ctx.restore();
    }

    function callback(href) {
        if (self.history) {
            if (self.history.replaceState) {
                self.history.replaceState({}, self.document.title, href);
            }
        }
    }

    function setData(node, data) {
        var o = -1 != result.indexOf(node.id);
        var n = -1 != result.indexOf(data.id);
        var i = 30 > data.size;
        if (o) {
            if (i) {
                ++pauseText;
            }
        }
        if (!i) {
            if (o) {
                if (!n) {
                    ++path;
                }
            }
        }
    }

    function fill(i) {
        i = ~~i;
        var lineNumber = (i % 60).toString();
        return i = (~~(i / 60)).toString(), 2 > lineNumber.length && (lineNumber = "0" + lineNumber), i + ":" + lineNumber;
    }

    function endsWith() {
        if (null == users) {
            return 0;
        }
        var i = 0;
        for (; i < users.length; ++i) {
            if (-1 != result.indexOf(users[i].id)) {
                return i + 1;
            }
        }
        return 0;
    }

    var simpleExpected = {
        context: function() {
            return g_context;
        },
        playerCellIds: function() {
            return g_playerCellIds;
        },
        playerCells: function() {
            return data;
        },
        cellsById: function() {
            return g_cellsById;
        },
        cells: function() {
            return g_cells;
        }
    };

    if (socket.on("playerUpdated", function(p) {
            if ("join" == p.action || "spectate" == p.action) {
                if (0 < simpleExpected.playerCells().length) {
                    conn.emit("playerUpdated", bind("update"));
                }
            }
            if (p.identifier) {
                playerDetailsByIdentifier[p.identifier] = p;
                playerDetailsByNick[p.nick] = p;
            }
        }), self.moveTo = function(lab, dragging) {
            if (lab) {
                if (dragging) {
                    myApp.isStopMovement = true;
                }
            }
        }, self.setPosition = function(p, index) {
            if (handler()) {
                var buf = encode(13);
                buf.setUint8(0, 16);
                buf.setInt32(1, p, true);
                buf.setInt32(5, index, true);
                buf.setUint32(9, 0, true);
                cb(buf);
            }
        }, window.handleQuickW = function() {
            if (myApp.autoW) {
                var buf = encode(1);
                buf.setUint8(0, 21);
                cb(buf);
                setTimeout(handleQuickW, 142);
            }
        }, !self.duexioioNoInit) {
        var ee = "https:" == self.location.protocol;
        if (ee && -1 == self.location.search.indexOf("fb")) {
            self.location.href = "http://duex.io";
        } else {
            var cv;
            var context;
            var cnv;
            var width;
            var height;
            var _root = null;
            var ws = null;
            var centerX = 0;
            var centerY = 0;
            var result = [];
            var data = [];
            window.queue = {};
            var list = [];
            var siblings = [];
            var users = [];
            var x = 0;
            var y = 0;
            var minX = -1;
            var t = -1;
            var target = 0;
            var max = 0;
            var aux = 0;
            var b = null;
            var right = -7071.067811865476;
            var top = -7071.06781186547;
            var left = 7071.067811865476;
            var computed = 7071.067811865476;
            var layers = 0;
            var dependencies = 0;
            var stack = 0;
            var before = 0;
            var scale = 1;
            var value = null;
            var error = true;
            var oldStatus = true;
            var doneResults = false;
            var Ee = false;
            var closingAnimationTime = 0;
            var color = 1;
            var $timeout = false;
            var chunk = centerX = ~~((right + left) / 2);
            var loc = centerY = ~~((top + computed) / 2);
            var crashed = 1;
            var index = "";
            var angles = null;
            var Ze = false;
            var Xe = false;
            var fragment = 0;
            var m = 0;
            var node = 0;
            var n = 0;
            var compassResult = 0;
            var cs = ["#333333", "#FF3333", "#33FF33", "#3333FF"];
            var dest = false;
            var matchEnd = false;
            var min = 0;
            var text = 1;
            var newEnd = 1;
            var to = false;
            var last = 0;
            var dst = {};
            var c = "";
            var deep = 0;
            var arr = [];
            var arr2 = [];
            var PIx2 = 2 * Math.PI;
            var column = 0;
            var clockseq = 0;
            var fx = 0;
            var _clockseq = 0;
            var type = 0;
            var positions = [];
            var items = [{
                type: 1,
                color: "#d3d3d3" // gris
            }, {
                type: 2,
                color: "#76FF03" // verde
            }, {
                type: 4,
                color: "#2196F3" // azul
            }, {
                type: -1,
                color: "#FF9800" // naranja
            }, {
                type: -2,
                color: "#FD0000" // rojo
            }, {
                type: -4,
                color: "white" // blanco
            }];
            setInterval(function() {
                _clockseq = clockseq;
                clockseq = 0;
                type = fx;
                fx = 0;
            }, 1E3);
            (function() {
                var params = self.location.search;
                if ("?" == params.charAt(0)) {
                    params = params.slice(1);
                }
                params = params.split("&");
                var i = 0;
                for (; i < params.length; i++) {
                    var src = params[i].split("=");
                    dst[src[0]] = src[1];
                }
            })();
            var test_canvas = document.createElement("canvas");
            if ("undefined" == typeof console || ("undefined" == typeof DataView || ("undefined" == typeof WebSocket || (null == test_canvas || (null == test_canvas.getContext || null == self.localStorage))))) {
                alert("You browser does not support this game, we recommend you to use Firefox to play duex.io");
            } else {
                var old = null;
                self.setNick = function(v) {
                    if (self.ga) {
                        self.ga("send", "event", "Nick", v.toLowerCase());
                    }
                    //if (v == '') v = "Duex.io";
                    _init();
                    var obj = {}
                    //para hats
                    if (selectedCurrentHat) obj.selectHat = selectedCurrentHat
                    obj.name = v;
                    obj.skinurl = $("#skin_url").val();
                    obj.team = $("#team_name").val();
                    b = JSON.stringify(obj);;
                    writeUTFBytes();
                    closingAnimationTime = 0;
                    setLocalStorage("nick", v);
                    myApp.newGame();
                    announcementSent = false;
                    resolve();
                };
                self.setSkins = function(err) {
                    error = err;
                };
                self.setNames = function(newStatus) {
                    oldStatus = newStatus;
                };
                self.setDarkTheme = function(newColor) {
                    color = newColor;
                };
                self.setColors = function(data) {
                    doneResults = data;
                };
                self.setShowMass = function(_$timeout_) {
                    $timeout = _$timeout_;
                };
                self.getCurrentX = function() {
                    return data.length ? centerX - (left - 7071.067811865476) : "";
                };
                self.getCurrentY = function() {
                    return data.length ? centerY - (computed - 7071.067811865476) : "";
                };
                self.getTop1X = function() {
                    return chunk;
                };
                self.getTop1Y = function() {
                    return loc;
                };
                self.getLengthX = function() {
                    return 14142.135623730952;
                };
                self.getLengthY = function() {
                    return 14142.135623730952;
                };
                self.getLB = function() {
                    return users;
                };
                self.getSelfIDs = function() {
                    return result;
                };
                self.getCell = function() {
                    return data;
                };
                self.getHighestScore = function() {
                    return closingAnimationTime;
                };
                self.currentMass = function() {
                    return pick();
                };
                self.quickSpace = function() {
                    if (0 != data.length) {
                        emit(17);
                        setTimeout(function() {
                            emit(17);
                        }, 40);
                        setTimeout(function() {
                            emit(17);
                        }, 80);
                        setTimeout(function() {
                            emit(17);
                        }, 120);
                    }
                };
                self.doubleSpace = function() {
                    setTimeout(function() {
                        emit(17);
                    }, 50);
                    setTimeout(function() {
                        emit(17);
                    }, 100);
                };
                self.getControlBot = function() {
                    setTimeout(function(){
                        emit(22);
                    },25)
                };
                self.getFPS = function() {
                    return deep;
                };
                self.getPacketIO = function() {
                    return [_clockseq, type];
                };
                self.spectate = function() {
                    isJoinedGame = false;
                    spectateMode = true;
                    b = null;
                    emit(1);
                    _init();
                    myApp.spectate(data);
                    var cb = bind("spectate");
                    conn.emit("playerEntered", cb);
                };
                self.setZoomLevel = function(textAlt) {
                    text = textAlt;
                };
                self.isFreeSpec = function() {
                    return myApp.isSpectating && 0.25 === column;
                };
                if (null != self.localStorage) {
                    if (null == self.localStorage.AB9) {
                        self.localStorage.AB9 = 0 + ~~(100 * Math.random());
                    }
                    compassResult = +self.localStorage.AB9;
                    self.ABGroup = compassResult;
                }
                var save = null;
                self.connect = open; //self.connect = open; //
                var backoff = 500;
                var tref = null;
                var millis = 0;
                var maxX = -1;
                var t1 = -1;
                var img = null;
                var resolutionScale = 1;
                var which = function() {
                    Date.now();
                    var diff = 0;
                    var aux = Date.now();
                    return function() {
                        self.requestAnimationFrame(which);
                        var max = Date.now();
                        if (myApp.isShowFPS) {
                            if (diff > 1E3) {
                                aux = max;
                                diff = 0;
                                deep = target;
                                target = 0;
                            } else {
                                diff = max - aux;
                            }
                        }
                        if (!handler() || 240 > Date.now() - min) {
                            render();
                        }
                    };
                }();
                var results = {};
                var numbers = "duex.io".split(";");
                var reserved = "duex.io".split(";");
                var images = {};
                Player.prototype = {
                    P: null,
                    x: 0,
                    y: 0,
                    g: 0,
                    b: 0
                };
                set.prototype = {
                    id: 0,
                    a: null,
                    name: null,
                    k: null,
                    I: null,
                    extras: {},
                    x: 0,
                    y: 0,
                    size: 0,
                    o: 0,
                    p: 0,
                    n: 0,
                    C: 0,
                    D: 0,
                    m: 0,
                    T: 0,
                    K: 0,
                    W: 0,
                    A: false,
                    f: false,
                    j: false,
                    L: true,
                    S: 0,
                    V: null,
                    R: function() {
                        var i;
                        i = 0;
                        for (; i < list.length; i++) {
                            if (list[i] == this) {
                                list.splice(i, 1);
                                break;
                            }
                        }
                        delete queue[this.id];
                        i = data.indexOf(this);
                        if (-1 != i) {
                            Ee = true;
                            data.splice(i, 1);
                        }
                        i = result.indexOf(this.id);
                        if (-1 != i) {
                            result.splice(i, 1);
                        }
                        this.A = true;
                        //if (this.size > 21) {
                        	//siblings.push(this);
                        //}
                    },
                    i: function() {
                        if (!this.f) {
                            var isoptimizednames = myApp.getNickMassSize();
                            return Math.max(~~(isoptimizednames * this.m), 24);
                        } else if (this.extras.isCoin) {
                            return Math.max(~~(0), 0);
                        } else {
                            return Math.max(~~(0.3 * this.size), 24);
                        }
                    },
                    t: function(str) {
                        var directives = str.match(/\u0001([\u0002-\uffff]|[\u0002-\uffff]\uffff)$/g);
                        var a = 0;
                        if (directives) {
                            a = directives[0].split("\u0001")[1];
                            if (1 < a.length) {
                                this.img = a.charCodeAt(0) + 65534;
                            }
                        }
                        if (this.name = str) {
                            if (null == this.k) {
                                this.k = new module(this.i(), "#FFFFFF", true, "#000000");
                                this.k.v = Math.ceil(10 * scale) / 10;
                            } else {
                                this.k.G(this.i());
                            }
                            this.k.u(this.name);
                        }
                    },
                    Q: function() {
                        var a = this.B();
                        for (; this.a.length > a;) {
                            var data = ~~(Math.random() * this.a.length);
                            this.a.splice(data, 1);
                        }
                        if (0 == this.a.length) {
                            if (a > 0) {
                                this.a.push(new Player(this, this.x, this.y, this.size, Math.random() - 0.5));
                            }
                        }
                        for (; this.a.length < a;) {
                            data = ~~(Math.random() * this.a.length);
                            data = this.a[data];
                            this.a.push(new Player(this, data.x, data.y, data.g, data.b));
                        }
                    },
                    B: function() {
                        var rh = 10;
                        if (20 > this.size) {
                            rh = 0;
                        }
                        if (this.f) {
                            rh = 30;
                        }
                        var height = this.size;
                        return this.f || (height *= scale), height *= resolutionScale, 32 & this.T && (height *= 0.25), ~~Math.max(height, rh);
                    },
                    da: function() {
                        this.Q();
                        var nodes = this.a;
                        var n = nodes.length;
                        var i = 0;
                        for (i = 0; i < n; ++i) { //; n > i; ++i
                            var a = nodes[(i - 1 + n) % n].b;
                            var b = nodes[(i + 1) % n].b;
                            nodes[i].b += (Math.random() - 0.5) * (this.j ? 3 : 1);
                            nodes[i].b *= 0.7;
                            if (10 < nodes[i].b) {
                                nodes[i].b = 10;
                            }
                            if (-10 > nodes[i].b) {
                                nodes[i].b = -10;
                            }
                            nodes[i].b = (a + b + 8 * nodes[i].b) / 10;
                        }
                        var ELEMENT_NODE = this;
                        var sa = this.f ? 0 : (this.id / 1E3 + max / 1E4) % (2 * Math.PI);
                        i = 0;
                        for (; n > i; ++i) {
                            var g = nodes[i].g;
                            if (a = nodes[(i - 1 + n) % n].g, b = nodes[(i + 1) % n].g, 21 < this.size && (null != _root && (20 < this.size * scale && 0 < this.id))) { // < 15 
                                var r = false;
                                var x = nodes[i].x;
                                var y = nodes[i].y;
                                _root.ea(x - 5, y - 5, 10, 10, function(node) {
                                    if (node.P != ELEMENT_NODE) {
                                        if (25 > (x - node.x) * (x - node.x) + (y - node.y) * (y - node.y)) {
                                            r = true;
                                        }
                                    }
                                });
                                if (!r) {
                                    if (nodes[i].x < right || (nodes[i].y < top || (nodes[i].x > left || nodes[i].y > computed))) {
                                        r = true;
                                    }
                                }
                                if (r) {
                                    if (0 < nodes[i].b) {
                                        nodes[i].b = 0;
                                    }
                                    --nodes[i].b;
                                }
                            }
                            g += nodes[i].b;
                            if (0 > g) {
                                g = 0;
                            }
                            g = this.j ? (19 * g + this.size) / 20 : (12 * g + this.size) / 13;
                            nodes[i].g = (a + b + 8 * g) / 10;
                            a = 2 * Math.PI / n;
                            b = this.a[i].g;
                            if (this.f) {
                                if (0 == i % 2) {
                                    b += 5;
                                }
                            }
                            nodes[i].x = this.x + Math.cos(a * i + sa) * b;
                            nodes[i].y = this.y + Math.sin(a * i + sa) * b;
                        }
                    },
                    J: function() {
                        if (0 >= this.id) {
                            return 1;
                        }
                        var p;
                        p = (max - this.K) / myApp.animationDelay();
                        p = 0 > p ? 0 : p > 1 ? 1 : p;
                        var n = 0 > p ? 0 : p > 1 ? 1 : p;
                        if (this.i(), this.A && n >= 1) {
                            var index = siblings.indexOf(this);
                            if (-1 != index) {
                                siblings.splice(index, 1);
                            }
                        }
                        return this.x = p * (this.C - this.o) + this.o, this.y = p * (this.D - this.p) + this.p, this.size = n * (this.m - this.n) + this.n, n;
                    },
                    H: function() {
                        return 0 >= this.id ? true : this.x + this.size + 40 < centerX - width / 2 / scale || (this.y + this.size + 40 < centerY - height / 2 / scale || (this.x - this.size - 40 > centerX + width / 2 / scale || this.y - this.size - 40 > centerY + height / 2 / scale)) ? false : true;
                    },
                    s: function(ctx) {
                        var drawStart = +new Date();
                        if (this.H()) {
                            var f = myApp.isEnableSimpleDrawing;
                            if (this.size < 21) {
                                if (!myApp.isEnableHideFood) {
                                    if (myApp.isSameColorFood) {
                                        positions.push({
                                            x: this.x,
                                            y: this.y,
                                            size: this.size
                                        });
                                    } else {
                                        ctx.beginPath();
                                        ctx.fillStyle = this.color;
                                        ctx.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, false);
                                        ctx.fill();
                                    }
                                }
                            } else {
                                ++this.S;
                                var y_position = 0 < this.id && (!this.f && (!this.j && 0.4 > scale));
                                if (5 > this.B() && (0 < this.id && (y_position = true)), this.L && !y_position) {
                                    var i = 0;
                                    for (; i < this.a.length; i++) {
                                        this.a[i].g = this.size;
                                    }
                                }
                                this.L = y_position;
                                ctx.save();
                                this.W = max;
                                i = this.J();
                                if (this.A) {
                                    ctx.globalAlpha *= 1 - i;
                                }
                                ctx.lineWidth = 10;
                                ctx.lineCap = "round";
                                ctx.lineJoin = this.f ? "miter" : "round";
                                i = !this.f && (0 < this.id && (15 <= this.size && !this.j)) ? true : false;
                                var v;
                                var areMyCells = false;// dual
                                var isHideSelfName = false;
                                var x = null;
                                if (v = this.name + this.color, v = v in playerDetailsByIdentifier ? playerDetailsByIdentifier[v] : void 0, i) {// es la celula
                                    if (myApp.isTransparentCell) {
                                        ctx.globalAlpha = 0.7;
                                    }
                                    var c = 0;
                                    for (; c < result.length; c++) {
                                        if (this.id === result[c]) {
                                            isHideSelfName = true;
                                            areMyCells = true; // is my self - dual
                                        }
                                    }
                                    // dual are my cells
                                    if (areMyCells) {
                                        if (myApp.isEnableCursorLine) {
                                            ctx.save();
                                            ctx.strokeStyle = "#E3F2FD";
                                            ctx.lineWidth = 2;
                                            ctx.lineCap = "round";
                                            ctx.lineJoin = "round";
                                            ctx.globalAlpha = 0.8;
                                            ctx.beginPath();

                                            if (this.pID == theoObjects.gActiveTurnPlayerId) {
                                                ctx.moveTo(this.x, this.y);
                                                ctx.lineTo(minX, t);
                                            }

                                            //ctx.moveTo(this.x, this.y);
                                            //ctx.lineTo(minX, t);
                                            ctx.stroke();
                                            ctx.restore();
                                        }
                                        if (myApp.isEnableAttackRange) {
                                            ctx.beginPath();
                                            ctx.strokeStyle = color ? "white" : "black";
                                            ctx.arc(this.x, this.y, this.size + 655, 0, 2 * Math.PI, false);
                                            ctx.stroke();
                                            ctx.closePath();
                                        }
                                        if (myApp.isEnableCustomSkin) {
                                            x = myApp.getSkinImage(nodeList[0][5]);
                                        }
                                    }                                    
                                    if (isHideSelfName) {
                                        if (myApp.isEnableCursorLine) {
                                            ctx.save();
                                            ctx.strokeStyle = $("#cursorlinecolor").minicolors("value"); // color de cursor line
                                            ctx.lineWidth = duexObj.anchoCursorLine;
                                            ctx.lineCap = "round";
                                            ctx.lineJoin = "round";
                                            ctx.globalAlpha = duexObj.cursorLineTransparencia;
                                            ctx.beginPath();
                                            ctx.moveTo(this.x, this.y);
                                            ctx.lineTo(minX, t);
                                            ctx.stroke();
                                            ctx.restore();
                                        }
                                        if (myApp.isEnableAttackRange) {
                                            ctx.beginPath();
                                            ctx.strokeStyle = color ? "white" : "black";
                                            ctx.arc(this.x, this.y, this.size + myApp.attackRangeRadius, 0, 2 * Math.PI, false);
                                            ctx.stroke();
                                            ctx.closePath();
                                        }
                                        if (myApp.isEnableCustomSkin) {
                                            //x = myApp.getSkinImage(nodeList[0][5]);
                                            myApp.getSkinImage(nodeList[0][5]);
                                        }
                                    }
                                }
                                if (doneResults ? (ctx.fillStyle = "#FFFFFF", ctx.strokeStyle = "#AAAAAA") : (
                                    ctx.fillStyle = this.color,
                                    ctx.strokeStyle = this.color),
                                    f && (this.f && !this.extras.isCoin && (
                                        ctx.fillStyle = $("#virusColor").minicolors("value"),
                                        ctx.globalAlpha = 0.8,
                                        ctx.lineWidth = 10,
                                        ctx.strokeStyle = $("#virusStrokeColor").minicolors("value")
                                    )), f || y_position) {
                                    // Para que en todo momento se dibuje el efecto gelatino, se tiene que hacer f = falso y además y_position igual a falso
                                    // Aquí dibuja la célula sin el efecto smooth, así como agarplus
                                    ctx.beginPath();
                                    var numPoints = 0;
                                    if (this.extras.isCoin) {
                                        ctx.strokeStyle = duexObj.coinStrokeColor;
                                    }
                                    if (this.extras.isPlayer, this.extras.isMinion && (numPoints = 8), this.extras.isCoin && (numPoints = 6), this.isVirus, this.extras.numSides && (numPoints = this.extras.numSides), numPoints) {
                                        var context = ctx;
                                        context.beginPath();
                                        context.moveTo(this.x + this.size * Math.cos(0), this.y + this.size * Math.sin(0));
                                        i = 1;
                                        for (; i <= numPoints; i += 1) {
                                            context.lineTo(this.x + this.size * Math.cos(2 * i * Math.PI / numPoints), this.y + this.size * Math.sin(2 * i * Math.PI / numPoints));
                                        }
                                        context.strokeStyle = "#000000";
                                        context.lineWidth = 1;
                                        context.stroke();
                                    } else {
                                        ctx.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, false);
                                    }

                                    if (!this.extras.isCoin && this.isVirus && myApp.halloween.virus.enabled) { // pos aki se dibuja el bairus xd
                                        ctx.fillStyle = "rgba(0, 0, 0, 0)";
                                        ctx.strokeStyle = "rgba(0, 0, 0, 0)";
                                        ctx.save();
                                        ctx.globalAlpha = 0.8;
                                        ctx.drawImage(myApp.halloween.virus.img, this.x - this.size, this.y - this.size, 2 * this.size + 80, 2 * this.size + 80);
                                        ctx.restore();
                                    }

                                    if (myApp.isEnableSplitInd) {
                                        if (i) {
                                            if (!isHideSelfName) {
                                                if (this.name || 38 < this.size) {
                                                    arr.push({
                                                        x: this.x,
                                                        y: this.y,
                                                        size: this.size
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    /**************/
                                    if (i) {
                                        if (!isHideSelfName) {
                                            if (this.name || 38 < this.size) {
                                                arr2.push({
                                                    x: this.x,
                                                    y: this.y,
                                                    size: this.size,
                                                    name: this.name
                                                });
                                            }
                                        }
                                    }
                                } else {
                                    this.da();
                                    ctx.beginPath();
                                    var n = this.B();
                                    ctx.moveTo(this.a[0].x, this.a[0].y);
                                    i = 1;
                                    for (; i <= n; ++i) {
                                        c = i % n;
                                        ctx.lineTo(this.a[c].x, this.a[c].y);
                                    }
                                }
                                if (myApp.isEnableCustomSkin && this.extras.skin) {
                                    if (!(this.extras.skin in window.cache_img)) {
                                        window.cache_img[this.extras.skin] = new Image();
                                        window.cache_img[this.extras.skin].src = this.extras.skin;
                                    }
                                    this.skinImage = window.cache_img[this.extras.skin];
                                }
                                if (ctx.closePath(), ctx.globalAlpha = 1, this.isVirus && ctx.stroke(), ctx.fill(), c = null, myApp.isEnableCustomSkin && (this.extras.skin && (this.skinImage.complete && (this.skinImage.src && (this.skinImage.width && (this.skinImage.naturalHeight && this.skinImage.naturalHeight <= 1E3)))))) {
                                    if ($("#team_name").val() == this.extras.team) {
                                        c = this.skinImage;
                                        var size = Math.min(c.width, c.height);
                                        var startX = (c.width - size) / 2;
                                        var offsetY = (c.height - size) / 2;
                                        var y = this.size + 5;
                                    }
                                    /***********************ARREGLANDO TEAMMATE INDICATOR PARA TODOS*************************/
                                    if (myApp.isEnableTeammateIndicator) {
                                        if (myApp.isEnableTeammateIndicator && this.size < myApp.teammateIndicatorShowSize) {
                                            ctx.drawImage(myApp.teammateIndicator, ~~(this.x - 50), ~~(this.y - this.size - 100));
                                        }
                                    }
                                    /***********************ARREGLANDO TEAMMATE INDICATOR PARA TODOS*************************/
                                }
                                if (this.extras.isCoin) {
                                    var c = window.cache_img.coin;
                                    var size = Math.min(c.width, c.height);
                                    var startX = (c.width - size) / 2;
                                    var offsetY = (c.height - size) / 2;
                                    var y = this.size + 5;
                                }
                                if (null != c && (ctx.save(), ctx.clip(), ctx.drawImage(c, startX, offsetY, size, size, this.x - y, this.y - y, 2 * y, 2 * y), ctx.restore()), f || ((doneResults || 15 < this.size) && (y_position || (ctx.strokeStyle = "#000000", ctx.globalAlpha *= 0.1, ctx.stroke())), ctx.globalAlpha = 1), n = -1 != data.indexOf(this), y_position = ~~this.y, f = this.f || (315 < this.size || 18 < this.size * scale), !(isHideSelfName && myApp.isHideSelfName || myApp.isAutoHideName && !f) && (0 != this.id && ((oldStatus || n) && (this.name && (this.k && (null == c || -1 == reserved.indexOf(i))))))) {
                                    c = this.k;
                                    c.u(this.name);
                                    c.G(this.i() / 0.9);
                                    i = 0 >= this.id ? 1 : Math.ceil(10 * scale) / 10;
                                    c.U(i);
                                    c = c.F();
                                    var glockBottomWidth = ~~(c.width / i);
                                    var sh = ~~(c.height / i);
                                    ctx.drawImage(c, ~~this.x - ~~(glockBottomWidth / 2), y_position - ~~(sh / 2), glockBottomWidth, sh);
                                    y_position += c.height / 2 / i + 4;
                                }
                                if (myApp.enableHats) {
                                    if (this.name == hatgratis) {
                                        ctx.drawImage(isfreehat, this.x - this.size, this.y - this.size - this.size * 1.66, 2 * this.size, 2 * this.size);
                                    } else if (this.extras && this.extras.hat) {
                                        var newSize = this.size + 5;
                                        if (myApp.canvasLoaded[this.extras.hat]) {
                                            ctx.drawImage(myApp.canvasLoaded[this.extras.hat], this.x - newSize, this.y - newSize - newSize * 1.66, 2 * newSize, 2 * newSize);
                                        } else {
                                            if (!(this.extras.hat in window.cache_img)) {
                                                window.cache_img[this.extras.hat] = new Image();
                                                window.cache_img[this.extras.hat].src = this.extras.hat;
                                            }
                                            ctx.drawImage(window.cache_img[this.extras.hat], this.x - newSize, this.y - newSize - newSize * 1.66, 2 * newSize, 2 * newSize);
                                        }
                                    }
                                }
                                if (!myApp.isAutoHideMass || f) {
                                    if (myApp.isEnableShowAllMass && this.size > 350) {
                                        if (0 < this.id) {
                                            if ($timeout) {
                                                if (38 < this.size) {
                                                    if (null == this.I) {
                                                        this.I = new module(this.i() / 2, "#FFFFFF", true, "#000000");
                                                    }
                                                    n = this.I;
                                                    n.G(this.i() / 0.8);
                                                    n.u(~~(this.size * this.size / 100));
                                                    i = Math.ceil(10 * scale) / 10;
                                                    n.U(i);
                                                    c = n.F(this.f); //c = n.F();
                                                    glockBottomWidth = ~~(c.width / i);
                                                    sh = ~~(c.height / i);
                                                    //ctx.drawImage(c, ~~this.x - ~~(glockBottomWidth / 2), y_position - ~~(sh / 2.7), glockBottomWidth, sh);
                                                    /*NO LO ELIMINEN PVTOS
                                                    if (this.f) {
                                                        if (myApp.halloween.virus.enabled) {
                                                            ctx.drawImage(c, ~~this.x - ~~(glockBottomWidth / 2) + 40, y_position - ~~(sh / 2) + 40, glockBottomWidth, sh);
                                                        } else {
                                                            ctx.drawImage(c, ~~this.x - ~~(glockBottomWidth / 2), y_position - ~~(sh / 2), glockBottomWidth, sh); // espero que funcione esto para arreglar la posicion de los virus :,v
                                                        }
                                                    } else {
                                                        ctx.drawImage(c, ~~this.x - ~~(glockBottomWidth / 2), y_position - ~~(sh / 10), glockBottomWidth, sh); // sh / 2 
                                                    }*/
                                                    var offset = this.k ? (this.size * 0.09) : 0;
                                                    //ctx.drawImage(c, ~~this.x - ~~(glockBottomWidth / 2), y_position - ~~(sh / 10), glockBottomWidth, sh); 
                                                    ctx.drawImage(c, ~~this.x - ~~(glockBottomWidth / 2), (y_position - ~~(sh / 10)) + offset, glockBottomWidth, sh);
                                                }
                                            }
                                        }
                                    }
                                }
                                ctx.restore();
                            }
                        }
                    }
                };
                module.prototype = {
                    w: "",
                    M: "#000000",
                    O: false,
                    r: "#000000",
                    q: 16,
                    l: null,
                    N: null,
                    h: false,
                    v: 1,
                    G: function(x) {
                        if (5 < Math.abs(x - this.q)) {
                            if (this.q != x) {
                                this.q = x;
                                this.h = true;
                            }
                        }
                    },
                    U: function(v) {
                        if (this.v != v) {
                            this.v = v;
                            this.h = true;
                        }
                    },
                    setStrokeColor: function(r) {
                        if (this.r != r) {
                            this.r = r;
                            this.h = true;
                        }
                    },
                    u: function(n) {
                        var w;
                        if (!isNaN(n)) {
                            if (!isNaN(this.w)) {
                                if (0 != this.w) {
                                    if (0 != n) {
                                        if (this.w != n) {
                                            if (0.012 > Math.abs((n - this.w) / this.w)) {
                                                w = this.w;
                                                this.w = n;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (n != this.w) {
                            this.w = n;
                            this.h = true;
                        }
                        if (w) {
                            this.w = w;
                        }
                    },
                    /*
                    F: function(isVirus) {
                        if (null == this.l && (this.l = document.createElement("canvas"), this.N = this.l.getContext("2d")), this.h) {
                            this.h = false;
                            size = this.l;
                            c = this.N;
                            line = this.w;
                            var blobNick = this.w + "";
                            var line = blobNick;
                            factor = this.v;
                            var y = isVirus ? this.q : this.q / 1.5;
                            font = "bold " + y + "px Ubuntu";
                            c.font = font;
                            var height = ~~(0.2 * y);
                            if (isVirus) {
                                line = ~~((200 - line) / 14);
                                factor *= 2.5;
                            } else {
                                if (!isNaN(parseInt(line))) {
                                    if (myApp.isSimpleMass) {
                                        if ((line = parseInt(line)) > 999) {
                                            line = (line / 1E3).toFixed(1) + "k";
                                        }
                                    }
                                }
                            }
                            size.width = (c.measureText(line).width + 6) * factor;
                            size.height = (y + height) * factor;
                            c.font = font;
                            c.scale(factor, factor);
                            c.globalAlpha = 1;
                            c.fillStyle = $("#NameMassColor").minicolors("value");
                            if (myApp.isShowTextStrokeLine) {
                                c.lineWidth = Math.max(y * 0.12, 12);
                                //c.strokeStyle = this.r;
                                c.strokeStyle = $("#NameMassStrokeColor").minicolors("value");
                                if (this.O) {
                                    c.strokeText(line, 3, y - height / 2);
                                }
                            }
                            c.fillText(line, 3, y - height / 2);
                        }
                        return this.l;
                    }*/
                    F: function(isVirus) {
                        var cellSize = this.q;
                        var line = this.w;
                        var lagOffset = 15;
                        if (isVirus) {
                            line = ~~((200 - line) / 14);
                            factor *= 2.5;
                        } else {
                            if (!isNaN(parseInt(line))) {
                                if (myApp.isSimpleMass) {
                                    if ((line = parseInt(line)) > 999) {
                                        line = (line / 1E3).toFixed(1) + "k";
                                    }
                                }
                            }
                        }
                        var zoomFactor = this.v;
                        var compound = cellSize * zoomFactor;
                        compound = Math.floor(compound / lagOffset) * lagOffset;
                        if (window.nameCache[this.w] && window.nameCache[this.w][compound]) {
                            return window.nameCache[this.w][compound];
                        }
                        this.l = document.createElement("canvas");
                        this.N = this.l.getContext("2d");
                        this.h = false;
                        var size = this.l;
                        var c = this.N;
                        var factor = this.v;
                        var right = this.q;
                        var font = "bold " + right + "px Ubuntu";
                        c.font = font;
                        var left = ~~(0.2 * right);
                        size.width = (c.measureText(line).width + 6) * factor;
                        size.height = (right + left) * factor;
                        c.font = font;
                        c.scale(factor, factor);
                        c.globalAlpha = 1;
                        c.fillStyle = $("#NameMassColor").minicolors("value");
                        if (myApp.isShowTextStrokeLine) {
                            c.lineWidth = 7;
                            c.strokeStyle = $("#NameMassStrokeColor").minicolors("value");
                            if (this.O) {
                                c.strokeText(line, 3, right - left / 2);
                            }
                        }
                        c.fillText(line, 3, right - left / 2);
                        if (!window.nameCache[this.w]) window.nameCache[this.w] = {};
                        window.nameCache[this.w][compound] = this.l;
                        return window.nameCache[this.w][compound];
                    }
                };
                if (!Date.now) {
                    Date.now = function() {
                        return (new Date).getTime();
                    };
                }
                (function() {
                    var vendors = ["ms", "moz", "webkit", "o"];
                    var x = 0;
                    for (; x < vendors.length && !self.requestAnimationFrame; ++x) {
                        self.requestAnimationFrame = self[vendors[x] + "RequestAnimationFrame"];
                        self.cancelAnimationFrame = self[vendors[x] + "CancelAnimationFrame"] || self[vendors[x] + "CancelRequestAnimationFrame"];
                    }
                    if (!self.requestAnimationFrame) {
                        self.requestAnimationFrame = function(callback) {
                            return setTimeout(callback, 1E3 / 60);
                        };
                        self.cancelAnimationFrame = function(id) {
                            clearTimeout(id);
                        }; // suavidad
                    }
                })();
                var a = [];
                var pauseText = 0;
                var col = "#000000";
                var from = false;
                var Bt = false;
                var near = 0;
                var far = 0;
                var name = 0;
                var path = 0;
                var count = 0;
                var connected = true;
                setInterval(function() {
                    if (Bt) {
                        a.push(pick() / 100);
                    }
                }, 1E3 / 60);
                setInterval(function() {
                    var tempCount = endsWith();
                    if (0 != tempCount) {
                        ++name;
                        if (0 == count) {
                            count = tempCount;
                        }
                        count = Math.min(count, tempCount);
                    }
                }, 1E3);
                jQuery(function() {
                    jQuery(init);
                });
            }
        }
    }
}(window, window.jQuery),
myApp.afterGameLogicLoaded(),
    $(document).keydown(function(e) {
        if ("input" != e.target.tagName.toLowerCase() && "textarea" != e.target.tagName.toLowerCase() || 13 == e.keyCode) {
            var username = "";
            if (isValidHotKey(e) && (username = getPressedKey(e)), 18 == e.keyCode && e.preventDefault(), selectedHotkeyRow) {
                //console.log(e + " / " + e.keyCode + " / " + getPressedKey(e) + " / " + username);
                if (46 == e.keyCode) {
                    e.preventDefault();
                    selectedHotkeyRow.find(".hotkey").text(username);
                } else {
                    if ("" != username) {
                        e.preventDefault();
                        var codeSegments = $(".hotkey");
                        var i = 0;
                        for (; i < codeSegments.length; i++) {
                            if ($(codeSegments[i]).text() == username) {
                                return;
                            }
                        }
                        selectedHotkeyRow.find(".hotkey").text(username);
                        selectedHotkeyRow.removeClass("table-row-selected");
                        selectedHotkeyRow = null;
                    }
                }
            }
            if ("" != username) {
                if (hotkeyMapping[username]) {
                    e.preventDefault();
                    if (hotkeyConfig[hotkeyMapping[username]]) {
                        if (hotkeyConfig[hotkeyMapping[username]].keyDown) {
                            hotkeyConfig[hotkeyMapping[username]].keyDown();
                        }
                    }
                }
            }
        }
    }),
    $(document).keyup(function(e) {
        if ("input" != e.target.tagName.toLowerCase() && "textarea" != e.target.tagName.toLowerCase() || 13 == e.keyCode) {
            var rt = "";
            if (isValidHotKey(e)) {
                rt = getPressedKey(e);
            }
            if ("" != rt) {
                if (hotkeyMapping[rt]) {
                    e.preventDefault();
                    if (hotkeyConfig[hotkeyMapping[rt]]) {
                        if (hotkeyConfig[hotkeyMapping[rt]].keyUp) {
                            hotkeyConfig[hotkeyMapping[rt]].keyUp();
                        }
                    }
                }
            }
        }
    }),
    $("#overlays2").mousedown(function(e) {
        if (0 === e.button) {
            if (myApp.isEnableMouseW) {
                if ("input" != e.target.tagName.toLowerCase() || "textarea" != e.target.tagName.toLowerCase()) {
                    myApp.autoW = true;
                    handleQuickW();
                    e.preventDefault();
                }
            }
        } else {
            if (2 === e.button) {
                $("#opt_chatbox").click();
            }
        }
    }),
    $("#overlays2").mouseup(function(e) {
        if (0 === e.button) {
            if (myApp.isEnableMouseW) {
                if ("input" != e.target.tagName.toLowerCase()) {
                    if ("textarea" != e.target.tagName.toLowerCase()) {
                        myApp.autoW = false;
                        e.preventDefault();
                    }
                }
            }
        }
    });
var escapeHtml = function() {
    var buf = {
        '"': "&quot;",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    };
    return function(messageFormat) {
        return messageFormat.replace(/[\"&<>]/g, function(off) {
            return buf[off];
        });
    };
}();
var disconnectTimeout;
$(window).focus(function() {
    isWindowFocus = true;
    if (disconnectTimeout) {
        clearTimeout(disconnectTimeout);
    }
}).blur(function() {
    isWindowFocus = false;
}), jQuery.cachedScript = function(url, options) {
    return options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
    }), jQuery.ajax(options);
}, drawMinimapNodes(), updateGameInfoDiv(), clearOldNodesData(), updateLbDiv(), updateScoreDiv(), $.cachedScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.8/js/min/perfect-scrollbar.jquery.min.js").done(function(dataAndEvents, deepDataAndEvents) {
    chatRoom.createScrollBar();
}), $.cachedScript('assets/js/jquery.toast.min.js').done(function(dataAndEvents, deepDataAndEvents) {
    var restoreScript;
    for (; restoreScript = toastQueue.shift();) {
        chatRoom.popup(restoreScript);
    }
});
$("#backgroundColor").minicolors({
    defaultValue: getLocalStorage("backgroundColor") || "rgba(17, 17, 17, 1)",
    change: function(v, start1) {
        setLocalStorage("backgroundColor", v);
        $("body").css("background-color", v);
    }
}), $("body").css("background-color", getLocalStorage("backgroundColor") || "rgba(17, 17, 17, 1)"), $("#borderColor").minicolors({
    defaultValue: getLocalStorage("borderColor") || "rgba(21, 101, 192, 1)",
    change: function(v, start1) {
        setLocalStorage("borderColor", v);
    }
}), $("#pelletColor").minicolors({
    defaultValue: getLocalStorage("pelletColor") || "rgba(21, 101, 192, 1)",
    change: function(v, start1) {
        setLocalStorage("pelletColor", v);
    }
}), $("#locationColor").minicolors({
    defaultValue: getLocalStorage("locationColor") || "rgba(36, 36, 36, 1)",
    change: function(v, start1) {
        setLocalStorage("locationColor", v);
    }
}), $("#gridColor").minicolors({
    defaultValue: getLocalStorage("gridColor") || "rgba(36, 36, 36, 1)",
    change: function(v, start1) {
        setLocalStorage("gridColor", v);
    }
}), $("#toastbackground").minicolors({
    defaultValue: getLocalStorage("toastbackground") || "rgba(36, 36, 36, 0.44)",
    change: function(v, start1) {
        setLocalStorage("toastbackground", v);
    }
}), $("#cursorlinecolor").minicolors({
    defaultValue: getLocalStorage("cursorlinecolor") || "#fff",
    change: function(v, start1) {
        setLocalStorage("cursorlinecolor", v);
    }
}), $("#virusColor").minicolors({
    defaultValue: getLocalStorage("virusColor") || "rgba(21, 105, 161, 0.13)",
    change: function(v, start1) {
        setLocalStorage("virusColor", v);
    }
}), $("#virusStrokeColor").minicolors({
    defaultValue: getLocalStorage("virusStrokeColor") || "rgba(20, 100, 161, 1)",
    change: function(v, start1) {
        setLocalStorage("virusStrokeColor", v);
    }
}), $("#minimapOwnCell").minicolors({
    defaultValue: getLocalStorage("minimapOwnCell") || "rgba(0, 150, 136, 1)",
    change: function(v, start1) {
        setLocalStorage("minimapOwnCell", v);
    }
}), $("#minimapTeamColor").minicolors({
    defaultValue: getLocalStorage("minimapTeamColor") || "rgba(21, 101, 192, 1)",
    change: function(v, start1) {
        setLocalStorage("minimapTeamColor", v);
    }
}), $("#minimapNames").minicolors({
    defaultValue: getLocalStorage("minimapNames") || "rgba(255, 255, 255, 1)",
    change: function(v, start1) {
        setLocalStorage("minimapNames", v);
    }
}), $("#minimapLastDeath").minicolors({
    defaultValue: getLocalStorage("minimapLastDeath") || "#2ffc33",
    change: function(v, start1) {
        setLocalStorage("minimapLastDeath", v);
    }
}), $("#NameMassColor").minicolors({
    defaultValue: getLocalStorage("NameMassColor") || "#fff",
    change: function(v, start1) {
        setLocalStorage("NameMassColor", v);
    }
}), $("#NameMassStrokeColor").minicolors({
    defaultValue: getLocalStorage("NameMassStrokeColor") || "#000",
    change: function(v, start1) {
        setLocalStorage("NameMassStrokeColor", v);
    }
});

function addBestPlayerInfo(bestPlayerInfo) {
    var player = JSON.parse(bestPlayerInfo);
    var nickname = player.nickname;
    var score = player.score;
    $("#bestPlayer").fadeIn("slow");
    $("#bestPlayer").html('Best Player: <span class="bestPlayer">' + nickname + '</span> [' + score + ']' + '<img class="bestplayerimg" src="assets/img/bp-icon.png" />');
}

function parseSettings(e, t) {
    return "save" === t ? "string" == typeof e ? e : JSON.stringify(e) : "string" != typeof e ? JSON.stringify(e) : "true" == e || "false" == e ? JSON.parse(e) : e
}
/*
if ("FB" in window) {
    FB.Event.subscribe('edge.create', function(href, widget) { // esto se acciona when el pavo da like a la pagina xd
        alert("le has dado a like :v");
    });
}*/

/*
jQuery(document).ready(function() {
    var audio = new Audio('assets/img/HalloweenSound.mp3');
    audio.play();
    setTimeout(function() {
        $("#ghostSusto").fadeIn();
        $("#ghostSusto").addClass("susto");
        setTimeout(function() {
            $("#ghostSusto").fadeOut();
            $("#ghostSusto").removeClass("susto");
        }, 35e2);
    }, 2e3);
});*/