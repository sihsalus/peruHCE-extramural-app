//Patient Functions

// Assumes it uses cohort member endpoint with version full
export function getPatientFullName(patientInfo) {
    if(patientInfo == null) return "";
    const givenName = patientInfo.patient.person.preferredName.givenName || ""; 
    const middleName = patientInfo.patient.person.preferredName.middleName || ""
    return  givenName + " " +middleName ;
}

// Assumes it uses cohort member endpoint with version full
export function getPatientPaternalLastName(patientInfo) {
    if(patientInfo == null) return "-"
    if(patientInfo.patient.person.preferredName.familyName == null) return "-"
    return patientInfo.patient.person.preferredName.familyName;
}

// Get paternal lastname from paternal lastname
export function getPatientPaternalLastNameAux(patientInfo) {
    if(patientInfo == null) return "-"
    if(patientInfo.patient.person.preferredName.familyName == null) return "-"
    const familyNameParts = patientInfo.patient.person.preferredName.familyName.trim().split(/\s+/);
    if(familyNameParts.length < 2) return "-"
    return familyNameParts[0];
}


// Assumes it uses cohort member endpoint with version full
export function getPatientMaternalLastName(patientInfo) {
    if(patientInfo == null) return "-"
    if(patientInfo.patient.person.preferredName.familyName2 == null) return "-"
    return patientInfo.patient.person.preferredName.familyName2;
}

// Get maternal lastname from paternal lastname
export function getPatientMaternalLastNameAux(patientInfo) {
    if(patientInfo == null) return "-"
    if(patientInfo.patient.person.preferredName.familyName == null) return "-"
    const familyNameParts = patientInfo.patient.person.preferredName.familyName.trim().split(/\s+/);
    if(familyNameParts.length < 2) return "-"
    return familyNameParts[1];
}

// Assumes it uses cohort member endpoint with version full
export function getPatientSex(patientInfo) {
    if(patientInfo == null) return "-"
    if(patientInfo.patient.person.gender == null) return "-";
    const auxSex = patientInfo.patient.person.gender;
    switch (auxSex) {
        case "M":
            return "Hombre"
            break;
      
        case "F":
            return "Mujer"
            break;
      
        default:
            return "-"
            break;
    }
}



