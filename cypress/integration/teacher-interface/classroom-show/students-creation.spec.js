let classroom;

describe('Student Creation', () => {
  beforeEach(function() {
    cy.teacherLogin()
    cy.fixture('classrooms/show.json').as('classrooms-show')
    cy.fixture('students/index.json').as('students-index')
    cy.server()
    cy.get('@classrooms-show')
      .then((json) => {
        classroom = json.classroom;
        cy.route('GET', `/classrooms/${classroom.id}`, '@classrooms-show').as('classroom-get-route')
        cy.route('GET', `/classrooms/${classroom.id}/students`, '@students-index').as('students-index-route')
        cy.visit(`/#/classrooms/${classroom.id}`)
        cy.wait(['@classroom-get-route'])
        cy.wait(['@students-index-route'])
      })
    cy.get('.action-add-students').first().click({ force: true })
  })
  describe('User clicks on add students button', () => {
    it('should display the add students modal', () => {
      cy.get('#add-students-modal').should('be.visible')
    })
  })
  describe('Successfull creation', () => {
    beforeEach(function() {
      cy.fixture('students/after-add.json').as('students-after-add')
      cy.route('POST', `/classrooms/${classroom.id}/students`, '').as('students-add-route')
      cy.route('GET', `/classrooms/${classroom.id}/students`, '@students-after-add').as('students-index-route')
      cy.get('#add-students-modal').should('be.visible')
      cy.get('#add-students-modal #students-names-input').type('Shayne Mayer{enter}')
      cy.get('#add-students-modal #students-names-input').type('Margie Frami{enter}')
      cy.get('#add-students-modal .action-add-students').click();
      cy.wait(['@students-add-route'])
      cy.wait(['@students-index-route'])
    })

    it('should hide the add student modal', () => {
      cy.get('#add-students-modal').should('not.exist');
    })

    it('should display the newly created students in the list', () => {
      cy.get('@students-index')
        .then((json) => {
          cy.get(`#student-${json.students[0].id}`).should('exist')
        })
    })
  })

  describe('Cancel creation', () => {
    it('should hide the add classroom modal', () => {
      cy.get('#add-students-modal .action-cancel').click();
      cy.get('#add-students-modal').should('not.exist');
    })
  })
})
