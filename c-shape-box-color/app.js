let boxStack = []; 
const allBoxes = document.querySelectorAll(".box"); 
const numOfBoxes = allBoxes.length; 

const toggleBgColor = (id)=>{
    allBoxes[id].classList.toggle("green"); 
}
const maintainBoxStack = (id)=>{
    const existingClassName = allBoxes[id].className;
    
    if(existingClassName.includes("green")){
        boxStack.push(id); 
    }
    else{
        boxStack = boxStack.filter((el)=> el !==id); 
    }
    
    if(boxStack.length === numOfBoxes){
        for(let i = boxStack.length - 1, j = 0; i >= 0; i--, j++){
            setTimeout(()=>{
                toggleBgColor(boxStack[i])
            }, 2000 * j || 1000);
        }
    }
}
const handleBox = (id)=>{
if(boxStack.length === numOfBoxes) boxStack = []; 
toggleBgColor(id)
maintainBoxStack(id); 
}