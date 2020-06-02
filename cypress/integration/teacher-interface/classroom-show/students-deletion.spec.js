let classroom;

describe('Student deletion', () => {
  beforeEach(function() {
    cy.teacherLogin()
    cy.fixture('classrooms/show.json').as('classroom-get')
    cy.fixture('students/index.json').as('students-index')
    cy.server()
    cy.get('@classroom-get')
      .then((json) => {
        classroom = json.classroom;
        cy.route('GET', `/classrooms/${classroom.id}`, '@classroom-get').as('classroom-get-route')
        cy.route('GET', `/classrooms/${classroom.id}/students`, '@students-index').as('students-index-route')
        cy.visit(`/#/classrooms/${classroom.id}`)
        cy.wait(['@classroom-get-route'])
        cy.wait(['@students-index-route'])
        cy.get('.action-delete-student').first().click();
      })
  })

  it('should display the student deletion confirmation modal', () => {
    cy.get('#delete-student-confirmation-modal').should('be.visible')
  })

  describe('Successfull deletion', () => {
    let fullname;

    beforeEach(function() {
      cy.fixture('students/after-delete.json').as('students-after-delete')
      cy.fixture('students/show.json').as('students-delete')
      cy.get('@students-index')
        .then((json) => {
          const student = json.students[0];
          fullname = student.fullName;
          cy.route(
            'DELETE',
            `/classrooms/${student.classroomId}/students/${student.id}`,
            '@students-delete')
          .as('students-delete-route')
          cy.route(
            'GET',
            `/classrooms/${student.classroomId}/students`,
            '@students-after-delete')
          .as('students-index-route')
        })
    })

    it('should hide the student deletion confirmation modal', () => {
      cy.get('#delete-student-confirmation-modal #student-name-input').type(fullname)
      cy.get('#delete-student-confirmation-modal .action-delete-student').click()
      cy.wait(['@students-delete-route'])
      cy.wait(['@students-index-route'])
    })
  })
})
