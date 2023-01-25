import { AbstractControl, ValidatorFn } from "@angular/forms";

export function greaterOrEqualThan(valueControl: AbstractControl | null) : ValidatorFn {

    return (control: AbstractControl) => {
        if(valueControl){
            const value = valueControl.value
            let currValue = parseFloat(control.value)
            return currValue >= value ? null : {greaterOrEqual: {value: false}}
        }
        return {greaterOrEqual: {value: false}}
        
    }
}

export function numAccountValidator(): ValidatorFn{
    return (control) => {
        const pattern1 =  /^([0-9]{5}-[0-9]{11}-[0-9]{2})$/;
        const testValue = control.value == null ? "" : (control.value as String).toString()
        if(testValue.match(pattern1))
            return null
        else return {numAccount : {value: control.value}}
    }
}