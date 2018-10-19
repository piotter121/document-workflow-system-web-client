import {Pipe, PipeTransform} from '@angular/core';
import {VersionInfo} from "../versions/version-info";
import {DifferenceType} from "../versions/difference-type.enum";

@Pipe({
  name: 'numberOfDeletedLines'
})
export class NumberOfDeletedLinesPipe implements PipeTransform {

  transform(version: VersionInfo): number {
    return version.differences
      .filter(difference => difference.differenceType === DifferenceType.Delete)
      .map(difference => difference.previousSectionSize)
      .reduce((a, b) => a + b, 0);
  }

}
