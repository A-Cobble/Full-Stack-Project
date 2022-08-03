$('#all-characters').on('click',(event) => {
    event.preventDefault();
    fetch('/api/character', {method: 'GET'})
    .then ((res) => res.json())
    .then((data) => { characterSheets(data) });
})

function characterSheets (information) {
    console.log(information);
    $('#left-container').empty()
    $('<div class="allCharacterSheets"></div>').appendTo('#left-container')
    for(let i = 0; i < information.length; i++){
        $(`<div class="name-of-char">${information[i].character_name}</div>`).appendTo('.allCharacterSheets')
        $(`<div class="name-of-player">-${information[i].player_name}</div>`).appendTo('.allCharacterSheets')
    }
};

$('#left-container').on('click', (event) => {
    const target = event.target
    let characterName = $(target).text()
    fetch(`/api/character/${characterName}`, {method: 'GET'})
    .then((res) => res.json())
    .then((data) => { characterInfo(data)})
    .then(()=> $('#left-container').empty());
});

$('#delete-character').submit((event) => {
    event.preventDefault();
    let characterName = $('input[name="delete"]').val();
    let user = prompt(`This will permanently DELETE ${characterName}. Type in the character name ${characterName} to continue.`);
    if(user === `${characterName}`){
        fetch(`/api/character/${characterName}`, {method: 'DELETE'})
        .then ((res) => res.json())
        .then((data) => { characterSheets(data) });
    }
    window.location.reload();
})

$('#character-search').submit((event) => {
    event.preventDefault();
    let characterName = $('input[name="search"]').val();
    console.log(characterName, "characterName")
    fetch(`/api/character/${characterName}`, {method: 'GET'})
    .then ((res) => res.json())
    .then((data) => { 
        console.log(data)
        characterInfo(data) });
})


