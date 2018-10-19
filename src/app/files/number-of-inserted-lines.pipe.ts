import {Pipe, PipeTransform} from '@angular/core';
import {DifferenceType} from "../versions/difference-type.enum";
import {VersionInfo} from "../versions/version-info";

@Pipe({
  name: 'numberOfInsertedLines'
})
export class NumberOfInsertedLinesPipe implements PipeTransform {

  transform(version: VersionInfo): number {
    return version.differences
      .filter(difference => difference.differenceType === DifferenceType.Insert)
      .map(difference => difference.newSectionSize)
      .reduce((a, b) => a + b, 0);
  }

}
