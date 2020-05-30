describe('Teacher home', () => {
  beforeEach(function() {
    cy.login()
    cy.fixture('teachers/show.json').as('teacher-show')
    cy.server()
    cy.route('GET', '/teachers/profile', '@teacher-show').as('teacher-profile-route')
    cy.visit('/#/teachers/home')
    cy.wait(['@teacher-profile-route'])
  })

  describe('User clicks on one of its classrooms', () => {
    it('redirects the user to the classroom show page', () => {
      cy.get('@teacher-show')
        .then((json) => {
          const classroomId = json.teacher.classrooms[0].id
          const classroomElement = cy.get(`#classroom-${classroomId}`).click({force: true})
          cy.location().should((loc) => {
            expect(loc.hash).to.eq(`#/classrooms/${classroomId}`)
          })
        })
    })
  })

  describe('Classroom creation', () => {
    beforeEach(function() {
      cy.get('.action-add-classroom').click({ force: true })
    })
    describe('User clicks on add classrooms button', () => {
      it('should display the add classroom modal', () => {
        cy.get('#add-classroom-modal').should('be.visible')
      })
    })
    describe('Successfull creation', () => {
      it('should hide the add classroom modal', () => {
        cy.fixture('classrooms/show.json').as('classroom-add')
        cy.server()
        cy.route('POST', '/classrooms', '@classroom-add').as('classroom-add-route')
        cy.get('#add-classroom-modal').should('be.visible')
        cy.get('#add-classroom-modal #classroom-name-input').type('CE2-7')
        cy.get('#add-classroom-modal .action-add-classroom').click();
        cy.wait(['@classroom-add-route'])
        cy.get('#add-classroom-modal').should('not.exist');
      })

      it('should display the newly created classroom in the list', () => {
        cy.fixture('classrooms/show.json').as('classroom-add')
        cy.server()
        cy.route('POST', '/classrooms', '@classroom-add').as('classroom-add-route')
        cy.get('#add-classroom-modal').should('be.visible')
        cy.get('#add-classroom-modal #classroom-name-input').type('CE2-7')
        cy.get('#add-classroom-modal .action-add-classroom').click();
        cy.wait(['@classroom-add-route'])
        cy.get('@classroom-add')
          .then((json) => {
            cy.get(`#classroom-${json.classroom.id}`).should('exist')
          })
      })
    })

    describe('Cancel creation', () => {
      it('should hide the add classroom modal', () => {
        cy.get('#add-classroom-modal').should('be.visible')
        cy.get('#add-classroom-modal .action-cancel').click();
        cy.get('#add-classroom-modal').should('not.exist');
      })
    })

    describe('Error in the classroom add form', () => {
      context('when the user does not provide a classroom name', () => {
        it('should display an error below the classroom name input', () => {
          cy.fixture('classrooms/show.json').as('classroom-add')
          cy.server()
          cy.route({
            method: 'POST',
            url: '/classrooms',
            status: 400,
            response: {
              message: "Missing name."
            }
          }).as('classroom-add-route')
          cy.get('#add-classroom-modal').should('be.visible')
          cy.get('#add-classroom-modal .action-add-classroom').click();
          cy.wait(['@classroom-add-route'])
          cy.get('#classroom-name .invalid-feedback')
            .should('have.text', 'Please enter a classroom name.')
        })
      })
    })
  })
})
