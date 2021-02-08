# Exercise 1
import math
def reduceFraction(num, den):
	# This function reduces a fraction to its lowest common factors
	# The gcd method in math will return the greatest common divisor for two numbers
	# then we simply need to divide both numerator and denominator by the gcd
	GCD = math.gcd(num,den)
	# I used  "//" to get an int instead of a float, as that is required
	Num = num//GCD
	Den = den//GCD
	return (Num,Den)


# Exercise 2
def isMagicDate(day, month, year):
	# This function identifies dates that are "magic dates"
	# The mod 100 will return the last two digits of the year
	LastTwoDigits = year%100
	if day*month == LastTwoDigits :
		return True
	return False


# Exercise 3
def sublist(list):
	# This function takes a list, and returns a list of all possible sublists
	# By default the empty list is a sublist of any list, hence we will declare/initialize an empty sublist
	Base = [[]]
	Length = len(list)
	# I used a nested loop to loop through the list whilst anchoring to each element of the list
	for i in range(Length):
		j = i
		while j < Length :
			Base.append(list[i:j+1])
			j += 1
					
	return Base


# Exercise 4
def pigLatin(word):
	# This function returns the piglatin representation of a word
	# Accounting for empty strings and invalid words
	if word.upper() == word.lower():
		return word
	# Removing any whitespace before and after the word as we need the [0] index to be the first letter
	Word = word.strip()
	# Setting up a list of vowels which will be used to check the first letter of the word
	VowelList = ["a","e","i","o","u","A","E","I","O","U"]
	# There are two blocks, the first block concerns vowels and the second consonants.
	if Word[0] in VowelList:
		# The idea here is to split the input into just characters and just punctuation
		# after the modifications are done to the characters the punctuation is added on to the end
		Punctuation = justPunc(Word)
		PuncLen = len(Punctuation)
		WordLen = len(Word)
		# Creating a new word which is just the letters of Word
		# Allows us to then add "way" and then finally add the punctuation
		SplitWord = Word[0:WordLen-PuncLen]
		AllWord = SplitWord + "way"
		FinalOutput = AllWord + Punctuation
		return FinalOutput
	else:
		# This block concerns the scenario where the first letter is a consonant
		# It's a little more tricky to account for capital letters, but the idea is the same as the previous block
		Punctuation = justPunc(Word)
		PuncLen = len(Punctuation)
		WordLen = len(Word)
		SplitWord = Word[0:WordLen-PuncLen]
		# Changing the entire Word to lowercase as we will need to split it up
		# Thus avoiding any capital letters in the middle of the word
		LowerWord = SplitWord.lower()
		# Finding the index of the Vowel in Word
		VowelIndex = 0
		for j in LowerWord:
			# Continues to increment VowelIndex by 1
			# break as soon as j is in VowelList
			if j in VowelList:
				break		
			VowelIndex = VowelIndex + 1
		FirstHalf = LowerWord[VowelIndex : len(LowerWord)]
		SecondHalf = LowerWord[0:VowelIndex]
		LowerOutput = FirstHalf + SecondHalf + "ay" 
		if Word[0].isupper():
			AllWord = LowerOutput[0].upper() + LowerOutput[1:len(LowerOutput)]
		else:
			AllWord = LowerOutput
		FinalOutput = AllWord + Punctuation 
		return FinalOutput			


def justPunc(str):
	# This function returns a string that is just the punctuation present in a word	
	output = ""
	for i in str:
		# .isalpha() checks if the character is a letter
		if not i.isalpha():
			output = output + i
	return output 


# Exercise 5
def morseCode(message):
	# This function returns the morse code representation of a string
	# First a dictionary is declared, this sets up the conversion of each word into its morse code
	# Then I loop through the word, checking if each element is a character in the dictionary
	Message = message.upper()
	table = {'A':'.-', 'B':'-...', 'C':'-.-.', 'D':'-..', 'E':'.', 
		'F':'..-.', 'G':'--.','H':'....','I':'..','J':'.---',
		'K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.',
		'Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-',
		'W':'.--','X':'-..-','Y':'-.--', 'Z':'--..','1':'.----','2':'..---',
		'3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..',
		'9':'----.','0':'-----'}
	res = ""
	for i in Message:
		if i in table:
			res = res + table[i] + " "
	return res.strip()

