const CertificatesIntegration = () => describe('Certificates', () => {
  before(() => {
    cy.restoreSessionStorage();
  });

  it('open navbar dropdown', () => {
    cy.get('.header__navigation-action--resources').click()
    cy.wait(750)
    cy.get('.nav-dropdown__items > [href="/certificados"]').click()
  })

  it('open certificate', () => {
    cy.get('.certificateList').within(() => {
      cy.get('h3').contains('Certificado de Conclusão do Tutorial')
    })
  })
})

export default CertificatesIntegration
