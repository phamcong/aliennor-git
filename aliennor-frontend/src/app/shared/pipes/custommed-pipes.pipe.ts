import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'values',  pure: false })
export class ValuesPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => value[key]);
  }
}

@Pipe({name: 'htmlToPlaintext'})
export class HtmlToPlaintextPipe implements PipeTransform {
  transform(text: string): string {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }
}

@Pipe({name: 'truncate'})
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: string[]): string {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
