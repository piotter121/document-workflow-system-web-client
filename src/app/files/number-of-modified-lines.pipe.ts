import {Pipe, PipeTransform} from '@angular/core';
import {VersionInfo} from "../versions/version-info";
import {DifferenceType} from "../versions/difference-type.enum";

@Pipe({
  name: 'numberOfModifiedLines'
})
export class NumberOfModifiedLinesPipe implements PipeTransform {

  transform(version: VersionInfo): number {
    return version.differences
      .filter(difference => difference.differenceType === DifferenceType.Modification)
      .map(difference => difference.newSectionSize)
      .reduce((a, b) => a + b, 0);
  }

}
