## To tag in IPFC for multiple files.

https://www.dpreview.com/forums/thread/4252871
remeber to press enter

https://www.reddit.com/r/shutterencoder/comments/pk6k7a/any_suggestion_for_batch_copying_metadata_to/

https://stackoverflow.com/questions/51353428/batch-copy-metadata-from-one-file-to-another-exiftool?noredirect=1&lq=1
https://stackoverflow.com/questions/67516844/how-to-batch-copy-metadata-from-source-images-to-target-images-with-exiftool

exiftool -if "$Filename=~/\_1/i" -r -TagsFromFile %d%-.2f.%e -All:All "E:\Drone Clips Shortlist\testDir"

exiftool -if "$Filename=~/\_1/i" -r -TagsFromFile %d%-.2f.%e -All:All "E:\Drone Clips Shortlist\testDir"

exiftool -if "$Filename=~/\_1/i" -r -TagsFromFile %d%-.2f.%e -FileModifyDate "E:\Drone Clips Shortlist\testDir"

-overwrite_original

exiftool "-FileModifyDate<QuickTime:CreateDate" -overwrite_original "E:/Drone Clips Shortlist/testDir"

exiftool -if "$Filename=~/\_1/i" -r -TagsFromFile %d%-.2f.%e -FileModifyDate "D:\testDir"

# this works here.

```
exiftool -if "$Filename=~/_1/i" -r -TagsFromFile %d%-.2f.%e -All:All "D:\testDir"
another regex.
/DJI_\d\d\d\d_/

exiftool -if "$Filename=~/DJI_\d\d\d\d_/i" -r -overwrite_original -TagsFromFile %d%-.2f.%e -All:All "D:\testDir"
for separate folder
exiftool -if "$Filename=~/DJI_\d\d\d\d_/i" -r -overwrite_original -TagsFromFile "%d/Source/%-.2f.%e" -All:All "D:\testDir"
```

https://ninedegreesbelow.com/photography/exiftool-commands.html
https://exiftool.org/examples.html
https://exiftool.org/exiftool_pod.html

learn some perl regex
https://perldoc.perl.org/perlrequick

simple condition is $variable =~/DJI\_\d\d\d/ this evaluates to true or false if the regex matches or not.

to sort and filter in [[digiKam]]

```
exiftool -if "$Filename=~/DJI_\d\d\d\d_/i" -r -overwrite_original -TagsFromFile "E:\VUUMMMIII\ILLAM drone/%-.8f.%e" -All:All "G:\TO UPLOAD Drone Footage\ShreeAntu Sunrise Shortlist"

same but cleaner code
exiftool -if "$Filename=~/DJI_\d\d\d\d_/i" -r -overwrite_original -TagsFromFile "E:\originalfileDir/%-.8f.%e" -All:All "G:\dir\whereShortlistExport"

exiftool -if "$Filename=~/DJI_\d\d\d\d_/i" -r -overwrite_original -TagsFromFile "D:\DRONE SHOTS\Swayambhu/%-.8f.%e" -All:All "G:\TO UPLOAD Drone Footage\20220422 Swayambhu Drone Shots Shortlist"


```

updates media created, not system date modified and date created meta info.
