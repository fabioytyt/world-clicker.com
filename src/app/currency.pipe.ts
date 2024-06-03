import { Pipe, PipeTransform, output } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {

  public transform(value: number, ...args: unknown[]): string {
   
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letters: string[] = [];
    
    for (let i = 0; i < alphabet.length; i++) {
      for (let j = 0; j < alphabet.length; j++) {
        letters.push(alphabet[i] + alphabet[j]);
      }
    }
    
    // console.log(letters);

    console.log(value, ...args);
    if (value < 1000) {return ((value).toFixed(2))}
    else if (value >= 1000 && value <= 999999) {return ((value/1000).toFixed(2)+ "K")}
    else if (value >= 1000000 && value <= 999999999) {return ((value/1000000).toFixed(2)+"M")}
    else if (value >= 1000000000 && value <= 999999999999) {return((value/1000000000).toFixed(2)+"B")}
    else if (value >= 1000000000000 && value <= 999999999999999) {return((value/1000000000000).toFixed(2)+"T")}
    else if (value >= 1000000000000000 ) {
      let next = value / 1000000000000;
      // console.log(value, next);
      let outputText = -1;
      while(next / 1000 > 1) {
        // console.log(next);
        next = next /1000;
        outputText++;
      }
      // console.log(letters, next.toFixed(2) + letters[outputText]);
      
      return (next.toFixed(2) + letters[outputText])

    }
   

    return null;
  }

}
