describe('Teacher login', () => {
  context('when the teacher successfully login', () => {
    it('redirects to the teacher home page', () => {
      cy.fixture('teachers/login.json').as('teacher-login')
      cy.server()
      cy.route('POST', '/teachers/login', '@teacher-login').as('teacher-login-route')
      cy.visit('/#/teachers/login')
      cy.get('#email-input').type('user@learn.com')
      cy.get('#password-input').type('password')
      cy.get('#login-button').click()
      cy.wait(['@teacher-login-route'])
      cy.location().should((loc) => {
        expect(loc.hash).to.eq('#/teachers/home')
      })
    })
  })

  describe('when the teacher login fails', () => {
    context('when the email or password are incorrect', () => {
      beforeEach(function() {
        cy.server()
        cy.route({
          method: 'POST',
          url: '/teachers/login',
          status: 400,
          response: {
            message: "Incorrect email or password."
          }
        }).as('teacher-login-route')
        cy.visit('/#/teachers/login')
        cy.get('#email-input').type('wrong-email@learn.com')
        cy.get('#password-input').type('wrong-password')
        cy.get('#login-button').click()
        cy.wait(['@teacher-login-route'])
      });

      it('does not redirect to the teacher home page', () => {
        cy.location().should((loc) => {
          expect(loc.hash).to.eq('#/teachers/login')
        })
      })
      it('displays an error alert', () => {
        cy.get('#form-error-alert')
          .should('have.text', 'Incorrect email or password.')
      })
    })

    describe('when the email or password are missing', () => {
      beforeEach(function() {
        cy.server()
        cy.route({
          method: 'POST',
          url: '/teachers/login',
          status: 400,
          response: {
            message: "Missing credentials."
          }
        }).as('teacher-login-route')
        cy.visit('/#/teachers/login')
        cy.get('#password-input').type('password')
        cy.get('#login-button').click()
        cy.location().should((loc) => {
          expect(loc.hash).to.eq('#/teachers/login')
        })
        cy.wait(['@teacher-login-route'])
      })

      it('displays an error alert', () => {
        cy.get('#form-error-alert')
          .should('have.text', 'Missing credentials.')
      })

      it('displays an error feedback under the email input', () => {
        cy.get('#email .invalid-feedback')
          .should('have.text', 'Please enter an email.')
      })

      it('displays an error feedback under the password input', () => {
        cy.get('#password .invalid-feedback')
          .should('have.text', 'Please enter your password.')
      })
    })
  })
})

