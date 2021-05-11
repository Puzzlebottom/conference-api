export const up = function(knex, Promise) {
    return knex.schema.createTable('talks', function(table) {
        table.increments();
        table.string('title').notNullable();
        table.integer('duration').notNullable();
        table.integer('sessionId').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
    })
};

export const down = function(knex, Promise) {
    return knex.schema.dropTable('talks');
};