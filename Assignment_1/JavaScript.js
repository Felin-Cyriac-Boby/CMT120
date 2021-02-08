// Exercise 1
function reduceFraction(num, den) {
	// This function returns a fraction after simplifying it
	// Initializing a variable to keep track of greatest common divisor,1 is GCD by default
	let GCD = 1;
	let min = Math.min(num,den);
	// Looping through the smallest of num/den, whilst constantly updating the GCD via an if..then statement
	for (let i = 1; i <= min; i++) {
		if ( num%i === 0 && den%i === 0 ) {
			GCD = i;
		}
	}
	let Num = num/GCD;
	let Den = den/GCD;
	return [Num,Den];
}


// Exercise 2
function isMagicDate(day, month, year) {
	// This function identifies magic dates
	// Mod 100 will return the last two digits of interest
	let LastTwoDigits = year%100;
	if(day*month === LastTwoDigits) {
		return true;
	}	
	return false;
}

// Exercise 3
function sublist(list) {
	// This function takes a list, and returns a list of all possible sublists
	// By default the empty list is a sublist of any list, hence we will declare/initialize an empty sublist
	let Base = [[]];
	let Length = list.length;
	// I used a nested loop to loop through the list whilst anchoring to each element of the list
	for (let i = 0; i<Length; i++) {
		let j = i;
		while (j < Length) {
			Base.push(list.slice(i,j+1));
			j++;
		}
	}
	return Base;
}

// Exercise 4
function pigLatin(word) {
	// This function returns the piglatin representation of a word
	// Accounting for empty strings and invalid words
	if (word.toUpperCase() === word.toLowerCase()) {
		return word;
	}	
	// Removing any whitespace before and after the word as we need the [0] index to be the first letter
	let Word = word.trim();
	// Setting up a list of vowels which will be used to check the first letter of the word
	let VowelList = ["a","e","i","o","u","A","E","I","O","U"];
	// First block concerns the scenario if the word starts with a vowel
	if (VowelList.includes(Word[0])) {
		// The idea here is to split the input into just characters and just punctuation
		// after the modifications are done to the characters the punctuation is added on to the end
		let Punctuation = justPunc(Word);
		let PuncLen = Punctuation.length;
		let WordLen = Word.length;
		//Creating a new word which is just the letters of Word
		//Allows us to then add "way" and then finally add the punctuation
		let SplitWord = Word.slice(0,WordLen-PuncLen);
		let AllWord = SplitWord + "way";
		let FinalOutput = AllWord + Punctuation;
		return FinalOutput;
		
	}
	else {
		// This block concerns the scenario where the first letter is a consonant
		// It's a little more tricky to account for capital letters, but the idea is the same as the previous block
		let Punctuation = justPunc(Word);
		let PuncLen = Punctuation.length;
		let WordLen = Word.length;
		let SplitWord = Word.slice(0,WordLen-PuncLen);
		// Changing the entire Word to lowercase as we will need to split it up
		// thus avoiding any capital letters in the middle of the word
		let LowerWord = SplitWord.toLowerCase();
		let VowelIndex = 0;
		for (let j=0; j<LowerWord.length;j++) {
			// Continues to increment VowelIndex by 1
			// break as soon as j is in VowelList
			if (VowelList.includes(LowerWord[j])) {
				break;
			}
			VowelIndex = VowelIndex + 1;
		}
		let FirstHalf = LowerWord.slice(VowelIndex,LowerWord.length);
		let SecondHalf = LowerWord.slice(0,VowelIndex);
		let LowerOutput = FirstHalf + SecondHalf + "ay";
		let AllWord = "";
		if (Word[0] === Word[0].toUpperCase()) {
			AllWord = LowerOutput[0].toUpperCase() + LowerOutput.slice(1,LowerOutput.length);
		}
		else {
			AllWord = LowerOutput;
		}
		let FinalOutput = AllWord + Punctuation;
		return FinalOutput;
				
	}
}

function justPunc(str) {
	// This function returns a string that is just the punctuation present in a word	
	let output = "";
	for (let i=0;i<str.length;i++) {
		// Punctuation marks lower and upper are the same
		if (str[i].toUpperCase() === str[i].toLowerCase()) {
			output = output + str[i];
			}
	}
	return output;
}
// Exercise 5
function morseCode(message) {
	// This function returns the morse code representation of a string
	// First a dictionary is declared, this sets up the conversion of each word into its morse code
	// Then I loop through the word, checking if each element is a character in the dictionary
	let Message = message.toUpperCase();
	let table = {'A':'.-', 'B':'-...', 'C':'-.-.', 'D':'-..', 'E':'.', 
		'F':'..-.', 'G':'--.','H':'....','I':'..','J':'.---',
		'K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.',
		'Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-',
		'W':'.--','X':'-..-','Y':'-.--', 'Z':'--..','1':'.----','2':'..---',
		'3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..',
		'9':'----.','0':'-----'};
	let res = "";
	for (let i = 0; i < Message.length; i++) {
		let j = Message[i];
		if (j in table) {
			res = res + table[j] + " ";
		}	
	}
	return res.trim();
}

