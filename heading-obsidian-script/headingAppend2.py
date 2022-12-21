import codecs, pyperclip
import re

outputString = ""
with codecs.open('readme.txt', encoding='utf-8') as file:
    count = 0
#with open('readme.txt', 'r') as file:
    for line in file:
        #print (line[len(line)-3])
        ######## INSTEAD OF CHECKING '?' we check for 1., 2., 3., etc.
        if re.match(r"^(\d+\.)", line): #if in format 1. or 2. 
            outputString = outputString + "##### " + line    
        # if '?' in line:
        #     outputString = outputString + "##### " + line
        #     #print('#' + line)
        else:
            outputString = outputString + line
        #     #print(line)
    pyperclip.copy(outputString)
    # print (count)
    #print ("Output: \n" + outputString)