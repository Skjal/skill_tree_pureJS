var skillTree = {

  pointsLeft: 30,

  strength: {
    tierLevel: 1,
    statPoints: 0,
    skills: {
      madness: 0,
      turboSwings: 0,
      volcanoSlash: 0,
      swiftness: 0,
      throatCutting: 0,
      upperCut: 0
    }
  },

  agility: {
    tierLevel: 1,
    statPoints: 0,
    skills: {
      thousandDaggers: 0,
      parade: 0,
      backstab: 0,
      magicStab: 0,
      meditation: 0,
      death: 0
    }
  },

  magic: {
    tierLevel: 1,
    statPoints: 0,
    skills: {
      supersonicElectronic: 0,
      electricVengeance: 0,
      cursedLightning: 0,
      lightningBolt: 0,
      supernova: 0,
      star: 0
    }
  }
}

// FUNCTION FOR UNLOCKING TIER

function tierUnlock(tier, path, pointsLeft) {

  if (parseInt(tier) < skillTree[path].tierLevel) {
    return true;
  }else if (parseInt(tier) === skillTree[path].tierLevel && pointsLeft > 0) {
    skillTree[path].tierLevel +=1;
    if (skillTree[path].tierLevel < 5) {  //IF YOU ARE NOT AT LAST TIER
      var getTier = document.querySelector('#' + path + ' .\\3' + skillTree[path].tierLevel + '_tier');
      getTier.firstChild.className += ' unlocked'
      if (getTier.firstChild.nextSibling.nextSibling){ //IF SKILL HAS SIBLING SKILL
        getTier.firstChild.nextSibling.nextSibling.className += ' unlocked';
      }
    }
    return true;
  } else {
    return false;
  }
}

// CLICK EVENT

var skillEvent = document.getElementsByClassName('skill');

for (i = 0; i < skillEvent.length; i++) {

  skillEvent[i].addEventListener('click', function() {
    var path = this.parentNode.parentNode.getAttribute('id');
    var skillPath = this.getAttribute('data-skill');
    var tier = this.getAttribute('data-skill-level');
    var pointsLeft = skillTree.pointsLeft;

    if (tierUnlock(tier, path, pointsLeft)) {
      if (skillTree[path].skills[skillPath] >= 3 || pointsLeft === 0) {
        return;
      } else {
        skillTree[path].skills[skillPath] +=1;
        skillTree[path].statPoints +=1;
        skillTree.pointsLeft -=1;
        this.firstChild.firstChild.textContent = skillTree[path].skills[skillPath];
        this.parentNode.parentNode.firstChild.textContent = skillTree[path].statPoints;
        document.querySelector('#sp_counter').textContent = skillTree.pointsLeft;
      }
    }
  }, false);
}

//RESET BUTTON

var resetButton = document.getElementById('reset');

resetButton.addEventListener('click', function() {
  var unlockedRemove = document.querySelectorAll('.unlocked');

  for (i = 0; i < unlockedRemove.length; i++) {
    unlockedRemove[i].className = 'general_skills skill'; //RESET CLASS UNLOCKED
  }

  skillTree.pointsLeft = 30; //RESET POINTS LEFT
  document.getElementById('sp_counter').textContent = skillTree.pointsLeft;

//LOOP THROUGH OBJECT

  for (key1 in skillTree){
    if (skillTree.hasOwnProperty(key1)) {
      var abilityObj = skillTree[key1];
      var skillsObj = skillTree[key1].skills;

      abilityObj.tierLevel = 1; //RESET TIER
      abilityObj.statPoints = 0; //RESET STATS
      var getStats = document.getElementsByClassName('stats');

      for ( i = 0; i < getStats.length; i ++) {
        getStats[i].textContent = abilityObj.statPoints;
      }

      for (key2 in skillsObj) {
        if (skillsObj.hasOwnProperty(key2)) {
          skillsObj[key2] = 0;  //RESET ADDED POINTS
          var removePts = document.getElementsByClassName('skill_count');

          for (i = 0; i < removePts.length; i++) {
            removePts[i].firstChild.textContent = skillsObj[key2];
          }
        }
      }
    }
  }
}, false);
