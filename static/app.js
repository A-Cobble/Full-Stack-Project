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
    $(`<div><div>Level</div><input value="${information.level}" class="number-inputs" id="characterInfolevel" required></div>`).appendTo('#char-heading');
    $(`<div><div>Character Name</div><input value="${information.character_name}" id="characterInfoName" required></div>`).appendTo('#char-heading');
    $(`<div><div>Player Name</div><input value="${information.player_name}" id="characterInfoPlayer" required></div>`).appendTo('#char-heading');
    $(`<div><div>Background</div><input value="${information.background}" id="background" required></div>`).appendTo('#char-heading');
    $(`<div><div>Class</div><input value="${information.character_class}" id="characterInfoClass" required></div>`).appendTo('#char-heading');
    $(`<div><div>Race</div><input value="${information.race}" id="characterInfoRace" required></div>`).appendTo('#char-heading');
    $(`<div><div>Alignment</div><input value="${information.alignment}" id="characterInfoAlignment" required></div>`).appendTo('#char-heading');

    $('<div><div id="char-health-armor-etc"></div>').appendTo('.characterInfo');
    $(`<div><div>ArmorClass</div><input value="${information.armor_class}" class="large-numbers" id="characterInfoArmorClass" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Initiative</div><input value="${information.initiative}" class="large-numbers" id="characterInfoInitiative" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Speed</div><input value="${information.speed}" class="large-numbers" id="characterInfoSpeed" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Current Hit Points</div><input value="${information.current_hit_points}" class="large-numbers" id="characterInfoCurrentHitPoint" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Total Hit Points</div><input value="${information.total_hit_points}" class="large-numbers" id="characterInfoTotalHitPoint" required></div>`).appendTo('#char-health-armor-etc');

    $('<div id="char-extras"></div>').appendTo('.characterInfo');
    $(`<div><div>Experience Points</div><input value="${information.experience_points}" id="characterInfoExp" required></div>`).appendTo('#char-extras');
    $(`<div><div>Passive Wisdom</div><input value="${information.passive_wisdom}" id="characterInfoPassiveWisdom" required></div>`).appendTo('#char-extras');
    $(`<div><div>Inspiration</div><input value="${information.inspiration}" id="characterInfoInspiration" required></div>`).appendTo('#char-extras');
    $(`<div><div>Proficiency</div><input value="${information.proficiency_bonus}" id="characterInfoProficiency" required></div>`).appendTo('#char-extras');

    $('<div id="attribute-ST-text-area"></div>').appendTo('.characterInfo');
    $('<div id="attribute-ST-container"></div>').appendTo('#attribute-ST-text-area');
    $('<div id="char-attributes"></div>').appendTo('#attribute-ST-container');
    $(`<div><div>Strength</div><input value="${information.strength}" class="attribute-numbers" id="characterInfoStrength" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Dexterity</div><input value="${information.dexterity}" class="attribute-numbers" id="characterInfoDexterity" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Constitution</div><input value="${information.constitution}" class="attribute-numbers" id="characterInfoConstitution" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Intelligence</div><input value="${information.intelligence}" class="attribute-numbers" id="characterInfoIntelligence" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Wisdom</div><input value="${information.wisdom}" class="attribute-numbers" id="characterInfoWisdom" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Charisma</div><input value="${information.charisma}" class="attribute-numbers" id="characterInfoCharisma" required></div>`).appendTo('#char-attributes');
    

    $('<div id="char-saving-throws"></div>').appendTo('#attribute-ST-container');
    $(`<div><div>Saving Throw Strength</div><input value="${information.saving_throw_strength}" class="number-inputs" id="characterInfoSTStr" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Dexterity</div><input value="${information.saving_throw_dexterity}" class="number-inputs" id="characterInfoSTDex" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Constitution</div><input value="${information.saving_throw_constitution}" class="number-inputs" id="characterInfoSTCon" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Intelligence</div><input value="${information.saving_throw_intelligence}" class="number-inputs" id="characterInfoSTInt" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Wisdom</div><input value="${information.saving_throw_wisdom}" class="number-inputs" id="characterInfoSTWis" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Charisma</div><input value="${information.saving_throw_charisma}" class="number-inputs" id="characterInfoSTCha" required></div>`).appendTo('#char-saving-throws');

    $('<div id="all-text-areas"></div>').appendTo('#attribute-ST-text-area');
    $('<div id="char-text-areas"></div>').appendTo('#all-text-areas');
    $(`<div><div>Other Proficiencies</div><textarea id="characterInfoLanguages">${information.languages_proficiencies}</textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Attacks & Spellcasting</div><textarea id="characterInfoAttacksSpellcaster" required>${information.attacks_spellcasting}</textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Equipment</div><textarea id="characterInfoEquipment" required>${information.equipment}</textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Personality Traits</div><textarea id="characterInfoPersonality" required>${information.personality_traits}</textarea></div>`).appendTo('#char-text-areas');
    $('<div id="second-text-area-set"></div>').appendTo('#all-text-areas');
    $(`<div><div>Ideals</div><textarea id="characterInfoIdeals" required>${information.ideals}</textarea></div>`).appendTo('#second-text-area-set');
    $(`<div><div>Bonds</div><textarea id="characterInfoBonds" required>${information.bonds}</textarea></div>`).appendTo('#second-text-area-set');
    $(`<div><div>Flaws</div><textarea id="characterInfoFlaws" required>${information.flaws}</textarea></div>`).appendTo('#second-text-area-set');
    $(`<div><div>Features & Traits</div><textarea id="characterInfoFeaturesTraits" required>${information.features_traits}</textarea></div>`).appendTo('#second-text-area-set');

    $('<div id="all-skills"></div>').appendTo('.characterInfo');
    $('<div id="char-skills"></div>').appendTo('#all-skills');
    $(`<div><div>Acrobatics</div><input value="${information.acrobatics}" class="number-inputs" id="characterInfoAcrobatics" required>`).appendTo('#char-skills');
    $(`<div><div>Animal Handling</div><input value="${information.animal_handling}" class="number-inputs" id="characterInfoAnimal" required></div>`).appendTo('#char-skills');
    $(`<div><div>Arcana</div><input value="${information.arcana}" class="number-inputs" id="characterInfoArcana" required></div>`).appendTo('#char-skills');
    $(`<div><div>Athletics</div><input value="${information.athletics}" class="number-inputs" id="characterInfoAthletics" required></div>`).appendTo('#char-skills');
    $(`<div><div>Deception</div><input value="${information.deception}" class="number-inputs" id="characterInfoDeception" required></div>`).appendTo('#char-skills');
    $(`<div><div>History</div><input value="${information.history}" class="number-inputs" id="characterInfoHistory" required></div>`).appendTo('#char-skills');
    $(`<div><div>Insight</div><input value="${information.insight}" class="number-inputs" id="characterInfoInsight" required></div>`).appendTo('#char-skills');
    $(`<div><div>Intimidation</div><input value="${information.intimidation}" class="number-inputs" id="characterInfoIntimidation" required></div>`).appendTo('#char-skills');
    $(`<div><div>Investigation</div><input value="${information.investigation}" class="number-inputs" id="characterInfoInvestigation" required></div>`).appendTo('#char-skills');
    $('<div id="second-skills-set"></div>').appendTo('#all-skills');
    $(`<div><div>Medicine</div><input value="${information.medicine}" class="number-inputs" id="characterInfoMedicine" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Nature</div><input value="${information.nature}" class="number-inputs" id="characterInfoNature" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Perception</div><input value="${information.perception}" class="number-inputs" id="characterInfoPerception" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Performance</div><input value="${information.performance}" class="number-inputs" id="characterInfoPerformance" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Persuasion</div><input value="${information.persuasion}" class="number-inputs" id="characterInfoPersuasion" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Religion</div><input value="${information.religion}" class="number-inputs" id="characterInfoReligion" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Slight Of Hand</div><input value="${information.slight_of_hand}" class="number-inputs" id="characterInfoSlightOfHand" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Stealth</div><input value="${information.stealth}" class="number-inputs" id="characterInfoStealth" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Survival</div><input value="${information.survival}" class="number-inputs" id="characterInfoSurvival" required></div>`).appendTo('#second-skills-set');
    
    $(`<div id="save-changes-button"><button type="submit" id="save-changes">Save Changes</button><div>`).appendTo('.characterInfo')

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
    $(`<div><div>Level</div><input value="" class="number-inputs" id="characterInfolevel" required></div>`).appendTo('#char-heading');
    $(`<div><div>Character Name</div><input value="" id="characterInfoName" required></div>`).appendTo('#char-heading');
    $(`<div><div>Player Name</div><input value="" id="characterInfoPlayer" required></div>`).appendTo('#char-heading');
    $(`<div><div>Background</div><input value="" id="background" required></div>`).appendTo('#char-heading');
    $(`<div><div>Class</div><input value="" id="characterInfoClass" required></div>`).appendTo('#char-heading');
    $(`<div><div>Race</div><input value="" id="characterInfoRace" required></div>`).appendTo('#char-heading');
    $(`<div><div>Alignment</div><input value="" id="characterInfoAlignment" required></div>`).appendTo('#char-heading');

    $('<div><div id="char-health-armor-etc"></div>').appendTo('.characterInfo');
    $(`<div><div>ArmorClass</div><input value="" class="large-numbers" id="characterInfoArmorClass" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Initiative</div><input value="" class="large-numbers" id="characterInfoInitiative" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Speed</div><input value="" class="large-numbers" id="characterInfoSpeed" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Current Hit Points</div><input value="" class="large-numbers" id="characterInfoCurrentHitPoint" required></div>`).appendTo('#char-health-armor-etc');
    $(`<div><div>Total Hit Points</div><input value="" class="large-numbers" id="characterInfoTotalHitPoint" required></div>`).appendTo('#char-health-armor-etc');

    $('<div id="char-extras"></div>').appendTo('.characterInfo');
    $(`<div><div>Experience Points</div><input value="" id="characterInfoExp" required></div>`).appendTo('#char-extras');
    $(`<div><div>Passive Wisdom</div><input value="" id="characterInfoPassiveWisdom" required></div>`).appendTo('#char-extras');
    $(`<div><div>Inspiration</div><input value="" id="characterInfoInspiration" required></div>`).appendTo('#char-extras');
    $(`<div><div>Proficiency</div><input value="" id="characterInfoProficiency" required></div>`).appendTo('#char-extras');

    $('<div id="attribute-ST-text-area"></div>').appendTo('.characterInfo');
    $('<div id="attribute-ST-container"></div>').appendTo('#attribute-ST-text-area');
    $('<div id="char-attributes"></div>').appendTo('#attribute-ST-container');
    $(`<div><div>Strength</div><input value="" class="attribute-numbers" id="characterInfoStrength" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Dexterity</div><input value="" class="attribute-numbers" id="characterInfoDexterity" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Constitution</div><input value="" class="attribute-numbers" id="characterInfoConstitution" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Intelligence</div><input value="" class="attribute-numbers" id="characterInfoIntelligence" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Wisdom</div><input value="" class="attribute-numbers" id="characterInfoWisdom" required></div>`).appendTo('#char-attributes');
    $(`<div><div>Charisma</div><input value="" class="attribute-numbers" id="characterInfoCharisma" required></div>`).appendTo('#char-attributes');
    

    $('<div id="char-saving-throws"></div>').appendTo('#attribute-ST-container');
    $(`<div><div>Saving Throw Strength</div><input value="" class="number-inputs" id="characterInfoSTStr" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Dexterity</div><input value="" class="number-inputs" id="characterInfoSTDex" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Constitution</div><input value="" class="number-inputs" id="characterInfoSTCon" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Intelligence</div><input value="" class="number-inputs" id="characterInfoSTInt" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Wisdom</div><input value="" class="number-inputs" id="characterInfoSTWis" required></div>`).appendTo('#char-saving-throws');
    $(`<div><div>Saving Throw Charisma</div><input value="" class="number-inputs" id="characterInfoSTCha" required></div>`).appendTo('#char-saving-throws');

    $('<div id="all-text-areas"></div>').appendTo('#attribute-ST-text-area');
    $('<div id="char-text-areas"></div>').appendTo('#all-text-areas');
    $(`<div><div>Other Proficiencies</div><textarea id="characterInfoLanguages"> </textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Attacks & Spellcasting</div><textarea id="characterInfoAttacksSpellcaster"> </textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Equipment</div><textarea id="characterInfoEquipment"> </textarea></div>`).appendTo('#char-text-areas');
    $(`<div><div>Personality Traits</div><textarea id="characterInfoPersonality"> </textarea></div>`).appendTo('#char-text-areas');
    $('<div id="second-text-area-set"></div>').appendTo('#all-text-areas');
    $(`<div><div>Ideals</div><textarea id="characterInfoIdeals"> </textarea></div>`).appendTo('#second-text-area-set');
    $(`<div><div>Bonds</div><textarea id="characterInfoBonds"> </textarea></div>`).appendTo('#second-text-area-set');
    $(`<div><div>Flaws</div><textarea id="characterInfoFlaws"> </textarea></div>`).appendTo('#second-text-area-set');
    $(`<div><div>Features & Traits</div><textarea id="characterInfoFeaturesTraits"></textarea></div>`).appendTo('#second-text-area-set');

    $('<div id="all-skills"></div>').appendTo('.characterInfo');
    $('<div id="char-skills"></div>').appendTo('#all-skills');
    $(`<div><div>Acrobatics</div><input value="" class="number-inputs" id="characterInfoAcrobatics" required>`).appendTo('#char-skills');
    $(`<div><div>Animal Handling</div><input value="" class="number-inputs" id="characterInfoAnimal" required></div>`).appendTo('#char-skills');
    $(`<div><div>Arcana</div><input value="" class="number-inputs" id="characterInfoArcana" required></div>`).appendTo('#char-skills');
    $(`<div><div>Athletics</div><input value="" class="number-inputs" id="characterInfoAthletics" required></div>`).appendTo('#char-skills');
    $(`<div><div>Deception</div><input value="" class="number-inputs" id="characterInfoDeception" required></div>`).appendTo('#char-skills');
    $(`<div><div>History</div><input value="" class="number-inputs" id="characterInfoHistory" required></div>`).appendTo('#char-skills');
    $(`<div><div>Insight</div><input value="" class="number-inputs" id="characterInfoInsight" required></div>`).appendTo('#char-skills');
    $(`<div><div>Intimidation</div><input value="" class="number-inputs" id="characterInfoIntimidation" required></div>`).appendTo('#char-skills');
    $(`<div><div>Investigation</div><input value="" class="number-inputs" id="characterInfoInvestigation" required></div>`).appendTo('#char-skills');
    $('<div id="second-skills-set"></div>').appendTo('#all-skills');
    $(`<div><div>Medicine</div><input value="" class="number-inputs" id="characterInfoMedicine" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Nature</div><input value="" class="number-inputs" id="characterInfoNature" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Perception</div><input value="" class="number-inputs" id="characterInfoPerception" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Performance</div><input value="" class="number-inputs" id="characterInfoPerformance" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Persuasion</div><input value="" class="number-inputs" id="characterInfoPersuasion" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Religion</div><input value="" class="number-inputs" id="characterInfoReligion" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Slight Of Hand</div><input value="" class="number-inputs" id="characterInfoSlightOfHand" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Stealth</div><input value="" class="number-inputs" id="characterInfoStealth" required></div>`).appendTo('#second-skills-set');
    $(`<div><div>Survival</div><input value="" class="number-inputs" id="characterInfoSurvival" required></div>`).appendTo('#second-skills-set');
    $(`<div id="save-changes-button"><button type="submit" id="save-changes">Save Changes</button><div>`).appendTo('.characterInfo')

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
    $bodyContainer.css('background-image', 'url('+images[++index - 1]+')');
    $bodyContainer.animate({ opacity: 1 }, 500, function() {
       if(index === images.length) index = 0;
     });
   });
}, 15000);