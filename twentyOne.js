document.addEventListener("DOMContentLoaded", ()=>{
    displayCards()
    let startButton = document.querySelector("#start_Button")
    startButton.addEventListener("click", ()=>{
        removeAddButton()
        displayCardHits(2)
        
        let hitButton = document.querySelector("#hit_Button")
        hitButton.addEventListener("click", ()=>{
            displayCardHits(1)
        })
        let stayButton = document.querySelector("#stay_Button")
        stayButton.addEventListener("click", ()=>{
            displayStay() 
        })
    })
   
})


let id=""
let userTotal= [];
let computerTotal=[];
let userEndingTotal="";
let compEndingTotal="";

const displayCards= async() =>{
    const deckIdUrl= "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    try{
        const responseId= await axios.get(deckIdUrl)
        id = responseId.data.deck_id
    }catch(err){
        displayError(err)
    }
}
const displayCardHits = async(num) =>{
    const myUrl= `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${num}`
    try{
        const response= await axios.get(myUrl)
        displayUserTotal(response.data.cards)
 
    }catch(err){
        displayError(err)
    }
}
const displayStay = async() =>{
    const myUrl= `https://deckofcardsapi.com/api/deck/${id}/draw/?count=3`
    try{
        const response= await axios.get(myUrl)
        displayComputerTotal(response.data.cards)
        winnerDisplay()
        
    }catch(err){
        displayError(err)
    }
}

const removeAddButton= ()=>{
    let begin_button = document.querySelector('#begin_button')
    let start_Button = document.querySelector('#start_Button')
    begin_button.removeChild(start_Button)
    let hit_Button= document.querySelector('#hit_Button')
    hit_Button.style= "visibility: visible"
    let stay_Button= document.querySelector('#stay_Button')
    stay_Button.style= "visibility: visible"

} 

const displayUserTotal=(cards) =>{
    let userCardsDiv= document.querySelector('#userCardsDiv')
    let begin_button= document.querySelector('#begin_button')
    let points = document.querySelector('#points')
    let busted = document.createElement('h2')
    points.append(busted)
    value(cards,userTotal, "userCardsDiv")
    let ptag= document.querySelector('p')
    if(!ptag){
        let totalUserCount= document.createElement('p')
        totalUserCount.id= "playerTotalCount"
        userEndingTotal=sumOfArray(userTotal)
        totalUserCount.innerText= userEndingTotal
        userCardsDiv.append(totalUserCount)  
    }else{
        let playerTotalCount = document.querySelector('#playerTotalCount')
        let totalUserCount= document.createElement('p')
        userEndingTotal=sumOfArray(userTotal)
        if(userEndingTotal < 22){
            totalUserCount.id= "playerTotalCount"
            totalUserCount.innerText=userEndingTotal
        }else{
            busted.id= "busted"
            busted.innerText= "BUSTED"
            begin_button.replaceChild(busted,userCardsDiv)
        }
        userCardsDiv.replaceChild(totalUserCount,playerTotalCount)  
    }   
}

const displayComputerTotal=(cards) =>{
    let computerCardsDiv= document.querySelector('#computerCardsDiv')
    value(cards,computerTotal,"computerCardsDiv")
    let totalUserCount= document.createElement('p')
    totalUserCount.id= "computerTotalCount"
    compEndingTotal=sumOfArray(computerTotal)
    totalUserCount.innerText= compEndingTotal
    computerCardsDiv.append(totalUserCount)  
}

const value =(cards,player,certainDiv) =>{
    let chooseDiv = document.querySelector(`#${certainDiv}`)
    for(let i=0;i<cards.length;i++){
        if(cards[i].value === "JACK"||cards[i].value === "QUEEN"||cards[i].value === "KING" ){
            cards[i].value= 10+','
            player.push(cards[i].value)
        }else if(cards[i].value === "ACE"){
            cards[i].value= 1
            player.push(cards[i].value +',')
        }else{
            player.push(cards[i].value+',')
        }
        let card = document.createElement('img')
        card.src=cards[i].image
        card.id="userCards"
        chooseDiv.appendChild(card)
    }
}


function sumOfArray(arr){
    let total=0
    for(let i in arr){
        total+=parseInt(arr[i])
    }
    return total
}


const winnerDisplay = () =>{
    let pointDiv=document.querySelector("#points")
    let winnerPlayer=document.createElement("h2")
    
    winnerPlayer.id="winner"
    winnerPlayer.innerText = winner(userEndingTotal,compEndingTotal)
    pointDiv.append(winnerPlayer)
}

const winner = (player,computer)=>{
    if(parseInt(computer)>21){
        return "You Won!"
    }else if(21- parseInt(player)> 21- parseInt(computer)){
        return "Computer Won!"
    }else if(21 - parseInt(player) < 21 - parseInt(computer)){
        return "You  Won"
    }else{
        return"It's a tie"
 
    }
}


const displayError = (err)=>{
    let errorMessage= document.createElement('p')
    errorMessage.innerText = err.message
    let mainDiv = document.querySelector('#main')
    mainDiv.appendChild(errorMessage)
}

