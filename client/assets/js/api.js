var apiurl = "http://api.duex.io/minish";
var CurrentHat = false,
    RainbowColor = false;
function updatePlayerDetails() {
    var jwt = $("#jwt").val();
    if (!jwt) {
        console.log('skipped updating player info, no token to decode.');
        return;
    }
    var decoded = jwt_decode(jwt);
    var url = 'http://api.duex.io/minish/api/users/' + decoded.sub + '/score';
    var method = 'GET';
    var data = '';
    var success = function(response) {
        userid = decoded.sub;
        $(".fbid").text(userid);
        if (response.success) {
            /*
            var porc = (response.nextLevel - response.score) / 100;
            var x = response.level;
            $(".skillbar.clearfix ").attr("data-percent", ""+x+"%");
            jQuery('.skillbar').each(function(){
                jQuery(this).find('.skillbar-bar').animate({
                    width:jQuery(this).attr('data-percent')
                },3000);
            });
            $(".skill-bar-percent").text("" + porc + "%");
            $(".skillbar-title span").text("" + response.score + " / " + response.nextLevel + " XP");

            var i = 0;
            var razon = parseInt(Math.sqrt(response.score));
            
            var interval = setInterval(function() {
                //$(".skillbar-title span").text(i + " / " + requiredExperience + " XP");
                $(".skillbar-title span").text(i + " / " + response.nextLevel + " XP");
                i = parseInt(i) + parseInt(razon);
                if (i > response.score) {
                    clearInterval(interval);
                    $(".skillbar-title span").text(response.score + " / " + response.nextLevel + " XP");
                    
                }
            }, (1000 / parseInt(response.score)) * razon * 0.2); // Para que demore 1 segundos en total
            */
            if (response.level > 100) {
                $("#lvlc .uk-progress").attr("max", 200);
            } else if (response.level > 200) {
                $("#lvlc .uk-progress").attr("max", 300);
            } else if (response.level > 300) {
                $("#lvlc .uk-progress").attr("max", 400);
            } else if (response.level > 400) {
                $("#lvlc .uk-progress").attr("max", 500);
            } else {
                $("#lvlc .uk-progress").attr("max", 100);
            }
            $("#lvlc .uk-progress").attr("value", response.level);            
            $('#levelnumber').text(response.level);
            $("#lvl").attr('data-all-xp', response.score).html('Level ' + response.level);
            var coin;
            var numero = response.currency;
            coin = numero.toLocaleString();
            $("#coinamount").text(coin);
            $("#kpx-coins").text(response.currency);
            $("#coin-modal").text(response.currency);
            CurrentHat = response.hat;
            RainbowColor = response.rcu;
        }
        getupgrades(userid);// no hide :v
    }
    var failure = function(error) {
        console.log('update player info failed with error:');
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    apicall(url, method, data, success, failure)
}

function getJWT(userid, accesstoken) {
    jwt = null; // flush out our jwt.
    var url = 'http://api.duex.io/minish/api/auth/facebook';
    var method = 'POST';
    var data = {
        userID: userid,
        accessToken: accesstoken,
    };
    var success = function(response) {
        if (!response.token) {
            console.log('webservice failed to provide JWT');
            if (response.message) {
                $('#coingrid').fadeOut('fast');
                console.log("Could not log in via facebook: ", response.message, "error");
            }
        } else {
            jwt = response.token;
            var jwt2 = response.token.split(/[.]/);
            console.log("%ctoken:", "font-weight:bold;");
            console.log("%c" + jwt2[0] + ".%c" + jwt2[1] + ".%c" + jwt2[2], "font-size:10px;color:#fb015b;", "font-size:10px;color:#d63aff;", "font-size:10px;color:#00b9f1;", '');
            $("#jwt").val(jwt);
            // Store
            localStorage.setItem("jwt", jwt);
            // Retrieve
            var decoded = jwt_decode(jwt);
            //console.log(decoded);
            userid = decoded.sub;
            //$('#coinswidget .modal-body').append('<iframe src="https://api.paymentwall.com/api/?key=5d6242e544963c739e2c1d0288a15279&uid=' + userid + '&widget=w6_1" width="" height="" style="width:100%;height:100%;min-width:800px;min-height:640px;" frameborder="0"></iframe>');
                        getupgrades(userid);//no hide xd
            //If User is banned
            //if (decoded.isBanned) {
                //document.open();
                //document.write('<img src="/assets/img/baneado.png"><br><br>');
                //document.write('<a href="/banned/' + decoded.validFrom + '">Clic for reason</a><br><br>');
                //document.close();
            //}
            updatePlayerDetails();
            // try to renew the users JWT every 20 minutes
            setInterval(renewJWT, 20 * 60 * 1000);
        }
    }
    var failure = function(error) {
        console.log('login failed with error:');
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    // run the api call specified and wait for its response
    apicall(url, method, data, success, failure)
}

//Get upgrades
function getupgrades(userid) {
    $.getJSON(apiurl + "/api/users/" + userid + "/upgrades", function(data) {
        //console.log(data);
        var timenow = data.now.date
        for (i = 0; i < data.upgrades.length; i++) {
            var upgrade = data.upgrades[i].claims;
            var expiring = data.upgrades[i].expires_at;
            //date handler
            var timeStartOffset = new Date(timenow).getTimezoneOffset();
            var neutral = Math.abs(timeStartOffset);
            var timeEnd = new Date(expiring).getTime();
            if (timeStartOffset < 0) {
                var inms = neutral * 60000;
                var timeEnd = timeEnd + inms;
            } else {
                var inms = neutral * 60000;
                var timeEnd = timeEnd - inms;
            };
            if (upgrade.hasOwnProperty('startMass')) {
                $(".info").html('Your Start Mass: <span>' + data.upgrades[i].claims.startMass + '</span> for <span id="clock"></span>');
                $('.info #clock').countdown(timeEnd, function(event) {
                    $(this).html(event.strftime('%H:%M:%S'));
                });
                //$('.btn-buy').attr('disabled', 'disabled').attr("onclick", '').css('cursor', 'default');
            } else if (upgrade.hasOwnProperty('nameColor')) {
              var style = 'rgb('+upgrade.nameColor.r+', '+upgrade.nameColor.g+', '+upgrade.nameColor.b+')';
              var style2 = 'rgb('+upgrade.nameColor.r+', '+upgrade.nameColor.g+', '+upgrade.nameColor.b+', 255)';
              $('#lbcolorpicker').val(style).css('background-color', style).attr("placeholder", style2);
              $('.btn-tobuylb').attr("onclick", "changeColor($(this).val())").text('Change for free');
            } else if (upgrade.hasOwnProperty('hat')) {
                if( !$('#'+data.upgrades[i].claims.hat).length ) {
                    createDivHat(data.upgrades[i].claims.hat);
                } else {
                    if(CurrentHat == data.upgrades[i].claims.hat) {
                        $('#'+data.upgrades[i].claims.hat).addClass('removeHat');
                        $('#'+data.upgrades[i].claims.hat).html('Remove');
                        $('#'+data.upgrades[i].claims.hat).attr("onclick","removeHat()");
                    } else {
                        $('#'+data.upgrades[i].claims.hat).removeClass('removeHat');
                        $('#'+data.upgrades[i].claims.hat).html('Select');
                        $('#'+data.upgrades[i].claims.hat).attr("onclick","selectHat('"+data.upgrades[i].claims.hat+"')");
                    }
                }
            } else if (upgrade.hasOwnProperty('nameColorR')) {
                if(RainbowColor) {
                    $('.btn-tobuylbr').attr("onclick", "removeRainbow()").text('Remove');
                } else {
                    $('.btn-tobuylbr').attr("onclick", "useRainbow()").text('Use');
                }
            }
        }
    });
}

// Update the players JWT by using their EXISTING jwt.
function renewJWT() {
    console.log('attempting to auto-renew token');
    var url = 'http://api.duex.io/minish/api/auth/renew';
    var method = 'GET';
    var data = '';
    var success = function(response) {
        if (!response.token) {
            console.log('webservice failed to provide JWT');
        } else {
            jwt = response.token;
            console.log('renew successful, got jwt token: ' + jwt);
            $("#jwt").val(jwt);
        }
    }
    var failure = function(error) {
        console.log('renew failed with error:');
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    // run the api call specified and wait for its response
    apicall(url, method, data, success, failure)
}
// Free coins per hour
function freeDailyCoins() {
    var url = 'http://api.duex.io/minish/api/users/freecoins';
    var method = 'POST';
    var data = '';
    var success = function(response) {
        if (response.success) {
            swal("Free Coins", "You get your daily 100 coins, you can get this again next hour", "success")
            renewJWT();
            updatePlayerDetails();
        } else {
            swal("Free Coins", response.message, "error");
        }
    }
    var failure = function(error) {
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    // run the api call specified and wait for its response
    apicall(url, method, data, success, failure)
}
// Buy mass upgrade
function buyMass(multiplier) {
    console.log('attempting to buy mass');
    var url = 'http://api.duex.io/minish/api/users/buyupgrade';
    var method = 'POST';
    var data = {
        type: 'mass' + multiplier,
    };
    var success = function(response) {
        if (response.success) {
            swal("Purchase Successful", "Reconnect to a server for it to take effect", "success")
            renewJWT();
            updatePlayerDetails();
        } else {
            swal("Purchase Failed ", response.message, "error");
        }
    }
    var failure = function(error) {
        console.log('renew failed with error:');
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    // run the api call specified and wait for its response
    apicall(url, method, data, success, failure)
}
function buyHat(hn) {
    console.log('attempting to buy hat');
    var url = 'http://api.duex.io/minish/api/users/buyupgrade';
    var method = 'POST';
    var data = {
        type: 'hat',
        hat: hn
    };
    var success = function(response) {
        if (response.success) {
            swal("Purchase Successful", "Reconnect to a server for it to take effect", "success")
            if(CurrentHat != "No") {
                $('#'+CurrentHat).removeClass('removeHat');
                $('#'+CurrentHat).attr("onclick","selectHat('"+CurrentHat+"')");
                $('#'+CurrentHat).html('Select');
            }
            CurrentHat = hn;
            $('#'+hn).addClass('removeHat');
            $('#'+hn).html('Remove');
            $('#'+hn).attr("onclick","removeHat()");
            renewJWT();
            updatePlayerDetails();
        } else {
            swal("Purchase Failed ", response.message, "error");
            console.log("Purchase Failed ", response.message, "error");
        }
    }
    var failure = function(error) {
        console.log('renew failed with error:');
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    // run the api call specified and wait for its response
    apicall(url, method, data, success, failure)
}
function createDivHat(hl) {
    if( !$('#'+hl+'').length ) {
        if( !$('#customhats').length) {
            $('#buyHatsModalBody').append('<div id="customhats"></div>');
        }
        var hatlink = false;
        if(myApp.canvasLoaded[hl])
        {
            hatlink = myApp.canvasLoaded[hl].src;
            onselect = "selectHat('"+hl+"');";
        } else {
            hatlink = hl;
            onselect = "selectHat('"+hl+"');";
        }
        $('#customhats').append('<div class="hat-card"> <img src="'+hatlink+'" style="transform: scale(0.8);">'+
                                    '<h4 class="hat-name">Custom Hat</h4> <button id="'+hl+'" class="btn btn-hat" onclick="'+onselect+'">Select</button></div>');
    }
}
function selectHat(hl) {
    var url = 'http://api.duex.io/minish/api/users/changehat';
    var method = 'POST';
    var data = {
        hat: hl
    };
    var success = function(response) {
        if (response.success) {
            swal("Hat Changed", "Reconnect to a server for it to take effect", "success")
            if( !$('#'+hl+'').length ) {
                createDivHat(hl);
            } else {
                if(CurrentHat != "No") {
                    $('#'+CurrentHat).removeClass('removeHat');
                    $('#'+CurrentHat).attr("onclick","selectHat('"+CurrentHat+"')");
                    $('#'+CurrentHat).html('Select');
                }
                CurrentHat = hl;
                $('#'+hl).addClass('removeHat');
                $('#'+hl).html('Remove');
                $('#'+hl).attr("onclick","removeHat()");
            }
        } else {
            swal("Change Failed ", response.message, "error");
        }
    }
    var failure = function(error) {
        console.log('renew failed with error:');
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    // run the api call specified and wait for its response
    apicall(url, method, data, success, failure)
}
function removeHat() {
    var url = 'http://api.duex.io/minish/api/users/removehat';
    var method = 'POST';
    var data = {};
    var success = function(response) {
        if (response.success) {
            swal("Hat Removed", "Reconnect to a server for it to take effect", "success")
            if( !$('#'+CurrentHat+'').length ) {
                createDivHat(CurrentHat);
            } else {
                if(CurrentHat != "No") {
                    $('#'+CurrentHat).removeClass('removeHat');
                    $('#'+CurrentHat).attr("onclick","selectHat('"+CurrentHat+"')");
                    $('#'+CurrentHat).html('Select');
                }
                CurrentHat = "No";
            }
        } else {
            swal("Change Failed ", response.message, "error");
            console.log("Change Failed ", response.message, "error");
        }
    }
    var failure = function(error) {
        console.log('renew failed with error:');
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    // run the api call specified and wait for its response
    apicall(url, method, data, success, failure)
}

// Buy upgrade
function buyBots(multiplier) {
    console.log('attempting to buy bots');
    var url = 'http://api.duex.io/minish/api/users/buyupgrade';
    var method = 'POST';
    var data = {
        type: 'bots' + multiplier,
    };
    var success = function(response) {
        console.log('http response ok');
        console.log(response);
        if (response.success) {
            swal("Purchase Successful", "Reconnect to a server for it to take effect", "success")
            renewJWT();
            updatePlayerDetails();
        } else {
            swal("Purchase Failed ", response.message, "error");
        }
    }
    var failure = function(error) {
        console.log('renew failed with error:');
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    // run the api call specified and wait for its response
    apicall(url, method, data, success, failure)
}

function buyColor(color) {
    var url = 'http://api.duex.io/minish/api/users/buyupgrade';
    var method = 'POST';
    var c = color.slice(4, -1).split(',');
    var data = {
        type: 'color',
        color: c
    };
    var success = function(response) {
        if (response.success) {
            swal("Purchase Successful", "Reconnect to a server for it to take effect", "success")
            renewJWT();
            updatePlayerDetails();
        } else {
            swal("Purchase Failed ", response.message, "error");
        }
    }
    var failure = function(error) {
        console.log('renew failed with error:');
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    var colorsum = c[0] + c[1] + c[2];
    if (colorsum < 100) {
        swal("Purchase Failed ", "Color is too dark", "error");
    } else {
        apicall(url, method, data, success, failure)
    }
    // run the api call specified and wait for its response
}
function buyRainbowColor() {
    var url = 'http://api.duex.io/minish/api/users/buyupgrade';
    var method = 'POST';
    var data = {
        type: 'rainbowcolor'
    };
    var success = function(response) {
        if (response.success) {
            swal("Purchase Successful", "Reconnect to a server for it to take effect", "success")
            renewJWT();
            updatePlayerDetails();
        } else {
            swal("Purchase Failed ", response.message, "error");
        }
    }
    var failure = function(error) {
        console.log('renew failed with error:');
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    apicall(url, method, data, success, failure)
    // run the api call specified and wait for its response
}
function changeColor(){
  var color = $('#lbcolorpicker').val();
  if (color == ""){
    var color = "rgb(90,90,90)";
  }
  var url = '/api/users/changecolor';
  var method = 'POST';
  var c = color.slice(4, -1).split(',');
  console.log(c);
  var colorsum = c[0] + c[1] + c[2];
  if (colorsum < 100){
    swal("Purchase Failed ", "Color is too dark", "error");
  }else {
    swal({
      title: 'Are you sure?',
      text: 'you want to change your color to: ' + color,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No!'
    }).then(
      function(result) {
        var callurl = apiurl + url + "?token=" + jwt + "&r=" + c[0] + "&g=" + c[1] + "&b=" + c[2];
        $.ajax({
      type: "GET",
      url: callurl,
      success: function(data) {
        if(data.success){
          swal("Success", "Your color was changed!", "success");
        }else {
          swal("Oops...", data.message + "</br></br> you can only change it once per week", "error");
        }
       }
    });

      }, function(dismiss) {
      }
    );
  }
}
function useRainbow() {
    var url = 'http://api.duex.io/minish/api/users/userRainbow';
    var method = 'POST';
    var data = {};
    var success = function(response) {
        if (response.success) {
            swal("Rainbow Color in use", "Reconnect to a server for it to take effect", "success")
            RainbowColor = true;
            $('.btn-tobuylbr').attr("onclick", "removeRainbow()").text('Remove');
        } else {
            swal("Failed ", response.message, "error");
        }
    }
    var failure = function(error) {
        console.log('renew failed with error:');
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    // run the api call specified and wait for its response
    apicall(url, method, data, success, failure)
}
function removeRainbow() {
    var url = 'http://api.duex.io/minish/api/users/removeRainbow';
    var method = 'POST';
    var data = {};
    var success = function(response) {
        if (response.success) {
            swal("Rainbow Color Removed", "Reconnect to a server for it to take effect", "success");
            RainbowColor = false;
            $('.btn-tobuylbr').attr("onclick", "useRainbow()").text('Use');
        } else {
            swal("Failed ", response.message, "error");
        }
    }
    var failure = function(error) {
        console.log('renew failed with error:');
        var message = JSON.parse(error.responseText);
        console.log(message);
    }
    // run the api call specified and wait for its response
    apicall(url, method, data, success, failure)
}
function buyCoins(paquete) {
    var jwt = $("#jwt").val();
    var url = 'http://api.duex.io/minish/buycoins/?token='+jwt+'&action=process&paquete='+paquete;
    window.open(url,'Pago', 'width=800, height=600');
}
// dumb wrapper for api calls because im lazy and bad at javascript
function apicall(url, method, data, goodcall, badcall) {
    // if we have a JWT set, send it with the request
    if (jwt != null) {
        url = url + '?token=' + jwt;
    }
    //console.log('SENT:' + method + ' ' + url + ' DATA: ' + JSON.stringify(data));
    // call the ajax and wait for it to complete
    var ajaxCall = $.ajax({
        url: url,
        method: method,
        data: data,
        success: function(data) {
            //pagelog(2,'RECV: ' + JSON.stringify(data));
            // this is some optional code to capture updated auth tokens as we make calls
            var responseHeaders = ajaxCall.getAllResponseHeaders();
            var regex = /authorization: Bearer ([a-zA-Z0-9_\-]*\.[a-zA-Z0-9_\-]*\.[a-zA-Z0-9_\-]*)/;
            if (responseHeaders.match(regex)) {
                jwt = responseHeaders.match(regex)[1];
                console.log('api auth token updated: ' + jwt);
            } else {
                //console.log('api auth token not updated after this call');
            }
            // invoke the success callback function
            goodcall(data);
        },
        error: function(error, errorThrown) {
            //pagelog(2,'ERROR: ' + JSON.stringify(error) + 'error: ' + JSON.stringify(errorThrown));
            // invoke the failure callback function
            badcall(error);
        }
    });
}

window.closeOverlayXP = function() {
    $("#ranking-title").text("Top 20 Best Players");
    $("#xpranking").hide();
    $("#rankingContainer").show();
}

window.closeOverlayCoins = function() {
    $("#ranking-title").text("Top 20 Best Players");
    $("#coinsranking").hide();
    $("#rankingContainer").show();
}

window.getLevel = function(xp) {
    return Math.round(Math.sqrt(xp)*0.13);
};

window.escapeHTML = function(a) {
    return a.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

window.loadRanking = function(filter) {
    $.ajax({
        type: "GET",
        url: "http://api.duex.io/faber/ranking/index.php?filter=" + filter,
    }).done(function(result) {
        result = JSON.parse(result);
        console.log(result)
        if (filter === "lvl") {
            var html = '<a onclick="closeOverlayXP();"><i class="fa fa-angle-left" aria-hidden="true"></i></a><center><table style="border-spacing: 15px;border-collapse: separate;color: #fff;text-shadow: #333 3px 3px 1px;border-spacing: 15px;"><tr><th style="margin-left: 14%;">POSITION</th><th style="margin-left: 15%;">PLAYER</th><th style="margin-left: 15%;">EXPERIENCE</th><th style="margin-left: 15%;">LEVEL</th></tr>';
    
            $("#rankingContainer").hide();
            $("#xpranking").show();
            $("#ranking-title").text("TOP 50 LEVEL PLAYERS");
    
            for (var i = 0; i < 50; i++) {
                if (result[i].SkinUrl.toString().match(/\.png|\.jpg|\.jpeg/g)) {
                    html += `<tr>
                        <td>${i + 1}. <img src="${result[i].SkinUrl}" style="width: 40px; height: 40px; border-radius: 50px; margin-left: 5px;"></td>
                        <td>${escapeHTML(result[i].Nick)}</td>
                        <td>${result[i].XP}</td>
                        <td>${getLevel(result[i].XP)}</td>
                    </tr>`;
                } else {
                    html += `<tr>
                        <td>${i + 1}. <img src="https://cdn.discordapp.com/icons/358106359322902539/9e68bbe2932502906ba2605c4c8c9f32.png" style="width: 40px; height: 40px; border-radius: 50px; margin-left: 5px;"></td>
                        <td>${escapeHTML(result[i].Nick)}</td>
                        <td>${result[i].XP}</td>
                        <td>${getLevel(result[i].XP)}</td>
                    </tr>`;
                }
                if (i === 51) html += "</table></center>"
                $("#xpranking").html(html);
            }
        } else if (filter === "coins") {
            var html = '<a onclick="closeOverlayCoins();"><i class="fa fa-angle-left" aria-hidden="true"></i></a><center><table style="border-spacing: 15px;border-collapse: separate;color: #fff;text-shadow: #333 3px 3px 1px;border-spacing: 15px;"><tr><th style="margin-left: 14%;">POSITION</th><th style="margin-left: 15%;">PLAYER</th><th style="margin-left: 15%;">COINS</th><th style="margin-left: 15%;">LEVEL</th></tr>';
    
            $("#rankingContainer").hide();
            $("#coinsranking").show();
            $("#ranking-title").text("TOP 50 RICHEST PLAYERS");
    
            for (var i = 0; i < 50; i++) {
                if (result[i].SkinUrl || result[i].SkinUrl.match(/\.png|\.jpg|\.jpeg/g)) { // matchear si es una skin
                    html += `<tr>
                        <td>${i + 1}. <img src="${result[i].SkinUrl}" style="width: 40px; height: 40px; border-radius: 50px; margin-left: 5px;"></td>
                        <td>${escapeHTML(result[i].Nick)}</td>
                        <td>${result[i].Monedas}</td>
                        <td>${getLevel(result[i].XP)}</td>
                    </tr>`;
                } else {
                    console.log(result[i]);
                    html += `<tr>
                        <td>${i + 1}. <img src="https://cdn.discordapp.com/icons/358106359322902539/9e68bbe2932502906ba2605c4c8c9f32.png" style="width: 40px; height: 40px; border-radius: 50px; margin-left: 5px;"></td>
                        <td>${escapeHTML(result[i].Nick)}</td>
                        <td>${result[i].Monedas}</td>
                        <td>${getLevel(result[i].XP)}</td>
                    </tr>`;
                }
                if (i === 51) html += "</table></center>"
                $("#coinsranking").html(html);
            }
        }
    });
}