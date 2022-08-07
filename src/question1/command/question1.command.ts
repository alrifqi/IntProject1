// import process from 'process';
import { Console, Command, createSpinner } from 'nestjs-console';

@Console()
export class Question1Command {
  constructor(){}
  @Command({
      command: 'question1',
      options: [
        {
          flags: '-n, --number <number>',
          description: 'number',
          required: true,
        }
      ]
  })
  async answerQuestion1(param, options): Promise<void> {
    for(let i=1; i<=5; i++) {
      let total = 0;
      for(let x=1; x<=5; x++) {
        total = total + i;
        process.stdout.write(`${total} `);
      }
      console.log("")
    }
  }
}