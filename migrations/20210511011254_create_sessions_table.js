export const up = function(knex, Promise) {
    return knex.schema.createTable('sessions', function(table) {
        table.increments();
        table.string('title').notNullable();
        table.string('startTime').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
    })
};

export const down = function(knex, Promise) {
    return knex.schema.dropTable('sessions');
};

