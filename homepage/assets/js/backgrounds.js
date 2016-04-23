var darkSoulsIII = "https://d1r7xvmnymv7kg.cloudfront.net/sites_products/darksouls3/uploads/2015/06/bg_home_character.png"

var dota2 = "http://i47.tinypic.com/yexih.png"

var counterStrike = "http://easyelo.com/img/images/connection-br.png"

var ark = "https://arkforum.de/index.php/Attachment/1855-carno-png/"

var rocketLeague = "https://www.rocketleagueesports.com/assets/rls1/hero-cars-c35264318b0e9aaf51e6118dbdc802063622039a6cb684490f97fedea7d034ac.png"

var imageURLs = [ darkSoulsIII, dota2, counterStrike, rocketLeague, ark];


function getRandomNumber() {
  return Math.floor(Math.random() * imageURLs.length);
}

var frame = document.getElementById('header')

frame.style.backgroundImage = 'url(' + imageURLs[getRandomNumber()] + '), url(./assets/images/bg-small.jpg)';
frame.style.backgroundSize = "cover";
frame.style.backgroundRepeat = "no-repeat";
frame.style.backgroundPosition = "50% -70px";
frame.style.backgroundAttachment = "fixed";