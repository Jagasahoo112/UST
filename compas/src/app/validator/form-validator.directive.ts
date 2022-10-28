import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, FormGroup, FormControl } from '@angular/forms';

@Directive({
  selector: '[appFormValidator]', providers: [{ provide: NG_VALIDATORS, useExisting: FormValidatorDirective, multi: true }]
})


export class FormValidatorDirective implements Validator {

  constructor() { }
  validate(control?: AbstractControl): ValidationErrors {
    let actionItemLength = (<HTMLSelectElement>document.getElementById('actionItemLength'));

    if (actionItemLength !== null) {
      var deadlineValidityList = [];
      var invalidEmailAddress = [];
      var invalidUser = [];
      let actionItemCount = parseInt(actionItemLength.value);
      for (let i = 0; i <= actionItemCount - 1; i++) {
        deadlineValidityList[i] = false;
        invalidEmailAddress[i] = false;
        invalidUser[i] = false;
        let deadlineString = (<HTMLSelectElement>document.getElementById('deadlineText' + i)).value;
        let deadlineDate = (<HTMLSelectElement>document.getElementById('deadlineDte' + i)).value;
        let assigneDropdownValue = (<HTMLSelectElement>document.getElementById('assignee' + i)).value;
        if (assigneDropdownValue === '0') {
          let email = (<HTMLSelectElement>document.getElementById('otherAssigneeEmail' + i)).value;
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!re.test(String(email).toLowerCase())) {
            invalidEmailAddress[i] = true;
            return { invalidEmailAddress: invalidEmailAddress, invalidUser: invalidUser, deadlineValidityList: deadlineValidityList };
          } else {
            let validAssigneeId = (<HTMLSelectElement>document.getElementById('otherAssigneePersonalId' + i)).value;
            if (validAssigneeId === "") {
              invalidUser[i] = true;
              invalidEmailAddress[i] = false;
              return { invalidUser: invalidUser, invalidEmailAddress: invalidEmailAddress, deadlineValidityList: deadlineValidityList };
            }
          }
        }
        if (deadlineString !== "" && deadlineDate === "") {
          deadlineValidityList[i] = true;
          return { invalidUser: invalidUser, invalidEmailAddress: invalidEmailAddress, deadlineValidityList: deadlineValidityList };
        }
      }
    }
    return null;
  }
}