import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ...(process.env.NODE_ENV === "production" 
    ? {
        ssl: {
            rejectUnauthorized: false
        }
    }
    : {}),
});

app.use(express.static("static"));
app.use(express.json());
app.use(cors());

const unknownHTTP = (req, res, next) => {
    res.sendStatus(404);
    next();
};

app.get('/api/character', (req, res, next) =>{
    pool.query('SELECT * FROM character').then((data) =>{
        res.send(data.rows);
    })
    .catch(next);
})

app.get('/api/character/:character_name', (req, res, next) => {
    const { character_name } = req.params;
    pool.query('SELECT * FROM character WHERE character_name IN ($1);', [character_name]).then((data) =>{
        let characterSheet = data.rows[0]
        if(characterSheet) {
            res.send(characterSheet)
        };
    }).catch(next);
})

app.delete('/api/character/:character_name', (req, res, next)=> {
    const { character_name } = req.params;
    pool.query(`DELETE FROM character WHERE character_name = $1 RETURNING *;`, [character_name]).then((data) => {
        console.log(data.rows[0])
        res.sendStatus(204);
    }).catch(next);
})

app.post('/api/character', (req, res, next)=> {
    const { character_name, player_name, level, background, character_class, race, alignment, experience_points, strength, dexterity, constitution, intelligence, wisdom, charisma, 
        passive_wisdom, inspiration, proficiency_bonus, saving_throw_strength, saving_throw_dexterity, saving_throw_constitution, saving_throw_intelligence, saving_throw_wisdom, 
        saving_throw_charisma, acrobatics, animal_handling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, 
        persuasion, religion, slight_of_hand, stealth, survival, armor_class, initiative, speed, current_hit_points, total_hit_points, languages_proficiencies, attacks_spellcasting, 
        equipment, personality_traits, ideals, bonds, flaws, features_traits } = req.body;
    
    if (character_name && player_name){
        pool.query(`INSERT INTO character(character_name, player_name, level, background, character_class, race, alignment, experience_points, strength, dexterity, constitution, intelligence, 
            wisdom, charisma, passive_wisdom, inspiration, proficiency_bonus, saving_throw_strength, saving_throw_dexterity, saving_throw_constitution, saving_throw_intelligence, 
            saving_throw_wisdom, saving_throw_charisma, acrobatics, animal_handling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, 
            perception, performance, persuasion, religion, slight_of_hand, stealth, survival, armor_class, initiative, speed, current_hit_points, total_hit_points, languages_proficiencies,
            attacks_spellcasting, equipment, personality_traits, ideals, bonds, flaws, features_traits) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, 
            $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, 
            $53, $54);`, 
            [character_name, player_name, level, background, character_class, race, alignment, experience_points, strength, dexterity, constitution, intelligence, wisdom, charisma, 
            passive_wisdom, inspiration, proficiency_bonus, saving_throw_strength, saving_throw_dexterity, saving_throw_constitution, saving_throw_intelligence, saving_throw_wisdom, 
            saving_throw_charisma, acrobatics, animal_handling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, 
            persuasion, religion, slight_of_hand, stealth, survival, armor_class, initiative, speed, current_hit_points, total_hit_points, languages_proficiencies, attacks_spellcasting, 
            equipment, personality_traits, ideals, bonds, flaws, features_traits])
        .then((data) => {
            res.status(201).send(req.body)
        }).catch(next);
    } else {
        res.sendStatus(400);
    }
})

