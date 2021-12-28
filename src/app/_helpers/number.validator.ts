
import { AbstractControl, FormGroup } from "@angular/forms";
export function NumberValidator(controlName: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    if (
      control.errors &&
      !control.errors.numberValidator
    ) {
      return;
    }
    if (controlName.length > 0 && controlName.length < 8) {
      if (controlName.length > 4 && !controlName.includes(".")) {
        control.setErrors({ numberValidator: true })
      }
      else if (controlName.includes(".") || controlName.length < 5) {
        const rq = /(^([0-9]{1,4})\.([0-9]{1,3})?$)/g.test(controlName)
        console.log(rq)
        if (!rq)
          control.setErrors({ numberValidator: true })
        else
          control.setErrors(null)

      } else {
        control.setErrors(null)

      }
    }
  };
}