// Exercise 6
function int2Text(num) {
	// This function converts an integer into a string representing it
	// A dictionary is declared to initialize the conversion, it identifies any unique varients that are essentially
	// the building block for all numbers. There are three main stages for this function, "hundreds", "tens" and "ones"
	// these correlate to the 3rd, 2nd and 1rst digit of the num input
	let dict = {0:"zero",1:"one",2:"two",3:"three",4:"four",5:"five",6:"six",7:"seven",8:"eight",9:"nine",10:"ten",
		11:"eleven",12:"twelve",13:"thirteen",14:"fourteen",15:"fifteen",16:"sixteen",17:"seventeen",18:"eighteen",
		19:"nineteen",20:"twenty",30:"thirty",40:"forty",50:"fifty",60:"sixty",70:"seventy",80:"eighty",90:"ninety"};
	if (num<=20) {
		return dict[num];
	}
	// Creating an array containing each digit so that they can be referenced individually
	let li = Array.from(String(num),Number);
	let Len = li.length;
	let hundreds = "";
	if (Len === 3) {
		hundreds = dict[li[0]] + " "+ "hundred";
	}
	// Checking the last two digits, if they are less than 20 then the representation is slightly different 
	// than if they were greater than 20
	let checkTen = li[Len-2]*10;
	let tens = "";
	if ((checkTen+li[Len-1])>0 && (checkTen+li[Len-1])<=20) {
		let res = hundreds + " " + dict[num%100];
		return res
	}
	else if (checkTen === 0) {
		tens = " ";
	}
	else {
		tens = " " + dict[checkTen] + " ";
	}
	let checkOne = li[Len-1];
	let ones = "";	
	if (checkOne === 0) {
		ones = "";
	}
	else {
		ones = dict[checkOne];
	}
	let res = hundreds + tens + ones;
	return res.trim()
}

// Exercise 7
function missingComment(filename) {
	// This function identifies function names that do not have comments
	// The idea is to read through the file, identify any "function " strings then look to see if it is commented
	let fs = require('fs');
	// an array is easier to manipulate/loop through
	let ref = fs.readFileSync(filename).toString().split("\n");
	let output = [];
	for (let i = 0; i < ref.length; i++) {
		let currentValue = ref[i];
		if (currentValue.slice(0,9) === "function ") {
			// by default if the function is defined on the first line it cannot be commented
			if (i === 0) {
				let functionName = finder(currentValue);
				output.push(functionName);
			}
			else if (ref[i-1].slice(0,2) !== "//") {
				let functionName = finder(currentValue);
				output.push(functionName);
			}
		}
	}
	return output;
}
function finder(value) {
	// This function identifies function names that do not have comments
	// it uses "(" to identify the end of a function name
	let ans = [];
	for (let j = 9; j < value.length; j++) {
		if (value[j] !== "(") {
			ans.push(value[j]);
		}
		else if (value[j] === "(") {
			break;
		}
	}
	let name = ans.join("");
	return name.trim();
}

// Exercise 8
function consistentLineLength(filename, length) {
	// What I did is read the file, split it so that each word is an element of a list
	// then simply loop through the list joining the words together, keeping in mind the length
	let fs = require('fs');
	// Turning the string into an array of words was a little tricky as there are many special characters like \n
	// \r and \t , hence I used replace with regex to remove these
	let array = fs.readFileSync(filename).toString().replace(/\r/g,"").replace(/\n/g," ").replace(/\t/g," ").split(" ");
	// After the process of creating an array there are a few elements of the list that are just empty ''
	// this will be problematic when joining the words together, hence I used this for loop to remove any empty strings
	for (let x = 0; x < array.length; x++) {
		if (array[x].length === 0) {
			array.splice(x,1);
			x = x - 1;
		}
	}
	let output = [];
	let currentValue = [];
	let currentWord = "";
	let i = 0;
	// Do note that this will turn into an infinite loop if a single word is bigger than the length 
	while (i<array.length) {
		currentValue.push(array[i]);
		currentWord = currentValue.join(" ").trim();
		if (currentWord.length > length) {
			currentValue.pop();
			currentWord = currentValue.join(" ").trim();
			output.push(currentWord);
			currentValue = [];
			continue;
		}
		i = i+1;
	}
	currentWord = currentValue.join(" ").trim();
	output.push(currentWord);
	return output;
}
// Exercise 9
function knight(start, end, moves) {
	// Firstly I created a co-ordinate system, turning the input position into x,y co-ordinates
	// this made it easier to manipulate the points, next I identified that at each point the knight
	// can move to 8 possible points, and each of those points have 8 possibilities etc.
	// essentially I repeated the process of finding all of these possible points, adding them to an array
	// and at the end of each move I check if the end point is in the array of possibilities.
	// This first statement covers the possibility of the knight starting at the desired location
	if (start === end) {
		return true;
	}
	let ref = {"a":1, "b":2, "c":3, "d":4, "e":5, "f":6, "g":7, "h":8};
	let x = ref[end[0]];
	let y = parseInt(end[1]);
	let check = [x,y];
	x = ref[start[0]];
	y = parseInt(start[1]);
	// this is the first position
	let points = [[x,y]];
	// starting at 1 because the first if statement covered the possibility of 0 moves
	let i = 1;
	while (i <= moves) {
		// each iteration calls on the pos function to re-assign the points var to the new possible points
		points = pos(points);
		for (let j of points){
			if ((j[0] === check[0]) && (j[1] === check [1])) {
				return true;
			}
		}
		i = i + 1;
	}
	return false;
}
function pos(list) {
	// This function takes an array of points, and returns an array of every possible (and valid) points that could be made by the knight
	let final_List = [];
	for (let u of list) {
		let a = u[0];
		let b = u[1];
		let p1 = [a+2,b-1];
		let p2 = [a+2,b+1];
		let p3 = [a-2,b-1];
		let p4 = [a-2,b+1];
		let p5 = [a-1,b+2];
		let p6 = [a+1,b+2];
		let p7 = [a-1,b-2];
		let p8 = [a+1,b-2];
		let sub_List = [p1,p2,p3,p4,p5,p6,p7,p8];
		let final_Sub = [];
		// a for loop to eliminate any invalid points beyond the chess board
		for (let v of sub_List) {
			let x_check = v[0]>0 && v[0]<=8;
			let y_check = v[1]>0 && v[1]<=8;
			if (x_check && y_check) {
				final_Sub.push(v); 
			}
		}
		final_List = final_List.concat(final_Sub);
	}
	return final_List;
}

