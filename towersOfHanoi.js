const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class TowersOfHanoi {
  constructor() {
    this.stacks = new Array(3);
    for (let i = 0; i < this.stacks.length; i++) {
      if (i === 0) {
        this.stacks[i] = [3, 2, 1];
      } else {
      this.stacks[i] = new Array();
      }
    }
  }

  promptMove(callback) {
    console.log(this.stacks);
    reader.question(`Which stack do you want to move from?`, (fromStack) => {
      reader.question(`Which stack do you want to move to?`, (toStack) => {
        fromStack = parseInt(fromStack);
        toStack = parseInt(toStack);
        callback(fromStack, toStack);
      });
    });
  }

  validMove(fromStack, toStack) {
    let validFrom = (this.stacks[fromStack].length !== 0);
    let validTo = (this.stacks[toStack].length === 0) || (this.stacks[toStack][this.stacks[toStack].length - 1] > this.stacks[fromStack][this.stacks[fromStack].length - 1]);
    return validFrom && validTo;
  }

  move(fromStack, toStack) {
    if (this.validMove(fromStack, toStack)) {
      this.stacks[toStack].push(this.stacks[fromStack].pop());
      return true;
    } else {
      return false;
    }
  }

  won() {
    if (this.stacks[0].length === 0 && (this.stacks[1].length === 0 || this.stacks[2].length === 0)) {
      return true;
    } else {
      return false;
    }
  }

  run() {
    this.promptMove((fromStack, toStack) => {
      let success = this.move(fromStack, toStack);
      if (!success) {
        console.log("Invalid move");
      }

      if(!this.won()) {
        this.run();
      } else {
        console.log(`You win!`);
        reader.close();
      }
    });
  }
}

let t = new TowersOfHanoi();
console.log(t);
t.run();
