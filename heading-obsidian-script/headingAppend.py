import codecs, pyperclip
outputString = ""
with codecs.open('readme.txt', encoding='utf-8') as file:
#with open('readme.txt', 'r') as file:
    for line in file:
        #print (line[len(line)-3])
        if '?' in line:
            outputString = outputString + "##### " + line
            #print('#' + line)
        else:
            outputString = outputString + line
            #print(line)
    pyperclip.copy(outputString)
    #print ("Output: \n" + outputString)