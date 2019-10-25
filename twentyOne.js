document.addEventListener("DOMContentLoaded", ()=>{
    console.log("DOM Loaded");
    let startButton = document.querySelector("#start_Button")
    startButton.addEventListener("click", ()=>{
        displayCards()
    })
    let hitButton = document.querySelector("#hit_Button")
    hitButton.addEventListener("click", ()=>{
        displayHit()
    })
    let stayButton = document.querySelector("#stay_Button")
    stayButton.addEventListener("click", ()=>{
        displayStay()
       
    })
})


let id=""
const displayCards= async() =>{
    const deckIdUrl= "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    try{
        const responseId= await axios.get(deckIdUrl)
        id = responseId.data.deck_id
    }catch(err){
        displayError(err)
    }

    const myUrl= `https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`
    try{
        const response= await axios.get(myUrl)
        displayUserTotal(response.data.cards)
 
    }catch(err){
        displayError(err)
    }
}


const displayHit = async() =>{
    const myUrl= `https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`
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


let userTotal= []
let computerTotal=[]
let userEndingTotal=""
let compEndingTotal=""
const displayUserTotal=(cards) =>{
    let startCardsDiv= document.querySelector('#begin_button')
    document.body.appendChild(startCardsDiv)

    for(let i=0;i<cards.length;i++){

        if(cards[i].value === "JACK"||cards[i].value === "QUEEN"||cards[i].value === "KING" ){
            cards[i].value= 10+','
            userTotal.push(cards[i].value)

        }else if(cards[i].value === "ACE"){
            cards[i].value= 1
            userTotal.push(cards[i].value +',')
        }else{
            userTotal.push(cards[i].value+',')
        }
        let card = document.createElement('img')
        card.src=cards[i].image
        card.id="userCards"
        startCardsDiv.append(card)
    }
    let ptag= document.querySelector('p')
    if(!ptag){
        let totalUserCount= document.createElement('p')
        totalUserCount.id= "totalCount"
        userEndingTotal=sumOfArray(userTotal)
        console.log(userEndingTotal)
        totalUserCount.innerText= "Your Total: " + sumOfArray(userTotal)
       
        startCardsDiv.append(totalUserCount)  
    }else{
        let totalCount = document.querySelector('#totalCount')
        
        let totalUserCount= document.createElement('p')
        userEndingTotal=sumOfArray(userTotal)
        totalUserCount.id= "totalCount"
        console.log(userEndingTotal)
        totalUserCount.innerText= "Your Total: " + sumOfArray(userTotal)
        startCardsDiv.replaceChild(totalUserCount,totalCount)  
    }   
    
}










const displayComputerTotal=(cards) =>{
    let startCardsDiv= document.querySelector('#begin_button')
    document.body.appendChild(startCardsDiv)
    for(let i=0;i<cards.length;i++){
        if(cards[i].value === "JACK"||cards[i].value === "QUEEN"||cards[i].value === "KING" ){
            cards[i].value= 10+','
            computerTotal.push(cards[i].value)
        }else if(cards[i].value === "ACE"){
            cards[i].value= 1
            computerTotal.push(cards[i].value +',')
        }else{
            computerTotal.push(cards[i].value+',')
        }
        let card = document.createElement('img')
        card.src=cards[i].image
        card.id="userCards"
        startCardsDiv.append(card)
    }
    let totalUserCount= document.createElement('p')
    compEndingTotal=sumOfArray(computerTotal)
    console.log(compEndingTotal)
    totalUserCount.innerText= "Computer Total: " + sumOfArray(computerTotal)
    totalUserCount.id= "computerTotalCount"
    startCardsDiv.append(totalUserCount)  

}

function sumOfArray(arr){
    let total=0
    for(let i in arr){
        total+=parseInt(arr[i])
    }
    return total
}



const winnerDisplay = () =>{
    let beginButton=document.querySelector("#begin_button")
    let result=document.createElement('p')
    result.id="winner"
    result.innerText= winner(userEndingTotal,compEndingTotal)
    beginButton.append(result)

}


const winner = (player,computer)=>{
    if(Math.abs(parseInt(player)-21)>Math.abs(parseInt(computer)-21)){
        return "Computer Wins"
    }else if(Math.abs(player-21)<Math.abs(computer-21)){
        return "Player Wins"
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


