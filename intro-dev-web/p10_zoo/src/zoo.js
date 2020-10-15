/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

function animalsByIds(...ids) {
  // Murillo Wolf no fechamento do dia 09/10/2020 e
  // https://stackoverflow.com/questions/57861821/how-to-return-specific-values-from-a-filter-in-javascript
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const specie = data.animals.find(specieName => animal === specieName.name);
  return (specie.residents.every(specieAge => age < specieAge.age));
  // return !(specie.residents.some(specieAge => age > specieAge.age));
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees.find(name =>
    employeeName === name.firstName || employeeName === name.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  // https://www.tutorialspoint.com/object-assign-in-javascript
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push(
    {
      id,
      firstName,
      lastName,
      managers,
      responsibleFor,
    },
  );
}

function animalCount(species) {
  if (!species) {
    // https://www.digitalocean.com/community/tutorials/js-finally-understand-reduce
    return data.animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
    // 1a iteração: acc = {} e curr = animals[0] :: acc = {'lions': 4}
    // 2a iteração: acc = {'lions': 4} e curr = animals[1] :: acc = {'lions': 4, 'tigers': 2}
  }
  return data.animals.find(curr => species === curr.name).residents.length;
}

function entryCalculator(entrants) {
  // https://pt.stackoverflow.com/questions/83588/em-javascript-como-verificar-que-um-objeto-est%C3%A1-vazio-sem-jquery
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return (data.prices.Adult * Adult) + (data.prices.Senior * Senior) + (data.prices.Child * Child);
}

// Ronan Fernandes: https://github.com/tryber/sd-04-block9-project-zoo-functions/pull/26/files
const includeResidents = (animalName, residents, sorted, sex) => {
  const obj = {};
  obj[animalName] = residents.map(resident => resident.name);
  // {"NE": [{"lions": ["Zena", "Maxwell", "Faustino", "Dee"]}, {"giraffes": ...
  if (sex) {
    obj[animalName] = [];
    residents.forEach((resident) => {
      if (resident.sex === sex) {
        obj[animalName].push(resident.name);
        // {"NE": [{"lions": ["Zena", "Dee"]}, ...
      }
    });
  }
  if (sorted) {
    obj[animalName].sort();
    // {"NE": [{"lions": ["Dee", "Zena"]}, ...}
  }
  return obj;
};

function animalMap({ includeNames, sorted, sex } = {}) {
  const result = data.animals.reduce((acc, curr) => {
    if (!acc[curr.location]) {
      acc[curr.location] = [];
      // {"NE": [], "NW": [], "SE": [], "SW": []}
    }
    if (!includeNames) {
      acc[curr.location].push(curr.name);
      // {"NE": ["lions", "giraffes"], "NW": ["tigers", "bears", "elephants"], ...
    } else { // includeNames = true
      acc[curr.location].push(includeResidents(curr.name, curr.residents, sorted, sex));
    }
    return acc;
  }, {});
  return result;
}
// ---------------------------------------------------------------------------

function schedule(dayName) {
  const schedules = Object.entries(data.hours); // [ 'Tuesday', { open: 8, close: 18 } ], ...
  const viewSchedules = schedules.reduce((acc, curr) => {
    if (curr[0] === 'Monday') {
      acc[curr[0]] = 'CLOSED';
    } else {
      acc[curr[0]] = `Open from ${curr[1].open}am until ${curr[1].close - 12}pm`;
      // [ 0: 'Tuesday', 1: { open: 8, close: 18 } ], ...
    }
    return acc;
  }, {});

  if (!dayName) {
    return viewSchedules;
  }
  return { [dayName]: viewSchedules[dayName] };
}

function oldestFromFirstSpecies(id) {
  const firstSpecie = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const getResidents = data.animals.find(animal => animal.id === firstSpecie).residents;
  const oldResident = getResidents.sort((ageA, ageB) => ageB.age - ageA.age)[0];
  return Object.values(oldResident);
}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  Object.keys(data.prices).forEach((price) => {
    data.prices[price] = Math.ceil((data.prices[price] * increase) * 100) / 100;
  });
}

// Pedro Pires: // https://github.com/tryber/sd-04-block9-project-zoo-functions/pull/39/files
function auxEmployeeCoverage() {
  const employeesList = {};
  data.employees.forEach((employee) => {
    const name = `${employee.firstName} ${employee.lastName}`;
    const animals = employee.responsibleFor.map(idAnimal =>
      data.animals.find(animal => animal.id === idAnimal).name);
    employeesList[name] = animals;
  });
  return employeesList;
}

function employeeCoverage(idOrName) {
  if (!idOrName) return auxEmployeeCoverage();
  const employee = data.employees.find(({ id, firstName, lastName }) =>
    id === idOrName || firstName === idOrName || lastName === idOrName);
  return {
    [`${employee.firstName} ${employee.lastName}`]:
    auxEmployeeCoverage()[`${employee.firstName} ${employee.lastName}`],
  };
}
// ---------------------------------------------------------------------------

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
