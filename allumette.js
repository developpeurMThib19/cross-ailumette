const readline = require("readline");
const { exec } = require("child_process");

function Allumette(query){
    const readline = require("readline").createInterface({
        input: process.stdin, 
        output: process.stdout
    })

    return new Promise(resolve => readline.question(query, ans => {
        readline.close();
        resolve(ans);
    }))
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function ErrorLine(line, gameassembly){

    if(line > 4 || line == 0){
        console.log("Erreur: cette ligne est hors de portée")
        return false
    }
    else if(line < 0 || isNaN(line)){
        console.log("Erreur: entrée non valide (nombre positif attendu)")
        return false
    }
    return true 
}

function ErrorMatches(line, matches, gameassembly){
    if(matches == 0){
        console.log("Erreur: vous devez supprimer au moins une correspondance ")
        return false
    }
    else if(matches < 0  ||  isNaN(matches)){
        console.log('Erreur: entrée non valide (nombre positif attendu)')
        return false
    }
    else if((gameassembly[line - 1].lastIndexOf(1) - gameassembly[line - 1].indexOf(1) + 1) < matches){
        console.log("Erreur: pas assez de correspondances sur cette ligne")
        return false
    }
    return true
}

async function Game(){

    let on = 1
    let turn = 0
    let line
    let matches
    let baseassembly = [[0,0,0,1,0,0,0],[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[1,1,1,,1,1,1,1]]
    let gameassembly = baseassembly

    while(on){
        turn += 1
        Affichage(gameassembly)
        if(turn % 2 != 0){
            console.log("À ton tour : ")
            line = await Allumette("Line: ")
            while(!ErrorLine(line, gameassembly)){
                line = await Allumette("Line: ")
            }
            matches = await Allumette("Matches: ")
            while(!ErrorMatches(line, matches, gameassembly)){
                line = await Allumette("Line: ")
                while(!ErrorLine(line, gameassembly)){
                    line = await Allumette("Line: ")
                }
                matches = await Allumette("Matches: ")
            }
            matches = parseInt(matches)
            line -= 1
            console.log(`PLAYER removed ${matches} match(es) from line ${line + 1}`)
        }
        
        else{
            console.log("AT's turn...")
            line = getRandomInt(0, 4)

            while(!gameassembly[line].includes(1)){
                line = getRandomInt(0, 4)
            }
            let NbrMatches = gameassembly[line].lastIndexOf(1) - gameassembly[line].indexOf(1) + 1
            matches = getRandomInt(1, NbrMatches + 1)
            console.log(`AI removed ${matches} match(es) from line ${line + 1}`)
        }

        let help = gameassembly[line].indexOf(1) + matches
        for(let j = gameassembly[line].indexOf(1); j < help; j++){
            gameassembly[line][j] = 0
        }

        if(GameOver(gameassembly)) on = 0
    }
    Affichage(gameassembly)
    if(turn % 2 != 0) console.log("Vous avez perdu, tant pis ...")
    else console.log("J'ai perdu .. snif .. mais je t'aurai la prochaine fois !!")
    console.log("\r\n")
}

function GameOver(assembly){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 7; i++) {
            if(assembly[i][j]) return false
        }
    }
    return true
}

function Affichage(assembly){
    console.log("********")
    for (let i = 0; i < 4; i++) {
        process.stdout.write("*")
        for (let j = 0; j < 7; i++) {
            if(assembly[i][j]) process.stdout.write("|")
            else process.stdout.write(" ")
        }
        console.log("*")
    }
    console.log("**********\n")
}


if(process.argv[2] == "--gui"){
    exec('npm run start')
    exec('npm run electron-start')
}
else Game()