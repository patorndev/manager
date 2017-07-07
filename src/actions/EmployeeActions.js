import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_CLEAR_SUCCESS,
} from './types';

// Set state for EmployeeEdit
export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value },
  };
};

// Save new employee to Firebase
export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();
  // dispatch action
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)  // '/users/userId/employees' key users > loginUser > employee
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

// Fetch updated employees from Firebase to EmployeeList screen
export const employeeFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
    // from ref call snapshot function: snapshot is an object that describe what data is in there.
    // this event handler will exist for entire lifecycle of application
      .on('value', snapshot => {
        // dispatch action
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() }); // snapshot.val is actual data.
      });
  };
};

// Save updated employee info to Firebase
export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`) // ${uid} for specific employee
      .set({ name, phone, shift })
      .then(() => {
        //dispatch({ type: EMPLOYEE_SAVE_SUCCESS });// Reset state in EmployeeForm
        Actions.employeeList({ type: 'reset' }); // Navigate back to EmployeeList
      });
  };
};

// Clear state in EmployeeCreate Form
export const employeeClear = () => {
  return ({ type: EMPLOYEE_CLEAR_SUCCESS });
};

// Delete employee from Firebase
export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`) // ${uid} for specific employee
      .remove()
      .then(() => {
        Actions.employeeList({ type: 'reset' });
      });
  };
};