const characterInfo = (information) => {
    $('#center-container').empty()
    let currentName=[]
    currentName[0] =information.character_name
    $('<form class="characterInfo" onSubmit="return false"></form>').appendTo('#center-container');
    $('<div id="char-heading"></div>').appendTo('.characterInfo');
    $(`<div><div>Character Name</div><input value="${information.character_name}" id="characterInfoName" required></div>`).appendTo('#char-heading');
    $(`<div><div>Player Name</div><input value="${information.player_name}" id="characterInfoPlayer" required></div>`).appendTo('#char-heading');
    $(`<div><div>Level</div><input value="${information.level}" id="characterInfolevel" required></div>`).appendTo('#char-heading');
    $(`<div><div>Background</div><input value="${information.background}" id="background" required></div>`).appendTo('#char-heading');
    $(`<div><div>Class</div><input value="${information.character_class}" id="characterInfoClass" required></div>`).appendTo('#char-heading');
    $(`<div><div>Race</div><input value="${information.race}" id="characterInfoRace" required></div>`).appendTo('#char-heading');
    $(`<div><div>Alignment</div><input value="${information.alignment}" id="characterInfoAlignment" required></div>`).appendTo('#char-heading');

    $('<div id="char-attributes"></div>').appendTo('.characterInfo');
    $(`<div><div>Strength</div><input value="${information.strength}" id="characterInfoStrength" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Dexterity</div><input value="${information.dexterity}" id="characterInfoDexterity" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Constitution</div><input value="${information.constitution}" id="characterInfoConstitution" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Intelligence</div><input value="${information.intelligence}" id="characterInfoIntelligence" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Wisdom</div><input value="${information.wisdom}" id="characterInfoWisdom" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Charisma</div><input value="${information.charisma}" id="characterInfoCharisma" required></div>`).appendTo('#char-attributes');
    
    $('<div id="char-extras"></div>').appendTo('.characterInfo');
    $(`<div><div>Experience Points</div><input value="${information.experience_points}" id="characterInfoExp" required></div>`).appendTo('#char-extras');
    $(`<div><div>Wisdom</div><input value="${information.passive_wisdom}" id="characterInfoPassiveWisdom" required></div>`).appendTo('#char-extras');
    $(`<div><div>Inspiration</div><input value="${information.inspiration}" id="characterInfoInspiration" required></div>`).appendTo('#char-extras');
    $(`<div><div>Proficiency</div><input value="${information.proficiency_bonus}" id="characterInfoProficiency" required></div>`).appendTo('#char-extras');

    $('<div id="char-saving-throws"></div>').appendTo('.characterInfo');
    $(`<div><div>Saving Throw Strength</div><input value="${information.saving_throw_strength}" id="characterInfoSTStr" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Dexterity</div><input value="${information.saving_throw_dexterity}" id="characterInfoSTDex" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Constitution</div><input value="${information.saving_throw_constitution}" id="characterInfoSTCon" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Intelligence</div><input value="${information.saving_throw_intelligence}" id="characterInfoSTInt" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Wisdom</div><input value="${information.saving_throw_wisdom}" id="characterInfoSTWis" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Charisma</div><input value="${information.saving_throw_charisma}" id="characterInfoSTCha" required></div>`).appendTo('#char-saving-throws');

    $('<div id="char-skills"></div>').appendTo('.characterInfo');
    $(`<div><div>Acrobatics</div><input value="${information.acrobatics}" id="characterInfoAcrobatics" required>`).appendTo('#char-skills');
    $(`<div><div>Animal Handling</div><input value="${information.animal_handling}" id="characterInfoAnimal" required></div>`).appendTo('#char-skills');
    $(`<div><div>Arcana</div><input value="${information.arcana}" id="characterInfoArcana" required></div>`).appendTo('#char-skills');
    $(`<div><div>Athletics</div><input value="${information.athletics}" id="characterInfoAthletics" required></div>`).appendTo('#char-skills');
    $(`<div><div>Deception</div><input value="${information.deception}" id="characterInfoDeception" required></div>`).appendTo('#char-skills');
    $(`<div><div>History</div><input value="${information.history}" id="characterInfoHistory" required></div>`).appendTo('#char-skills');
    $(`<div><div>Insight</div><input value="${information.insight}" id="characterInfoInsight" required></div>`).appendTo('#char-skills');
    $(`<div><div>Intimidation</div><input value="${information.intimidation}" id="characterInfoIntimidation" required></div>`).appendTo('#char-skills');
    $(`<div><div>Investigation</div><input value="${information.investigation}" id="characterInfoInvestigation" required></div>`).appendTo('#char-skills');
    $(`<div><div>Medicine</div><input value="${information.medicine}" id="characterInfoMedicine" required></div>`).appendTo('#char-skills');
    $(`<div><div>Nature</div><input value="${information.nature}" id="characterInfoNature" required></div>`).appendTo('#char-skills');
    $(`<div><div>Perception</div><input value="${information.perception}" id="characterInfoPerception" required></div>`).appendTo('#char-skills');
    $(`<div><div>Performance</div><input value="${information.performance}" id="characterInfoPerformance" required></div>`).appendTo('#char-skills');
    $(`<div><div>Persuasion</div><input value="${information.persuasion}" id="characterInfoPersuasion" required></div>`).appendTo('#char-skills');
    $(`<div><div>Religion</div><input value="${information.religion}" id="characterInfoReligion" required></div>`).appendTo('#char-skills');
    $(`<div><div>Slight Of Hand</div><input value="${information.slight_of_hand}" id="characterInfoSlightOfHand" required></div>`).appendTo('#char-skills');
    $(`<div><div>Stealth</div><input value="${information.stealth}" id="characterInfoStealth" required></div>`).appendTo('#char-skills');
    $(`<div><div>Survival</div><input value="${information.survival}" id="characterInfoSurvival" required></div>`).appendTo('#char-skills');

    $('<div><div id="char-health-armor-etc"></div>').appendTo('.characterInfo');
    $(`<div><div>ArmorClass</div><input value="${information.armor_class}" id="characterInfoArmorClass" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Initiative</div><input value="${information.initiative}" id="characterInfoInitiative" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Speed</div><input value="${information.speed}" id="characterInfoSpeed" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Current Hit Points</div><input value="${information.current_hit_points}" id="characterInfoCurrentHitPoint" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Total Hit Points</div><input value="${information.total_hit_points}" id="characterInfoTotalHitPoint" required></div>`).appendTo('#char-health-armor-etc');

    $('<div id="char-text-areas"></div>').appendTo('.characterInfo');
    $(`<div><div>Other Proficiencies & Languages</div><textarea id="characterInfoLanguages">${information.languages_proficiencies}</textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Attacks & Spellcasting</div><textarea id="characterInfoAttacksSpellcaster" required>${information.attacks_spellcasting}</textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Equipment</div><textarea id="characterInfoEquipment" required>${information.equipment}</textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Personality Traits</div><textarea id="characterInfoPersonality" required>${information.personality_traits}</textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Ideals</div><textarea id="characterInfoIdeals" required>${information.ideals}</textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Bonds</div><textarea id="characterInfoBonds" required>${information.bonds}</textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Flaws</div><textarea id="characterInfoFlaws" required>${information.flaws}</textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Features & Traits</div><textarea id="characterInfoFeaturesTraits" required>${information.features_traits}</textarea></div>`).appendTo('#char-text-areas');
     $(`<button type="submit" id="save-changes">Save Changes</button>`).appendTo('.characterInfo')

    $('.characterInfo').submit((event) => {
        event.preventDefault()
        console.log('click')
        let character_name = $('#characterInfoName').val();
        console.log(information.character_name)
        let player_name = $('#characterInfoPlayer').val();
        let level = $('#characterInfolevel').val();
        let background = $('#background').val();
        let character_class = $('#characterInfoClass').val();
        let race = $('#characterInfoRace').val();
        let alignment = $('#characterInfoAlignment').val();
        let experience_points = $('#characterInfoExp').val();
        let strength = $('#characterInfoStrength').val();
        let dexterity = $('#characterInfoDexterity').val();
        let constitution = $('#characterInfoConstitution').val();
        let intelligence = $('#characterInfoIntelligence').val();
        let wisdom = $('#characterInfoWisdom').val();
        let charisma = $('#characterInfoCharisma').val();
        let passive_wisdom = $('#characterInfoPassiveWisdom').val();
        let inspiration = $('#characterInfoInspiration').val();
        let proficiency_bonus = $('#characterInfoProficiency').val();
        let saving_throw_strength = $('#characterInfoSTStr').val();
        let saving_throw_dexterity = $('#characterInfoSTDex').val();
        let saving_throw_constitution = $('#characterInfoSTCon').val();
        let saving_throw_intelligence = $('#characterInfoSTInt').val();
        let saving_throw_wisdom = $('#characterInfoSTWis').val();
        let saving_throw_charisma = $('#characterInfoSTCha').val();
        let acrobatics = $('#characterInfoAcrobatics').val();
        let animal_handling = $('#characterInfoAnimal').val();
        let arcana = $('#characterInfoArcana').val();
        let athletics = $('#characterInfoAthletics').val();
        let deception = $('#characterInfoDeception').val();
        let history = $('#characterInfoHistory').val();
        let insight = $('#characterInfoInsight').val();
        let intimidation = $('#characterInfoIntimidation').val();
        let investigation = $('#characterInfoInvestigation').val();
        let medicine = $('#characterInfoMedicine').val();
        let nature = $('#characterInfoNature').val();
        let perception = $('#characterInfoPerception').val();
        let performance = $('#characterInfoPerformance').val();
        let persuasion = $('#characterInfoPersuasion').val();
        let religion = $('#characterInfoReligion').val();
        let slight_of_hand = $('#characterInfoSlightOfHand').val();
        let stealth = $('#characterInfoStealth').val();
        let survival = $('#characterInfoSurvival').val();
        let armor_class = $('#characterInfoArmorClass').val();
        let initiative = $('#characterInfoInitiative').val();
        let speed = $('#characterInfoSpeed').val();
        let current_hit_points = $('#characterInfoCurrentHitPoint').val();
        let total_hit_points = $('#characterInfoTotalHitPoint').val();
        let languages_proficiencies = $('#characterInfoLanguages').val();
        let attacks_spellcasting = $('#characterInfoAttacksSpellcaster').val();
        let equipment = $('#characterInfoEquipment').val();
        let personality_traits = $('#characterInfoPersonality').val();
        let ideals = $('#characterInfoIdeals').val();
        let bonds = $('#characterInfoBonds').val();
        let flaws = $('#characterInfoFlaws').val();
        let features_traits = $('#characterInfoFeaturesTraits').val();
        let updatedCharacter ={character_name, player_name, level, background, character_class, race, alignment, experience_points, 
            strength, dexterity, constitution, intelligence, wisdom, charisma, passive_wisdom, inspiration, proficiency_bonus, 
            saving_throw_strength, saving_throw_dexterity, saving_throw_constitution, saving_throw_intelligence, saving_throw_wisdom, 
            saving_throw_charisma, acrobatics, animal_handling, arcana, athletics, deception, history, insight, intimidation, investigation, 
            medicine, nature, perception, performance, persuasion, religion, slight_of_hand, stealth, survival, armor_class, initiative, 
            speed, current_hit_points, total_hit_points, languages_proficiencies, attacks_spellcasting, equipment, personality_traits, 
            ideals, bonds, flaws, features_traits};
    
        fetch(`/api/character/${currentName[0]}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(updatedCharacter),
        })
        .then((response)=> response.json())
        .then((data) => console.log('Success:', data));
    });
}

$('#create-character').on('click', (event) => createCharacter() );

const createCharacter = () => {
    $('#center-container').empty()
    $('<form class="characterInfo" onSubmit="return false"></form>').appendTo('#center-container');
    $('<div id="char-heading"></div>').appendTo('.characterInfo');
    $(`<div><div>Character Name</div><input value="" id="characterInfoName" required></div>`).appendTo('#char-heading');
    $(`<div><div>Player Name</div><input value="" id="characterInfoPlayer" required></div>`).appendTo('#char-heading');
    $(`<div><div>Level</div><input value="" id="characterInfolevel" required></div>`).appendTo('#char-heading');
    $(`<div><div>Background</div><input value="" id="background" required></div>`).appendTo('#char-heading');
    $(`<div><div>Class</div><input value="" id="characterInfoClass" required></div>`).appendTo('#char-heading');
    $(`<div><div>Race</div><input value="" id="characterInfoRace" required></div>`).appendTo('#char-heading');
    $(`<div><div>Alignment</div><input value="" id="characterInfoAlignment" required></div>`).appendTo('#char-heading');
    
    $('<div id="char-attributes"></div>').appendTo('.characterInfo');
    $(`<div><div>Strength</div><input value="" id="characterInfoStrength" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Dexterity</div><input value="" id="characterInfoDexterity" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Constitution</div><input value="" id="characterInfoConstitution" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Intelligence</div><input value="" id="characterInfoIntelligence" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Wisdom</div><input value="" id="characterInfoWisdom" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Charisma</div><input value="" id="characterInfoCharisma" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Wisdom</div><input value="" id="characterInfoPassiveWisdom" required></div>`).appendTo('#char-attributes');
    
    $('<div id="char-extras"></div>').appendTo('.characterInfo');
    $(`<div><div>Experience Points</div><input value="" id="characterInfoExp" required></div>`).appendTo('#char-extras');
    $(`<div><div>Inspiration</div><input value="" id="characterInfoInspiration" required></div>`).appendTo('#char-extras');
    $(`<div><div>Proficiency</div><input value="" id="characterInfoProficiency" required></div>`).appendTo('#char-extras');
    
    $('<div id="char-saving-throws"></div>').appendTo('.characterInfo');
    $(`<div><div>Saving Throw Strength</div><input value="" id="characterInfoSTStr" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Dexterity</div><input value="" id="characterInfoSTDex" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Constitution</div><input value="" id="characterInfoSTCon" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Intelligence</div><input value="" id="characterInfoSTInt" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Wisdom</div><input value="" id="characterInfoSTWis" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Charisma</div><input value="" id="characterInfoSTCha" required></div>`).appendTo('#char-saving-throws');
    
    $('<div id="char-skills"></div>').appendTo('.characterInfo');
    $(`<div><div>Acrobatics</div><input value="" id="characterInfoAcrobatics" required></div>`).appendTo('#char-skills');
    $(`<div><div>Animal Handling</div><input value="" id="characterInfoAnimal" required></div>`).appendTo('#char-skills');
    $(`<div><div>Arcana</div><input value="" id="characterInfoArcana" required></div>`).appendTo('#char-skills');
    $(`<div><div>Athletics</div><input value="" id="characterInfoAthletics" required></div>`).appendTo('#char-skills');
    $(`<div><div>Deception</div><input value="" id="characterInfoDeception" required></div>`).appendTo('#char-skills');
    $(`<div><div>History</div><input value="" id="characterInfoHistory" required></div>`).appendTo('#char-skills');
    $(`<div><div>Insight</div><input value="" id="characterInfoInsight" required></div>`).appendTo('#char-skills');
    $(`<div><div>Intimidation</div><input value="" id="characterInfoIntimidation" required></div>`).appendTo('#char-skills');
    $(`<div><div>Investigation</div><input value="" id="characterInfoInvestigation" required></div>`).appendTo('#char-skills');
    $(`<div><div>Medicine</div><input value="" id="characterInfoMedicine" required></div>`).appendTo('#char-skills');
    $(`<div><div>Nature</div><input value="" id="characterInfoNature" required></div>`).appendTo('#char-skills');
    $(`<div><div>Perception</div><input value="" id="characterInfoPerception" required></div>`).appendTo('#char-skills');
    $(`<div><div>Performance</div><input value="" id="characterInfoPerformance" required></div>`).appendTo('#char-skills');
    $(`<div><div>Persuasion</div><input value="" id="characterInfoPersuasion" required></div>`).appendTo('#char-skills');
    $(`<div><div>Religion</div><input value="" id="characterInfoReligion" required></div>`).appendTo('#char-skills');
    $(`<div><div>Slight Of Hand</div><input value="" id="characterInfoSlightOfHand" required></div>`).appendTo('#char-skills');
    $(`<div><div>Stealth</div><input value="" id="characterInfoStealth" required></div>`).appendTo('#char-skills');
    $(`<div><div>Survival</div><input value="" id="characterInfoSurvival" required></div>`).appendTo('#char-skills');
    
    $('<div><div id="char-health-armor-etc"></div>').appendTo('.characterInfo');
    $(`<div><div>ArmorClass</div><input value="" id="characterInfoArmorClass" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Initiative</div><input value="" id="characterInfoInitiative" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Speed</div><input value="" id="characterInfoSpeed" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Current Hit Points</div><input value="" id="characterInfoCurrentHitPoint" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Total Hit Points</div><input value="" id="characterInfoTotalHitPoint" required></div>`).appendTo('#char-health-armor-etc');
    
    $('<div id="char-text-areas"></div>').appendTo('.characterInfo');
    $(`<div><div>Other Proficiencies & Languages</div><textarea id="characterInfoLanguages"> </textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Attacks & Spellcasting</div><textarea id="characterInfoAttacksSpellcaster"> </textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Equipment</div><textarea id="characterInfoEquipment"> </textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Personality Traits</div><textarea id="characterInfoPersonality"> </textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Ideals</div><textarea id="characterInfoIdeals"> </textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Bonds</div><textarea id="characterInfoBonds"> </textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Flaws</div><textarea id="characterInfoFlaws"> </textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Features & Traits</div><textarea id="characterInfoFeaturesTraits"> </textarea></div>`).appendTo('#char-text-areas');
    $(`<button type="submit" id="save-changes">Save Changes</button>`).appendTo('#char-text-areas')

    $('.characterInfo').submit((event) => {
        event.preventDefault()
        console.log('click')
        let character_name = $('#characterInfoName').val();
        let player_name = $('#characterInfoPlayer').val();
        let level = $('#characterInfolevel').val();
        let background = $('#background').val();
        let character_class = $('#characterInfoClass').val();
        let race = $('#characterInfoRace').val();
        let alignment = $('#characterInfoAlignment').val();
        let experience_points = $('#characterInfoExp').val();
        let strength = $('#characterInfoStrength').val();
        let dexterity = $('#characterInfoDexterity').val();
        let constitution = $('#characterInfoConstitution').val();
        let intelligence = $('#characterInfoIntelligence').val();
        let wisdom = $('#characterInfoWisdom').val();
        let charisma = $('#characterInfoCharisma').val();
        let passive_wisdom = $('#characterInfoPassiveWisdom').val();
        let inspiration = $('#characterInfoInspiration').val();
        let proficiency_bonus = $('#characterInfoProficiency').val();
        let saving_throw_strength = $('#characterInfoSTStr').val();
        let saving_throw_dexterity = $('#characterInfoSTDex').val();
        let saving_throw_constitution = $('#characterInfoSTCon').val();
        let saving_throw_intelligence = $('#characterInfoSTInt').val();
        let saving_throw_wisdom = $('#characterInfoSTWis').val();
        let saving_throw_charisma = $('#characterInfoSTCha').val();
        let acrobatics = $('#characterInfoAcrobatics').val();
        let animal_handling = $('#characterInfoAnimal').val();
        let arcana = $('#characterInfoArcana').val();
        let athletics = $('#characterInfoAthletics').val();
        let deception = $('#characterInfoDeception').val();
        let history = $('#characterInfoHistory').val();
        let insight = $('#characterInfoInsight').val();
        let intimidation = $('#characterInfoIntimidation').val();
        let investigation = $('#characterInfoInvestigation').val();
        let medicine = $('#characterInfoMedicine').val();
        let nature = $('#characterInfoNature').val();
        let perception = $('#characterInfoPerception').val();
        let performance = $('#characterInfoPerformance').val();
        let persuasion = $('#characterInfoPersuasion').val();
        let religion = $('#characterInfoReligion').val();
        let slight_of_hand = $('#characterInfoSlightOfHand').val();
        let stealth = $('#characterInfoStealth').val();
        let survival = $('#characterInfoSurvival').val();
        let armor_class = $('#characterInfoArmorClass').val();
        let initiative = $('#characterInfoInitiative').val();
        let speed = $('#characterInfoSpeed').val();
        let current_hit_points = $('#characterInfoCurrentHitPoint').val();
        let total_hit_points = $('#characterInfoTotalHitPoint').val();
        let languages_proficiencies = $('#characterInfoLanguages').val();
        let attacks_spellcasting = $('#characterInfoAttacksSpellcaster').val();
        let equipment = $('#characterInfoEquipment').val();
        let personality_traits = $('#characterInfoPersonality').val();
        let ideals = $('#characterInfoIdeals').val();
        let bonds = $('#characterInfoBonds').val();
        let flaws = $('#characterInfoFlaws').val();
        let features_traits = $('#characterInfoFeaturesTraits').val();
        let createdCharacter = {character_name, player_name, level, background, character_class, race, alignment, experience_points, 
            strength, dexterity, constitution, intelligence, wisdom, charisma, passive_wisdom, inspiration, proficiency_bonus, 
            saving_throw_strength, saving_throw_dexterity, saving_throw_constitution, saving_throw_intelligence, saving_throw_wisdom, 
            saving_throw_charisma, acrobatics, animal_handling, arcana, athletics, deception, history, insight, intimidation, investigation, 
            medicine, nature, perception, performance, persuasion, religion, slight_of_hand, stealth, survival, armor_class, initiative, 
            speed, current_hit_points, total_hit_points, languages_proficiencies, attacks_spellcasting, equipment, personality_traits, 
            ideals, bonds, flaws, features_traits};
    
        fetch(`/api/character`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(createdCharacter),
        })
        .then((response)=> response.json())
        .then((data) => console.log('Success:', data));
    });
}


var images = ['/images/Dragon-HD.jpeg', '/images/Dragon-statues.jpeg', '/images/Dungeon.jpeg', '/images/forgotten.jpeg', '/images/Knight.jpeg', '/images/Ranger.jpeg'];
var $bodyContainer = $('#body-container');
let index = 1;
setInterval(function() {
    $bodyContainer.animate({ opacity: 1 }, 500, function() {
    $bodyContainer.css('background-image', 'url('+images[++index -1]+')');
    $bodyContainer.animate({ opacity: 1 }, 500, function() {
       if(index === images.length) index = 0;
     });
   });
}, 20000);