## Welcome to Whackamole!
How many moles can you whack?

## Tested on
| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome |
| --------- | --------- | --------- | --------- |
| IE11| latest


## To run
Requirements
* `node >= v8.6`
* NPM

* Note: checkout the branch `without-webpack` to skip the following steps

### Steps:
1. From the command line, clone the repo
* for `ssh`:
  ```
  git clone git@github.com:jack829/whack-a-mole.git
  ```
* for `https`:
  ```
  git clone https://github.com/jack829/whack-a-mole.git`
  ```

2. Install dependencies
```
npm install
```

3. To run in `dev` mode (for live reloading if you feel like playing with the code)
```
npm run dev
```
* Navigate to `localhost:8080` in your browser

4. To build the static production build
```
npm run build
```

* Copy the file path for `dist/index.html` and paste it into your browser
