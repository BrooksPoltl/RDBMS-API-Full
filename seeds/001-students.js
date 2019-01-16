
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'brooks', cohort_id: 1},
        {name: 'parker',cohort_id: 1},
        {name: 'poltl',cohort_id: 3}
      ]);
    });
};
