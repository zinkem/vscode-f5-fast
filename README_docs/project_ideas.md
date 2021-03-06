# Project details

[BACK TO MAIN README](../README.md)

Name: f5-Fast
Desc:  


## apply custom json schema to an editor
Right now, we just set the file type to json and inject the "$schema": "(https://)./file.schema", which works for now, but can cause problems with some declarations
- as an interim, we could just remove that line from the json object before sending, but this is kinda hackey

I think we can detect what kind of declaration it is from the base json object "class" and "version", if needed.  The followign git issue talks about associating a custom schema to particular files:
https://github.com/microsoft/vscode/issues/77433
This is doable, but not idea.  I'm thinking the different file sub-extension types to catch, but I don't think this is robust enough since it requires special file naming and doesn't cover different schema versions:
- dec1.as3.json
- baseInstall.do.json  
- loggingDec.ts.json

That article and some other reading leads me to beleive that we can find a better way to match then apply the appropriate schema

I guess, if we really need, we can just read the declaration when we get it.  Figure out the base class and schema version, then inject the right schema URL to the delcaration and remove it when posting...

Another similar git issue for further reading: https://github.com/microsoft/vscode/issues/79363, https://github.com/microsoft/vscode/issues/81078

Another route was a language server, but that might be overkill
- https://code.visualstudio.com/api/language-extensions/language-server-extension-guide
- https://code.visualstudio.com/docs/languages/overview
- 

Maybe through a Custom Editor? https://code.visualstudio.com/api/extension-guides/custom-editors#custom-editor-api-basics

Virtual documents (I think relates to git issues referenced above): https://code.visualstudio.com/api/extension-guides/virtual-documents



## functionality: virtual file store (memFS)
***** tabling idea in favor of just making api calls and populating tree views and editors directly  *****
 - used to store files in memory, like ftp browser or remote files stores
 -- should be used to store connected device information, templates, deployed app details, etc...

 https://github.com/Microsoft/vscode-extension-samples/tree/master/fsprovider-sample/src
 https://code.visualstudio.com/api/references/vscode-api#FileSystemProvider
 https://stackoverflow.com/questions/50198150/how-to-work-with-filesystemprovider-file-systems-in-visual-studio-code


## functionality: display pretty json with colors
- this got it somewhat formatted
https://github.com/Microsoft/vscode/issues/53697
> Yeah, use a formatter (as library) when creating the file. The most simple would be using JSON.stringify(stats, undefined, 4)
- Want it formated like the vscode-rest-client
-- found out that the real pretty view from this extension is actually a web view to apply fonts and color
- more information about formating data in editor window
https://stackoverflow.com/questions/29973357/how-do-you-format-code-in-visual-studio-code-vscode

## functionality:  capture logs of remote device
- pretty sure this only works over Remote SSH
https://marketplace.visualstudio.com/items?itemName=tiansin.logtail


## functionality:  log all outbount https.request details
- looks like this will need a wrapper like this:
https://chatbotsmagazine.com/track-outgoing-http-s-requests-in-nodejs-48608553f03c
- or an npm module to facilitate global logging of http.requests 
https://www.npmjs.com/package/global-request-logger
- intercept and mock?
https://github.com/moll/node-mitm



## functionality: configure tree view
- tree view to list devices/bigips/hosts
- tree view to list available templates
- tree view to show deployed templates

-- https://medium.com/@sanaajani/creating-your-first-vs-code-extension-8dbdef2d6ad9
-- https://github.com/Microsoft/vscode-extension-samples/tree/master/tree-view-sample
-- https://stackoverflow.com/search?q=%5Bvisual-studio-code%5D+TreeDataProvider
-- https://stackoverflow.com/questions/56534723/simple-example-to-implement-vs-code-treedataprovider-with-json-data

-- Example tree view for devices and details 
		https://github.com/microsoft/vscode-cosmosdb
		https://github.com/formulahendry/vscode-docker-explorer


 - really good use of trees - Docker Explorer
 -- https://github.com/formulahendry/vscode-docker-explorer




## functionality: status bar

looking to use the status bar to show what device we are interacting with.

Once a device is selected, and a password is received, the status bar should appear

Status bar should show device details like "admin@192.168.1.1", but can also include details like installed ilx extensions and or version information

I was also able to append the password to the status bar object, so, this could be used to store and access the password/device/creds for all API calls, till the user calls "disconnect", which should hide the status bar and clear the current working credentials.

### example status bar repos

 - best status bar example seems to be the basic-multi-root-sample in the vscode-extension-samples

 - seems to be a git like extension that shows file status
https://github.com/vsls-contrib/gitdoc/blob/fbadc302bf94d64b2e448b22ee366259d760c6e7/src/watcher.ts

 - extension someone wrote to interface/play a game?  status bar is used to start/stop/pause
https://github.com/hozuki/snaky/blob/38b599b31032a40ba654d7bed131f97d5e0fa0e8/src/editor/StatusBarItems.ts

 - terminal use of creating and updating status bar item
https://github.com/spectra-one/terminalis/blob/8797bdba05038bb61cf01b879831a3ab985524ed/src/extension.ts

 - very simple status bar for quick task - seems to be an npm task monitor
https://github.com/lkytal/quickTask/blob/ad5efc17bb414e759126065fe885de93c1de771a/src/statusBar.ts

 - another simple example of using the status bar to show the total number of lines in current editor
https://github.com/praveenp30/total-lines/blob/eeb5a93707b1ec89c4f423ff6833c13000120275/extension.js

 - simple status bar implementation passing context to a call for complete mgmt
 https://github.com/chenzejiang/vscode-link-status-bar/blob/7764f9d2f693abc7fa0f4246d4f38ab0c0649d97/src/app.js


#### status bar color

https://stackoverflow.com/questions/42780975/visual-studio-code-status-bar-color

![one](./vscode_statusBar_colors.png)


## unit testing
- need to setup testing/unit/mock/mocha...
https://stackoverflow.com/questions/47906194/unit-test-functions-that-use-vscode-extension-api-functions/58827442#58827442
