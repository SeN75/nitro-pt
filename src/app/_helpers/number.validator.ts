
import { AbstractControl, FormGroup } from "@angular/forms";
export function NumberValidator(controlName: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let controlValue = control.value + '';
    if (
      control.errors &&
      !control.errors?.numberValidator
    ) {
      console.log(control.errors &&
        !control.errors?.numberValidator)
      return;
    }
    if (controlValue.length > 0 && controlValue.length < 8) {
      if (controlValue.length > 4 && !controlValue.includes(".")) {
        control.setErrors({ numberValidator: true })
      }
      else if (controlValue.length > 4 && controlValue.length < 8) {
        const rq = /(([0-9]{1,4})\.([0-9]{0,2}))/g.test(controlValue)

        if (!rq)
          control.setErrors({ numberValidator: true })
        else
          control.setErrors(null)

      } else if (controlValue.length >= 8) {
        control.setErrors({ numberValidator: true })
      }
      else {
        control.setErrors(null)
      }
    }
    else {
      control.setErrors({ numberValidator: true })
    }
  };
}
