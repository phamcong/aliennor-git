import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorsToList'
})
export class ErrorsToListPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
