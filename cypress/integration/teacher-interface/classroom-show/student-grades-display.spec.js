let classroom;

describe('Student grades display', () => {
  beforeEach(function() {
    cy.teacherLogin()
    cy.fixture('classrooms/show.json').as('classrooms-show')
    cy.fixture('students/index.json').as('students-index')
    cy.fixture('levels/index.json').as('levels-index')
    cy.server()
    cy.get('@classrooms-show')
      .then((json) => {
        classroom = json.classroom;
        cy.route('GET', `/classrooms/${classroom.id}`, '@classrooms-show').as('classroom-get-route')
        cy.route('GET', `/classrooms/${classroom.id}/students`, '@students-index').as('students-index-route')
        cy.route('GET', `/levels`, '@levels-index').as('levels-index-route')
        cy.visit(`/#/classrooms/${classroom.id}`)
        cy.wait(['@classroom-get-route'])
        cy.wait(['@students-index-route'])
        cy.wait(['@levels-index-route'])
      })
  })

  it('displays students grades in the students table', () => {

    cy.get('#students-table tbody th')
      .should(($th) => {

        const classes = $th.map((i, el) => {
          return Cypress.$(el).attr('class')
        })

        expect(classes.get()[0]).to.eq('needs-help')
        expect(classes.get()[1]).to.eq('doing-great')
        expect(classes.get()[2]).to.eq('still-learning')
        expect(classes.get()[7]).to.eq('not-tackled-yet')
      })
  })
})
