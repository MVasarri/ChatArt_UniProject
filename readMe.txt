# ChatArt

It is a mobile web application, with an internal search engine linked to the Wikipidia API, to search for artworks, 
it also has a chat interface to ask questions to a Visual questioning and answering API (VQA), 
to answer questions posed in natural language, about the artwork

---
## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm
      
If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g
    
# Getting started
- Clone the repository
```
git clone  https://github.com/MVasarri/ChatArt_UniProject.git
```
- Install dependencies
```
cd ChatArt_UniProject
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:3000`

