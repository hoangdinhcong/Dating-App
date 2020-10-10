import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';


// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable({ providedIn: 'root' })
export class PreventUnSavedChangesGuard implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent, ): boolean {

        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaves changes will be lost');
        }

        return true;
    }
}
