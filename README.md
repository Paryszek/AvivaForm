# CMS LANDING PAGE
### Demo
You can try this CMS at https://paryszek.github.io/avivaForm/

### What is this CMS application?
This application is designed to help edit your forms on websites. It is designed to search and edit tags: links, images, videos and texts.

### Requirements
-Supported browsers:
   - Mozilla Firefox
   - Chrome
   - Safari
-HTML files must be on the same server (permission issues otherwise)
-JQuery 1.11 support

### Installation
1. Download the package
2. Put the downloaded files in main folder of your website
3. Make sure that script sees CSS and JS files from the same path as file you try to edit

### Tips
You can't select files to edit from other folders for example:
	-mainFolder
		-mainJSFolder
		-mainCSSFolder
		-otherFolder
			-pageToEdit.html
		-mainScriptFile.html
	path to write in input field: ./secFolder/pageToEdit.html 

	This will not work because script gets html from file where paths to css/js/images will stay the same ../mainJSFolder != ./mainJSFolder 
		

### Authors