# Exercise 6
def int2Text(num):
	# This function converts an integer into a string representing it
	# A dictionary is declared to initialize the conversion, it identifies any unique varients that are essentially
	# the building block for all numbers. There are three main stages for this function, "hundreds", "tens" and "ones"
	# these correlate to the 3rd, 2nd and 1rst digit of the num input.
	dict = {0:"zero",1:"one",2:"two",3:"three",4:"four",5:"five",6:"six",7:"seven",8:"eight",9:"nine",10:"ten",
		11:"eleven",12:"twelve",13:"thirteen",14:"fourteen",15:"fifteen",16:"sixteen",17:"seventeen",18:"eighteen",
		19:"nineteen",20:"twenty",30:"thirty",40:"forty",50:"fifty",60:"sixty",70:"seventy",80:"eighty",90:"ninety"}
	if num <= 20:
		return dict[num]
	# I've converted the int into a list, where each element is a digit of the num input
	# This made it easier to refer to/manipulate the digits
	li = list(map(int, str(num)))
	Len = len(li)
	if Len == 3:
		hundreds = dict[li[0]] + " "+ "hundred"
	else:
		hundreds = ""
	checkTen = li[Len-2]*10
	# Checking the last two digits, if they are less than 20 then the representation is slightly different 
	# than if they were greater than 20
	if (checkTen+li[Len-1])>0 and (checkTen+li[Len-1])<=20:
		res = hundreds + " " + dict[num%100]
		return res
	elif checkTen == 0:
		tens = " "
	else:
		tens = " " + dict[checkTen] + " "
	checkOne = li[Len-1]
	if checkOne == 0:
		ones = ""
	else:
		ones = dict[checkOne]
	res = hundreds + tens + ones
	return res.strip()


# Exercise 7
def missingComment(filename):
	# This function identifies function names that do not have comments
	# The idea is to read through the file, identify any "def " strings then look to see if it is commented
	f = open(filename,"r")
	# adding each line to a list, which is easier to manipulate
	ref = []
	for line in f:
		ref.append(line)
	f.close()
	output= []
	for i in range(len(ref)):
		currentValue = ref[i]
		if currentValue[0:4] == "def ":
			# if a function is declared on the first line then it cannot be commented
			if i == 0:
				functionName = finder(currentValue)
				output.append(functionName)
			elif ref[i-1][0] != "#":
				functionName = finder(currentValue)
				output.append(functionName)
	return output	
def finder(Value):
	# This function returns the function name of non-commented functions, using "(" as a cut-off point
	ans = []
	for j in range(4,len(Value)):
		if Value[j] != "(":
			ans.append(Value[j])
		elif Value[j] == "(":
			break
	Name = "".join(ans)
	return Name.strip()

# Exercise 8
def consistentLineLength(filename, length):
	# What I did is read the file, split it so that each word is an element of a list
	# then simply loop through the list joining the words together, keeping in mind the length
	f = open(filename,"r")
	str = f.read()
	f.close()
	arr = str.split()
	output = []
	currentValue = []
	i = 0
	# Do note that this will turn into an infinite loop if a single word is bigger than the length 
	while i<len(arr):
		currentValue.append(arr[i])
		currentWord = " ".join(currentValue)
		if len(currentWord)>length:
			del currentValue[-1]
			currentWord = " ".join(currentValue)
			output.append(currentWord)
			currentValue = []
			continue
		i = i+1
	currentWord = " ".join(currentValue)
	output.append(currentWord)
	return output
	
