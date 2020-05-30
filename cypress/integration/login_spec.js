describe('Login page', () => {
  describe('teacher login redirection', () => {
    it('redirects to the teacher login page', () => {
      cy.visit('/#/login')
      cy.get('#teacher-login').click()
      cy.location().should((loc) => {
        expect(loc.hash).to.eq('#/teachers/login')
      })
    })
  })

  describe('student login redirection', () => {
    it('redirects to the classroom login page', () => {
      cy.visit('/#/login')
      cy.get('#student-login').click()
      cy.location().should((loc) => {
        expect(loc.hash).to.eq('#/classrooms/login')
      })
    })
  })
})

