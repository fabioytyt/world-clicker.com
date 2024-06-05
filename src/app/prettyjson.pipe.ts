import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'prettyjson',
  standalone: true
})
export class PrettyjsonPipe implements PipeTransform {

  transform(val: any) { 
    return JSON.stringify(val, undefined, 4) 
        .replace(/ /g, ' ') 
        .replace(/\n/g, ''); 
} 

}