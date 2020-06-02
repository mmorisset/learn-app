describe('Classroom login', () => {
  context('when the student successfully login in the classroom', () => {
    it('redirects to the classroom student list page', () => {
      cy.fixture('classrooms/login.json').as('classroom-login')
      cy.server()
      cy.route('POST', '/classrooms/login', '@classroom-login').as('classroom-login-route')
      cy.visit('/#/classrooms/login')
      cy.get('.react-code-input input').eq(0).type(2)
      cy.get('.react-code-input input').eq(1).type(2)
      cy.get('.react-code-input input').eq(2).type(2)
      cy.get('.react-code-input input').eq(3).type(2)
      cy.get('.react-code-input input').eq(4).type(2)
      cy.get('.react-code-input input').eq(5).type(2)
      cy.wait(['@classroom-login-route'])
      cy.get('@classroom-login')
        .then((json) => {
          const { classroom: { id } } = json;
          cy.location().should((loc) => {
            expect(loc.hash).to.eq(`#/classrooms/${id}/students`)
          })
        })
    })
  })

  describe('when the student fails to login in the classroom', () => {
    beforeEach(function() {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/classrooms/login',
        status: 400,
        response: {
          message: "Incorrect code."
        }
      }).as('classroom-login-route')
      cy.visit('/#/classrooms/login')
      cy.get('.react-code-input input').eq(0).type(2)
      cy.get('.react-code-input input').eq(1).type(2)
      cy.get('.react-code-input input').eq(2).type(2)
      cy.get('.react-code-input input').eq(3).type(2)
      cy.get('.react-code-input input').eq(4).type(2)
      cy.get('.react-code-input input').eq(5).type(2)
      cy.wait(['@classroom-login-route'])
    })

    it('does not redirect to the classroom student list page', () => {
      cy.location().should((loc) => {
        expect(loc.hash).to.eq('#/classrooms/login')
      })
    })

    it('displays an error alert', () => {
      cy.get('#form-error-alert')
        .should('have.text', 'Incorrect code.')
    })
  })
})

