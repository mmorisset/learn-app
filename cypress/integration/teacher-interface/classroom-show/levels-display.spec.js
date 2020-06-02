let classroom;

describe('Levels display', () => {
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
  it('displays levels in the students table', () => {

    cy.get('#students-table thead th')
      .should(($th) => {
        expect($th).to.have.length(5)

        const texts = $th.map((i, el) => {
          return Cypress.$(el).text()
        })

        expect(texts.get()).to.deep.eq([
          'Students',
          'Easy',
          'Medium',
          'Hard',
          'Actions'
        ])
    })
  })
})
