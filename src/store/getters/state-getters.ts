// Enums
import { AccountTypes, EntityTypes, RouteNames } from '@/enums'
import {
  NameRequestDetailsIF,
  NameRequestApplicantIF,
  NameTranslationIF
} from '@/interfaces'

/**
 * Whether the user has "staff" keycloak role.
 */
export const isRoleStaff = (state: any): boolean => {
  return state.stateModel.tombstone.keycloakRoles.includes('staff')
}

/**
 * Whether the user is authorized to edit.
 */
export const isAuthEdit = (state: any): boolean => {
  return state.stateModel.tombstone.authRoles.includes('edit')
}

/**
 * Whether the user is authorized to view.
 */
export const isAuthView = (state: any): boolean => {
  return state.stateModel.tombstone.authRoles.includes('view')
}

/**
 * Whether the entity type has been identified.
 */
export const isEntityType = (state: any): boolean => {
  return !!state.stateModel.entityType
}

/**
 * Whether the entity is a BCOMP.
 */
export const isTypeBcomp = (state: any): boolean => {
  return (state.stateModel.entityType === EntityTypes.BCOMP)
}

/**
 * Whether the entity is a COOP.
 */
export const isTypeCoop = (state: any): boolean => {
  return (state.stateModel.entityType === EntityTypes.COOP)
}

/**
 * Whether the current account is a premium account
 */
export const isPremiumAccount = (state: any): boolean => {
  return (state.stateModel.accountInformation.accountType === AccountTypes.PREMIUM)
}

/**
 * Returns the current account id
 */
export const getAccountId = (state: any): number => {
  return state.stateModel.accountInformation.id
}

/**
 * Returns the current date.
 */
export const getCurrentDate = (state: any): string => {
  return state.stateModel.currentDate
}

/**
 * Returns the filing id.
 */
export const getFilingId = (state: any): number => {
  return state.stateModel.filingId
}

/**
 * Returns the business identifier.
 */
export const getTempId = (state: any): string => {
  return state.stateModel.tempId
}
/**
 * Returns the folio number.
 */
export const getFolioNumber = (state: any): string => {
  return state.stateModel.defineCompanyStep.folioNumber
}

/**
 * Whether this IA is for a Named Business.
 */
export const isNamedBusiness = (state: any): boolean => {
  // a named business has a NR number
  return !!state.stateModel.nameRequest.nrNumber
}

/**
 * Returns the NR number of a name request.
 */
export const getNameRequestNumber = (state: any): string => {
  return state.stateModel.nameRequest.nrNumber
}

/**
 * Returns the approved name of a name request.
 */
export const getApprovedName = (state: any): string => {
  return state.stateModel.nameRequest.details.approvedName
}

/**
 * Returns name request details.
 */
export const getNameRequestDetails = (state: any): NameRequestDetailsIF => {
  return state.stateModel.nameRequest.details
}

/**
 * Returns name request applicant information.
 */
export const getNameRequestApplicant = (state: any): NameRequestApplicantIF => {
  return state.stateModel.nameRequest.applicant
}

/**
 * Returns name translations.
 */
export const getNameTranslations = (state: any): NameTranslationIF[] => {
  return state.stateModel.nameTranslations
}

/**
 * Returns the office addresses.
 */
export const getOfficeAddresses = (state: any): string => {
  return state.stateModel.defineCompanyStep.officeAddresses
}

/** Whether we are ignoring data changes. */
export const ignoreChanges = (state: any): boolean => {
  return state.stateModel.ignoreChanges
}

/** Whether there are unsaved data changes. */
export const haveChanges = (state: any): boolean => {
  return state.stateModel.haveChanges
}

//
// Below is the business logic that allows the Stepper, the Actions, etc
// to know how they should behave (ie, what to show or enable).
//

/**
 * Whether Back button should be displayed.
 */
export const isShowBackBtn = (state: any): boolean => {
  return (state.stateModel.currentStep > 1)
}

/**
 * Whether Review and Confirm button should be displayed.
 */
export const isShowReviewConfirmBtn = (state: any, getters: any): boolean => {
  return (!!state.stateModel.entityType && state.stateModel.currentStep < getters.getMaxStep)
}

/**
 * Whether File and Pay button should be displayed.
 */
export const isShowFilePayBtn = (state: any, getters: any): boolean => {
  return (state.stateModel.currentStep === getters.getMaxStep)
}

/**
 * Whether File and Pay button should be enabled.
 */
export const isEnableFilePayBtn = (state: any, getters: any): boolean => {
  const step1Valid = state.stateModel.defineCompanyStep.valid
  const step2Valid = state.stateModel.addPeopleAndRoleStep.valid
  const step3Valid = getters.isTypeBcomp ? state.stateModel.createShareStructureStep.valid : false
  const step4Valid = getters.isTypeBcomp ? state.stateModel.incorporationAgreementStep.valid : false
  const step5Valid = state.stateModel.certifyState.valid && state.stateModel.incorporationDateTime.valid
  return (step1Valid && step2Valid && step3Valid && step4Valid && step5Valid)
}

/**
 * Whether app is busy saving or resuming.
 */
export const isBusySaving = (state: any): boolean => {
  return (state.stateModel.isSaving || state.stateModel.isSavingResuming || state.stateModel.isFilingPaying)
}

/** Is true when the step is valid. */
export const isDefineCompanyValid = (state: any): boolean => {
  return state.stateModel.defineCompanyStep.valid
}

/** Is true when the step is valid. */
export const isAddPeopleAndRolesValid = (state: any): boolean => {
  return state.stateModel.addPeopleAndRoleStep.valid
}

/** Is true when the step is valid. */
export const isCreateShareStructureValid = (state: any): boolean => {
  return state.stateModel.createShareStructureStep.valid
}

/** Is true when the step is valid. */
export const isIncorporationAgreementValid = (state: any): boolean => {
  return state.stateModel.incorporationAgreementStep.valid
}

/**
 * Whether all the incorporation steps are valid.
 */
export const isApplicationValid = (state: any): boolean => {
  return (state.stateModel.defineCompanyStep.valid && state.stateModel.addPeopleAndRoleStep.valid &&
    state.stateModel.createShareStructureStep.valid && state.stateModel.incorporationDateTime.valid &&
    state.stateModel.incorporationAgreementStep.valid && state.stateModel.certifyState.valid)
}

/**
 * Returns the maximum step number.
 */
export const getMaxStep = (state: any, getters: any): number => {
  return getters.getSteps ? getters.getSteps.filter(step => step.step !== -1).length : -1
}
