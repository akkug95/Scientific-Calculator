displayString = "";
tempString = "";
result = "";
openbracketcounter = 0;
closebracketcounter = 0;

document.getElementById('display').innerHTML = displayString;

function isInteger(num){
    flag = true;
    for(i=0;i<num.length;i++){
        if(num.charAt(i) != '0' && num.charAt(i) != '1' && num.charAt(i) != '2' && num.charAt(i) != '3' && num.charAt(i) != '4' && num.charAt(i) != '5' && num.charAt(i) != '6' && num.charAt(i) != '7' && num.charAt(i) != '8' && num.charAt(i) != '9'){
            flag = false;
            break;
        }
    }
    return flag;
}

function openBracketCounter(){
    for(i=0;i<tempString.length;i++){
        if(tempString.charAt(i) == '(')
            openbracketcounter++;
    }
    return openbracketcounter;
}

function closeBracketCounter(){
    for(i=0;i<tempString.length;i++){
        if(tempString.charAt(i) == ')')
            closebracketcounter++;
    }
    return closebracketcounter;
}

function getFunction(name){
    document.getElementById('display').setAttribute('fill','white');
    switch(name){
        case 'sqrt' : displayString += '&#8730;('; break;
        case 'pi' : displayString += '&#960;'; break;
        case 'sin' : displayString += 'sin('; break;
        case 'cos' : displayString += 'cos('; break;
        case 'tan' : displayString += 'tan('; break;
        case 'ln' : displayString += 'ln('; break;
        case 'log' : displayString += 'log('; break;
        default : displayString += name;
    }
    
    document.getElementById('display').innerHTML = displayString;
    
    switch(name){
        case 'sin' : tempString += 'Math.sin('; break;
        case 'cos' : tempString += 'Math.cos('; break;
        case 'tan' : tempString += 'Math.tan('; break;
        case 'ln' : tempString += 'Math.log('; break;
        case 'log' : tempString += '(1/Math.log(10))*Math.log('; break;
        case 'sqrt' : tempString += 'Math.sqrt('; break;
        case 'pi' : tempString += Math.PI.toString(); break;
        case 'e' : tempString += Math.E.toString(); break;
        case '!' : factorial(tempString); break;
		case 'del' : del(tempString); break;
        default : tempString += name;
    }
}

function Evaluate(){
    document.getElementById('display').setAttribute('fill','white');
    if(openBracketCounter() == closeBracketCounter()){
        if(displayString.length != 0){
            //alert(tempString);
            result = displayString = tempString = eval(tempString);
            document.getElementById('display').innerHTML = result;
        } else {
            document.getElementById('display').innerHTML = "No query to evaluate!";
        }
    } else {
        error();
    }
    
}

function Clear(){
    document.getElementById('display').setAttribute('fill','white');
    displayString = "";
    result = "";
    tempString = "";
    document.getElementById('display').innerHTML = "";
}
function del(temp_string){
    document.getElementById('display').setAttribute('fill','white');
    tempString = temp_string.substring(0, temp_string.length -1);
	displayString = tempString;
    result = tempString;
    document.getElementById('display').innerHTML = tempString;
}
function factorial(temp_string){
    pos = findOpenBracketFromLast(temp_string) + 1;
    if(pos != 0){
        temp = temp_string.substr(pos,temp_string.length);
        num = eval(temp).toString();
    } else {
        num = temp_string;
    }
    
    if(isInteger(num.toString())){
        if(pos == 0)
            tempString = calculateFactorial(parseInt(num)).toString();
        else {
            tempString = temp_string.substr(0,pos) + calculateFactorial(parseInt(num)).toString();
        }
    } else {
        error();
    }
}

function calculateFactorial(num){
    if(num == 1)
        return 1;
    else
        return num*calculateFactorial(num-1);
}
    
function error(){
    displayString = "";
    result = "";
    tempString = "";
    document.getElementById('display').setAttribute('fill','red');
    document.getElementById('display').innerHTML = "Error!";
}

function findOpenBracketFromLast(str){
    pos = -1;
    for(i=str.length-1;i>=0;i--){
        if(str.charAt(i) == '('){
            pos = i;
            break;
        }
    }
    return pos;
}
