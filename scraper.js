var rp = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');

var icon;
var passiveName = [];
var heroName = [];

function getHeroNames() {
  let counter = 0;
  rp('https://feheroes.gamepedia.com/List_of_Heroes')
      .then((html) => {
        let $ = cheerio.load(html);
        //console.log(html);
        $('td').each(function(i, element) {
          var a = $(this).prev();

          //4: Name, 0: Desc, 1: SP
          if(counter===0) {
            counter++
          } else if(counter===1) {
            counter++
          } else if(counter===2) {
            heroName.push(a.text())
            counter++
          } else if(counter===3) {
            counter++
          } else if(counter===4) {
            counter++;
          } else if(counter===5) {
            counter++;
          } else if(counter===6) {
            counter=0;
          }
        })

        let hname = "";

        for(i=0;i<heroName.length;i++) {
          hname += '"' + heroName[i] + '"' + ', '
          console.log(heroName[i])
        }
        console.log(heroName.length)

        fs.writeFile("hero_name.js", 'var heroNames = ' + '[' + hname + ']', function (err) {
          if(err) {
            return console.log(err)
          }
        })
      }).catch(console.error.bind(console));
}

function getWeapons() {

}

function getPassiveNames() {
  var counter=0;

  rp('https://feheroes.gamepedia.com/Passives')
      .then((html) => {
        let $ = cheerio.load(html);
        //console.log(html);
        $('td').each(function(i, element) {
          var a = $(this).prev();
          if(a.text()==='Armored Boots') {
            return false
          }
          //4: Name, 0: Desc, 1: SP
          if(counter===0) {
            counter++
          } else if(counter===1) {
            counter++
          } else if(counter===2) {
            counter++
          } else if(counter===3) {
            let name = a.text().replace(/[0-9]/g,'').trim();
            name = name.replace("+", "Plus");

            if(passiveName[passiveName.length-1] !== name)
            {
              passiveName.push(name)
            }
            counter++
          } else if(counter===4) {
            counter=0;
          }
          //console.log(counter + ": " + a.text())
        })

        let pname = "";

        for(i=0;i<passiveName.length;i++) {
          pname += '"' + passiveName[i] + '"' + ', '
        }

        fs.writeFile("passives_name.js", 'var passiveNames = ' + '[' + pname + ']', function (err) {
          if(err) {
            return console.log(err)
          }
        })
      }).catch(console.error.bind(console));
}

function getSpecials() {

}

function getAssists() {

}

getHeroNames();
