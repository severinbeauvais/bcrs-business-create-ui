import Vue from 'vue'
import { wrapperFactory } from '../jest-wrapper-factory'
import { AgreementType } from '@/components/IncorporationAgreement'
import { CorpTypeCd, GetCorpFullDescription } from '@bcrs-shared-components/corp-type-module'

// Input field selectors to test changes to the DOM elements.
const typeSelector: string = '#agreement-type-'
const summaryErrorMessageSelector: string = '.agreement-invalid-message'
const summaryTextSelector: string = '.summary-desc'

const agreementTypeTestCases = [
  {
    entityType: CorpTypeCd.COOP,
    sampleAgreement: {
      agreementType: 'sample'
    },
    customAgreement: {
      agreementType: 'custom'
    },
    sampleSummaryText: '',
    customSummaryText: ''
  },
  {
    entityType: CorpTypeCd.BENEFIT_COMPANY,
    sampleAgreement: {
      agreementType: 'sample'
    },
    customAgreement: {
      agreementType: 'custom'
    },
    sampleSummaryText: 'The sample Incorporation Agreement and Benefit Company Articles containing a benefit ' +
      'provision have been completed and a copy added to the company\'s record book.',
    customSummaryText: 'A custom Incorporation Agreement and custom Benefit Company Articles containing ' +
      'a benefit provision have been completed and a copy added to the company\'s record book.'
  },
  {
    entityType: CorpTypeCd.BC_COMPANY,
    sampleAgreement: {
      agreementType: 'Table-1'
    },
    customAgreement: {
      agreementType: 'custom'
    },
    sampleSummaryText: 'BC COMPANY description placeholder',
    customSummaryText: 'BC COMPANY description placeholder'
  },
  {
    entityType: CorpTypeCd.BC_ULC_COMPANY,
    sampleAgreement: {
      agreementType: 'Table-1'
    },
    customAgreement: {
      agreementType: 'custom'
    },
    sampleSummaryText: 'BC ULC description placeholder',
    customSummaryText: 'BC ULC description placeholder'
  },
  {
    entityType: CorpTypeCd.BC_CCC,
    sampleAgreement: {
      agreementType: 'sample'
    },
    customAgreement: {
      agreementType: 'custom'
    },
    sampleSummaryText: 'BC CCC description placeholder',
    customSummaryText: 'BC CCC description placeholder'
  }
]

for (const test of agreementTypeTestCases) {
  describe(`Share Structure component for a ${GetCorpFullDescription(test.entityType)}`, () => {
    let wrapper: any

    it('Loads the component in edit mode and both agreement types are not selected', () => {
      wrapper = wrapperFactory(
        AgreementType,
        null,
        {
          entityType: test.entityType,
          incorporationAgreementStep: ''
        }
      )
      const sampleSelector = `${typeSelector}${test.sampleAgreement.agreementType}`
      const customSelector = `${typeSelector}${test.customAgreement.agreementType}`

      expect(wrapper.find(sampleSelector).attributes('aria-checked')).toBe('false')
      expect(wrapper.find(customSelector).attributes('aria-checked')).toBe('false')
    })

    it('Selects the radio button if the value is set in the store', () => {
      wrapper = wrapperFactory(
        AgreementType,
        null,
        {
          entityType: test.entityType,
          incorporationAgreementStep: test.sampleAgreement
        }
      )
      const sampleSelector = `${typeSelector}${test.sampleAgreement.agreementType}`
      const customSelector = `${typeSelector}${test.customAgreement.agreementType}`

      expect(wrapper.find(sampleSelector).attributes('aria-checked')).toBe('true')
      expect(wrapper.find(customSelector).attributes('aria-checked')).toBe('false')
    })

    it('Displays the summary text for sample agreement type', () => {
      wrapper = wrapperFactory(
        AgreementType,
        { isSummary: true },
        {
          entityType: test.entityType,
          incorporationAgreementStep: test.sampleAgreement
        }
      )

      expect(wrapper.find(summaryTextSelector).text()).toContain(test.sampleSummaryText)
    })

    it('Displays the summary text for custom agreement type', () => {
      wrapper = wrapperFactory(
        AgreementType,
        { isSummary: true },
        {
          entityType: test.entityType,
          incorporationAgreementStep: test.customAgreement
        }
      )

      expect(wrapper.find(summaryTextSelector).text()).toContain(test.customSummaryText)
    })

    it('Displays the error message in summary view if no agreement type is selected', () => {
      wrapper = wrapperFactory(
        AgreementType,
        {
          isSummary: true,
          showErrorSummary: true
        },
        {
          entityType: test.entityType
        }
      )

      expect(wrapper.find(summaryErrorMessageSelector).text()).toContain('This step is not complete.')
    })

    it('Updates the store correctly if a sample agreement type is selected', async () => {
      wrapper = wrapperFactory(
        AgreementType,
        null,
        {
          entityType: test.entityType,
          incorporationAgreementStep: {
            agreementType: null
          }
        }
      )

      // Verify agreement type is null
      expect(wrapper.vm.$data.agreementType).toBe(null)

      // Select the Sample Radio btn
      const sampleSelector = `${typeSelector}${test.sampleAgreement.agreementType}`
      const radio = wrapper.find(sampleSelector)
      radio.trigger('click')
      await Vue.nextTick()

      // Verify state is updated
      expect(wrapper.vm.$data.agreementType).toBe(test.sampleAgreement.agreementType)
    })

    it('Updates the store correctly if a custom agreement type is selected', async () => {
      wrapper = wrapperFactory(
        AgreementType,
        null,
        {
          entityType: test.entityType,
          incorporationAgreementStep: {
            agreementType: null
          }
        }
      )

      // Verify agreement type is null
      expect(wrapper.vm.$data.agreementType).toBe(null)

      // Select the Sample Radio btn
      const customSelector = `${typeSelector}${test.customAgreement.agreementType}`
      const radio = wrapper.find(customSelector)
      radio.trigger('click')
      await Vue.nextTick()

      // Verify state is updated
      expect(wrapper.vm.$data.agreementType).toBe(test.customAgreement.agreementType)
    })
  })
}