// Exercise 10
function warOfSpecies(environment) {
	// the process here was to initialize a dict with all the X,O or . mapped to a co-ordinate system
	// then a single for-loop was used to loop through each point, identifying that points neighbours
	// then finally checking a list of if statements that represent the conditions for change.
	let dict = {};
	for (let i = 1; i <= environment.length; i++) {
		for (let j = 1; j <= environment[0].length; j++) {
			dict[[i,j]] = environment[i-1][j-1];
		}
	}
	let output = [];
	let output_Element = [];
	// since the dict is in an ordered state, a single for loop is required.
	for (let u in dict) {
		// so the keys of the dict are actually strings, for example "1,1", the comma is counted
		// hence they need to be coverted to an int
		let x = parseInt(u[0]);
		let y = parseInt(u[2]);
		let final_List = [];
		let p1 = [x+1,y+1];
		let p2 = [x+1,y-1];
		let p3 = [x-1,y+1];
		let p4 = [x-1,y-1];
		let p5 = [x,y+1];
		let p6 = [x,y-1];
		let p7 = [x-1,y];
		let p8 = [x+1,y];
		let initial_List = [p1,p2,p3,p4,p5,p6,p7,p8];
		// this for loop eliminates any invalid points
		for (let v of initial_List) {
			let x_Check = v[0]>=1 && v[0]<=environment.length;
			let y_Check = v[1]>=1 && v[1]<=environment[0].length;
			if (x_Check && y_Check) {
				final_List.push(v);
			}
		}
		// variables to keep track of neighbours
		let count_X = 0;
		let count_O = 0;
		for (let s of final_List) {
			if (dict[s] === "X") {
				count_X = count_X + 1;
			}
			else if (dict[s] === "O") {
				count_O = count_O + 1;
			}
		}
		if (dict[u] === ".") {
			if (count_X >= 2 || count_O >= 2) {
				if (count_X > count_O) {
					output_Element.push("X");
				}
				else if (count_O > count_X) {
					output_Element.push("O");
				}
				else {
					output_Element.push(".");
				}
			}
			else {
				output_Element.push(".");
			}
		}
		else if (dict[u] === "X") {
			if ((count_X + count_O) > 6) {
				output_Element.push(".");
			}
			else if (count_X < 3) {
				output_Element.push(".");
			}
			else if (count_X < count_O) {
				output_Element.push(".");
			}
			else {
				output_Element.push("X");
			}
		}
		else if (dict[u] === "O") {
			if ((count_X + count_O) > 6) {
				output_Element.push(".");
			}
			else if (count_O < 3) {
				output_Element.push(".");
			}
			else if (count_X > count_O) {
				output_Element.push(".");
			}
			else {
				output_Element.push("O");
			}
		}	
		if (output_Element.length === environment[0].length) {
			let str = output_Element.join("");
			output.push(str);
			output_Element = [];
		}
	}
	return output
}

module.exports = {
    reduceFraction: reduceFraction,
    isMagicDate: isMagicDate,
    sublist: sublist,
    pigLatin: pigLatin,
    morseCode: morseCode,
    int2Text: int2Text,
    missingComment: missingComment,
    consistentLineLength: consistentLineLength,
    knight: knight,
    warOfSpecies: warOfSpecies
}