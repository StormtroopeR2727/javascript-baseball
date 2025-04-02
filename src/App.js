import { Console, Random } from '@woowacourse/mission-utils';

class App {

  async play() {

    let isPlaying = true;
    Console.print("숫자 야구 게임을 시작합니다.");

    while(isPlaying){
      const ANSWER = await this.getRandomNumbers();
      await this.playGame(ANSWER);
      isPlaying = await this.askRestart();
    }
  }

  async getRandomNumbers(){
      let numbers = [0, 0, 0];
      for(let i=0 ; i<3 ; i++){
        let num;
        num = Random.pickNumberInRange(1,9);
        if(!numbers.includes(num))
          numbers[i]=num;
      }
      return numbers;
    }

  async playGame(answer){
    let isCorrect = false;
    while(!isCorrect){
    const INPUT = await Console.readLineAsync("숫자를 입력해주세요 : ");
    if (!/^[1-9]{3}$/.test(INPUT))
      throw new Error("[ERROR] 1~9 사이의 숫자 3개를 입력해야 합니다.");
    const DIGITS = INPUT.split("");
    const SET = new Set(DIGITS);
    if(SET.size!=GIGITS.length)
      throw new Error("[ERROR] 중복된 값이 없도록 입력해야 합니다.");

    const INPUT_NUMBERS = INPUT.split("").map(Number);
    
    const SCORE = this.contrastTwoNumbers(answer, INPUT_NUMBERS);
    
    isCorrect = await this.scorePrint(SCORE);
      
    }
  }
  
  contrastTwoNumbers(answer, inputNumbers){
    let strike=0, ball=0
    for(let i = 0; i<answer.length ; i++){
      if(answer[i]==inputNumbers[i])
        strike++;
      else if(answer.includes(inputNumbers[i]))
        ball++;
  }
  return [strike, ball];
}

async scorePrint(score){
  let correct = false;
  let message = "";
  if(score[0]==3){
    message = "3스트라이크\n3개의 숫자를 모두 맞히셨습니다! 게임종료";
    correct = true;
  }
  else if(score[1] > 0 && score[0] ==0) message = `${score[1]}볼`;
  else{
    if(score[0]>0) message += `${score[0]}스트라이크 `;
    if(score[1]>0) message += `${score[1]}볼`;
  }
  if(score[0]==0&&score[1]==0)  message = "낫싱";
  
  Console.print(message);
  return correct;
}

  async askRestart(){
    const INPUT = await Console.readLineAsync("게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.");
    if(INPUT==1)
      return true;
    else if(INPUT==2)
      return false;
    else if (!/^[1-2]$/.test(INPUT))
      throw new Error("[ERROR] 1~2 사이의 숫자를 입력해야 합니다.");
  }
}

export default App;
