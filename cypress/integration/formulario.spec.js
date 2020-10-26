/// <reference types="cypress" />

// Describir todas las pruebas (agrupa)
describe('<Login />', () => {
    
    it('<Login /> - Verificar pantalla de inicio', () => {
        cy.visit('/');

        // probar el texto
        cy.contains('h1', 'Iniciar Sesión');

        cy.get('[data-cy=titulo]')
            .invoke('text')
            .should('equal', 'Iniciar Sesión');

        // revisar si el formulario existe
        cy.get('[data-cy=form-login]').should('exist')

        // revisar los input
        cy.get('[data-cy=email-input]').should('exist');
        cy.get('[data-cy=password-input]').should('exist');

        cy.get('[data-cy=submit-login]')
            .should('exist')
            .should('have.value', 'Iniciar Sesión')
            .should('have.class', 'btn-primario')
            .and('have.class', 'btn');

        cy.get('[data-cy=nueva-cuenta]').should('exist').should('have.prop', 'tagName').should('eq', 'A');
        cy.get('[data-cy=nueva-cuenta]').should('have.attr', 'href').should('eq', '/nueva-cuenta');
    });

    it('<NuevaCuenta /> Verificar pantalla de Agregar Nueva Cuenta', () => {
        cy.visit('/nueva-cuenta');
        
        cy.get('[data-cy=titulo]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Obtener una cuenta');

        cy.get('[data-cy=form-agregar-nueva-cuenta]')
            .should('exist');

        cy.get('[data-cy=nombre-input]').should('exist');
        cy.get('[data-cy=email-input]').should('exist');
        cy.get('[data-cy=password-input]').should('exist');
        cy.get('[data-cy=repetir-password-input]')
            .should('exist')
            .should('have.prop', 'type')
            .should('equal', 'password');
        
        cy.get('[data-cy=btn-submit]')
            .should('exist')
            .should('have.value', 'Registrarme')
            .should('have.class', 'btn')
            .should('not.have.value', 'Crear Nueva Cuenta')
            .and('have.class', 'btn-primario')

        cy.get('[data-cy=enlace-login]')
        .should('exist')
        .should('have.attr', 'href')
        .should('eq', '/');

        cy.get('[data-cy=enlace-login]')
            .should('exist')
            .should('have.attr', 'href')
            .should('eq', '/');
        
            cy.visit('/');
    });
});