app.patch("/api/character/:char_name", (req, res, next) => {
    const { char_name } = req.params;
    const { character_name, player_name, level, background, character_class, race, alignment, experience_points, strength, dexterity, constitution, intelligence, wisdom, charisma, 
        passive_wisdom, inspiration, proficiency_bonus, saving_throw_strength, saving_throw_dexterity, saving_throw_constitution, saving_throw_intelligence, saving_throw_wisdom, 
        saving_throw_charisma, acrobatics, animal_handling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, 
        persuasion, religion, slight_of_hand, stealth, survival, armor_class, initiative, speed, current_hit_points, total_hit_points, languages_proficiencies, attacks_spellcasting, 
        equipment, personality_traits, ideals, bonds, flaws, features_traits } = req.body;

    if (typeof char_name !== 'string'){
        res.sendStatus(400);
    }
    pool.query(`UPDATE character SET character_name = COALESCE ($1, character_name), player_name = COALESCE ($2, player_name), level = COALESCE ($3, level), background = COALESCE ($4, background), 
        character_class = COALESCE ($5, character_class), race = COALESCE ($6, race), alignment = COALESCE ($7, alignment), experience_points = COALESCE ($8, experience_points), strength = COALESCE ($9, strength), 
        dexterity = COALESCE ($10, dexterity), constitution = COALESCE ($11, constitution), intelligence = COALESCE ($12, intelligence), wisdom = COALESCE ($13, wisdom), charisma = COALESCE ($14, charisma), 
        passive_wisdom = COALESCE ($15, passive_wisdom), inspiration = COALESCE ($16, inspiration), proficiency_bonus = COALESCE ($17, proficiency_bonus), saving_throw_strength = COALESCE ($18, saving_throw_strength), 
        saving_throw_dexterity = COALESCE ($19, saving_throw_dexterity), saving_throw_constitution = COALESCE ($20, saving_throw_constitution), saving_throw_intelligence = COALESCE ($21, saving_throw_intelligence), 
        saving_throw_wisdom = COALESCE ($22, saving_throw_wisdom), saving_throw_charisma = COALESCE ($23, saving_throw_charisma), acrobatics = COALESCE ($24, acrobatics), animal_handling = COALESCE ($25, animal_handling), 
        arcana = COALESCE ($26, arcana), athletics = COALESCE ($27, athletics), deception = COALESCE ($28, deception), history = COALESCE ($29, history), insight = COALESCE ($30, insight), 
        intimidation = COALESCE ($31, intimidation), investigation = COALESCE ($32, investigation), medicine = COALESCE ($33, medicine), nature = COALESCE ($34, nature), perception = COALESCE ($35, perception), 
        performance = COALESCE ($36, performance), persuasion = COALESCE ($37, persuasion), religion = COALESCE ($38, religion), slight_of_hand = COALESCE ($39, slight_of_hand), stealth = COALESCE ($40, stealth), 
        survival = COALESCE ($41, survival), armor_class = COALESCE ($42, armor_class), initiative = COALESCE ($43, initiative), speed = COALESCE ($44, speed), current_hit_points = COALESCE ($45, current_hit_points), 
        total_hit_points = COALESCE ($46, total_hit_points), languages_proficiencies = COALESCE ($47, languages_proficiencies), attacks_spellcasting = COALESCE ($48, attacks_spellcasting), equipment = COALESCE ($49, equipment), 
        personality_traits = COALESCE ($50, personality_traits), ideals = COALESCE ($51, ideals), bonds = COALESCE ($52, bonds), flaws = COALESCE ($53, flaws), features_traits = COALESCE ($54, features_traits) WHERE character_name IN ($55) RETURNING *;`, 
        [character_name, player_name, level, background, character_class, race, alignment, experience_points, strength, dexterity, constitution, intelligence, wisdom, charisma, 
        passive_wisdom, inspiration, proficiency_bonus, saving_throw_strength, saving_throw_dexterity, saving_throw_constitution, saving_throw_intelligence, saving_throw_wisdom, 
        saving_throw_charisma, acrobatics, animal_handling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, 
        persuasion, religion, slight_of_hand, stealth, survival, armor_class, initiative, speed, current_hit_points, total_hit_points, languages_proficiencies, attacks_spellcasting, 
        equipment, personality_traits, ideals, bonds, flaws, features_traits, char_name])
    .then((data) => {
        if(data.rows.length === 0){
            console.log(data.rows)
            res.sendStatus(404);
        } else {
            res.status(200).send(data.rows[0]);
        }
    }).catch(next);
})













app.use(unknownHTTP);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendStatus(500)
})






// async function executeQueryAsync(){
//     const res = await pool.query("SELECT * FROM pets");
//     const firstPet = res.rows[0];
//     const pet = await pool.query("SELECT * FROM pets WHERE id = $1", [firstPet.id]);
//     console.log(pet.rows[0]);
// }
// try {
//     executeQueryAsync();
// }catch (e) {
    
// }



//const format = require("pg-format")