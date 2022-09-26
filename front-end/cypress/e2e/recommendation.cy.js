/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types='cypress' />

beforeEach(() => {
  cy.resetDatabase()
  cy.visit('http://localhost:3000')
})

describe('Create recommendation', () => {
  it('should create a recommendation', () => {
    cy.intercept('GET', '/recommendations').as('getRecommendation')
    cy.wait('@getRecommendation')

    cy.get('input[placeholder="Name"]').type('Savages')
    cy.get('input[placeholder="https://youtu.be/..."]').type('https://youtu.be/3WaXX7F-sNc')

    cy.intercept('POST', 'http://localhost:5000/recommendations').as('postRecommendation')
    cy.get('button[name="submit"]').click()
    cy.wait('@postRecommendation')
  })
  
})

describe('vote recommendation', () => {
  it('should upvote successfully', () => {
    cy.createRecommendation('Savages', 'https://youtu.be/3WaXX7F-sNc')
    cy.get('div[name="score"]').invoke('text').then(parseInt).then((prev) => {
      cy.get('svg[name="upvote"]').click()
      cy.wait(500)
      cy.get('div[name="score"]').invoke('text').then(parseInt).then((next) => {
        expect(next).to.equal(prev + 1)
      })
    })
  })

  it('should downvote successfully', () => {
    cy.createRecommendation('Savages', 'https://youtu.be/3WaXX7F-sNc')
    cy.get('div[name="score"]').invoke('text').then(parseInt).then((prev) => {
      cy.get('svg[name="downvote"]').click()
      cy.wait(500)
      cy.get('div[name="score"]').invoke('text').then(parseInt).then((next) => {
        expect(next).to.equal(prev - 1)
      })
    })
  })
  
})

describe('navigate to routes', () => {
  it('should navigate to /home sucessfully', () => {
    cy.intercept('GET', '/recommendations').as('getRecommendation')
    cy.get('div[name="home"]').click()
    cy.wait('@getRecommendation')
    cy.url().should('include', '/')
  })
  it('should navigate to /top sucessfully', () => {
    cy.intercept('GET', '/recommendations/top/10').as('getRecommendation')
    cy.get('div[name="top"]').click()
    cy.wait('@getRecommendation')
    cy.url().should('include', '/top')
  })  
  
})