# Exercise 9
def knight(start, end, moves):
	# Firstly I created a co-ordinate system, turning the input position into x,y co-ordinates
	# this made it easier to manipulate the points, next I identified that at each point the knight
	# can move to 8 possible points, and each of those points have 8 possibilities etc.
	# essentially I repeated the process of finding all of these possible points, adding them to a list
	# and at the end of each move I check if the end point is in the list of possibilities.
	# This first statement covers the possibility of the knight starting at the desired location
	if start == end:
		return True
	ref = {"a":1, "b":2, "c":3, "d":4, "e":5, "f":6, "g":7, "h":8}
	x,y = ref[end[0]], int(end[1])
	check = (x,y)
	x,y = ref[start[0]], int(start[1])
	points = [(x,y)]
	# starting at 1 because the first if statement covered the possibility of 0 moves
	i = 1
	while i <= moves:
		# each iteration calls on the pos function to re-assign the points var to the new possible points
		points = pos(points)
		for j in points:	
			if j == check:
				return True
		i = i + 1
	return False
def pos(list):
	# This function takes a list of points, and returns a list of every possible (and valid) points that could be made by the knight
	final_List = []
	for i in list:
		x = i[0]
		y = i[1]
		p1 = (x+2,y-1)
		p2 = (x+2,y+1)
		p3 = (x-2,y-1)
		p4 = (x-2,y+1)
		p5 = (x-1,y+2)
		p6 = (x+1,y+2)
		p7 = (x-1,y-2)
		p8 = (x+1,y-2)
		sub_List = [p1,p2,p3,p4,p5,p6,p7,p8]
		final_Sub = []
		# a for-loop to eliminate any invalid points beyond the chess board
		for i in sub_List:
			if 8>=i[0]>0 and 8>=i[1]>0:
				final_Sub.append(i)
		final_List = final_List + final_Sub
	return final_List

# Exercise 10
def warOfSpecies(environment):
	# the process here was to initialize a dict with all the X,O or . mapped to a co-ordinate system
	# then a double for-loop was used to loop through each point, identifying that points neighbours
	# then finally checking a list of if statements that represent the conditions for change.
	dict = {}
	for i in range(1,1+len(environment)):
		for j in range(1,1+len(environment[0])):
			dict[(i,j)] = environment[i-1][j-1]
	output = []
	# this could have been done with a single for-loop, however the dict was made in an unordered state
	# and we need the loop to run from 1,1 -> 1,2 etc.
	for i in range(1,1+len(environment)):
		output_Element = []
		for j in range(1,1+len(environment[0])):
			final_List = []
			p1 = (i+1,j+1)
			p2 = (i+1,j-1)
			p3 = (i-1,j+1)
			p4 = (i-1,j-1)
			p5 = (i,j+1)
			p6 = (i,j-1)
			p7 = (i-1,j)
			p8 = (i+1,j)
			initial_List = [p1,p2,p3,p4,p5,p6,p7,p8]
			# this for loop eliminates any invalid points
			for v in initial_List:
				if len(environment)>=v[0]>=1 and len(environment[0])>=v[1]>=1:
					final_List.append(v)
			# variables to keep track of neighbours 
			count_X = 0
			count_O = 0
			for s in final_List:
				if dict[s] == "X":
					count_X = count_X + 1
				elif dict[s] == "O":
					count_O = count_O + 1
			if dict[(i,j)] == ".":
				if count_X >= 2 or count_O >= 2:
					if count_X > count_O:
						output_Element.append("X")
					elif count_O > count_X:
						output_Element.append("O")
					else:
						output_Element.append(".")
				else:
					output_Element.append(".")
			elif dict[(i,j)] == "X":
				if (count_X + count_O) > 6:
					output_Element.append(".")
				elif count_X < 3:
					output_Element.append(".")
				elif count_X < count_O:
					output_Element.append(".")
				else:
					output_Element.append("X")
			elif dict[(i,j)] == "O":
				if (count_X + count_O) > 6:
					output_Element.append(".")
				elif count_O < 3:
					output_Element.append(".")
				elif count_X > count_O:
					output_Element.append(".")
				else:
					output_Element.append("O")
		str = "".join(output_Element)
		output.append(str)
	return output	
