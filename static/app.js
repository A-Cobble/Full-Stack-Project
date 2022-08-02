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
        $(`<div class="name-of-player">${information[i].player_name}</div>`).appendTo('.allCharacterSheets')
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
    $('<form class="characterInfo" onSubmit="return false"></form>').appendTo('#center-container');
    $(`<input value="${information.character_name}" id="characterInfoName" required><div>Character Name</div>`).appendTo('.characterInfo');
    $(`<input value="${information.player_name}" id="characterInfoPlayer" required><div>Player Name</div>`).appendTo('.characterInfo');
    $(`<input value="${information.level}" id="characterInfolevel" required><div>Level</div>`).appendTo('.characterInfo');
    $(`<input value="${information.background}" id="background" required><div>Background</div>`).appendTo('.characterInfo');
    $(`<input value="${information.character_class}" id="characterInfoClass" required><div>Class</div>`).appendTo('.characterInfo');
    $(`<input value="${information.race}" id="characterInfoRace" required><div>Race</div>`).appendTo('.characterInfo');
    $(`<input value="${information.alignment}" id="characterInfoAlignment" required><div>Alignment</div>`).appendTo('.characterInfo');
    $(`<input value="${information.experience_points}" id="characterInfoExp" required><div>Experience Points</div>`).appendTo('.characterInfo');
    $(`<input value="${information.strength}" id="characterInfoStrength" required><div>Strength</div>`).appendTo('.characterInfo');
    $(`<input value="${information.dexterity}" id="characterInfoDexterity" required><div>Dexterity</div>`).appendTo('.characterInfo');
    $(`<input value="${information.constitution}" id="characterInfoConstitution" required><div>Constitution</div>`).appendTo('.characterInfo');
    $(`<input value="${information.intelligence}" id="characterInfoIntelligence" required><div>Intelligence</div>`).appendTo('.characterInfo');
    $(`<input value="${information.wisdom}" id="characterInfoWisdom" required><div>Wisdom</div>`).appendTo('.characterInfo');
    $(`<input value="${information.charisma}" id="characterInfoCharisma" required><div>Charisma</div>`).appendTo('.characterInfo');
    $(`<input value="${information.passive_wisdom}" id="characterInfoPassiveWisdom" required><div>Wisdom</div>`).appendTo('.characterInfo');
    $(`<input value="${information.inspiration}" id="characterInfoInspiration" required><div>Inspiration</div>`).appendTo('.characterInfo');
    $(`<input value="${information.proficiency_bonus}" id="characterInfoProficiency" required><div>Proficiency</div>`).appendTo('.characterInfo');
    $(`<input value="${information.saving_throw_strength}" id="characterInfoSTStr" required><div>ST Strength</div>`).appendTo('.characterInfo');
    $(`<input value="${information.saving_throw_dexterity}" id="characterInfoSTDex" required><div>ST Dexterity</div>`).appendTo('.characterInfo');
    $(`<input value="${information.saving_throw_constitution}" id="characterInfoSTCon" required><div>ST Constitution</div>`).appendTo('.characterInfo');
    $(`<input value="${information.saving_throw_intelligence}" id="characterInfoSTInt" required><div>ST Intelligence</div>`).appendTo('.characterInfo');
    $(`<input value="${information.saving_throw_wisdom}" id="characterInfoSTWis" required><div>ST Wisdom</div>`).appendTo('.characterInfo');
    $(`<input value="${information.saving_throw_charisma}" id="characterInfoSTCha" required><div>ST Charisma</div>`).appendTo('.characterInfo');
    $(`<input value="${information.acrobatics}" id="characterInfoAcrobatics" required><div>Acrobatics</div>`).appendTo('.characterInfo');
    $(`<input value="${information.animal_handling}" id="characterInfoAnimal" required><div>Animal Handling</div>`).appendTo('.characterInfo');
    $(`<input value="${information.arcana}" id="characterInfoArcana" required><div>Arcana</div>`).appendTo('.characterInfo');
    $(`<input value="${information.athletics}" id="characterInfoAthletics" required><div>Athletics</div>`).appendTo('.characterInfo');
    $(`<input value="${information.deception}" id="characterInfoDeception" required><div>Deception</div>`).appendTo('.characterInfo');
    $(`<input value="${information.history}" id="characterInfoHistory" required><div>History</div>`).appendTo('.characterInfo');
    $(`<input value="${information.insight}" id="characterInfoInsight" required><div>Insight</div>`).appendTo('.characterInfo');
    $(`<input value="${information.intimidation}" id="characterInfoIntimidation" required><div>Intimidation</div>`).appendTo('.characterInfo');
    $(`<input value="${information.investigation}" id="characterInfoInvestigation" required><div>Investigation</div>`).appendTo('.characterInfo');
    $(`<input value="${information.medicine}" id="characterInfoMedicine" required><div>Medicine</div>`).appendTo('.characterInfo');
    $(`<input value="${information.nature}" id="characterInfoNature" required><div>Nature</div>`).appendTo('.characterInfo');
    $(`<input value="${information.perception}" id="characterInfoPerception" required><div>Perception</div>`).appendTo('.characterInfo');
    $(`<input value="${information.performance}" id="characterInfoPerformance" required><div>Performance</div>`).appendTo('.characterInfo');
    $(`<input value="${information.persuasion}" id="characterInfoPersuasion" required><div>Persuasion</div>`).appendTo('.characterInfo');
    $(`<input value="${information.religion}" id="characterInfoReligion" required><div>Religion</div>`).appendTo('.characterInfo');
    $(`<input value="${information.slight_of_hand}" id="characterInfoSlightOfHand" required><div>Slight Of Hand</div>`).appendTo('.characterInfo');
    $(`<input value="${information.stealth}" id="characterInfoStealth" required><div>Stealth</div>`).appendTo('.characterInfo');
    $(`<input value="${information.survival}" id="characterInfoSurvival" required><div>Survival</div>`).appendTo('.characterInfo');
    $(`<input value="${information.armor_class}" id="characterInfoArmorClass" required><div>ArmorClass</div>`).appendTo('.characterInfo');
    $(`<input value="${information.initiative}" id="characterInfoInitiative" required><div>Initiative</div>`).appendTo('.characterInfo');
    $(`<input value="${information.speed}" id="characterInfoSpeed" required><div>Speed</div>`).appendTo('.characterInfo');
    $(`<input value="${information.current_hit_points}" id="characterInfoCurrentHitPoint" required><div>Current Hit Points</div>`).appendTo('.characterInfo');
    $(`<input value="${information.total_hit_points}" id="characterInfoTotalHitPoint" required><div>Total Hit Points</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoLanguages">${information.languages_proficiencies}</textarea><div>Other Proficiencies & Languages</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoAttacksSpellcaster" required>${information.attacks_spellcasting}</textarea><div>Attacks & Spellcasting</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoEquipment" required>${information.equipment}</textarea><div>Equipment</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoPersonality" required>${information.personality_traits}</textarea><div>Personality Traits</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoIdeals" required>${information.ideals}</textarea><div>Ideals</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoBonds" required>${information.bonds}</textarea><div>Bonds</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoFlaws" required>${information.flaws}</textarea><div>Flaws</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoFeaturesTraits" required>${information.features_traits}</textarea><div>Features & Traits</div>`).appendTo('.characterInfo');
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
    
        fetch(`/api/character/${character_name}`, {
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
    $(`<input value="" id="characterInfoName" required><div>Character Name</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoPlayer" required><div>Player Name</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfolevel" required><div>Level</div>`).appendTo('.characterInfo');
    $(`<input value="" id="background" required><div>Background</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoClass" required><div>Class</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoRace" required><div>Race</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoAlignment" required><div>Alignment</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoExp" required><div>Experience Points</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoStrength" required><div>Strength</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoDexterity" required><div>Dexterity</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoConstitution" required><div>Constitution</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoIntelligence" required><div>Intelligence</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoWisdom" required><div>Wisdom</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoCharisma" required><div>Charisma</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoPassiveWisdom" required><div>Wisdom</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoInspiration" required><div>Inspiration</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoProficiency" required><div>Proficiency</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoSTStr" required><div>ST Strength</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoSTDex" required><div>ST Dexterity</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoSTCon" required><div>ST Constitution</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoSTInt" required><div>ST Intelligence</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoSTWis" required><div>ST Wisdom</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoSTCha" required><div>ST Charisma</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoAcrobatics" required><div>Acrobatics</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoAnimal" required><div>Animal Handling</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoArcana" required><div>Arcana</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoAthletics" required><div>Athletics</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoDeception" required><div>Deception</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoHistory" required><div>History</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoInsight" required><div>Insight</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoIntimidation" required><div>Intimidation</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoInvestigation" required><div>Investigation</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoMedicine" required><div>Medicine</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoNature" required><div>Nature</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoPerception" required><div>Perception</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoPerformance" required><div>Performance</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoPersuasion" required><div>Persuasion</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoReligion" required><div>Religion</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoSlightOfHand" required><div>Slight Of Hand</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoStealth" required><div>Stealth</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoSurvival" required><div>Survival</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoArmorClass" required><div>ArmorClass</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoInitiative" required><div>Initiative</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoSpeed" required><div>Speed</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoCurrentHitPoint" required><div>Current Hit Points</div>`).appendTo('.characterInfo');
    $(`<input value="" id="characterInfoTotalHitPoint" required><div>Total Hit Points</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoLanguages"> </textarea><div>Other Proficiencies & Languages</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoAttacksSpellcaster"> </textarea><div>Attacks & Spellcasting</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoEquipment"> </textarea><div>Equipment</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoPersonality"> </textarea><div>Personality Traits</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoIdeals"> </textarea><div>Ideals</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoBonds"> </textarea><div>Bonds</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoFlaws"> </textarea><div>Flaws</div>`).appendTo('.characterInfo');
    $(`<textarea id="characterInfoFeaturesTraits"> </textarea><div>Features & Traits</div>`).appendTo('.characterInfo');
     $(`<button type="submit" id="save-changes">Save Changes</button>`).appendTo('.characterInfo')

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